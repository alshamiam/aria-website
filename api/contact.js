/* Aria Music Academy — contact form handler (Vercel serverless function)
   1) Emails the enquiry to the academy (info@).
   2) Sends a confirmation auto-reply to the visitor (if they gave an email).
   Sends via Resend (domain ariamusicacademy.org verified). Zero dependencies.
   Env: RESEND_API_KEY (required). Optional: NOTIFY_EMAIL, MAIL_FROM. */
"use strict";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "info@ariamusicacademy.org";
const MAIL_FROM = process.env.MAIL_FROM || "Aria Music Academy <noreply@ariamusicacademy.org>";

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendEmail(key, payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!r.ok) {
    const detail = await r.text();
    const err = new Error(`Resend ${r.status}: ${detail.slice(0, 300)}`);
    err.status = r.status;
    throw err;
  }
}

// Confirmation email content, per language
function confirmation(lang, name) {
  if (lang === "ar") {
    return {
      subject: "شكراً لتواصلك مع أكاديمية آريا للموسيقى",
      html: `
<div dir="rtl" style="font-family:'Segoe UI',Tahoma,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f5f0e7;color:#231119;text-align:right">
  <h2 style="color:#2e1430;margin:0 0 4px;font-size:22px">أكاديمية آريا للموسيقى</h2>
  <div style="height:3px;width:64px;background:#c9a23f;margin:0 0 24px"></div>
  <p style="font-size:16px;line-height:1.8">عزيزنا ${esc(name)}،</p>
  <p style="font-size:16px;line-height:1.8">شكراً لتواصلك مع <strong>أكاديمية آريا للموسيقى</strong>. لقد استلمنا طلبك، وسيتواصل معك أحد أعضاء فريقنا قريباً جداً لترتيب الخطوات التالية وحجز درسك التجريبي.</p>
  <p style="font-size:16px;line-height:1.8">إن كان لديك أي استفسار عاجل، يمكنك ببساطة الرد على هذه الرسالة أو مراسلتنا على <a href="mailto:info@ariamusicacademy.org" style="color:#ae772b">info@ariamusicacademy.org</a>.</p>
  <p style="font-size:16px;line-height:1.8;margin-top:28px">مع أطيب التحيات،<br><strong>أكاديمية آريا للموسيقى</strong><br><span style="color:#8a7680">دروس بيانو وغناء · الكويت</span></p>
</div>`,
      text: `عزيزنا ${name}،\n\nشكراً لتواصلك مع أكاديمية آريا للموسيقى. لقد استلمنا طلبك وسيتواصل معك فريقنا قريباً جداً.\n\nللاستفسارات العاجلة: info@ariamusicacademy.org\n\nمع أطيب التحيات،\nأكاديمية آريا للموسيقى — دروس بيانو وغناء · الكويت`
    };
  }
  return {
    subject: "Thank you for contacting Aria Music Academy",
    html: `
<div style="font-family:'Segoe UI',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f5f0e7;color:#231119">
  <h2 style="color:#2e1430;margin:0 0 4px;font-size:22px">Aria Music Academy</h2>
  <div style="height:3px;width:64px;background:#c9a23f;margin:0 0 24px"></div>
  <p style="font-size:16px;line-height:1.8">Dear ${esc(name)},</p>
  <p style="font-size:16px;line-height:1.8">Thank you for reaching out to <strong>Aria Music Academy</strong>. We've received your enquiry, and a member of our team will be in touch very shortly to arrange the next steps and your trial lesson.</p>
  <p style="font-size:16px;line-height:1.8">If anything is urgent in the meantime, simply reply to this email or write to us at <a href="mailto:info@ariamusicacademy.org" style="color:#ae772b">info@ariamusicacademy.org</a>.</p>
  <p style="font-size:16px;line-height:1.8;margin-top:28px">Warm regards,<br><strong>Aria Music Academy</strong><br><span style="color:#8a7680">Piano &amp; Vocal Lessons · Kuwait</span></p>
</div>`,
    text: `Dear ${name},\n\nThank you for reaching out to Aria Music Academy. We've received your enquiry and a member of our team will be in touch very shortly.\n\nFor anything urgent: info@ariamusicacademy.org\n\nWarm regards,\nAria Music Academy — Piano & Vocal Lessons · Kuwait`
  };
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
  const lang = (body.lang === "ar") ? "ar" : "en";

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
  <p style="margin-top:32px;font-size:11px;color:#8a7680">Submitted via ariamusicacademy.org &nbsp;•&nbsp; ${when} KWT &nbsp;•&nbsp; lang: ${lang}</p>
</div>`;
  const text = `New enquiry — Aria Music Academy\n\nName: ${name}\nPhone/WhatsApp: ${phone}\nEmail: ${email || "—"}\nInterested in: ${interest || "—"}\nMessage: ${message || "—"}\n\n${when} KWT`;

  // 1) Notify the academy (this is the critical one)
  try {
    const payload = { from: MAIL_FROM, to: [NOTIFY_EMAIL], subject: `New enquiry — ${name}`, html, text };
    if (email) payload.reply_to = email;
    await sendEmail(key, payload);
    console.log("Notification sent to", NOTIFY_EMAIL);
  } catch (e) {
    console.error("Notification failed:", e && e.message);
    return res.status(502).json({ error: "Send failed" });
  }

  // 2) Confirmation to the visitor (best-effort; never blocks the main enquiry)
  if (email) {
    try {
      const c = confirmation(lang, name);
      await sendEmail(key, { from: MAIL_FROM, to: [email], reply_to: NOTIFY_EMAIL, subject: c.subject, html: c.html, text: c.text });
      console.log("Confirmation sent to", email);
    } catch (e) {
      console.error("Confirmation failed (non-blocking):", e && e.message);
    }
  }

  if (isFetch) return res.status(200).json({ ok: true });
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  return res.status(200).send(
    `<!doctype html><meta charset="utf-8"><title>Thank you</title>` +
    `<body style="font-family:Georgia,serif;background:#2e1430;color:#f5f0e7;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px">` +
    `<div><h1 style="color:#e6c878">Thank you</h1><p>Your enquiry has reached Aria Music Academy. We'll be in touch shortly.</p><p><a href="/" style="color:#e6c878">Back to the website</a></p></div></body>`
  );
};
