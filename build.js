#!/usr/bin/env node
/* ============================================================
   ARIA MUSIC ACADEMY — static site generator (zero deps)
   Run:  node build.js
   Reads: site.config.js, content/en.js, content/ar.js, src/*
   Writes: dist/  (en + ar pages, sitemap, robots, manifest, vercel.json)
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");
const cfg = require("./site.config.js");
const content = { en: require("./content/en.js"), ar: require("./content/ar.js") };

const SITE = cfg.siteUrl.replace(/\/+$/, "");
const LANGS = cfg.langs;
const DEFAULT = cfg.defaultLang;

/* ---------------- helpers ---------------- */
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s = "") => esc(s).replace(/"/g, "&quot;");

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function write(rel, data) {
  const full = path.join(DIST, rel);
  ensureDir(path.dirname(full));
  fs.writeFileSync(full, data);
  return full;
}

// absolute URL for canonical / hreflang / sitemap
function pageUrl(lang, slug) {
  return slug === "" ? `${SITE}/${lang}/` : `${SITE}/${lang}/${slug}`;
}
// relative href for internal links (cleanUrls on Vercel)
function href(lang, slug) {
  return slug === "" ? `/${lang}/` : `/${lang}/${slug}`;
}
// output file path for a page
function outFile(lang, slug) {
  return slug === "" ? `${lang}/index.html` : `${lang}/${slug}.html`;
}

const SIZES = "(max-width:840px) 100vw, 600px";
const HERO_SIZES = "100vw";

function picture(name, alt, { hero = false, sizes = SIZES, w = 1600, h = 900 } = {}) {
  const load = hero
    ? `loading="eager" fetchpriority="high" decoding="async"`
    : `loading="lazy" decoding="async"`;
  return `<picture>
<source type="image/webp" srcset="/assets/img/${name}-800.webp 800w, /assets/img/${name}-1600.webp 1600w" sizes="${sizes}">
<img src="/assets/img/${name}-1600.jpg" srcset="/assets/img/${name}-800.jpg 800w, /assets/img/${name}-1600.jpg 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${attr(alt)}" ${load}>
</picture>`;
}

function btn(lang, link, gold) {
  if (!link) return "";
  return `<a class="btn ${gold ? "btn-gold" : "btn-ghost"}" href="${href(lang, link.slug)}">${esc(link.label)}</a>`;
}

const RULE = `<div class="rule"><i></i></div>`;
const RULE_C = `<div class="rule center"><i></i></div>`;

/* ---------------- section renderers ---------------- */
function sectionHead(s, center) {
  const cls = center ? "section-head center" : "section-head";
  return `<div class="${cls}">
${s.eyebrow ? `<span class="eyebrow">${esc(s.eyebrow)}</span>` : ""}
${center ? RULE_C : RULE}
${s.title ? `<h2>${esc(s.title)}</h2>` : ""}
${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}
</div>`;
}

function renderSplit(lang, s) {
  const media = `<div class="split-media reveal d1">${picture(s.img, s.alt, { sizes: SIZES })}<span class="frame"></span></div>`;
  const text = `<div class="reveal">
${s.eyebrow ? `<span class="eyebrow">${esc(s.eyebrow)}</span>` : ""}
${RULE}
<h2>${esc(s.title)}</h2>
${s.body.map((p) => `<p>${esc(p)}</p>`).join("\n")}
${s.cta ? `<p style="margin-top:1.6rem">${btn(lang, s.cta, false)}</p>` : ""}
</div>`;
  const inner = s.reverse ? media + text : text + media;
  return `<section><div class="container"><div class="split${s.reverse ? " rev" : ""}">${inner}</div></div></section>`;
}

function renderCourses(lang, s) {
  const cards = s.items.map((c, i) => {
    const head = c.slug
      ? `<a href="${href(lang, c.slug)}"><h3>${esc(c.title)}</h3></a>`
      : `<h3>${esc(c.title)}</h3>`;
    return `<div class="course reveal d${(i % 3) + 1}">
${head}
<div class="who">${esc(c.who)}</div>
<ul>${c.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
${c.slug ? `<a class="btn btn-ghost" href="${href(lang, c.slug)}">${esc(content[lang].ui.lessons === "Lessons" || lang === "en" ? "Learn more" : "اعرف المزيد")}</a>` : ""}
</div>`;
  }).join("\n");
  return `<section class="cream-2"><div class="container">
${sectionHead(s, true)}
<div class="grid-3">${cards}</div>
</div></section>`;
}

function renderCards(lang, s) {
  const dark = s.dark ? " dark" : "";
  const cards = s.items.map((c, i) =>
    `<div class="card reveal d${(i % 3) + 1}">
<span class="num">${esc(c.num)}</span>
<h3>${esc(c.title)}</h3>
<p>${esc(c.text)}</p>
</div>`).join("\n");
  return `<section class="${s.dark ? "dark" : "cream-2"}"><div class="container">
${sectionHead(s, true)}
<div class="grid-3">${cards}</div>
</div></section>`;
}

function renderInstructorsTeaser(lang, s) {
  const items = s.items.map((m, i) =>
    `<div class="card reveal d${(i % 2) + 1}">
${picture(m.img, m.name, { sizes: SIZES, w: 1600, h: 900 })}
<h3 style="margin-top:1.2rem">${esc(m.name)}</h3>
<div class="who" style="font-family:var(--f-ui);text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;color:var(--gold-deep);margin:.3rem 0 .8rem">${esc(m.role)}</div>
<p>${esc(m.line)}</p>
</div>`).join("\n");
  return `<section><div class="container">
${sectionHead(s, true)}
<div class="grid-2">${items}</div>
${s.cta ? `<div class="center" style="margin-top:2.4rem">${btn(lang, s.cta, true)}</div>` : ""}
</div></section>`;
}

function renderInstructors(lang, s) {
  const items = s.items.map((m) =>
    `<div class="instructor reveal">
<div class="instructor-photo">${picture(m.img, m.alt || m.name, { sizes: "(max-width:680px) 80vw, 300px", w: 1600, h: 900 })}</div>
<div>
<h2>${esc(m.name)}</h2>
<div class="role">${esc(m.role)}</div>
${m.bio.map((p) => `<p>${esc(p)}</p>`).join("\n")}
</div>
</div>`).join("\n");
  return `<section><div class="container">
${sectionHead(s, false)}
<div>${items}</div>
</div></section>`;
}

function renderFaq(lang, s) {
  const items = s.items.map((f) =>
    `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("\n");
  return `<section><div class="container">
${sectionHead(s, true)}
<div class="faq reveal">${items}</div>
</div></section>`;
}

function renderCta(lang, s) {
  return `<section class="cta-band"><div class="container reveal">
<span class="eyebrow">${esc(content[lang].ui.bookTrial)}</span>
${RULE_C}
<h2>${esc(s.title)}</h2>
<p>${esc(s.text)}</p>
<div class="hero-cta">${btn(lang, s.primary, true)}${btn(lang, s.secondary, false)}</div>
</div></section>`;
}

function renderProse(lang, s) {
  return `<section><div class="container">
<div class="prose reveal">
${s.eyebrow ? `<span class="eyebrow">${esc(s.eyebrow)}</span>` : ""}
${RULE}
${s.title ? `<h2>${esc(s.title)}</h2>` : ""}
${s.html.map((p) => `<p>${esc(p)}</p>`).join("\n")}
</div>
</div></section>`;
}

function waLink(text) {
  const num = cfg.business.whatsapp;
  return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

function renderContact(lang) {
  const ui = content[lang].ui;
  const b = cfg.business;
  const addr = b.address;
  const fullAddr = `${addr.streetAddress[lang]}, ${addr.locality[lang]}, ${addr.country[lang]}`;
  const hoursLines = b.hours.map((h) => `${h.days.join(", ")}: ${h.open}–${h.close}`).join("<br>");

  const list = `<ul class="contact-list">
<li><span class="k">${esc(ui.callUs)}</span><a class="v" href="tel:${attr(b.phoneE164)}" dir="ltr">${esc(b.phoneDisplay)}</a></li>
<li><span class="k">${esc(ui.whatsapp)}</span><a class="v" href="${waLink("")}" target="_blank" rel="noopener" dir="ltr">${esc(b.phoneDisplay)}</a></li>
<li><span class="k">${esc(ui.email)}</span><a class="v" href="mailto:${attr(b.email)}" dir="ltr">${esc(b.email)}</a></li>
<li><span class="k">${esc(ui.location)}</span><span class="v">${esc(fullAddr)}</span></li>
<li><span class="k">${esc(ui.hours)}</span><span class="v" style="font-size:1.02rem;line-height:1.7" dir="ltr">${hoursLines}</span></li>
</ul>`;

  const opts = ui.interestOptions.map((o) => `<option>${esc(o)}</option>`).join("");
  const form = `<form class="enquiry" id="enquiry" action="mailto:${attr(b.email)}" method="post" enctype="text/plain">
<p class="lead" style="font-size:1.05rem;margin-bottom:1.4rem">${esc(ui.formIntro)}</p>
<div class="form-field"><label for="f-name">${esc(ui.formName)}</label><input id="f-name" name="name" type="text" required></div>
<div class="form-field"><label for="f-phone">${esc(ui.formPhone)}</label><input id="f-phone" name="phone" type="tel" required></div>
<div class="form-field"><label for="f-email">${esc(ui.formEmail)}</label><input id="f-email" name="email" type="email"></div>
<div class="form-field"><label for="f-interest">${esc(ui.formInterest)}</label><select id="f-interest" name="interest">${opts}</select></div>
<div class="form-field"><label for="f-msg">${esc(ui.formMessage)}</label><textarea id="f-msg" name="message" rows="4"></textarea></div>
<button class="btn btn-gold" type="submit">${esc(ui.formSend)}</button>
<p class="form-note">${esc(ui.whatsapp)} · <a href="${waLink("")}" target="_blank" rel="noopener" style="color:var(--gold-deep)">${esc(b.phoneDisplay)}</a></p>
</form>`;

  const map = b.mapEmbed
    ? `<div style="margin-top:2.4rem;border:1px solid var(--line-soft)"><iframe src="${attr(b.mapEmbed)}" width="100%" height="320" style="border:0;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${attr(cfg.brandName[lang])}"></iframe></div>`
    : "";

  return `<section><div class="container">
<div class="contact-grid">
<div class="reveal">${list}${map}</div>
<div class="reveal d1">${form}</div>
</div>
</div></section>
<script>
(function(){
  var f=document.getElementById('enquiry');if(!f)return;
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var g=function(n){var el=f.querySelector('[name="'+n+'"]');return el?el.value:'';};
    var L=${JSON.stringify(lang)};
    var lbl=L==='ar'
      ?{n:'الاسم',p:'الهاتف',e:'البريد',i:'مهتم بـ',m:'الرسالة',intro:'مرحباً، أرغب بحجز درس تجريبي في أكاديمية آريا.'}
      :{n:'Name',p:'Phone',e:'Email',i:'Interested in',m:'Message',intro:'Hello, I would like to book a trial lesson at Aria Music Academy.'};
    var t=lbl.intro+'\\n\\n'+lbl.n+': '+g('name')+'\\n'+lbl.p+': '+g('phone')+'\\n'+lbl.e+': '+g('email')+'\\n'+lbl.i+': '+g('interest')+'\\n'+lbl.m+': '+g('message');
    window.open(${JSON.stringify(waLink(""))}.split('?')[0]+'?text='+encodeURIComponent(t),'_blank');
  });
})();
</script>`;
}

function renderSection(lang, s) {
  switch (s.type) {
    case "split": return renderSplit(lang, s);
    case "courses": return renderCourses(lang, s);
    case "cards": return renderCards(lang, s);
    case "instructorsTeaser": return renderInstructorsTeaser(lang, s);
    case "instructors": return renderInstructors(lang, s);
    case "faq": return renderFaq(lang, s);
    case "cta": return renderCta(lang, s);
    case "prose": return renderProse(lang, s);
    case "contact": return renderContact(lang);
    default: return `<!-- unknown section: ${s.type} -->`;
  }
}

/* ---------------- chrome: header / footer / hero ---------------- */
function header(lang, slug) {
  const t = content[lang];
  const other = lang === "en" ? "ar" : "en";
  const navLinks = cfg.nav.map((sl) => {
    const cur = sl === slug ? ` aria-current="page"` : "";
    return `<a href="${href(lang, sl)}"${cur}>${esc(t.nav[sl])}</a>`;
  }).join("");
  return `<header class="site-head"><div class="container head-inner">
<a class="brand" href="${href(lang, "")}" aria-label="${attr(cfg.brandName[lang])}"><img src="/assets/logo/aria-gold.png" srcset="/assets/logo/aria-gold@2x.png 2x" width="111" height="42" alt="${attr(cfg.brandName[lang])}"></a>
<nav class="nav" aria-label="Primary">${navLinks}</nav>
<div class="head-actions">
<a class="lang-switch" href="${href(other, slug)}" hreflang="${other}" lang="${other}">${esc(t.ui.langLabel)}</a>
<button class="nav-toggle" type="button" aria-label="${attr(t.ui.menu)}" aria-expanded="false"><span></span><span></span><span></span></button>
</div>
</div></header>`;
}

const IG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .47 1.4.9.43.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.47 1-.9 1.4-.4.43-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.47-1.4-.9-.43-.4-.7-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.47-1 .9-1.4.4-.43.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.23-2.1.39-.5.2-.9.43-1.3.83-.4.4-.64.8-.83 1.3-.16.4-.34 1-.39 2.1C2.6 9.7 2.6 10.1 2.6 12s0 2.3.07 3.5c.05 1.1.23 1.7.39 2.1.2.5.43.9.83 1.3.4.4.8.64 1.3.83.4.16 1 .34 2.1.39 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.23 2.1-.39.5-.2.9-.43 1.3-.83.4-.4.64-.8.83-1.3.16-.4.34-1 .39-2.1.07-1.2.07-1.6.07-3.5s0-2.3-.07-3.5c-.05-1.1-.23-1.7-.39-2.1-.2-.5-.43-.9-.83-1.3-.4-.4-.8-.64-1.3-.83-.4-.16-1-.34-2.1-.39C15.5 4 15.1 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 8.14A3.2 3.2 0 1 0 8.8 12 3.2 3.2 0 0 0 12 15.2Zm6.3-8.34a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z"/></svg>`;
const FB = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5h2.2V5.3C15.8 5.2 14.8 5 13.6 5c-2.4 0-4 1.5-4 4.2v2.3H6.7v3.2h2.9V22h3.5v-7.3h2.8l.5-3.2h-3.3V9.5c0-.7.3-1 1.4-1Z"/></svg>`;
const YT = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.5 31 31 0 0 0-.4-4.5ZM9.8 15.3V8.7l5.7 3.3Z"/></svg>`;
const WA = `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.5.7 4.8 1.9 6.8L3 29l6.7-2.1c1.9 1 4 1.6 6.3 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3Zm0 23.1c-2 0-3.9-.5-5.5-1.5l-.4-.2-4 1.2 1.3-3.9-.3-.4a10.3 10.3 0 0 1-1.6-5.6C5.5 10 10.2 5.3 16 5.3S26.5 10 26.5 15.7 21.8 26.1 16 26.1Zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" fill="#fff"/></svg>`;

function footer(lang) {
  const t = content[lang];
  const b = cfg.business;
  const lessons = ["piano-lessons", "vocal-lessons", "kids-music"];
  const explore = ["instructors", "about", "contact"];
  const link = (sl) => `<li><a href="${href(lang, sl)}">${esc(t.nav[sl])}</a></li>`;

  const socials = [];
  if (cfg.social.instagram) socials.push(`<a href="${attr(cfg.social.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${IG}</a>`);
  if (cfg.social.facebook) socials.push(`<a href="${attr(cfg.social.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${FB}</a>`);
  if (cfg.social.youtube) socials.push(`<a href="${attr(cfg.social.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${YT}</a>`);

  const year = new Date().getFullYear();
  return `<footer class="site-foot"><div class="container">
<div class="foot-grid">
<div class="foot-brand">
<img src="/assets/logo/aria-gold.png" srcset="/assets/logo/aria-gold@2x.png 2x" width="121" height="46" alt="${attr(cfg.brandName[lang])}">
<p>${esc(t.ui.builtNote)}</p>
${socials.length ? `<div class="foot-social" style="margin-top:1.2rem">${socials.join("")}</div>` : ""}
</div>
<div><h4>${esc(t.ui.lessons)}</h4><ul class="foot-links">${lessons.map(link).join("")}</ul></div>
<div><h4>${esc(t.ui.quickLinks)}</h4><ul class="foot-links">${explore.map(link).join("")}</ul></div>
<div><h4>${esc(t.ui.callUs)}</h4><ul class="foot-links">
<li><a href="tel:${attr(b.phoneE164)}" dir="ltr">${esc(b.phoneDisplay)}</a></li>
<li><a href="mailto:${attr(b.email)}" dir="ltr">${esc(b.email)}</a></li>
<li><a href="${waLink("")}" target="_blank" rel="noopener">${esc(t.ui.whatsapp)}</a></li>
</ul></div>
</div>
<div class="foot-bottom">
<span>© ${year} ${esc(cfg.brandName[lang])}. ${esc(t.ui.rightsReserved)}</span>
<span dir="ltr">${esc(b.address.locality[lang])} · ${esc(b.address.country[lang])}</span>
</div>
</div></footer>
<a class="wa-float" href="${waLink("")}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA}</a>`;
}

function heroBlock(lang, page) {
  const h = page.hero;
  const stats = h.stats.map((s) =>
    `<div><b>${esc(s.n)}</b><span>${esc(s.label)}</span></div>`).join("");
  return `<section class="hero">
<div class="hero-media">${picture(h.img, h.alt, { hero: true, sizes: HERO_SIZES })}</div>
<div class="hero-grain"></div>
<div class="container"><div class="hero-inner">
<span class="eyebrow">${esc(h.eyebrow)}</span>
<h1>${esc(h.h1)}</h1>
<p class="lede">${esc(h.lede)}</p>
<div class="hero-cta">${btn(lang, h.primary, true)}${btn(lang, h.secondary, false)}</div>
<div class="stats">${stats}</div>
</div></div>
</section>`;
}

function pageTop(lang, page) {
  const t = content[lang];
  const crumb = `<nav class="crumbs" aria-label="Breadcrumb"><a href="${href(lang, "")}">${esc(t.ui.breadcrumbHome)}</a><span>›</span>${esc(t.nav[page.slug])}</nav>`;
  return `<section class="page-top"><div class="container">
${crumb}
<span class="eyebrow" style="margin-top:1.2rem">${esc(t.nav[page.slug])}</span>
<h1>${esc(page.h1)}</h1>
${page.lede ? `<p class="lede">${esc(page.lede)}</p>` : ""}
</div></section>`;
}

/* ---------------- JSON-LD ---------------- */
function schoolNode(lang) {
  const b = cfg.business;
  const a = b.address;
  const sameAs = Object.values(cfg.social).filter(Boolean);
  const node = {
    "@type": "MusicSchool",
    "@id": `${SITE}/#school`,
    name: cfg.brandName[lang],
    url: `${SITE}/${lang}/`,
    image: `${SITE}/assets/img/og-default.jpg`,
    logo: `${SITE}/assets/logo/aria-gold.png`,
    telephone: b.phoneE164,
    email: b.email,
    priceRange: b.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.streetAddress[lang],
      addressLocality: a.locality[lang],
      addressRegion: a.region[lang],
      addressCountry: a.countryCode
    },
    geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng },
    areaServed: { "@type": "Country", name: a.country[lang] },
    openingHoursSpecification: b.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => ({
        Sa: "Saturday", Su: "Sunday", Mo: "Monday", Tu: "Tuesday",
        We: "Wednesday", Th: "Thursday", Fr: "Friday"
      }[d])),
      opens: h.open, closes: h.close
    }))
  };
  if (b.foundingYear) node.foundingDate = b.foundingYear;
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

function buildGraph(lang, page) {
  const t = content[lang];
  const url = pageUrl(lang, page.slug);
  const graph = [];

  graph.push({
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: `${SITE}/${lang}/`,
    name: cfg.brandName[lang],
    inLanguage: lang,
    publisher: { "@id": `${SITE}/#school` }
  });
  graph.push(schoolNode(lang));

  graph.push({
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#school` },
    primaryImageOfPage: `${SITE}/assets/img/og-default.jpg`
  });

  // breadcrumb
  const crumbs = [{ name: t.ui.breadcrumbHome, item: `${SITE}/${lang}/` }];
  if (page.slug !== "") crumbs.push({ name: t.nav[page.slug], item: url });
  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem", position: i + 1, name: c.name, item: c.item
    }))
  });

  // course
  if (page.schema && page.schema.course) {
    graph.push({
      "@type": "Course",
      name: page.schema.course.name,
      description: page.schema.course.description,
      inLanguage: lang,
      provider: { "@id": `${SITE}/#school` },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        location: { "@id": `${SITE}/#school` }
      }
    });
  }

  // persons (instructors)
  if (page.schema && page.schema.persons) {
    const sec = page.sections.find((s) => s.type === "instructors");
    if (sec) sec.items.forEach((m) => {
      graph.push({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        worksFor: { "@id": `${SITE}/#school` },
        description: m.bio[0]
      });
    });
  }

  // FAQ
  const faqSecs = page.sections.filter((s) => s.type === "faq");
  if (faqSecs.length) {
    const items = [].concat(...faqSecs.map((s) => s.items));
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

/* ---------------- fonts ---------------- */
function fontLinks(lang) {
  const common = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;
  const en = `<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500&display=swap" rel="stylesheet">`;
  const ar = `<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">`;
  return common + (lang === "ar" ? ar + en : en + ar);
}

/* ---------------- head ---------------- */
function head(lang, page) {
  const t = content[lang];
  const url = pageUrl(lang, page.slug);
  const og = `${SITE}/assets/img/og-default.jpg`;

  // hreflang alternates
  const alts = LANGS.map((L) =>
    `<link rel="alternate" hreflang="${L}" href="${pageUrl(L, page.slug)}">`).join("\n");
  const xdefault = `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT, page.slug)}">`;

  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${attr(page.description)}">
<link rel="canonical" href="${url}">
${alts}
${xdefault}
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(cfg.brandName[lang])}">
<meta property="og:locale" content="${lang === "ar" ? "ar_KW" : "en_US"}">
<meta property="og:title" content="${attr(page.title)}">
<meta property="og:description" content="${attr(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(page.title)}">
<meta name="twitter:description" content="${attr(page.description)}">
<meta name="twitter:image" content="${og}">
<meta name="theme-color" content="#2e1430">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="/assets/logo/icon-192.png" sizes="192x192">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${fontLinks(lang)}
<link rel="stylesheet" href="/assets/styles.css">
<script type="application/ld+json">${buildGraph(lang, page)}</script>
</head>`;
}

/* ---------------- assemble a page ---------------- */
function renderPage(lang, key) {
  const t = content[lang];
  const page = t.pages[key];
  const top = page.kind === "home" ? heroBlock(lang, page) : pageTop(lang, page);
  const body = page.sections.map((s) => renderSection(lang, s)).join("\n");

  return `${head(lang, page)}
<body>
<a href="#main" class="btn btn-ghost" style="position:absolute;left:-9999px;top:0">${esc(t.ui.skip)}</a>
${header(lang, page.slug)}
<main id="main">
${top}
${body}
</main>
${footer(lang)}
<script src="/assets/main.js" defer></script>
</body>
</html>`;
}

/* ---------------- root redirect page ---------------- */
function rootIndex() {
  const altsAll = [];
  // home alternates for each lang + x-default
  LANGS.forEach((L) => altsAll.push(`<link rel="alternate" hreflang="${L}" href="${pageUrl(L, "")}">`));
  altsAll.push(`<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT, "")}">`);
  return `<!doctype html>
<html lang="${DEFAULT}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(cfg.brandName.en)} | ${esc(cfg.brandName.ar)}</title>
<meta name="description" content="${attr(content.en.pages.home.description)}">
<link rel="canonical" href="${pageUrl(DEFAULT, "")}">
${altsAll.join("\n")}
<link rel="icon" href="/favicon.ico" sizes="any">
<meta http-equiv="refresh" content="0; url=/${DEFAULT}/">
<script>var l=(navigator.language||"en").toLowerCase().indexOf("ar")===0?"ar":"en";location.replace("/"+l+"/");</script>
</head>
<body style="font-family:Georgia,serif;background:#2e1430;color:#f5f0e7;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0">
<p>Aria Music Academy — <a href="/en/" style="color:#e6c878">English</a> · <a href="/ar/" style="color:#e6c878">العربية</a></p>
</body>
</html>`;
}

/* ---------------- sitemap / robots / manifest / vercel ---------------- */
function sitemap() {
  const keys = Object.keys(content.en.pages);
  const urls = [];
  keys.forEach((key) => {
    LANGS.forEach((lang) => {
      const slug = content[lang].pages[key].slug;
      const loc = pageUrl(lang, slug);
      const alts = LANGS.map((L) =>
        `    <xhtml:link rel="alternate" hreflang="${L}" href="${pageUrl(L, content[L].pages[key].slug)}"/>`).join("\n");
      const xd = `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT, content[DEFAULT].pages[key].slug)}"/>`;
      urls.push(`  <url>
    <loc>${loc}</loc>
${alts}
${xd}
    <changefreq>monthly</changefreq>
    <priority>${slug === "" ? "1.0" : "0.8"}</priority>
  </url>`);
    });
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml`;
}

function webmanifest() {
  return JSON.stringify({
    name: cfg.brandName.en,
    short_name: "Aria",
    description: content.en.pages.home.description,
    start_url: `/${DEFAULT}/`,
    display: "standalone",
    background_color: "#2e1430",
    theme_color: "#2e1430",
    lang: DEFAULT,
    icons: [
      { src: "/assets/logo/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }
    ]
  }, null, 2);
}

function vercelJson() {
  return JSON.stringify({
    buildCommand: "node build.js",
    outputDirectory: "dist",
    framework: null,
    cleanUrls: true,
    trailingSlash: false,
    redirects: [
      { source: "/", destination: "/en/", permanent: false }
    ],
    headers: [
      {
        source: "/assets/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      },
      {
        source: "/(.*)",
        headers: [{ key: "X-Content-Type-Options", value: "nosniff" }]
      }
    ]
  }, null, 2);
}

/* ---------------- run ---------------- */
function build() {
  // copy static src assets
  ensureDir(path.join(DIST, "assets"));
  fs.copyFileSync(path.join(ROOT, "src/styles.css"), path.join(DIST, "assets/styles.css"));
  fs.copyFileSync(path.join(ROOT, "src/main.js"), path.join(DIST, "assets/main.js"));

  const keys = Object.keys(content.en.pages);
  let count = 0;
  LANGS.forEach((lang) => {
    keys.forEach((key) => {
      const slug = content[lang].pages[key].slug;
      write(outFile(lang, slug), renderPage(lang, key));
      count++;
    });
  });

  write("index.html", rootIndex());
  write("sitemap.xml", sitemap());
  write("robots.txt", robots());
  write("site.webmanifest", webmanifest());
  // vercel.json must sit at the REPO ROOT (Vercel reads it from there, not from the output dir)
  fs.writeFileSync(path.join(ROOT, "vercel.json"), vercelJson());

  console.log(`✓ Built ${count} pages (${LANGS.join(", ")}) + root + sitemap/robots/manifest/vercel.json`);
  console.log(`  Output: ${DIST}`);
}

build();
