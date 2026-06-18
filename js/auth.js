// Real authentication via Supabase (Google sign-in).
// This layer bridges Supabase auth -> the app's existing local "user" model
// (window.repo getUser/saveUser/clearUser), so all the existing user-only /
// guest-only UI keeps working unchanged. Replaces the old demo phone-OTP.
(function () {
  if (!window.sb) {
    console.error("[auth] Supabase client (window.sb) not ready");
    return;
  }
  var sb = window.sb;

  // Capture OAuth return params at load time, BEFORE the SDK cleans the URL.
  var cameFromOAuth = /[?&#](code|access_token|error|error_description)=/.test(
    window.location.search + window.location.hash
  );

  // Force the app to re-route/re-render (router listens on hashchange).
  function rerender() {
    try { window.dispatchEvent(new Event("hashchange")); } catch (e) {}
  }

  // Mirror the Supabase session user into the local repo user object.
  function syncUserFromSession(session) {
    if (!session || !session.user || !window.repo) return;
    var u = session.user;
    var meta = u.user_metadata || {};
    var name = meta.full_name || meta.name ||
      (u.email ? u.email.split("@")[0] : "");
    window.repo.saveUser({
      name: name,
      email: u.email || meta.email || "",
      avatar: meta.avatar_url || meta.picture || "",
      supabaseId: u.id,
      provider: "google",
      verifiedAt: Date.now(),
      skipped: false,
    });
  }

  // Where to land after the OAuth round-trip. We stash the page the user was on
  // when they hit "sign in" (e.g. the instructions page for a paper) so we can
  // bring them right back instead of dumping them on home. The login page itself
  // is never a useful return target.
  var RETURN_KEY = "jamiaprep:postLogin";
  function rememberReturn() {
    try {
      var h = window.location.hash || "";
      if (h && h !== "#/login") localStorage.setItem(RETURN_KEY, h);
      else localStorage.removeItem(RETURN_KEY);
    } catch (e) {}
  }
  function takeReturn() {
    try {
      var h = localStorage.getItem(RETURN_KEY);
      localStorage.removeItem(RETURN_KEY);
      return h || "#/";
    } catch (e) { return "#/"; }
  }

  window.auth = {
    // Kick off Google OAuth (redirects away to Google, then back to the site).
    signInWithGoogle: function () {
      rememberReturn();
      var redirectTo = window.location.origin + window.location.pathname;
      return sb.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectTo },
      }).then(function (res) {
        if (res.error) {
          alert("Google sign-in failed: " + res.error.message);
        }
        return res;
      });
    },

    // Sign out of Supabase AND clear the local user, then go to login.
    signOut: function () {
      return sb.auth.signOut().catch(function () {}).then(function () {
        if (window.repo) window.repo.clearUser();
        window.location.hash = "#/login";
        rerender();
      });
    },

    getSession: function () {
      return sb.auth.getSession().then(function (r) {
        return r && r.data ? r.data.session : null;
      });
    },

    // Persist the student's profile (name / city / state / target exams) to the
    // central `profiles` table, keyed to their auth user id. RLS lets each user
    // write only their own row; the business reads all rows from the dashboard.
    saveProfile: function (profile) {
      return sb.auth.getUser().then(function (r) {
        var u = r && r.data ? r.data.user : null;
        if (!u) return { error: { message: "Not signed in" } };
        return sb.from("profiles").upsert({
          id: u.id,
          email: u.email || "",
          name: profile.name || "",
          city: profile.city || "",
          state: profile.state || "",
          target_exams: profile.targetExams || [],
          updated_at: new Date().toISOString(),
        }, { onConflict: "id" });
      });
    },

    // Fetch the signed-in user's stored profile (null if none yet).
    loadProfile: function () {
      return sb.auth.getUser().then(function (r) {
        var u = r && r.data ? r.data.user : null;
        if (!u) return null;
        return sb.from("profiles").select("*").eq("id", u.id).maybeSingle()
          .then(function (res) { return res && res.data ? res.data : null; });
      });
    },
  };

  // Decide where to send the user after a fresh Google sign-in: if they already
  // have a saved profile (e.g. returning on a new device), mirror it locally and
  // drop them back where they left off; otherwise send them to fill it in once.
  function routeAfterLogin() {
    window.auth.loadProfile().then(function (p) {
      var hasProfile = !!(p && p.target_exams && p.target_exams.length);
      if (p && window.repo) {
        window.repo.saveUser({
          name: p.name || undefined,
          city: p.city || "",
          state: p.state || "",
          targetExams: p.target_exams || [],
          profileComplete: hasProfile,
        });
      }
      window.location.hash = hasProfile ? takeReturn() : "#/profile";
      rerender();
    }).catch(function () {
      // If the lookup fails, fall back to the profile step so we still capture data.
      window.location.hash = "#/profile";
      rerender();
    });
  }

  // React to every auth state change: initial load, OAuth return, sign-out.
  sb.auth.onAuthStateChange(function (event, session) {
    if (session && session.user) {
      syncUserFromSession(session);
      // Just returned from Google -> route based on whether we already have their
      // details. (Fires once per OAuth round-trip, not on plain session restores.)
      if (cameFromOAuth) {
        cameFromOAuth = false;
        // Count a completed Google sign-in.
        if (window.track) window.track("Google sign-in", { provider: "google" });
        routeAfterLogin();
        return;
      }
      rerender();
    } else if (event === "SIGNED_OUT") {
      if (window.repo) window.repo.clearUser();
      rerender();
    }
  });
})();
