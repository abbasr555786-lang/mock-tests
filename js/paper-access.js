// Paper access gate (browse-free, sign-in-to-attempt).
//
// Everyone can explore every paper with no login. The gate only fires when a
// user tries to ATTEMPT a paper: signing in with Google is required, and that
// is all — every paper is free to attempt once signed in.
//
// Payments are intentionally disabled for now. The Razorpay/Supabase purchase
// flow (api/create-order, api/verify-payment, papers/purchases tables) still
// exists server-side and can be re-wired here later if papers go paid again.
(function () {
  function getUser() { return (window.repo && window.repo.getUser()) || null; }
  function isSignedIn() { var u = getUser(); return !!(u && u.supabaseId); }

  // Resolve to true if allowed to attempt now, else show the sign-in prompt
  // (which redirects away to Google) and resolve false.
  function ensure(test) {
    if (isSignedIn()) return Promise.resolve(true);
    return promptLogin(test);
  }

  // ---- Sign-in prompt (guest) -------------------------------------------
  function promptLogin(test) {
    var message =
      "Sign in with Google to attempt “" + ((test && test.name) || "this paper") +
      "”. It’s free — signing in lets us save your score and track your progress.";
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
      '<div class="actions-row confirm-modal__actions">' + btns + "</div>" +
      "</div>";
    overlay.querySelector("h2").textContent = title;
    overlay.querySelector("p").textContent = message;

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
    }
    function onKey(e) { if (e.key === "Escape") { close(); fireCancel(); } }
    function fireCancel() {
      var cancel = buttons.find(function (b) { return b.act === "cancel"; });
      if (cancel) onAct("cancel", close);
    }

    overlay.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        onAct(btn.getAttribute("data-act"), close);
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
    isFree: function () { return true; },
    isGranted: function () { return isSignedIn(); },
    refresh: function () { return Promise.resolve(); },
  };
})();
