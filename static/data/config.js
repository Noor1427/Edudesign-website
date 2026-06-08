/* ════════════════════════════════════════════════════════════════
   EduDesign UK — SINGLE SOURCE OF TRUTH
   Professional theme. No public pricing. Homepage = short summaries.
   ════════════════════════════════════════════════════════════════ */

window.EDU = {

  business: {
    name: "EduDesign UK",
    tagline: "Academic, career, technical and creative solutions for students, graduates and small businesses.",
    whatsapp: "923446104224",
    whatsapp2: "923336654334",
    email: "noorieee532@gmail.com",
    instagram: "https://www.instagram.com/edudesign_assignments_helper?igsh=MW5qbG45aXRieGZ3dA%3D%3D&utm_source=qr",
    facebook: "",
    siteUrl: "https://edudesign-pink.vercel.app"
  },

  whatsappMessages: {
    general:   "Hello, I would like to discuss a service with EduDesign UK.",
    academic:  "Hello, I need academic support and would like to share my brief.",
    website:   "Hello, I would like to discuss a website project.",
    analytics: "Hello, I would like to discuss a dashboard or analytics project.",
    cv:        "Hello, I would like to discuss CV and career document support.",
    coding:    "Hello, I would like to discuss a coding or technical project.",
    branding:  "Hello, I would like to discuss a logo or branding project.",
    proof:     "Hello, I would like to request relevant anonymised samples before discussing my project.",
    quote:     "Hello, I would like to request a private quotation. Here is my brief:"
  },

  /* ---- Trust strip (icon + text pills under the hero) ----------- */
  trustStrip: [
    { icon: "fa-users",          text: "100+ Deliverables Produced" },
    { icon: "fa-shield-halved",  text: "Confidential Handling" },
    { icon: "fa-star",           text: "Academic, Technical & Creative Support" },
    { icon: "fa-clock",          text: "Flexible Turnaround" }
  ],

  /* ---- Audience cards ------------------------------------------- */
  audiences: {
    students: {
      title: "Students & Graduates", icon: "fa-graduation-cap",
      blurb: "Get the academic support, career documents and technical skills you need to stand out and achieve your goals.",
      features: [ { icon: "fa-user-check", t: "Student Focused" }, { icon: "fa-lock", t: "Confidential Help" }, { icon: "fa-star", t: "Results That Matter" } ],
      cta: "Learn more", target: "/services.html"
    },
    businesses: {
      title: "Small Businesses", icon: "fa-briefcase",
      blurb: "Build your digital presence, streamline operations and make smarter decisions with our expert support.",
      features: [ { icon: "fa-chart-line", t: "Grow Your Business" }, { icon: "fa-clock", t: "Save Time & Resources" }, { icon: "fa-shield-halved", t: "Trusted Support" } ],
      cta: "Learn more", target: "/services.html"
    }
  },

  /* ---- Six service categories (summary on home, full on /services.html) */
  services: [
    { id: "academic", icon: "fa-graduation-cap", title: "Academic Support",
      summary: "Planning, structure, research, referencing and editing — to help you improve your own work.",
      items: ["Assignment planning","Essay & report structure","Case-study support","Research & literature-review guidance","Dissertation planning","Proposal development","Referencing","Proofreading & editing","Presentation & poster support","Data interpretation","Statistical support","Draft feedback","Similarity-report guidance","Originality review"],
      whatsapp: "academic" },
    { id: "cv", icon: "fa-user", title: "CV & Career",
      summary: "CVs, cover letters, LinkedIn profiles and career guidance to help you stand out.",
      items: ["UK-style CVs","ATS-friendly formatting","CV creation & rewriting","Job-description tailoring","Graduate & professional CVs","Cover letters","LinkedIn profile support","Personal statements","Interview documents","Portfolio content"],
      whatsapp: "cv" },
    { id: "coding", icon: "fa-code", title: "Coding & Projects",
      summary: "Programming, debugging, prototypes and final-year technical projects.",
      items: ["Front-end & back-end development","Full-stack prototypes","Debugging & code review","Testing","APIs & databases","Technical documentation","Final-year technical projects","Requirements analysis","Implementation guidance","Git & GitHub support"],
      tools: ["HTML","CSS","JavaScript","TypeScript","React","Next.js","Python","Java","C#","SQL"],
      whatsapp: "coding" },
    { id: "analytics", icon: "fa-chart-column", title: "Analytics & Dashboards",
      summary: "Data analysis, dashboards and insights that turn data into decisions.",
      items: ["Data cleaning","Data visualisation","KPI tracking","Sales & finance analytics","Forecasting","Business intelligence","Live dashboards","Automated reporting","Database integration"],
      tools: ["Excel","Power BI","Tableau","SQL","Python","JavaScript dashboards"],
      whatsapp: "analytics" },
    { id: "web", icon: "fa-display", title: "Websites",
      summary: "Modern, responsive websites that represent your brand and drive results.",
      items: ["Small-business & portfolio websites","Landing & service pages","Responsive / mobile optimisation","Contact & booking forms","Analytics integration","Basic SEO","Redesign & maintenance"],
      tools: ["HTML","CSS","JavaScript","React","Next.js"],
      whatsapp: "website" },
    { id: "branding", icon: "fa-pen-nib", title: "Branding & Design",
      summary: "Logos, brand identity, presentations and graphics designed to impress.",
      items: ["Logo concepts & brand identity","Colour palette & typography","Brand guidelines","Business cards","PowerPoint & pitch decks","Academic & research posters","Infographics","Social-media graphics","Transparent & high-resolution files"],
      whatsapp: "branding" }
  ],

  subjects: [
    "Business Management","Finance","Accounting","Economics","Marketing","Human Resource Management","Law",
    "Health & Social Care","Psychology","Education","Tourism & Hospitality","Computer Science",
    "Artificial Intelligence","Data Science","Data Analytics","Cybersecurity","Software Engineering","Engineering","Research Methods"
  ],

  /* ---- Selected Work (clearly-labelled examples; add real images later) -- */
  portfolio: [
    { title: "Sales Analytics Dashboard", category: "Data Visualisation", icon: "chart-column", image: "/static/images/portfolio/analytics.jpg" },
    { title: "Corporate Website",         category: "Web Design",         icon: "display",      image: "/static/images/portfolio/website.jpg" },
    { title: "Brand Identity",            category: "Logo & Brand Identity", icon: "pen-nib",   image: "/static/images/portfolio/brand.jpg" },
    { title: "Research Report",           category: "Academic Writing",   icon: "file-lines",   image: "/static/images/portfolio/report.jpg" }
  ],

  results: [],
  reviews: [],

  faqs: [
    { q: "Is my information kept confidential?",
      a: "Yes. Your files and project details are handled privately and used only to provide the requested service." },
    { q: "Can I see samples of your work?",
      a: "Public examples are in Selected Work, and relevant anonymised samples can be shared privately where confidentiality permits." },
    { q: "How long does it take to deliver?",
      a: "It depends on the service, length and complexity. Share your deadline and we'll confirm what's possible." },
    { q: "Why are prices not shown?",
      a: "Every request differs in complexity, length, deadline and required tools. A private quotation is provided after we review your requirements." },
    { q: "Can you guarantee my grade?",
      a: "No. Academic outcomes depend on your own work, your university's requirements and the marking criteria. We provide guidance and supporting materials to help you improve your own work." },
    { q: "Do you guarantee zero AI detection or Turnitin bypass?",
      a: "No. No legitimate service can guarantee a specific AI-detection or similarity score. We focus on original research, clear writing and careful review." }
  ],

  policies: [
    { title: "Privacy Policy",            url: "/policies/privacy.html" },
    { title: "Terms & Conditions",        url: "/policies/terms.html" },
    { title: "Confidentiality Policy",    url: "/policies/confidentiality.html" },
    { title: "Academic Integrity Policy", url: "/policies/academic-integrity.html" },
    { title: "Refund Policy",             url: "/policies/refund.html" },
    { title: "Revision Policy",           url: "/policies/revision.html" },
    { title: "Feedback & Review Policy",  url: "/policies/feedback.html" },
    { title: "Cookie Policy",             url: "/policies/cookies.html" }
  ]
};
