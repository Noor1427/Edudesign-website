# EduDesign UK

Official website for **EduDesign UK** — academic, career, technical and creative solutions for students, graduates and small businesses.

**Academic support · CVs · Coding · Data analytics · Websites · Branding · Documents**

## Architecture
Static, config-driven site (fast, no backend required) served on Vercel.

```
website/
├── index.html              # Single-page site (all sections)
├── policies/               # Privacy, Terms, Refund, Revision, Academic Integrity,
│                           # Confidentiality, Feedback & Review, Cookies
├── robots.txt · sitemap.xml
├── static/
│   ├── data/config.js      # ⭐ SINGLE SOURCE OF TRUTH (edit business info here)
│   ├── css/style.css
│   ├── js/main.js          # renders sections from config + interactions/forms
│   └── images/             # logo, og-image, (add: portfolio/ results/ screenshots)
├── main.py                 # tiny Flask server for local preview only
└── vercel.json             # static deploy config
```

## Edit content
Almost everything (business details, WhatsApp, services, subjects, portfolio,
results, reviews, FAQs, policies list) is edited in **`static/data/config.js`** —
no need to touch multiple files.

## Run locally
```bash
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python main.py               # http://127.0.0.1:5000
```

## Deploy
Connected to Vercel via GitHub — pushing to `main` auto-deploys.
Manual: `vercel --prod` from the project root.

---
© 2026 EduDesign UK. All rights reserved.
