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

  /* ---- Service categories (summary on home, full on /services.html) */
  services: [
    { id: "academic", icon: "fa-graduation-cap", title: "Academic Support",
      summary: "Professional academic guidance for students who need help understanding briefs, organising research, structuring assignments and improving the quality of their work. We support students across undergraduate and postgraduate courses.",
      items: ["Assignment planning and structure","Essays, reports and case studies","Research and literature reviews","Dissertation and proposal planning","Referencing and citations","Proofreading and academic editing","Presentation and poster design","Data analysis and interpretation","Draft feedback and improvement","Similarity-report guidance"],
      cta: "Send Your Module Brief", whatsapp: "academic" },
    { id: "cv", icon: "fa-user", title: "CV & Career",
      summary: "Professional UK-style career documents designed to present your skills, experience and achievements clearly. We create and improve career documents for students, graduates and experienced professionals.",
      items: ["UK-style CV creation","ATS-friendly formatting","CV rewriting and improvement","Job-description keyword tailoring","Graduate CVs","Professional and career-change CVs","Cover letters","LinkedIn profile content","Personal statements","Supporting statements","Interview preparation documents","Portfolio and professional-profile content"],
      cta: "Get CV Support", whatsapp: "cv" },
    { id: "coding", icon: "fa-code", title: "Coding & Projects",
      summary: "Practical coding and technical support for students, developers and small businesses. We help with programming tasks, debugging, documentation, prototypes and technical project development.",
      items: ["Front-end development","Back-end development","Full-stack prototypes","Code debugging","Code review","Performance optimisation","Database design","API integration","Testing","Technical documentation","Final-year project guidance","Project presentation support"],
      tools: ["Python","JavaScript","TypeScript","HTML & CSS","React","Next.js","Java","C#","SQL","Git & GitHub","APIs","Databases"],
      cta: "Discuss Your Coding Project", whatsapp: "coding" },
    { id: "ai", icon: "fa-robot", title: "AI Agents & Automation",
      summary: "AI-powered tools and automated workflows designed to reduce repetitive work and improve efficiency. We can develop intelligent systems for students, professionals and small businesses, planned around your workflow, data and users.",
      items: ["AI chatbots","Customer-support assistants","FAQ agents","Knowledge-base assistants","Document-processing tools","Data-extraction workflows","Email automation","Task automation","Research assistants","Internal business tools","API-based AI integrations","Prototype AI applications"],
      tools: ["Python","JavaScript","Databases","Automation platforms","LLM APIs"],
      cta: "Build an AI Solution", whatsapp: "ai" },
    { id: "software", icon: "fa-laptop-code", title: "Software Development",
      summary: "Custom software solutions designed around specific academic, professional or business requirements. We support reliable, scalable and easy-to-use applications, from planning through design, development, testing and documentation.",
      items: ["Web application development","Desktop application prototypes","Business management systems","Internal company tools","Customer portals","Admin dashboards","Authentication systems","Database-driven applications","API development","Third-party integrations","Testing and debugging","Technical documentation","Software maintenance","Feature improvements"],
      cta: "Discuss Your Software Idea", whatsapp: "software" },
    { id: "mobile", icon: "fa-mobile-screen-button", title: "Mobile App Development",
      summary: "Mobile app design and development for student projects, startups and small businesses. We create clean, user-friendly mobile experiences tailored to the project requirements.",
      items: ["Android app development","Cross-platform app development","React Native applications","Flutter applications","Mobile UI design","Login and registration systems","Database integration","API integration","Push-notification setup","Booking and enquiry apps","E-commerce app prototypes","Student project apps","App testing and debugging","Mobile optimisation"],
      cta: "Start Your App Project", whatsapp: "mobile" },
    { id: "analytics", icon: "fa-chart-column", title: "Analytics & Dashboards",
      summary: "Professional data analytics and dashboard solutions that turn raw information into clear insights. We support business students, researchers and small businesses with data analysis and visual reporting — helping you spot trends, monitor performance and make better decisions.",
      items: ["Excel dashboards","Power BI dashboards","Tableau dashboards","Python data analysis","SQL analysis","JavaScript dashboards","Data cleaning","Data visualisation","KPI tracking","Sales analytics","Finance analytics","Customer analysis","Forecasting","Performance reports","Automated reporting","Live-data dashboards"],
      tools: ["SQL","Python","JavaScript","Excel","Power BI","Tableau"],
      cta: "Request a Dashboard", whatsapp: "analytics" },
    { id: "web", icon: "fa-display", title: "Websites",
      summary: "Modern, responsive websites designed for students, professionals and small businesses. We create websites that are clear, mobile-friendly and aligned with the customer's goals and branding.",
      items: ["Small-business websites","Portfolio websites","Landing pages","Service websites","Personal-brand websites","Responsive web design","Mobile optimisation","Contact forms","Enquiry forms","Booking forms","Website redesign","Basic SEO setup","Analytics integration","React websites","Next.js websites","Website maintenance","Content updates"],
      cta: "Start Your Website", whatsapp: "website" },
    { id: "branding", icon: "fa-pen-nib", title: "Branding & Design",
      summary: "Professional visual design services that help businesses, students and professionals present their work clearly and consistently. Designs can be adapted to your preferred style, audience, platform and brand colours.",
      items: ["Logo design","Brand identity","Colour palettes","Typography selection","Business cards","Social-media posts","Instagram stories","Instagram highlight covers","Business posters","Promotional flyers","Presentations","Pitch decks","Academic posters","Research posters","Infographics","CV design","Report formatting","Professional document design"],
      cta: "Discuss Your Design", whatsapp: "branding" }
  ],

  subjects: [
    "Business Management","Finance","Accounting","Economics","Marketing","Human Resource Management","Law",
    "Health & Social Care","Psychology","Education","Tourism & Hospitality","Computer Science",
    "Artificial Intelligence","Data Science","Data Analytics","Cybersecurity","Software Engineering","Engineering","Research Methods"
  ],

  /* ---- Selected Work (clearly-labelled examples; add real images later) -- */
  portfolio: [
    { title: "CVs & Cover Letters",       category: "CV & Career",           icon: "file-user",   image: "/static/images/work/cv.jpg" },
    { title: "Assignments & Reports",     category: "Academic Support",      icon: "file-lines",  image: "/static/images/work/assignments.jpg" },
    { title: "Coding & Projects",         category: "Development",           icon: "code",        image: "/static/images/work/coding.jpg" },
    { title: "Logo & Branding",           category: "Logo & Brand Identity", icon: "pen-nib",     image: "/static/images/work/logo.jpg" },
    { title: "Analytics Dashboard",       category: "Data Visualisation",    icon: "chart-column",image: "/static/images/work/analytics.jpg" },
    { title: "Website Design",            category: "Web Design",            icon: "display",     image: "/static/images/work/website.jpg" }
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
