// Vercel serverless function — create a Razorpay order for a paid paper.
//
//   POST /api/create-order
//   Headers: Authorization: Bearer <supabase access token>
//   Body:    { "paperId": "jmi-2022-mba-full" }
//
// Flow: verify the caller's Supabase session -> look up the paper price from
// the public `papers` catalog -> ask Razorpay to create an order -> return the
// order id + amount + public key so the browser can open Checkout. The secret
// key NEVER leaves the server.
//
// Required Vercel env vars:
//   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, SUPABASE_SERVICE_ROLE_KEY
//   (SUPABASE_URL / SUPABASE_ANON_KEY fall back to the known public values.)

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://tkdhebrsjaojcyertbjy.supabase.co";
const SUPABASE_ANON =
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_2PoM9LcLzPjvCtx8BbRS4Q_RVc7TngP";
const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RZP_SECRET = process.env.RAZORPAY_KEY_SECRET;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!RZP_KEY_ID || !RZP_SECRET) {
    res.status(500).json({ error: "Payment is not configured on the server." });
    return;
  }

  try {
    // --- 1. Authenticate the caller via their Supabase access token --------
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

    // --- 2. Validate the paper + price from the catalog -------------------
    const body = readBody(req);
    const paperId = body && body.paperId;
    if (!paperId) {
      res.status(400).json({ error: "Missing paperId." });
      return;
    }
    const paper = await getPaper(paperId);
    if (!paper) {
      res.status(404).json({ error: "Unknown paper." });
      return;
    }
    if (!paper.is_paid) {
      res.status(400).json({ error: "This paper is free — no payment needed." });
      return;
    }
    const amount = Number(paper.price_paise) || 0;
    if (amount < 100) {
      res.status(400).json({ error: "Invalid price configured for this paper." });
      return;
    }

    // --- 3. Create the Razorpay order ------------------------------------
    const auth = Buffer.from(RZP_KEY_ID + ":" + RZP_SECRET).toString("base64");
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + auth,
      },
      body: JSON.stringify({
        amount: amount,
        currency: "INR",
        receipt: ("p_" + paperId + "_" + user.id).slice(0, 40),
        notes: { paperId: paperId, userId: user.id },
      }),
    });
    const order = await rzpRes.json();
    if (!rzpRes.ok || !order.id) {
      res
        .status(502)
        .json({ error: (order.error && order.error.description) || "Could not start payment." });
      return;
    }

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RZP_KEY_ID,
      paperTitle: paper.title,
    });
  } catch (e) {
    res.status(500).json({ error: "Server error creating order." });
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
    "&select=id,is_paid,price_paise,title";
  const r = await fetch(url, {
    headers: { apikey: SUPABASE_ANON, Authorization: "Bearer " + SUPABASE_ANON },
  });
  if (!r.ok) return null;
  const rows = await r.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}
