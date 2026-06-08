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
    ai:        "Hello, I would like to discuss an AI agent or automation project.",
    software:  "Hello, I would like to discuss a custom software project.",
    mobile:    "Hello, I would like to discuss a mobile app project.",
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
      image: "/static/images/portfolio/report.jpg",
      summary: "End-to-end academic support — from planning and research to structure, referencing and final editing — designed to help you produce stronger, original work of your own.",
      items: ["Assignment & essay planning","Report & case-study structure","Research & literature reviews","Dissertation & thesis chapter guidance","Research proposals & methodology","Referencing (APA, Harvard, MLA, IEEE)","Reference-manager setup (Zotero/Mendeley)","Proofreading & line editing","Presentations & academic posters","Data interpretation & statistics","Reflective & critical writing","Draft feedback & mark-scheme alignment","Similarity-report guidance","Originality & integrity review"],
      whatsapp: "academic" },
    { id: "cv", icon: "fa-user", title: "CV & Career",
      image: "/static/images/portfolio/cv.jpg",
      summary: "Recruiter-ready CVs, cover letters and LinkedIn profiles — tailored, ATS-friendly and built to get you interviews.",
      items: ["UK-style & international CVs","ATS-friendly formatting & keywords","CV creation & full rewrites","Tailoring to a specific job description","Graduate, professional & academic CVs","Career-change & gap-friendly CVs","Cover letters per role","LinkedIn profile optimisation","Personal & supporting statements","Interview preparation notes","Portfolio & bio content"],
      whatsapp: "cv" },
    { id: "coding", icon: "fa-code", title: "Coding & Projects",
      image: "/static/images/portfolio/coding.jpg",
      summary: "Programming help across the whole stack — from debugging and prototypes to complete final-year technical projects, with clear explanations so you learn as we build.",
      items: ["Front-end & back-end development","Full-stack apps & prototypes","Debugging & code review","Data structures & algorithms","APIs, auth & databases","Unit & integration testing","Final-year & capstone projects","Requirements & system design","Deployment & hosting","Documentation & code walkthroughs","Git & GitHub support"],
      tools: ["HTML","CSS","JavaScript","TypeScript","React","Next.js","Python","Flask/Django","Java","C#","SQL","Git"],
      whatsapp: "coding" },
    { id: "ai", icon: "fa-robot", title: "AI Agents & Automation",
      image: "/static/images/portfolio/ai.jpg",
      summary: "Custom AI assistants, chatbots and automations — built on modern LLMs and connected to your own data and tools, from prototype to deployment.",
      items: ["Custom AI chatbots & assistants","Customer-support & FAQ bots","Retrieval-augmented generation (RAG) over your documents","LLM integration (Claude, GPT, open models)","Workflow & task automation","Data extraction, classification & summarisation","API & third-party tool integrations","Prompt engineering & evaluation","Conversational web widgets","Deployment, monitoring & guardrails"],
      tools: ["Python","Claude API","OpenAI API","LangChain","Vector databases","Node.js"],
      whatsapp: "ai" },
    { id: "software", icon: "fa-laptop-code", title: "Software Development",
      image: "/static/images/portfolio/software.jpg",
      summary: "Custom software, SaaS products and internal tools — designed, built, tested and deployed for your exact workflow.",
      items: ["Custom web & desktop applications","SaaS products & MVPs","Internal tools & admin dashboards","APIs & microservices","Database design & integration","Authentication & user management","Automation scripts & integrations","Testing & QA","Cloud deployment & hosting","Maintenance & feature updates"],
      tools: ["Python","Node.js","React","Next.js","TypeScript","SQL","Docker"],
      whatsapp: "software" },
    { id: "mobile", icon: "fa-mobile-screen-button", title: "Mobile App Development",
      image: "/static/images/portfolio/mobile.jpg",
      summary: "Cross-platform mobile apps for iOS and Android — from idea and UI to store-ready release.",
      items: ["Cross-platform iOS & Android apps","App UI/UX design","API & backend integration","Authentication & payments","Push notifications","Offline & local storage","App Store & Play Store deployment","Testing on real devices","Updates & maintenance"],
      tools: ["React Native","Flutter","Firebase","REST APIs"],
      whatsapp: "mobile" },
    { id: "analytics", icon: "fa-chart-column", title: "Analytics & Dashboards",
      image: "/static/images/portfolio/analytics.jpg",
      summary: "Data analysis, dashboards and insights that turn raw numbers into clear, confident decisions.",
      items: ["Data cleaning & preparation","Exploratory data analysis","Interactive Power BI / Tableau dashboards","KPI tracking & reporting","Sales, finance & operations analytics","Forecasting & predictive modelling","Survey & research data analysis","Excel automation (formulas & macros)","Automated & scheduled reporting","Database integration"],
      tools: ["Excel","Power BI","Tableau","SQL","Python","Pandas","NumPy"],
      whatsapp: "analytics" },
    { id: "web", icon: "fa-display", title: "Websites",
      image: "/static/images/portfolio/website.jpg",
      summary: "Modern, responsive websites that represent your brand, load fast and drive real results.",
      items: ["Small-business & portfolio websites","Landing & service pages","Responsive / mobile optimisation","Contact, booking & enquiry forms","E-commerce & payments","CMS integration","Analytics & basic SEO","Performance & accessibility","Domain setup & deployment","Redesigns & ongoing maintenance"],
      tools: ["HTML","CSS","JavaScript","React","Next.js","Tailwind","Vercel"],
      whatsapp: "website" },
    { id: "branding", icon: "fa-pen-nib", title: "Branding & Design",
      image: "/static/images/portfolio/brand.jpg",
      summary: "Logos, brand identity, presentations and graphics designed to make you look established and memorable.",
      items: ["Logo concepts & brand identity","Brand strategy & moodboards","Colour palette & typography","Brand guidelines","Business cards & stationery","PowerPoint & pitch-deck design","Academic & research posters","Infographics & data visuals","Social-media graphics","Transparent & high-resolution files"],
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
    { q: "How do I get started?",
      a: "Send us your brief, requirements and deadline through WhatsApp or the contact form. We'll review it, ask any questions, then confirm the scope and a private quote before any work begins." },
    { q: "How much will my project cost?",
      a: "Every project differs in complexity, length, deadline and the tools involved, so we don't list fixed prices. Once we've seen your requirements we send a clear, no-obligation quotation — with no hidden fees." },
    { q: "How long does delivery take?",
      a: "It depends on the service, length and complexity. Share your deadline and we'll confirm what's realistically possible — we also accommodate shorter turnarounds where we can." },
    { q: "Is my information kept confidential?",
      a: "Yes. Your files, personal details and project information are handled privately and used only to deliver the service you've requested. See our Confidentiality and Privacy policies for details." },
    { q: "Do you offer revisions if I need changes?",
      a: "Yes. Reasonable revisions within the originally agreed scope are included so the final work matches what we confirmed. Full details are in our Revision Policy." },
    { q: "What subjects and areas do you cover?",
      a: "A wide range — business, finance, computing, data, health & social care, law, engineering and more — across academic support, CVs, coding, analytics, websites and branding. Check the Services page or just ask." },
    { q: "Can I see samples of your work?",
      a: "Yes — public examples are in our Selected Work section, and relevant anonymised samples can be shared privately on request where confidentiality permits." },
    { q: "Can you guarantee my grade or zero AI detection?",
      a: "No — and no honest service can. Academic outcomes depend on your own work and your university's marking criteria, and no tool can guarantee a specific AI-detection or similarity score. We focus on original research, clear writing and careful review to help you produce your best work." }
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
