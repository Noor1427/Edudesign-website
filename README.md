# EduDesign UK

Official website for **EduDesign UK** — academic, career, technical and creative
solutions for students, graduates and small businesses.

**Academic support · CVs · Coding · AI agents · Software · Mobile apps · Analytics · Websites · Branding**

Live site: https://edudesign-pink.vercel.app

## How it works

A fast, static website (plain HTML/CSS/JS — no backend or build step). Vercel
serves the files directly; pushing to `main` auto-deploys.

## Folder structure

```
.
├── index.html              # Home page (all sections)
├── services.html           # Full services + subjects
├── policies/               # Privacy, Terms, Refund, Revision, Academic Integrity,
│                           # Confidentiality, Feedback, Cookies
├── static/
│   ├── css/style.css       # All styling + animations
│   ├── js/main.js          # Interactions + renders sections from config
│   ├── data/
│   │   ├── config.js       # ⭐ EDIT BUSINESS INFO HERE (services, contact, work…)
│   │   └── feedback.js      # Approved customer feedback to display
│   └── images/
│       ├── brand/          # Logos, favicon, social preview
│       └── work/           # Showcase photos (CVs, assignments, coding, logo…)
├── robots.txt · sitemap.xml
└── vercel.json             # Static deploy config
```

## Editing content

Almost everything (services, contact details, subjects, work samples, FAQs,
policies list) is edited in **`static/data/config.js`** — one file, no need to
touch the HTML.

To change a showcase photo, drop a new image into `static/images/work/` and
point to it in `config.js`.

## Preview locally

Any static server works, e.g.:

```bash
python -m http.server 5500
# then open http://127.0.0.1:5500
```

---
© 2026 EduDesign UK. All rights reserved.
