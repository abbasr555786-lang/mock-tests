// Paper access gate (browse-free, sign-in-to-attempt).
//
// Everyone can explore every paper with no login. The gate only fires when a
// user tries to ATTEMPT a paper, and sign-in is always required first:
//   - Not signed in (any paper)              -> Google sign-in prompt.
//   - Signed in, free paper                  -> start immediately.
//   - Signed in, paid paper, not purchased   -> Razorpay Checkout popup.
//   - Signed in, paid paper, already owned   -> start immediately.
//
// Backend endpoints (Vercel): /api/create-order, /api/verify-payment.
// Purchase/access truth lives in Supabase (papers, purchases, has_active_access).
(function () {
  // Latest set is free for everyone. Used as a fallback when the Supabase
  // `papers` catalog hasn't been seeded yet (then everything else is paid).
  var FREE_FALLBACK = { "jmi-2026-mba-full": true };
  var DEFAULT_PRICE_PAISE = 1500; // Rs.15 — only for the modal label fallback.

  var catalog = null;          // id -> { is_paid, price_paise, title }
  var granted = {};            // ids unlocked in this session (skip re-check)

  function sb() { return window.sb; }
  function getUser() { return (window.repo && window.repo.getUser()) || null; }
  function isSignedIn() { var u = getUser(); return !!(u && u.supabaseId); }

  // Pull the price catalog once. Failure is non-fatal: we fall back to
  // "2026 free, everything else paid".
  function loadCatalog() {
    if (catalog) return Promise.resolve(catalog);
    if (!sb()) { catalog = {}; return Promise.resolve(catalog); }
    return sb()
      .from("papers")
      .select("id,is_paid,price_paise,title")
      .then(function (res) {
        catalog = {};
        (res && res.data ? res.data : []).forEach(function (p) {
          catalog[p.id] = p;
        });
        return catalog;
      })
      .catch(function () { catalog = {}; return catalog; });
  }

  function isFree(test) {
    var id = test && test.id;
    var c = catalog && catalog[id];
    if (c) return !c.is_paid;
    return !!FREE_FALLBACK[id];
  }

  function priceLabel(test) {
    var c = catalog && catalog[test.id];
    var paise = c && c.price_paise ? c.price_paise : DEFAULT_PRICE_PAISE;
    return "₹" + (paise / 100).toFixed(0);
  }

  // Resolve to true if allowed to attempt now, else run the right prompt and
  // resolve to true only once access is granted (false if the user backs out).
  function ensure(test) {
    if (!test || !test.id) return Promise.resolve(true);
    return loadCatalog().then(function () {
      // Login is required before any attempt — free or paid.
      if (!isSignedIn()) return promptLogin(test);
      // Signed in + free (or already unlocked this session): start now.
      if (isFree(test) || granted[test.id]) return true;
      // Signed in + paid: confirm ownership server-side, else open payment.
      return checkAccess(test.id).then(function (owns) {
        if (owns) { granted[test.id] = true; return true; }
        return openPayModal(test);
      });
    });
  }

  function checkAccess(paperId) {
    if (!sb()) return Promise.resolve(false);
    return sb()
      .rpc("has_active_access", { p_paper_id: paperId })
      .then(function (res) { return !res.error && res.data === true; })
      .catch(function () { return false; });
  }

  // ---- Sign-in prompt (paid paper, guest) -------------------------------
  function promptLogin(test) {
    var free = isFree(test);
    var message = free
      ? "Sign in with Google to attempt “" + (test.name || "this paper") +
          "”. It’s free — signing in lets us save your score and track your progress."
      : "“" + (test.name || "This paper") +
          "” is a premium previous-year paper. Sign in with Google to " +
          "unlock it for " + priceLabel(test) + " (1-year access, unlimited attempts).";
    return new Promise(function (resolve) {
      var modal = buildModal(
        "Sign in to attempt",
        message,
        [
          { label: "Continue with Google", primary: true, act: "login" },
          { label: "Not now", act: "cancel" },
        ],
        function (act, close) {
          if (act === "login") {
            if (window.auth && window.auth.signInWithGoogle) {
              // Redirects away to Google; the user returns and taps Attempt again.
              window.auth.signInWithGoogle();
            }
            close(); resolve(false);
          } else {
            close(); resolve(false);
          }
        }
      );
      document.body.appendChild(modal);
    });
  }

  // ---- Payment (paid paper, signed in, not owned) -----------------------
  function openPayModal(test) {
    return new Promise(function (resolve) {
      var modal = buildModal(
        "Unlock this paper",
        "“" + (test.name || "This paper") + "” — pay " +
          priceLabel(test) + " for 1-year access with unlimited attempts and " +
          "saved scores. Secure payment via Razorpay.",
        [
          { label: "Pay " + priceLabel(test), primary: true, act: "pay" },
          { label: "Cancel", act: "cancel" },
        ],
        function (act, close, setBusy, setError) {
          if (act !== "pay") { close(); resolve(false); return; }
          setBusy(true); setError("");
          startCheckout(test)
            .then(function (ok) {
              setBusy(false);
              if (ok) { granted[test.id] = true; close(); resolve(true); }
            })
            .catch(function (err) {
              setBusy(false);
              setError((err && err.message) || "Payment could not be completed.");
            });
        }
      );
      document.body.appendChild(modal);
    });
  }

  // Create an order, open Razorpay Checkout, verify on success.
  function startCheckout(test) {
    if (typeof window.Razorpay === "undefined") {
      return Promise.reject(new Error("Payment library failed to load. Refresh and try again."));
    }
    return getToken().then(function (token) {
      if (!token) throw new Error("Session expired. Please sign in again.");
      return apiPost("/api/create-order", token, { paperId: test.id }).then(function (order) {
        return new Promise(function (resolve, reject) {
          var user = getUser() || {};
          var rzp = new window.Razorpay({
            key: order.keyId,
            order_id: order.orderId,
            amount: order.amount,
            currency: order.currency || "INR",
            name: "JMI MBA Mocks",
            description: order.paperTitle || test.name,
            prefill: { name: user.name || "", email: user.email || "" },
            theme: { color: "#1f7a3a" },
            handler: function (resp) {
              apiPost("/api/verify-payment", token, {
                razorpay_order_id: resp.razorpay_order_id,
                razorpay_payment_id: resp.razorpay_payment_id,
                razorpay_signature: resp.razorpay_signature,
                paperId: test.id,
              })
                .then(function () { resolve(true); })
                .catch(function (e) { reject(e); });
            },
            modal: {
              ondismiss: function () { reject(new Error("Payment cancelled.")); },
            },
          });
          rzp.on("payment.failed", function (r) {
            reject(new Error((r.error && r.error.description) || "Payment failed."));
          });
          rzp.open();
        });
      });
    });
  }

  function getToken() {
    if (!sb()) return Promise.resolve(null);
    return sb().auth.getSession().then(function (r) {
      return r && r.data && r.data.session ? r.data.session.access_token : null;
    });
  }

  function apiPost(path, token, body) {
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error(data.error || "Request failed (" + res.status + ").");
        return data;
      });
    });
  }

  // ---- Tiny modal builder (reuses existing .modal styling) --------------
  function buildModal(title, message, buttons, onAct) {
    var overlay = document.createElement("div");
    overlay.className = "modal confirm-modal";
    var btns = buttons
      .map(function (b) {
        return (
          '<button class="btn ' +
          (b.primary ? "btn--primary" : "btn--ghost") +
          '" data-act="' + b.act + '">' + escapeHtml(b.label) + "</button>"
        );
      })
      .join("");
    overlay.innerHTML =
      '<div class="modal__panel confirm-modal__panel" role="alertdialog" aria-modal="true">' +
      "<h2></h2><p></p>" +
      '<p class="paper-gate__error" hidden style="color:#c0392b;font-size:.9em;margin-top:-.25rem"></p>' +
      '<div class="actions-row confirm-modal__actions">' + btns + "</div>" +
      "</div>";
    overlay.querySelector("h2").textContent = title;
    overlay.querySelector("p").textContent = message;
    var errEl = overlay.querySelector(".paper-gate__error");

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
    }
    function onKey(e) { if (e.key === "Escape") { close(); fireCancel(); } }
    function fireCancel() {
      var cancel = buttons.find(function (b) { return b.act === "cancel"; });
      if (cancel) onAct("cancel", close, setBusy, setError);
    }
    function setBusy(busy) {
      overlay.querySelectorAll("button").forEach(function (btn) { btn.disabled = busy; });
    }
    function setError(msg) {
      errEl.textContent = msg || "";
      errEl.hidden = !msg;
    }

    overlay.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        onAct(btn.getAttribute("data-act"), close, setBusy, setError);
      });
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) { close(); fireCancel(); }
    });
    document.addEventListener("keydown", onKey);
    return overlay;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  window.paperAccess = {
    ensure: ensure,
    isFree: isFree,
    isGranted: function (id) { return !!granted[id] || !!FREE_FALLBACK[id]; },
    priceLabel: priceLabel,
    refresh: function () { catalog = null; return loadCatalog(); },
  };

  // Warm the catalog so the first Attempt click is instant.
  loadCatalog();
})();
