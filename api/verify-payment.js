// Vercel serverless function — verify a Razorpay payment and grant access.
//
//   POST /api/verify-payment
//   Headers: Authorization: Bearer <supabase access token>
//   Body:    { razorpay_order_id, razorpay_payment_id, razorpay_signature, paperId }
//
// Flow: re-verify the caller's session -> recompute the HMAC signature with the
// Razorpay secret and compare (this proves the payment is genuine) -> write a
// 1-year `purchases` row using the Supabase SERVICE ROLE key (which bypasses
// RLS). The browser can never write purchases itself.
//
// Required Vercel env vars:
//   RAZORPAY_KEY_SECRET, SUPABASE_SERVICE_ROLE_KEY
//   (SUPABASE_URL / SUPABASE_ANON_KEY fall back to the known public values.)

const crypto = require("crypto");

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://tkdhebrsjaojcyertbjy.supabase.co";
const SUPABASE_ANON =
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_2PoM9LcLzPjvCtx8BbRS4Q_RVc7TngP";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RZP_SECRET = process.env.RAZORPAY_KEY_SECRET;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!RZP_SECRET || !SERVICE_ROLE) {
    res.status(500).json({ error: "Payment is not configured on the server." });
    return;
  }

  try {
    // --- 1. Authenticate the caller --------------------------------------
    const token = bearer(req);
    if (!token) {
      res.status(401).json({ error: "Sign in required." });
      return;
    }
    const user = await getSupabaseUser(token);
    if (!user) {
      res.status(401).json({ error: "Session expired. Please sign in again." });
      return;
    }

    const body = readBody(req) || {};
    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;
    const paperId = body.paperId;
    if (!orderId || !paymentId || !signature || !paperId) {
      res.status(400).json({ error: "Incomplete payment details." });
      return;
    }

    // --- 2. Verify the Razorpay signature (HMAC-SHA256) ------------------
    const expected = crypto
      .createHmac("sha256", RZP_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");
    if (!timingSafeEqual(expected, signature)) {
      res.status(400).json({ error: "Payment verification failed." });
      return;
    }

    // --- 3. Look up the amount and record the purchase ------------------
    const paper = await getPaper(paperId);
    const amount = paper ? Number(paper.price_paise) || 0 : 0;

    const insert = await fetch(SUPABASE_URL + "/rest/v1/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SERVICE_ROLE,
        Authorization: "Bearer " + SERVICE_ROLE,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        user_id: user.id,
        paper_id: paperId,
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        amount_paise: amount,
        status: "active",
      }),
    });

    // 409 = the unique (user, paper, active) index already has a row, i.e. the
    // user already owns it. Treat that as success, not an error.
    if (!insert.ok && insert.status !== 409) {
      res.status(500).json({ error: "Payment verified but access could not be saved. Contact support." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Server error verifying payment." });
  }
};

// ---------------------------------------------------------------- helpers
function bearer(req) {
  const h = req.headers["authorization"] || req.headers["Authorization"] || "";
  const m = /^Bearer\s+(.+)$/i.exec(h);
  return m ? m[1] : null;
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try { return JSON.parse(req.body); } catch (e) { return null; }
  }
  return null;
}

function timingSafeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

async function getSupabaseUser(token) {
  const r = await fetch(SUPABASE_URL + "/auth/v1/user", {
    headers: { apikey: SUPABASE_ANON, Authorization: "Bearer " + token },
  });
  if (!r.ok) return null;
  const u = await r.json();
  return u && u.id ? u : null;
}

async function getPaper(paperId) {
  const url =
    SUPABASE_URL +
    "/rest/v1/papers?id=eq." +
    encodeURIComponent(paperId) +
    "&select=id,price_paise";
  const r = await fetch(url, {
    headers: { apikey: SUPABASE_ANON, Authorization: "Bearer " + SUPABASE_ANON },
  });
  if (!r.ok) return null;
  const rows = await r.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}
