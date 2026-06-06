/* Aria Music Academy — contact form handler (Vercel serverless function)
   Sends enquiries to info@ariamusicacademy.org via Resend.
   Requires env var: RESEND_API_KEY  (set in Vercel → Settings → Environment Variables)
   Zero dependencies — uses the built-in fetch (Node 18+). */
"use strict";

const TO = process.env.CONTACT_TO || "info@ariamusicacademy.org";
const FROM = process.env.CONTACT_FROM || "Aria Music Academy <noreply@ariamusicacademy.org>";

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Vercel parses JSON and urlencoded bodies into req.body; guard for strings too.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const isFetch = (req.headers["x-requested-with"] || "") === "fetch";
  const name = (body.name || "").toString().trim();
  const phone = (body.phone || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const interest = (body.interest || "").toString().trim();
  const message = (body.message || "").toString().trim();

  // Honeypot (optional): if a hidden "company" field is filled, treat as spam and silently accept.
  if ((body.company || "").toString().trim()) {
    if (isFetch) { res.status(200).json({ ok: true }); }
    else { res.status(200).send("Thank you."); }
    return;
  }

  if (!name || !phone) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    res.status(500).json({ error: "Email is not configured yet." });
    return;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;color:#231119;line-height:1.6">
      <h2 style="color:#2e1430;margin:0 0 12px">New enquiry — Aria Music Academy</h2>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 12px 4px 0;color:#5b4a50">Name</td><td style="padding:4px 0"><strong>${esc(name)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5b4a50">Phone / WhatsApp</td><td style="padding:4px 0">${esc(phone)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5b4a50">Email</td><td style="padding:4px 0">${esc(email) || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5b4a50">Interested in</td><td style="padding:4px 0">${esc(interest) || "—"}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5b4a50;vertical-align:top">Message</td><td style="padding:4px 0">${esc(message).replace(/\n/g, "<br>") || "—"}</td></tr>
      </table>
      <p style="color:#8a7680;font-size:13px;margin-top:18px">Sent from the contact form on ariamusicacademy.org</p>
    </div>`;

  const text =
    `New enquiry — Aria Music Academy\n\n` +
    `Name: ${name}\nPhone/WhatsApp: ${phone}\nEmail: ${email || "—"}\n` +
    `Interested in: ${interest || "—"}\nMessage: ${message || "—"}\n`;

  const payload = {
    from: FROM,
    to: [TO],
    subject: `New enquiry — ${name}`,
    html,
    text
  };
  if (email) payload.reply_to = email; // so you can reply straight to the visitor

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const detail = await r.text();
      res.status(502).json({ error: "Send failed", detail: detail.slice(0, 500) });
      return;
    }

    if (isFetch) {
      res.status(200).json({ ok: true });
    } else {
      // No-JS direct form post: show a simple thank-you page
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.status(200).send(
        `<!doctype html><meta charset="utf-8"><title>Thank you</title>` +
        `<body style="font-family:Georgia,serif;background:#2e1430;color:#f5f0e7;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px">` +
        `<div><h1 style="color:#e6c878">Thank you</h1><p>Your enquiry has reached Aria Music Academy. We'll be in touch shortly.</p>` +
        `<p><a href="/" style="color:#e6c878">Back to the website</a></p></div></body>`
      );
    }
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};
