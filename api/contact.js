/* Aria Music Academy — contact form handler (Vercel serverless function)
   Sends enquiries via Resend (domain ariamusicacademy.org verified in Resend).
   Zero dependencies — uses built-in fetch.
   Required env var in Vercel:
     RESEND_API_KEY = re_...   (from resend.com → API Keys)
   Optional:
     NOTIFY_EMAIL = where enquiries go (default: info@ariamusicacademy.org)
     MAIL_FROM    = sender (default: Aria Music Academy <noreply@ariamusicacademy.org>) */
"use strict";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@ariamusicacademy.org";
const MAIL_FROM = process.env.MAIL_FROM || "Aria Music Academy <noreply@ariamusicacademy.org>";

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  const isFetch = (req.headers["x-requested-with"] || "") === "fetch";
  const name = (body.name || "").toString().trim();
  const phone = (body.phone || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const interest = (body.interest || "").toString().trim();
  const message = (body.message || "").toString().trim();

  if ((body.company || "").toString().trim()) { // honeypot
    return isFetch ? res.status(200).json({ ok: true }) : res.status(200).send("Thank you.");
  }
  if (!name || !phone) return res.status(400).json({ error: "Name and phone are required." });

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(500).json({ error: "Email is not configured yet." });

  const when = new Date().toLocaleString("en-KW", { timeZone: "Asia/Kuwait", dateStyle: "medium", timeStyle: "short" });
  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f5f0e7;color:#231119">
  <h2 style="color:#2e1430;margin:0 0 4px;font-size:20px">New enquiry — Aria Music Academy</h2>
  <div style="height:3px;width:64px;background:#c9a23f;margin:0 0 24px"></div>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:8px 0;color:#8a7680;width:140px">Name</td><td style="padding:8px 0;font-weight:bold">${esc(name)}</td></tr>
    <tr><td style="padding:8px 0;color:#8a7680">Phone / WhatsApp</td><td style="padding:8px 0">${esc(phone)}</td></tr>
    ${email ? `<tr><td style="padding:8px 0;color:#8a7680">Email</td><td style="padding:8px 0"><a href="mailto:${esc(email)}" style="color:#ae772b">${esc(email)}</a></td></tr>` : ""}
    ${interest ? `<tr><td style="padding:8px 0;color:#8a7680">Interested in</td><td style="padding:8px 0">${esc(interest)}</td></tr>` : ""}
  </table>
  ${message ? `<div style="margin-top:24px;padding:16px;background:#fff;border-left:3px solid #c9a23f"><strong>Message</strong><br><br>${esc(message).replace(/\n/g, "<br>")}</div>` : ""}
  <p style="margin-top:32px;font-size:11px;color:#8a7680">Submitted via ariamusicacademy.org &nbsp;•&nbsp; ${when} KWT</p>
</div>`;
  const text = `New enquiry — Aria Music Academy\n\nName: ${name}\nPhone/WhatsApp: ${phone}\nEmail: ${email || "—"}\nInterested in: ${interest || "—"}\nMessage: ${message || "—"}\n\n${when} KWT`;

  const payload = { from: MAIL_FROM, to: [NOTIFY_EMAIL], subject: `New enquiry — ${name}`, html, text };
  if (email) payload.reply_to = email;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const detail = await r.text();
      console.error("Resend failed:", r.status, detail.slice(0, 400));
      return res.status(502).json({ error: "Send failed", detail: detail.slice(0, 200) });
    }
    console.log("Resend sent OK to", NOTIFY_EMAIL);
  } catch (e) {
    console.error("Resend error:", e && e.message);
    return res.status(500).json({ error: "Server error" });
  }

  if (isFetch) return res.status(200).json({ ok: true });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(
    `<!doctype html><meta charset="utf-8"><title>Thank you</title>` +
    `<body style="font-family:Georgia,serif;background:#2e1430;color:#f5f0e7;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px">` +
    `<div><h1 style="color:#e6c878">Thank you</h1><p>Your enquiry has reached Aria Music Academy. We'll be in touch shortly.</p><p><a href="/" style="color:#e6c878">Back to the website</a></p></div></body>`
  );
};
