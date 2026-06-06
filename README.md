# Aria Music Academy — Website

An elegant, fully bilingual (English + Arabic) **multi-page** static website,
engineered for SEO. No frameworks, no build dependencies — just Node.

Live-ready for Vercel.

---

## ⚠️ STEP 1 — Fill in your real details (one file)

Open **`site.config.js`** and replace every value marked `⚠`:

| Field | What to put |
|---|---|
| `siteUrl` | Your final domain, e.g. `https://ariamusicacademy.com` (no trailing slash) |
| `business.phoneDisplay` | Phone as shown, e.g. `+965 5xxx xxxx` |
| `business.phoneE164` | Same number, digits only with `+`, e.g. `+9655xxxxxxx` |
| `business.whatsapp` | WhatsApp number, **digits only, no `+`**, e.g. `9655xxxxxxx` |
| `business.email` | Contact email |
| `business.address` | Real street / area / governorate (EN + AR) |
| `business.geo` | Exact `lat` / `lng` of the studio |
| `business.mapEmbed` | Google Maps → *Share* → *Embed a map* → copy the `src="..."` URL only |
| `business.hours` | Real opening hours |
| `business.foundingYear` | Year Aria was founded |
| `social` | Your Instagram / Facebook / YouTube URLs (leave `""` to hide an icon) |

You do **not** need to touch anything else to go live.

> Tip: the contact form has zero backend — when a visitor submits it, it opens
> **WhatsApp** pre-filled with their details. That means bookings work the moment
> you deploy, with no server to maintain. (If you later want email capture like on
> solved-logistics.com, we can wire Resend/Supabase in.)

---

## STEP 2 — Build

```bash
node build.js
```

This regenerates everything into **`dist/`**. Re-run it any time you edit the
config or content.

## STEP 3 — Edit content (optional)

All page copy lives in:

- `content/en.js` — English
- `content/ar.js` — Arabic (natural Gulf Arabic, not literal translation)

Both files have the **same structure and the same `slug`s**, so the English and
Arabic versions of each page stay correctly linked for SEO (`hreflang`). Edit the
text, re-run `node build.js`.

---

## What's built in (the SEO part)

- **7 pages per language** (14 total), each targeting a distinct search intent:
  Home, Piano Lessons, Vocal Lessons, Kids' Music, Instructors, About, Contact.
- Clean URLs: `/en/piano-lessons`, `/ar/piano-lessons`, …
- `hreflang` pairs (en ↔ ar) + `x-default` on every page, and in the sitemap.
- Per-page `<title>`, meta description, canonical, Open Graph + Twitter cards.
- **JSON-LD structured data**: `MusicSchool` (local-business — address, geo, hours,
  phone), `WebSite`, `WebPage`, `BreadcrumbList`, `Course` (on the 3 lesson pages),
  `Person` ×2 (instructors), and `FAQPage` (rich-result eligible).
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, favicons, social share image.
- Fast & accessible: static HTML (Google sees everything without running JS),
  responsive WebP/JPEG images with `srcset`, lazy-loading, RTL done properly.

---

## Deploy to Vercel

The repo already includes `dist/vercel.json` (clean URLs, `/` → `/en/`, caching).

**Option A — point Vercel at this folder**
1. Push this project to a Git repo (e.g. `alshamiam/aria-website`).
2. In Vercel: *New Project* → import the repo.
3. Build command: `node build.js` · Output directory: `dist`.

**Option B — deploy the `dist/` folder directly** with the Vercel CLI / drag-drop.

After deploy:
1. Add your domain in Vercel.
2. In **Google Search Console**: add the property, submit `https://YOURDOMAIN/sitemap.xml`.
3. Create a **Google Business Profile** for the academy (huge for "near me" / map searches).

---

## File map

```
site.config.js      ← the only file you must edit before launch
content/en.js       ← English copy
content/ar.js       ← Arabic copy
build.js            ← generator (node build.js)
src/styles.css      ← design system (aubergine + gold)
src/main.js         ← tiny progressive-enhancement JS
dist/               ← generated site (what you deploy)
```
