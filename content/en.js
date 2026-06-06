/* ARIA — English content. Edit freely; re-run `node build.js`. */
module.exports = {
  dir: "ltr",
  // UI strings
  ui: {
    skip: "Skip to content",
    home: "Home",
    menu: "Menu",
    langLabel: "العربية",
    bookTrial: "Book a Trial Lesson",
    callUs: "Call us",
    whatsapp: "WhatsApp",
    email: "Email",
    location: "Location",
    hours: "Opening hours",
    follow: "Follow",
    quickLinks: "Explore",
    lessons: "Lessons",
    rightsReserved: "All rights reserved.",
    builtNote: "Piano & vocal lessons in Kuwait.",
    breadcrumbHome: "Home",
    formName: "Full name",
    formPhone: "Phone / WhatsApp",
    formEmail: "Email",
    formInterest: "I'm interested in",
    formMessage: "Message",
    formSend: "Send enquiry",
    formIntro: "Tell us a little about the student and what you'd like to learn — we'll reply with availability and the next steps.",
    interestOptions: ["Piano lessons", "Vocal / singing lessons", "Lessons for my child", "Adult beginner", "Not sure yet"]
  },

  nav: {
    "piano-lessons": "Piano",
    "vocal-lessons": "Vocal",
    "kids-music": "Kids",
    "instructors": "Founders",
    "about": "About",
    "contact": "Contact"
  },

  pages: {

    /* ---------------- HOME ---------------- */
    home: {
      slug: "",
      kind: "home",
      title: "Aria Music Academy | Piano & Vocal Lessons in Kuwait",
      description: "Aria Music Academy offers refined piano and vocal lessons in Kuwait for children and adults — taught one-to-one by a concert pianist and a vocal coach in an elegant, purpose-built studio.",
      hero: {
        eyebrow: "Piano & Vocal Lessons · Kuwait",
        h1: "Where Kuwait Learns to Play.",
        lede: "A boutique music academy founded by two performers — offering personalised piano and vocal lessons for every age, in a space designed for music.",
        img: "lounge-reception",
        alt: "Elegant aubergine-and-marble reception lounge at Aria Music Academy in Kuwait",
        primary: { label: "Book a Trial Lesson", slug: "contact" },
        secondary: { label: "Explore Lessons", slug: "piano-lessons" },
        stats: [
          { n: "1-to-1", label: "Private Tuition" },
          { n: "Ages 5+", label: "Children & Adults" },
          { n: "EN · AR", label: "Bilingual Teaching" }
        ]
      },
      sections: [
        {
          type: "split", reveal: true,
          eyebrow: "Welcome to Aria",
          title: "A conservatory feel, in the heart of Kuwait.",
          body: [
            "Aria Music Academy was created by two musicians who believe technique and artistry should be taught together. Whether you dream of playing your first piece on the piano or singing with confidence, every lesson is built around you — your goals, your pace, your voice.",
            "Our studio is a calm, beautiful place to learn: practice rooms named after the great composers, a concert-quality grand piano, and an atmosphere that takes music seriously."
          ],
          img: "reception-rooms",
          alt: "Reception and composer-named practice rooms with a grand piano",
          cta: { label: "About the Academy", slug: "about" }
        },
        {
          type: "courses",
          eyebrow: "What We Teach",
          title: "Lessons for every stage.",
          lead: "Start from scratch or refine a craft you already love. Each programme is private and fully tailored.",
          items: [
            { title: "Piano Lessons", who: "Beginner → Advanced", slug: "piano-lessons",
              points: ["Classical foundations & technique", "Read music and play by ear", "Recital & exam preparation", "Children and adults welcome"] },
            { title: "Vocal & Singing", who: "All levels", slug: "vocal-lessons",
              points: ["Healthy, sustainable vocal technique", "Breath, pitch & stage confidence", "Sing and accompany yourself on piano", "Performance & audition coaching"] },
            { title: "Music for Kids", who: "Ages 5+", slug: "kids-music",
              points: ["Playful, structured first lessons", "Builds focus, memory & confidence", "Friendly progress milestones", "Parents kept in the loop"] }
          ]
        },
        {
          type: "cards", dark: true,
          eyebrow: "Why Aria",
          title: "Refined teaching, real results.",
          items: [
            { num: "01", title: "Taught by performers", text: "Your teachers are an internationally-recognised concert pianist and an experienced vocal coach — not part-timers. You learn from people who perform." },
            { num: "02", title: "Truly personalised", text: "Every student gets an individual learning plan shaped to their age, level and ambition. No two lessons are copied from a template." },
            { num: "03", title: "A space built for music", text: "Acoustically considered practice rooms, a fine grand piano and a quiet, elegant setting that makes practice something to look forward to." }
          ]
        },
        {
          type: "instructorsTeaser",
          eyebrow: "The Founders",
          title: "Two artists, one academy.",
          items: [
            { name: "Nilufar Jafarli", role: "Co-Founder · Artistic Director", line: "Concert pianist, Baku Music Academy (BMus & MMus), international prize-winner.", img: "grand-piano-room" },
            { name: "Chaimaa Chaarani", role: "Co-Founder · Executive Director", line: "Vocal coach & educator, American University of Beirut — 9+ years teaching all ages.", img: "piano-lounge" }
          ],
          cta: { label: "Meet the founders", slug: "instructors" }
        },
        {
          type: "faq",
          eyebrow: "Good to Know",
          title: "Frequently asked questions",
          items: [
            { q: "Do I need any experience to start?", a: "Not at all. Most of our students begin as complete beginners — children and adults alike. We start exactly where you are." },
            { q: "How old does my child need to be?", a: "We generally start children from around age five, when they can focus comfortably for a short lesson. We'll happily advise based on a quick chat." },
            { q: "Are lessons in Arabic or English?", a: "Both. Our teaching is fully bilingual, so lessons run comfortably in Arabic or English depending on what suits the student." },
            { q: "Can I book a trial before committing?", a: "Yes. A trial lesson is the best way to meet your teacher and see the studio. Get in touch and we'll arrange a time." }
          ]
        },
        {
          type: "cta",
          title: "Begin your music journey.",
          text: "Book a trial lesson and discover what learning music at Aria feels like.",
          primary: { label: "Book a Trial Lesson", slug: "contact" },
          secondary: { label: "View Piano Lessons", slug: "piano-lessons" }
        }
      ],
      schema: { extraWebPage: true }
    },

    /* ---------------- PIANO ---------------- */
    "piano-lessons": {
      slug: "piano-lessons",
      kind: "interior",
      title: "Piano Lessons in Kuwait | Beginner to Advanced — Aria Music Academy",
      description: "Private piano lessons in Kuwait for children and adults, from first notes to advanced repertoire. Learn from a concert pianist at Aria Music Academy. Book a trial lesson.",
      h1: "Piano Lessons in Kuwait",
      lede: "Private, one-to-one piano tuition for every age and level — guided by an internationally-trained concert pianist.",
      heroImg: "grand-piano-room",
      sections: [
        {
          type: "prose",
          eyebrow: "The Programme",
          title: "From your first note to the concert stage.",
          html: [
            "At Aria Music Academy, piano lessons are built on solid classical foundations — posture, technique, reading music and a genuine understanding of the instrument — while keeping every lesson musical and enjoyable. Whether you are a child touching the keys for the first time or an adult returning to a long-held dream, your teacher meets you where you are.",
            "Lessons are private and one-to-one, so the pace, repertoire and goals are entirely yours. Many students work toward recitals and graded examinations; others simply want to play the music they love. Both are welcome here."
          ]
        },
        {
          type: "courses",
          title: "What you'll develop.",
          lead: "A complete musician — not just someone who can press the right keys.",
          items: [
            { title: "Technique & Foundations", who: "Every lesson",
              points: ["Hand position, posture & control", "Scales, arpeggios & finger independence", "Reading notation fluently", "Rhythm, dynamics & expression"] },
            { title: "Repertoire & Musicianship", who: "Growing with you",
              points: ["Classical & contemporary pieces", "Playing by ear & sight-reading", "Memorisation & interpretation", "Music theory woven into practice"] },
            { title: "Performance & Exams", who: "Optional pathway",
              points: ["Recital & stage preparation", "Graded exam coaching", "Competition repertoire", "Confidence under pressure"] }
          ]
        },
        {
          type: "split", reverse: true,
          eyebrow: "For Adults",
          title: "It is never too late to begin.",
          body: [
            "Some of our most rewarding students are adults — beginners, returners, and busy professionals who finally make time for the instrument they always wanted to play.",
            "Lessons are relaxed, judgement-free and scheduled around your week. You set the goal; we build the path."
          ],
          img: "grand-piano-art",
          alt: "Grand piano beneath orchestral artwork in an Aria Music Academy studio",
          cta: { label: "Book a Trial Lesson", slug: "contact" }
        },
        {
          type: "faq",
          title: "Piano lesson questions",
          items: [
            { q: "How long is each piano lesson?", a: "Lessons are typically 30, 45 or 60 minutes depending on age and level. We'll recommend the right length when you enquire." },
            { q: "Do I need a piano at home?", a: "To make progress you'll want to practise between lessons, so a piano or a weighted digital keyboard at home is strongly recommended. We're glad to advise on what to buy." },
            { q: "Do you prepare students for exams?", a: "Yes. If you'd like a recognised pathway, we coach toward graded examinations and recital performances — but exams are always optional." },
            { q: "Can adults take piano lessons too?", a: "Absolutely. We teach adult beginners and returning players regularly, with repertoire and pacing chosen to suit you." }
          ]
        },
        {
          type: "cta",
          title: "Sit down at the piano.",
          text: "Book a trial piano lesson and feel the difference of learning from a performer.",
          primary: { label: "Book a Trial Lesson", slug: "contact" },
          secondary: { label: "Meet the Founders", slug: "instructors" }
        }
      ],
      schema: {
        course: {
          name: "Piano Lessons",
          description: "Private one-to-one piano lessons in Kuwait for children and adults, from beginner foundations to advanced repertoire, recitals and graded exams."
        }
      }
    },

    /* ---------------- VOCAL ---------------- */
    "vocal-lessons": {
      slug: "vocal-lessons",
      kind: "interior",
      title: "Vocal & Singing Lessons in Kuwait | Aria Music Academy",
      description: "Private singing and vocal lessons in Kuwait for all levels. Build healthy technique, confidence and stage presence — and learn to accompany yourself on piano. Book a trial.",
      h1: "Vocal & Singing Lessons in Kuwait",
      lede: "Find your voice — and the confidence to use it. Private vocal coaching for beginners through performers.",
      heroImg: "piano-lounge",
      sections: [
        {
          type: "prose",
          eyebrow: "The Programme",
          title: "Healthy technique, honest expression.",
          html: [
            "Singing well is a skill anyone can build with the right guidance. Our vocal lessons focus first on a healthy, sustainable technique — breath support, pitch, tone and freedom from strain — so your voice grows stronger over time rather than tiring.",
            "From there we develop musicality and stage confidence: phrasing, interpretation, microphone and performance presence, and the ability to perform without nerves getting in the way. A signature of our teaching is vocal-piano — learning to accompany yourself at the keyboard while you sing."
          ]
        },
        {
          type: "courses",
          title: "What we work on.",
          lead: "Technique, artistry and confidence, in balance.",
          items: [
            { title: "Voice & Technique", who: "Every lesson",
              points: ["Breathing & breath support", "Pitch, range & tone", "Healthy, strain-free production", "Warm-ups you can use daily"] },
            { title: "Musicianship", who: "Growing with you",
              points: ["Phrasing & interpretation", "Ear training & harmony", "Vocal-piano: accompany yourself", "Repertoire you connect with"] },
            { title: "Performance", who: "Optional pathway",
              points: ["Stage & microphone confidence", "Audition & recital preparation", "Overcoming performance nerves", "Recording-ready delivery"] }
          ]
        },
        {
          type: "split", reverse: true,
          eyebrow: "Vocal-Piano",
          title: "Sing — and play for yourself.",
          body: [
            "Few skills are as freeing for a singer as being able to sit at the piano and accompany yourself. It deepens your musicianship, sharpens your ear, and means you never need to wait for anyone else to make music.",
            "Led by a vocal coach who specialises in vocal-piano, this is one of the things that makes learning at Aria distinctive."
          ],
          img: "grand-piano-art",
          alt: "Grand piano in an elegant studio at Aria Music Academy",
          cta: { label: "Book a Trial Lesson", slug: "contact" }
        },
        {
          type: "faq",
          title: "Singing lesson questions",
          items: [
            { q: "I'm shy about my voice — is that okay?", a: "Completely. Most beginners feel that way. Lessons are private and supportive, and confidence is one of the first things that grows." },
            { q: "What age can vocal lessons start?", a: "We teach vocal students of many ages. For younger children we keep technique gentle and age-appropriate; we're happy to advise on the right time to start." },
            { q: "Do you teach in different styles?", a: "Yes — the underlying healthy technique supports classical, musical-theatre and contemporary singing. We shape repertoire around what you love." },
            { q: "Do I need to read music to sing?", a: "No. We build musicianship and ear training as we go, so you can begin straight away and grow from there." }
          ]
        },
        {
          type: "cta",
          title: "Let's hear your voice.",
          text: "Book a trial vocal lesson and start building a voice you trust.",
          primary: { label: "Book a Trial Lesson", slug: "contact" },
          secondary: { label: "Meet the Founders", slug: "instructors" }
        }
      ],
      schema: {
        course: {
          name: "Vocal & Singing Lessons",
          description: "Private singing and vocal lessons in Kuwait for all levels — healthy vocal technique, musicianship, stage confidence and vocal-piano (accompanying yourself while singing)."
        }
      }
    },

    /* ---------------- KIDS ---------------- */
    "kids-music": {
      slug: "kids-music",
      kind: "interior",
      title: "Music Lessons for Kids in Kuwait | Piano & Singing — Aria Music Academy",
      description: "Music lessons for children in Kuwait — piano and singing from age five. Playful, structured and confidence-building, taught by professional musicians. Book a trial lesson.",
      h1: "Music Lessons for Kids in Kuwait",
      lede: "Where children fall in love with music — structured, playful lessons that build skill and confidence from age five.",
      heroImg: "piano-lounge",
      sections: [
        {
          type: "prose",
          eyebrow: "For Young Musicians",
          title: "More than music — a foundation for life.",
          html: [
            "Learning an instrument gives children far more than a skill. It builds focus, patience, memory and self-discipline, and it gives them a deep, lasting source of confidence and joy. At Aria, children's lessons are carefully structured yet genuinely fun, so progress feels like play.",
            "We teach piano and singing to children from around age five. Each child follows their own learning plan with clear, encouraging milestones — and parents are always kept in the loop on how their child is getting on."
          ]
        },
        {
          type: "cards", dark: true,
          eyebrow: "How Children Grow Here",
          title: "Skill, confidence, character.",
          items: [
            { num: "01", title: "Patient, expert teachers", text: "Our founders have guided many young students — some to higher musical study. Children are met with warmth, structure and high standards." },
            { num: "02", title: "Milestones they can feel", text: "Small, achievable goals and the occasional recital give children a real sense of pride and momentum." },
            { num: "03", title: "Parents in the loop", text: "You'll know what your child is learning, how practice is going, and how to support them at home." }
          ]
        },
        {
          type: "split", reverse: true,
          eyebrow: "First Lessons",
          title: "A gentle, joyful start.",
          body: [
            "Early lessons blend playful exploration with the first real building blocks — rhythm, listening, simple notes and good habits at the instrument. The goal is a child who looks forward to their lesson and wants to practise.",
            "As they grow, we add structure and repertoire at exactly the right pace, never rushing and never holding them back."
          ],
          img: "reception-rooms",
          alt: "Bright, elegant practice rooms suitable for children's music lessons",
          cta: { label: "Book a Trial Lesson", slug: "contact" }
        },
        {
          type: "faq",
          title: "Questions from parents",
          items: [
            { q: "What's the right age to start?", a: "Around five is a common starting point, once a child can focus for a short lesson. Every child is different, so we're glad to advise after a quick chat." },
            { q: "Piano or singing for my child?", a: "Both are wonderful first instruments. Piano gives a strong all-round musical foundation; singing is natural and immediate. We can help you choose, or start with a trial." },
            { q: "How much should my child practise?", a: "For young beginners, short and regular is best — even ten focused minutes a day. We'll set realistic, encouraging targets." },
            { q: "Can I stay during the lesson?", a: "We'll discuss what works best for your child. Many settle quickly into their own lesson; we always keep you informed of their progress." }
          ]
        },
        {
          type: "cta",
          title: "Give your child the gift of music.",
          text: "Book a trial lesson and watch them discover what they're capable of.",
          primary: { label: "Book a Trial Lesson", slug: "contact" },
          secondary: { label: "About the Academy", slug: "about" }
        }
      ],
      schema: {
        course: {
          name: "Music Lessons for Kids",
          description: "Piano and singing lessons for children in Kuwait from age five — playful, structured tuition that builds musical skill, focus and confidence."
        }
      }
    },

    /* ---------------- INSTRUCTORS ---------------- */
    "instructors": {
      slug: "instructors",
      kind: "interior",
      title: "Our Founders | Nilufar Jafarli & Chaimaa Chaarani — Aria Music Academy",
      description: "Meet the founders of Aria Music Academy: Nilufar Jafarli, concert pianist and artistic director, and Chaimaa Chaarani, vocal coach and executive director. Decades of performance and teaching in Kuwait.",
      h1: "Meet the Founders",
      lede: "Aria was founded by two performers who teach because they love it. You learn directly from them.",
      heroImg: "grand-piano-art",
      sections: [
        {
          type: "instructors",
          eyebrow: "The Founders",
          title: "Artists first, teachers always.",
          items: [
            {
              name: "Nilufar Jafarli",
              role: "Co-Founder · Artistic Director · Pianist",
              img: "grand-piano-room",
              alt: "Grand piano in a studio led by pianist Nilufar Jafarli",
              bio: [
                "Nilufar Jafarli is a distinguished pianist, educator and mentor who has devoted her life to artistic excellence and the transformative power of music. Her journey began at the age of six, and she trained at a specialised music school before completing her professional studies at the Baku Music Academy, where she earned both her Bachelor's and Master's degrees in Piano Performance.",
                "She has been recognised at numerous international piano competitions across Europe and the Middle East, and has built an extensive career as both soloist and collaborative artist — presenting solo recitals, performing with orchestras, and appearing in prestigious philharmonic halls and renowned concert venues with major concertos and a wide classical repertoire.",
                "Alongside performing, Nilufar has dedicated herself to education and mentorship. Many of her students have gone on to higher musical studies and Bachelor's degrees in Piano Performance, competing nationally and internationally and presenting recitals of their own. She founded Aria Music Academy to provide world-class music education in an inspiring, supportive environment."
              ]
            },
            {
              name: "Chaimaa Chaarani",
              role: "Co-Founder · Executive Director · Vocal Coach",
              img: "piano-lounge",
              alt: "Elegant lounge at Aria Music Academy, led by vocal coach Chaimaa Chaarani",
              bio: [
                "Chaimaa Chaarani is a Lebanese vocal coach, music educator and co-founder of Aria Music Academy, with over nine years of teaching experience working with students of all ages — from young children to adults. Before relocating to Kuwait, she founded and managed a music academy in Lebanon, and she co-founded Aria with a vision of a refined, inspiring, student-centred place to learn.",
                "She specialises in vocal training and vocal-piano, guiding singers toward healthy technique, musical expression, stage confidence and the ability to accompany themselves on the piano while they sing. Chaimaa studied Education and Music at the American University of Beirut, combining strong academic foundations with a personalised, creative teaching philosophy that tailors every lesson to the student.",
                "Beyond teaching and academy leadership, Chaimaa has worked on several educational songwriting and composition projects, creating music and learning material designed to support children's development, creativity and musical understanding."
              ]
            }
          ]
        },
        {
          type: "cta",
          title: "Learn from performers.",
          text: "Book a trial lesson with Nilufar or Chaimaa and start your journey at Aria.",
          primary: { label: "Book a Trial Lesson", slug: "contact" },
          secondary: { label: "Explore Lessons", slug: "piano-lessons" }
        }
      ],
      schema: { persons: true }
    },

    /* ---------------- ABOUT ---------------- */
    "about": {
      slug: "about",
      kind: "interior",
      title: "About Aria Music Academy | A Boutique Music School in Kuwait",
      description: "Aria Music Academy is a boutique piano and vocal school in Kuwait, founded by a concert pianist and a vocal coach to offer world-class, personalised music education in an elegant setting.",
      h1: "About Aria Music Academy",
      lede: "A boutique academy built on one belief: that anyone can learn music beautifully, given the right teacher and the right room.",
      heroImg: "lounge-reception",
      sections: [
        {
          type: "prose",
          eyebrow: "Our Story",
          title: "Founded by two performers.",
          html: [
            "Aria Music Academy was founded in Kuwait by Nilufar Jafarli, a concert pianist, and Chaimaa Chaarani, a vocal coach and educator — two artists who share a conviction that artistry and technique belong together, and that great teaching can change a life.",
            "We built Aria as the kind of place we always wished to learn in: calm, beautiful and serious about music, yet warm and encouraging for the complete beginner. From the grand piano to the composer-named practice rooms, every detail is here to help you focus, progress and enjoy the journey."
          ]
        },
        {
          type: "cards",
          eyebrow: "What We Stand For",
          title: "Our values.",
          items: [
            { num: "01", title: "Excellence", text: "World-class standards, taught by performers — because students rise to the level that is asked of them." },
            { num: "02", title: "The individual", text: "Every learner is different. Lessons are private and tailored to each student's age, level and ambition." },
            { num: "03", title: "A lifelong love", text: "Beyond exams and pieces, we nurture a genuine, lasting relationship with music." }
          ]
        },
        {
          type: "split", reverse: true,
          eyebrow: "The Space",
          title: "A room that takes music seriously.",
          body: [
            "Our studio was designed for sound and for focus — acoustically considered practice rooms named after the great composers, a concert-quality grand piano, and a refined, distraction-free setting.",
            "It is, quite simply, a place that makes you want to practise."
          ],
          img: "vinyl-lounge",
          alt: "Aubergine lounge with framed vinyl records at Aria Music Academy",
          cta: { label: "Get in Touch", slug: "contact" }
        },
        {
          type: "cta",
          title: "Come and see for yourself.",
          text: "Visit the academy and meet your teacher with a trial lesson.",
          primary: { label: "Book a Trial Lesson", slug: "contact" },
          secondary: { label: "Meet the Founders", slug: "instructors" }
        }
      ],
      schema: { extraWebPage: true }
    },

    /* ---------------- CONTACT ---------------- */
    "contact": {
      slug: "contact",
      kind: "interior",
      title: "Contact & Book a Trial Lesson | Aria Music Academy Kuwait",
      description: "Contact Aria Music Academy in Kuwait to book a trial piano or vocal lesson. Call, WhatsApp or email us, or send an enquiry and we'll reply with availability.",
      h1: "Book a Trial Lesson",
      lede: "The best way to begin is to come and play. Reach out and we'll arrange a trial lesson and a look around the studio.",
      heroImg: "reception-rooms",
      sections: [
        { type: "contact" },
        {
          type: "faq",
          title: "Before you visit",
          items: [
            { q: "How do I book a trial lesson?", a: "Send an enquiry below, call, or message us on WhatsApp. We'll suggest a time, confirm the details, and welcome you to the studio." },
            { q: "Where are you located?", a: "Aria Music Academy is in Kuwait. You'll find our exact address and map on this page — and we're happy to share directions when you book." },
            { q: "What are your opening hours?", a: "Our current opening hours are listed on this page. If you need a time outside them, just ask and we'll do our best." }
          ]
        }
      ],
      schema: { contactPage: true }
    }
  }
};
