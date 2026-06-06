/* ============================================================
   ARIA MUSIC ACADEMY — site config
   👉 EDIT THE PLACEHOLDERS BELOW (marked ⚠) WITH REAL DETAILS,
      then re-run:  node build.js
   ============================================================ */
module.exports = {
  // ⚠ Your final domain (used for canonical URLs, hreflang, sitemap, OG).
  siteUrl: "https://ariamusicacademy.org",

  defaultLang: "en",
  langs: ["en", "ar"],

  brandName: { en: "Aria Music Academy", ar: "أكاديمية آريا للموسيقى" },

  // ⚠ Real contact details
  business: {
    phoneDisplay: "+965 0000 0000",        // ⚠
    phoneE164: "+9650000000",              // ⚠ used for tel: + WhatsApp link
    whatsapp: "9650000000",                // ⚠ digits only, no +
    email: "info@ariamusicacademy.org",   // ⚠
    // ⚠ Real address. addressLocality e.g. an area name in Kuwait.
    address: {
      streetAddress: { en: "Al Thuraya Mall, Salem Al Mubarak Street", ar: "مجمع الثريا، شارع سالم المبارك" },
      locality:      { en: "Salmiya", ar: "السالمية" },
      region:        { en: "Hawalli Governorate", ar: "محافظة حولي" },
      country:       { en: "Kuwait", ar: "الكويت" },
      countryCode: "KW"
    },
    geo: { lat: 29.3359, lng: 48.0709 },   // Salem Al Mubarak St, Salmiya (approx — fine-tune if needed)
    // Keyless Google Maps embed pointing at the mall by name
    mapEmbed: "https://www.google.com/maps?q=Al+Thuraya+Mall+Salmiya+Kuwait&output=embed",
    priceRange: "$$",
    // hours: day=>"HH:MM-HH:MM" (24h). Adjust to real opening hours.
    hours: [
      { days: ["Sa","Su","Mo","Tu","We","Th"], open: "10:00", close: "21:00" },
      { days: ["Fr"], open: "16:00", close: "21:00" }
    ],
    foundingYear: "2025"                   // ⚠ check
  },

  // ⚠ Real social profiles (remove any you don't use). sameAs improves entity SEO.
  social: {
    instagram: "https://instagram.com/ariamusicacademy",
    facebook: "",
    youtube: "",
    tiktok: ""
  },

  // Navigation order (slugs map to pages defined in content)
  nav: ["piano-lessons", "vocal-lessons", "kids-music", "instructors", "about", "contact"]
};
