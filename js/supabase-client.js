// Supabase client (paid-papers backend).
// These two values are PUBLIC by design — the publishable key is meant to ship
// in frontend code; all real security is enforced server-side via Row Level
// Security (RLS) policies on the database. NEVER put the secret key here.
(function () {
  // ── Project endpoint ──────────────────────────────────────────────
  // To brand the Google sign-in screen (remove the "tkdhebrsjaojcyertbjy
  // .supabase.co" text), enable a Supabase Custom Domain, then change
  // SUPABASE_URL below to that domain (e.g. "https://auth.jamiaprep.com").
  // Supabase routes BOTH auth and API through the custom domain, so this
  // one line is the only code change needed. Leave it as-is until the
  // custom domain's DNS is verified in the Supabase dashboard.
  var SUPABASE_URL = "https://tkdhebrsjaojcyertbjy.supabase.co";
  var SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2PoM9LcLzPjvCtx8BbRS4Q_RVc7TngP";

  if (!window.supabase || !window.supabase.createClient) {
    console.error("[supabase] CDN library failed to load before supabase-client.js");
    return;
  }

  // Expose a single shared client as window.sb for the rest of the app.
  window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  console.log("[supabase] client ready");
})();
