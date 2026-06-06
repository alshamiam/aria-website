/* ============================================================
   ARIA MUSIC ACADEMY — site config
   👉 EDIT THE PLACEHOLDERS BELOW (marked ⚠) WITH REAL DETAILS,
      then re-run:  node build.js
   ============================================================ */
module.exports = {
  // ⚠ Your final domain (used for canonical URLs, hreflang, sitemap, OG).
  siteUrl: "https://ariamusicacademy.com",

  defaultLang: "en",
  langs: ["en", "ar"],

  brandName: { en: "Aria Music Academy", ar: "أكاديمية آريا للموسيقى" },

  // ⚠ Real contact details
  business: {
    phoneDisplay: "+965 0000 0000",        // ⚠
    phoneE164: "+9650000000",              // ⚠ used for tel: + WhatsApp link
    whatsapp: "9650000000",                // ⚠ digits only, no +
    email: "hello@ariamusicacademy.com",   // ⚠
    // ⚠ Real address. addressLocality e.g. an area name in Kuwait.
    address: {
      streetAddress: { en: "Building 00, Street 00, Block 0", ar: "مبنى ٠٠، شارع ٠٠، قطعة ٠" },
      locality:      { en: "Kuwait City", ar: "مدينة الكويت" },
      region:        { en: "Capital Governorate", ar: "محافظة العاصمة" },
      country:       { en: "Kuwait", ar: "الكويت" },
      countryCode: "KW"
    },
    geo: { lat: 29.3759, lng: 47.9774 },   // ⚠ exact lat/lng of the academy
    // ⚠ paste the "embed" src from Google Maps (Share → Embed a map → copy the src URL)
    mapEmbed: "",
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
