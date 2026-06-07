/* ════════════════════════════════════════════════════════════════
   EduDesign UK — SINGLE SOURCE OF TRUTH
   Homepage shows SHORT summaries; the Services page shows full details.
   ════════════════════════════════════════════════════════════════ */

window.EDU = {

  /* ---- Business / contact details ------------------------------- */
  business: {
    name: "EduDesign UK",
    legalName: "EduDesign UK",
    tagline: "Academic, career, technical and creative solutions for students, graduates and small businesses.",
    whatsapp: "923446104224",        // 0344 6104224
    whatsapp2: "923336654334",       // 0333 6654334
    email: "noorieee532@gmail.com",
    instagram: "https://www.instagram.com/edudesign_assignments_helper?igsh=MW5qbG45aXRieGZ3dA%3D%3D&utm_source=qr",
    facebook: "",
    linkedin: "",
    siteUrl: "https://edudesign-pink.vercel.app"
  },

  /* ---- Context-specific WhatsApp prefilled messages ------------- */
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

  /* ---- Trust strip values (editable). No zero-counters, no fake % --
     showDeliverables: true only when supporting records genuinely exist. */
  showDeliverables: false,
  stats: [
    { value: "100+", label: "Academic, creative & technical deliverables", deliverables: true,
      note: "Includes academic-support materials, CVs, designs, dashboards, websites and project deliverables." },
    { value: "12+",  label: "Service areas in one place" },
    { value: "7 Days", label: "Support available each week" },
    { value: "Private", label: "Confidential handling" }
  ],

  /* ---- Audience cards ------------------------------------------- */
  audiences: {
    students: {
      title: "For Students & Graduates",
      icon: "fa-user-graduate",
      blurb: "Academic guidance, CVs, coding, data analysis and final-year projects — clear, confidential support.",
      cta: "View Student Services", target: "/services.html"
    },
    businesses: {
      title: "For Small Businesses",
      icon: "fa-briefcase",
      blurb: "Websites, branding, dashboards, business documents and social graphics to help you grow.",
      cta: "View Business Services", target: "/services.html"
    }
  },

  /* ---- Six service categories (summary on home, details on /services.html) */
  services: [
    {
      id: "academic", icon: "fa-graduation-cap", title: "Academic Support",
      summary: "Planning, structure, research, referencing, editing and presentation support — responsible academic guidance to improve your own work.",
      items: ["Assignment planning","Essay & report structure","Case-study support","Research & literature-review guidance",
        "Dissertation planning","Proposal development","Referencing","Proofreading & editing","Presentation & poster support",
        "Data interpretation","Statistical support","Draft feedback","Similarity-report guidance","Originality review"],
      whatsapp: "academic"
    },
    {
      id: "cv", icon: "fa-id-badge", title: "CV & Career",
      summary: "Professional UK-style, ATS-friendly career documents tailored to your experience and target role.",
      items: ["UK-style CVs","ATS-friendly formatting","CV creation & rewriting","Job-description tailoring","Graduate & professional CVs",
        "Cover letters","LinkedIn profile support","Personal statements","Interview documents","Portfolio content"],
      whatsapp: "cv"
    },
    {
      id: "coding", icon: "fa-code", title: "Coding & Projects",
      summary: "Practical coding help, debugging, prototypes, technical documentation and final-year technical projects.",
      items: ["Front-end & back-end development","Full-stack prototypes","Debugging & code review","Testing","APIs & databases",
        "Technical documentation","Final-year technical projects","Requirements analysis","Implementation guidance","Git & GitHub support"],
      tools: ["HTML","CSS","JavaScript","TypeScript","React","Next.js","Python","Java","C#","SQL"],
      whatsapp: "coding"
    },
    {
      id: "analytics", icon: "fa-chart-line", title: "Analytics & Dashboards",
      summary: "Live dashboards and clear insights — so you understand sales and performance without reviewing raw data daily.",
      items: ["Data cleaning","Data visualisation","KPI tracking","Sales & finance analytics","Forecasting",
        "Business intelligence","Live dashboards","Automated reporting","Database integration"],
      tools: ["Excel","Power BI","Tableau","SQL","Python","JavaScript dashboards"],
      whatsapp: "analytics"
    },
    {
      id: "web", icon: "fa-globe", title: "Website Development",
      summary: "Modern, responsive websites for portfolios, small businesses, landing pages and services.",
      items: ["Small-business & portfolio websites","Landing & service pages","Responsive / mobile optimisation",
        "Contact & booking forms","Analytics integration","Basic SEO","Redesign & maintenance"],
      tools: ["HTML","CSS","JavaScript","React","Next.js"],
      badge: "This website is an internal brand project",
      whatsapp: "website"
    },
    {
      id: "branding", icon: "fa-pen-nib", title: "Branding & Design",
      summary: "Logos, brand identity, presentations, posters and social-media graphics with the files you need.",
      items: ["Logo concepts & brand identity","Colour palette & typography","Brand guidelines","Business cards",
        "PowerPoint & pitch decks","Academic & research posters","Infographics","Social-media graphics","Instagram posts, stories & covers",
        "Transparent & high-resolution files"],
      whatsapp: "branding"
    }
  ],

  /* ---- Subjects & modules (shown on Services page) -------------- */
  subjects: [
    "Business Management","Finance","Accounting","Economics","Marketing","Human Resource Management","Law",
    "Health & Social Care","Psychology","Education","Tourism & Hospitality","Computer Science",
    "Artificial Intelligence","Data Science","Data Analytics","Cybersecurity","Software Engineering","Engineering","Research Methods"
  ],

  /* ---- Selected Work (compact) ---------------------------------
     type: Customer Work | Anonymised Example | Internal Project | Demonstration Work | Concept Design
     image: optional path under /static/images/portfolio/ (placeholder tile if blank). */
  portfolioFilters: ["All","Websites","CVs","Logos","Coding","Analytics","Presentations"],
  portfolio: [
    { title: "EduDesign UK Website", category: "Websites", type: "Internal Project", icon: "globe", image: "" },
    { title: "UK-Style CV Designs", category: "CVs", type: "Anonymised Example", icon: "id-badge", image: "" },
    { title: "Logo & Brand Concepts", category: "Logos", type: "Demonstration Work", icon: "pen-nib", image: "" },
    { title: "Coding Project Interface", category: "Coding", type: "Demonstration Work", icon: "code", image: "" },
    { title: "Analytics Dashboard", category: "Analytics", type: "Demonstration Work", icon: "chart-line", image: "" },
    { title: "Academic Presentation", category: "Presentations", type: "Anonymised Example", icon: "display", image: "" }
  ],

  /* ---- Results/evidence are NOT displayed publicly (confidential) -- */
  results: [],

  /* ---- Verified feedback lives in /static/data/feedback.js ------ */
  reviews: [],

  /* ---- FAQs ----------------------------------------------------- */
  faqs: [
    { q: "What services do you provide?",
      a: "Academic support, CVs and career documents, coding and projects, analytics and dashboards, website development, and branding and design — professional support in one place." },
    { q: "Can I see examples of previous work?",
      a: "Yes. Public examples are in Selected Work, and relevant anonymised samples may be shared privately where confidentiality permits." },
    { q: "Why are prices not displayed?",
      a: "Every request differs in complexity, length, deadline and required tools. A private quotation is provided after we review your requirements." },
    { q: "Are my files confidential?",
      a: "Yes. Files and project details are handled privately and used only to provide the requested service." },
    { q: "Can you guarantee my grade?",
      a: "No. Academic outcomes depend on your own work, your university's requirements and the marking criteria. We provide guidance and supporting materials to help you improve your own work." },
    { q: "Do you guarantee zero AI detection or Turnitin bypass?",
      a: "No. No legitimate service can guarantee a specific AI-detection or similarity score. We focus on original research, clear writing and careful review." },
    { q: "Can you help with urgent deadlines?",
      a: "Urgent support may be available depending on complexity and current capacity. Share your deadline and we'll confirm what's possible." },
    { q: "Can I leave feedback?",
      a: "Yes — use the feedback form. Submissions are reviewed before they appear publicly." }
  ],

  /* ---- Policy pages --------------------------------------------- */
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
