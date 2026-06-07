/* ════════════════════════════════════════════════════════════════
   EduDesign UK — SINGLE SOURCE OF TRUTH
   Edit business info, stats, services, subjects, portfolio, results,
   reviews and FAQs HERE. Nothing business-specific is hard-coded
   elsewhere. main.js renders the data collections from this file.
   ════════════════════════════════════════════════════════════════ */

window.EDU = {

  /* ---- Business / contact details ------------------------------- */
  business: {
    name: "EduDesign UK",
    legalName: "EduDesign UK",
    tagline: "Academic, career, technical and creative solutions for students, graduates and small businesses.",
    // WhatsApp (international format, digits only). Primary + secondary line.
    whatsapp: "923446104224",        // 0344 6104224
    whatsapp2: "923336654334",       // 0333 6654334
    email: "noorieee532@gmail.com",
    instagram: "https://www.instagram.com/edudesign_assignments_helper?igsh=MW5qbG45aXRieGZ3dA%3D%3D&utm_source=qr",
    // ⚠️ OWNER TODO: add the real Facebook page URL (leave blank to hide)
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
    proof:     "Hello, I would like to request relevant anonymised samples before discussing my project.",
    quote:     "Hello, I would like to request a private quotation. Here is my brief:"
  },

  /* ---- Statistics (editable). No zero-counters, no fake % --------
     showDeliverables: set to true ONLY when the owner confirms that
     supporting records for 100+ deliverables genuinely exist.       */
  showDeliverables: false,
  stats: [
    {
      value: "100+",
      label: "Academic, creative & technical deliverables produced",
      note: "Includes academic-support materials, CVs, designs, technical components, dashboards, websites and project deliverables.",
      deliverables: true            // gated by showDeliverables flag
    },
    { value: "Multiple", label: "Academic & technical categories covered" },
    { value: "7 Days",   label: "Support available each week" },
    { value: "Private",  label: "Confidential project handling" }
  ],

  /* ---- Audience cards ------------------------------------------- */
  audiences: {
    students: {
      title: "For Students & Graduates",
      icon: "fa-user-graduate",
      items: [
        "Academic guidance", "Assignment planning", "Reports", "Presentations",
        "Dissertation support", "Referencing", "Proofreading", "Coding support",
        "Data analysis", "Final-year projects", "CVs", "Cover letters", "LinkedIn support"
      ],
      cta: "View Student Services",
      target: "#services"
    },
    businesses: {
      title: "For Small Businesses",
      icon: "fa-briefcase",
      items: [
        "Website development", "Logo design", "Brand identity", "Business documents",
        "Sales dashboards", "Live analytics", "Database solutions", "Social-media graphics",
        "Business presentations", "Technical prototypes", "Digital reporting"
      ],
      cta: "View Business Services",
      target: "#services"
    }
  },

  /* ---- Services (9 categories) ---------------------------------- */
  services: [
    {
      id: "academic",
      icon: "fa-graduation-cap",
      title: "Academic Support",
      desc: "Professional support with planning, structure, research, referencing, editing, analysis and presentation.",
      items: [
        "Assignment planning", "Essay structure", "Report structure", "Case-study support",
        "Research guidance", "Literature-review guidance", "Dissertation planning",
        "Proposal development", "Referencing", "Proofreading", "Editing",
        "Presentation support", "Academic posters", "Data interpretation",
        "Statistical support", "Draft feedback", "Similarity-report guidance", "Originality review"
      ],
      whatsapp: "academic"
    },
    {
      id: "cv",
      icon: "fa-file-lines",
      title: "CV & Career Services",
      desc: "Professional UK-style career documents tailored to the applicant’s experience, target role and job description.",
      items: [
        "UK-style CVs", "ATS-friendly formatting", "CV creation", "CV rewriting",
        "Job-description tailoring", "Graduate CVs", "Professional CVs", "Cover letters",
        "LinkedIn profile support", "Personal statements", "Interview documents", "Portfolio content"
      ],
      whatsapp: "cv"
    },
    {
      id: "coding",
      icon: "fa-code",
      title: "Coding & Software Services",
      desc: "Practical support with coding, debugging, technical documentation, prototypes, software projects and implementation guidance.",
      items: [
        "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Python", "Java",
        "C#", "SQL", "APIs", "Databases", "Debugging", "Code review", "Testing",
        "Technical documentation", "Front-end development", "Back-end development",
        "Full-stack prototypes", "Final-year technical projects", "Git & GitHub support"
      ],
      whatsapp: "general"
    },
    {
      id: "analytics",
      icon: "fa-chart-line",
      title: "Data Analytics",
      desc: "Live data analytics using SQL, Python, JavaScript and modern dashboard tools.",
      highlight: "Designed for business students and small businesses that want clear insights without manually reviewing sales and performance data every day.",
      items: [
        "Excel", "Power BI", "Tableau", "SQL", "Python", "JavaScript dashboards",
        "Data cleaning", "Data visualisation", "KPI tracking", "Sales analytics",
        "Finance analytics", "Forecasting", "Business intelligence", "Live dashboards",
        "Automated reporting", "Database integration"
      ],
      whatsapp: "analytics"
    },
    {
      id: "web",
      icon: "fa-globe",
      title: "Website Development",
      desc: "Modern, responsive and easy-to-use websites designed around the customer’s brand, audience and goals.",
      badge: "Internal Brand Project: this website",
      items: [
        "Small-business websites", "Portfolio websites", "Landing pages", "Service websites",
        "Responsive design", "Mobile optimisation", "Contact forms", "Booking forms",
        "Analytics integration", "Basic SEO", "Website redesign", "Website maintenance",
        "React websites", "Next.js websites"
      ],
      whatsapp: "website"
    },
    {
      id: "branding",
      icon: "fa-pen-nib",
      title: "Logo & Brand Design",
      desc: "Distinctive logos and brand identities with the files and guidelines you need to stay consistent.",
      items: [
        "Logo concepts", "Brand identity", "Colour palette", "Typography",
        "Social-media branding", "Business cards", "Brand guidelines",
        "Transparent files", "High-resolution files", "Revision options"
      ],
      whatsapp: "general"
    },
    {
      id: "presentation",
      icon: "fa-display",
      title: "Presentation & Document Design",
      desc: "Polished presentations, posters and documents with professional formatting and visual clarity.",
      items: [
        "PowerPoint presentations", "Pitch decks", "Academic posters", "Research posters",
        "Infographics", "Business proposals", "Reports", "Professional formatting",
        "Social-media graphics", "Instagram posts", "Instagram stories", "Highlight covers"
      ],
      whatsapp: "general"
    },
    {
      id: "projects",
      icon: "fa-diagram-project",
      title: "Project Support",
      desc: "Structured guidance for final-year and technical projects, from planning to implementation.",
      items: [
        "Final-year project planning", "Research design", "Requirements analysis",
        "Prototype development", "Technical documentation", "Data analysis",
        "Software debugging", "Testing support", "Presentation preparation",
        "Report structure", "Implementation guidance"
      ],
      whatsapp: "general"
    }
  ],

  /* ---- Subjects & modules (searchable grid) --------------------- */
  subjects: [
    "Business Management", "Finance", "Accounting", "Economics", "Marketing",
    "Human Resource Management", "Law", "Health & Social Care", "Psychology",
    "Education", "Tourism & Hospitality", "Computer Science", "Artificial Intelligence",
    "Data Science", "Data Analytics", "Cybersecurity", "Software Engineering",
    "Engineering", "Research Methods"
  ],

  /* ---- Portfolio: "Selected Work" ------------------------------
     type: Customer Work | Anonymised Academic Example |
           Internal Brand Project | Demonstration Project | Concept Design
     image: path under /static/images/portfolio/ (⚠️ OWNER TODO to add).
            Leave blank to show a branded placeholder tile.            */
  portfolioFilters: ["All", "Websites", "CVs", "Logos", "Analytics", "Coding", "Presentations", "Academic"],
  portfolio: [
    {
      title: "EduDesign UK Website", category: "Websites", type: "Internal Brand Project",
      objective: "Build a fast, responsive multi-service marketing site.",
      work: "Design, build, responsive layout, SEO and deployment.",
      tools: "HTML, CSS, JavaScript, Vercel",
      output: "Live responsive website", image: ""
    },
    {
      title: "UK-Style CV Designs", category: "CVs", type: "Anonymised Academic Example",
      objective: "ATS-friendly, role-tailored career documents.",
      work: "Structure, content layout and formatting.",
      tools: "Word, design tooling",
      output: "Print & ATS-ready CV", image: ""
    },
    {
      title: "Logo & Brand Concepts", category: "Logos", type: "Demonstration Project",
      objective: "Memorable identity with usable file set.",
      work: "Concepts, palette, typography, exports.",
      tools: "Vector design tools",
      output: "Logo suite + guidelines", image: ""
    },
    {
      title: "Finance Dashboard", category: "Analytics", type: "Demonstration Project",
      objective: "Track finance KPIs at a glance.",
      work: "Data model, visualisations, KPIs.",
      tools: "SQL, Power BI / Python",
      output: "Interactive dashboard", image: ""
    },
    {
      title: "Business Analytics Dashboard", category: "Analytics", type: "Demonstration Project",
      objective: "Live sales & performance insights.",
      work: "Data cleaning, modelling, live charts.",
      tools: "SQL, Python, JavaScript",
      output: "Live web dashboard", image: ""
    },
    {
      title: "Coding Interface", category: "Coding", type: "Demonstration Project",
      objective: "Functional front-end for a software project.",
      work: "Component build, state, API wiring.",
      tools: "React, JavaScript, APIs",
      output: "Working prototype", image: ""
    },
    {
      title: "Academic Presentation", category: "Presentations", type: "Anonymised Academic Example",
      objective: "Clear, well-structured slide deck.",
      work: "Narrative, layout, visuals.",
      tools: "PowerPoint",
      output: "Presentation deck", image: ""
    },
    {
      title: "Research Poster", category: "Academic", type: "Anonymised Academic Example",
      objective: "Communicate research on a single poster.",
      work: "Layout, data visuals, typography.",
      tools: "Design tooling",
      output: "Print-ready A1 poster", image: ""
    },
    {
      title: "Instagram Campaign Graphics", category: "Presentations", type: "Concept Design",
      objective: "Cohesive social-media campaign set.",
      work: "Posts, stories, highlight covers.",
      tools: "Design tooling",
      output: "Social graphics pack", image: ""
    }
  ],

  /* ---- Results & Evidence --------------------------------------
     ⚠️ OWNER TODO: add anonymised, clearly-labelled evidence here.
     Nothing is shown until real items are added (clean empty state).
     Each item: { title, category, desc, date, image, anonymised:true } */
  resultFilters: ["All", "Academic Results", "Assignments & Reports", "CVs", "Coding", "Websites", "Analytics", "Logos", "Presentations"],
  results: [
    // Example shape (commented — replace with real anonymised evidence):
    // { title: "Distinction — Strategic Management", category: "Academic Results",
    //   desc: "Module outcome with personal details removed.", date: "2024",
    //   image: "/static/images/results/example.jpg", anonymised: true }
  ],

  /* ---- Verified feedback (only owner-approved, genuine reviews) --
     Empty by default. Submissions are reviewed before being added.  */
  reviews: [
    // { name: "A.R.", category: "CV & Career", rating: 5, date: "2024",
    //   text: "…", display: "initials", verified: true }
  ],

  /* ---- FAQs ----------------------------------------------------- */
  faqs: [
    { q: "What services do you provide?",
      a: "Academic support, CV and career documents, coding and software help, data analytics and dashboards, website development, logo and brand design, presentations and business documents — professional support in one place." },
    { q: "Can I request examples of previous work?",
      a: "Yes. Public portfolio examples are available, and relevant anonymised samples may be shared privately where confidentiality permits." },
    { q: "Why are prices not displayed?",
      a: "Every request differs in complexity, length, deadline and required tools. A private quotation is provided after reviewing your requirements." },
    { q: "Are my files confidential?",
      a: "Yes. Files and project details are handled privately and used only for providing the requested service." },
    { q: "Can you guarantee my grade?",
      a: "No. Academic outcomes depend on your own work, your university’s requirements and the marking criteria. We provide guidance and supporting materials to help you improve your own work." },
    { q: "Do you guarantee zero AI detection?",
      a: "No. No legitimate service can guarantee a specific AI-detection score. We focus on original research, clear writing and careful review." },
    { q: "Do you provide similarity reports?",
      a: "We can offer similarity-report guidance and originality review using the checking method available to us. We do not imply any official affiliation with third-party systems." },
    { q: "Can you help with urgent deadlines?",
      a: "Urgent support may be available depending on project complexity and current capacity. Share your deadline and we will confirm what is possible." },
    { q: "Do you work with businesses?",
      a: "Yes — websites, branding, analytics, dashboards, reports and digital solutions for small businesses." },
    { q: "Can I leave feedback?",
      a: "Yes. Use the feedback form in the Feedback section. Submissions are reviewed before publication." },
    { q: "Are revisions available?",
      a: "Revision options depend on the service and the agreed scope, which is confirmed before work begins." }
  ],

  /* ---- Policy pages (for footer + sitemap) ---------------------- */
  policies: [
    { title: "Privacy Policy",            url: "/policies/privacy.html" },
    { title: "Terms & Conditions",        url: "/policies/terms.html" },
    { title: "Refund Policy",             url: "/policies/refund.html" },
    { title: "Revision Policy",           url: "/policies/revision.html" },
    { title: "Academic Integrity Policy", url: "/policies/academic-integrity.html" },
    { title: "Confidentiality Policy",    url: "/policies/confidentiality.html" },
    { title: "Feedback & Review Policy",  url: "/policies/feedback.html" },
    { title: "Cookie Policy",             url: "/policies/cookies.html" }
  ]
};
