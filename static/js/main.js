/* ════════════════════════════════════════════════════════════
   EduDesign UK — interactions + render-from-config
   Data: /static/data/config.js (window.EDU) + feedback.js (window.EDU_FEEDBACK)
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  const C = window.EDU || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ---- WhatsApp links ------------------------------------------ */
  const waNum = (C.business?.whatsapp || "").replace(/\D/g, "");
  const waBase = "https://wa.me/" + waNum;
  const waLink = (k) => waBase + "?text=" + encodeURIComponent((C.whatsappMessages?.[k]) || C.whatsappMessages?.general || "Hello EduDesign UK");
  const bindWa = (root = document) => $$(".wa-link", root).forEach(a => { a.href = waLink(a.dataset.msg || "general"); a.target = "_blank"; a.rel = "noopener"; });

  /* ---- Year ----------------------------------------------------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Scroll-reveal observer (early; used by renderers) -------- */
  let io = null;
  function observe(list) {
    if (!("IntersectionObserver" in window)) { list.forEach(e => e.classList.add("visible")); return; }
    if (!io) io = new IntersectionObserver((ents) => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    list.forEach(e => io.observe(e));
  }

  /* ---- Trust strip stats --------------------------------------- */
  (function stats() {
    const grid = $("#statsGrid"); if (!grid || !C.stats) return;
    let note = "";
    const items = C.stats.filter(s => !s.deliverables || C.showDeliverables);
    grid.innerHTML = items.map(s => { if (s.note && (!s.deliverables || C.showDeliverables)) note = s.note;
      return `<li class="stat"><span class="v">${esc(s.value)}</span><span class="l">${esc(s.label)}</span></li>`; }).join("");
    const n = $("#statsNote"); if (n && note) { n.textContent = note; n.hidden = false; }
  })();

  /* ---- Audience cards ------------------------------------------- */
  (function audiences() {
    const grid = $("#audienceGrid"), a = C.audiences; if (!grid || !a) return;
    const card = (d, i) => `<article class="aud-card reveal" data-delay="${i*80}">
      <div class="aud-ic"><i class="fa-solid ${esc(d.icon)}"></i></div>
      <h3>${esc(d.title)}</h3><p>${esc(d.blurb)}</p>
      <a href="${esc(d.target)}" class="btn btn-ghost btn-sm">${esc(d.cta)}</a></article>`;
    grid.innerHTML = card(a.students, 0) + card(a.businesses, 1);
  })();

  /* ---- Services: SHORT summaries on the homepage --------------- */
  (function servicesHome() {
    const grid = $("#servicesGrid"); if (!grid || !C.services) return;
    grid.innerHTML = C.services.map(s => `
      <article class="svc-card reveal">
        <div class="svc-ic"><i class="fa-solid ${esc(s.icon)}"></i></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.summary)}</p>
        <a class="svc-link" href="/services.html#${esc(s.id)}">Learn more <i class="fa-solid fa-arrow-right"></i></a>
      </article>`).join("");
  })();

  /* ---- Services: FULL details accordion (Services page) -------- */
  (function servicesAccordion() {
    const wrap = $("#servicesAccordion"); if (!wrap || !C.services) return;
    wrap.innerHTML = C.services.map((s, i) => `
      <div class="acc-item" id="${esc(s.id)}">
        <button class="acc-q" aria-expanded="${i === 0 ? "true" : "false"}">
          <span class="acc-ic"><i class="fa-solid ${esc(s.icon)}"></i></span>
          <span class="acc-t">${esc(s.title)}</span>
          <i class="fa-solid fa-chevron-down acc-chev" aria-hidden="true"></i>
        </button>
        <div class="acc-a"${i === 0 ? ' style="max-height:1500px"' : ''}>
          <div class="acc-inner">
            <p class="acc-sum">${esc(s.summary)}</p>
            <ul class="acc-list">${s.items.map(it => `<li><i class="fa-solid fa-check"></i> ${esc(it)}</li>`).join("")}</ul>
            ${s.tools ? `<p class="acc-tools"><strong>Tools &amp; tech:</strong> ${s.tools.map(esc).join(" · ")}</p>` : ""}
            <a class="svc-link wa-link" data-msg="${esc(s.whatsapp || "general")}">Discuss this service <i class="fa-solid fa-arrow-right"></i></a>
          </div>
        </div>
      </div>`).join("");
    if (wrap.querySelector(".acc-item")) wrap.querySelector(".acc-item").classList.add("open");
    wrap.addEventListener("click", e => {
      const q = e.target.closest(".acc-q"); if (!q) return;
      const item = q.parentElement, a = item.querySelector(".acc-a"), open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
    });
    bindWa(wrap);
    // open + scroll to a deep-linked service
    if (location.hash) { const t = wrap.querySelector(location.hash); if (t) { t.classList.add("open");
      const a = t.querySelector(".acc-a"); a.style.maxHeight = a.scrollHeight + "px"; t.querySelector(".acc-q").setAttribute("aria-expanded","true");
      setTimeout(() => t.scrollIntoView({ behavior: "smooth", block: "start" }), 300); } }
  })();

  /* ---- Subjects + search (Services page) ----------------------- */
  (function subjects() {
    const grid = $("#subjectsGrid"); if (!grid || !C.subjects) return;
    grid.innerHTML = C.subjects.map(s => `<li data-s="${esc(s.toLowerCase())}">${esc(s)}</li>`).join("");
    const input = $("#subjectSearch"), empty = $("#subjectsEmpty");
    input?.addEventListener("input", () => { const q = input.value.trim().toLowerCase(); let shown = 0;
      $$("li", grid).forEach(li => { const ok = li.dataset.s.includes(q); li.style.display = ok ? "" : "none"; if (ok) shown++; });
      if (empty) empty.hidden = shown !== 0; });
  })();

  /* ---- Selected Work (compact) + filters ----------------------- */
  (function portfolio() {
    const grid = $("#portfolioGrid"), fbar = $("#portfolioFilters"); if (!grid) return;
    const items = C.portfolio || [];
    const card = (p) => `<article class="work-card reveal">
      <div class="work-media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : `<i class="fa-solid fa-${esc(p.icon || "star")}"></i>`}</div>
      <div class="work-body"><span class="work-type">${esc(p.type)}</span><h3>${esc(p.title)}</h3><span class="work-cat">${esc(p.category)}</span></div></article>`;
    const draw = (f) => { const list = (!f || f === "All") ? items : items.filter(p => p.category === f);
      grid.innerHTML = list.map(card).join(""); observe($$(".reveal", grid)); };
    if (fbar) { fbar.innerHTML = (C.portfolioFilters || ["All"]).map((f, i) => `<button class="chip${i===0?" active":""}" data-f="${esc(f)}">${esc(f)}</button>`).join("");
      fbar.addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return;
        $$(".chip", fbar).forEach(c => c.classList.remove("active")); b.classList.add("active"); draw(b.dataset.f); }); }
    draw("All");
  })();

  /* ---- Reviews (from feedback.js) ------------------------------ */
  (function reviews() {
    const grid = $("#reviewsGrid"), empty = $("#reviewsEmpty"); if (!grid) return;
    const src = (window.EDU_FEEDBACK && window.EDU_FEEDBACK.length) ? window.EDU_FEEDBACK : (C.reviews || []);
    const list = src.filter(r => r && r.verified !== false);
    if (!list.length) { grid.style.display = "none"; if (empty) empty.hidden = false; return; }
    if (empty) empty.hidden = true; grid.style.display = "";
    grid.innerHTML = list.map(r => { const rate = Math.max(1, Math.min(5, r.rating || 5));
      const name = r.display === "anonymous" ? "Anonymous" : esc(r.name || "Anonymous");
      const initial = ((r.name || "A").trim()[0] || "A").toUpperCase(); const sub = esc(r.category || r.service || "");
      return `<article class="review-card reveal"><div class="review-stars" aria-label="${rate} out of 5">${"★".repeat(rate)}${"☆".repeat(5-rate)}</div>
        <p>${esc(r.text || "")}</p><div class="review-meta"><span class="review-av">${esc(initial)}</span>
        <span><span class="review-name">${name}</span><br><span class="review-cat">${sub}${r.date ? (sub?" · ":"")+esc(r.date) : ""}</span></span>
        <span class="badge-verified"><i class="fa-solid fa-check"></i> Verified</span></div></article>`; }).join("");
    observe($$(".reveal", grid));
  })();

  /* ---- FAQs ----------------------------------------------------- */
  (function faqs() {
    const wrap = $("#faqList"); if (!wrap || !C.faqs) return;
    wrap.innerHTML = C.faqs.map((f, i) => `<div class="faq-item">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}"><span>${esc(f.q)}</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
      <div class="faq-a" id="faq-a-${i}"><p>${esc(f.a)}</p></div></div>`).join("");
    wrap.addEventListener("click", e => { const q = e.target.closest(".faq-q"); if (!q) return;
      const item = q.parentElement, a = item.querySelector(".faq-a"), open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open)); a.style.maxHeight = open ? a.scrollHeight + "px" : "0"; });
  })();

  /* ---- Footer social + policies + contact pills ---------------- */
  (function footerAndContact() {
    const b = C.business || {};
    const social = [
      b.whatsapp && { icon: "fa-brands fa-whatsapp", href: waLink("general"), label: "WhatsApp" },
      b.instagram && { icon: "fa-brands fa-instagram", href: b.instagram, label: "Instagram" },
      b.facebook && { icon: "fa-brands fa-facebook-f", href: b.facebook, label: "Facebook" },
      b.email && { icon: "fa-solid fa-envelope", href: "mailto:" + b.email, label: "Email" }
    ].filter(Boolean);
    const fs = $("#footerSocial"); if (fs) fs.innerHTML = social.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}"><i class="${s.icon}"></i></a>`).join("");
    const fp = $("#footerPolicies"); if (fp) fp.innerHTML = (C.policies || []).map(p => `<li><a href="${esc(p.url)}">${esc(p.title)}</a></li>`).join("");
    const cd = $("#contactDirect");
    const wa2 = b.whatsapp2 ? "https://wa.me/" + b.whatsapp2.replace(/\D/g, "") + "?text=" + encodeURIComponent(C.whatsappMessages?.general || "Hello") : "";
    if (cd) cd.innerHTML =
      `<a class="contact-pill wa wa-link" data-msg="general"><i class="fa-brands fa-whatsapp"></i> WhatsApp 1</a>` +
      (wa2 ? `<a class="contact-pill wa" href="${esc(wa2)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp 2</a>` : "") +
      (b.instagram ? `<a class="contact-pill" href="${esc(b.instagram)}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i> Instagram</a>` : "") +
      (b.email ? `<a class="contact-pill" href="mailto:${esc(b.email)}"><i class="fa-solid fa-envelope"></i> Email</a>` : "");
  })();

  /* ---- Populate service selects -------------------------------- */
  (function selects() {
    const opts = (C.services || []).map(s => `<option>${esc(s.title)}</option>`).join("") + `<option>Other</option>`;
    ["#fb-service", "#c-service"].forEach(sel => { const e = $(sel); if (e) e.insertAdjacentHTML("beforeend", opts); });
  })();

  /* ---- Navbar: scroll + auto hide/show ------------------------- */
  const navbar = $("#navbar"), navLinks = $("#navLinks");
  let lastY = scrollY, navTick = false;
  function onScroll() { if (navTick) return; navTick = true; requestAnimationFrame(() => {
    const y = scrollY; navbar.classList.toggle("scrolled", y > 20);
    const menuOpen = document.body.style.overflow === "hidden";
    if (!menuOpen && y > 420 && y > lastY + 6) navbar.classList.add("nav-hidden");
    else if (y < lastY - 6 || y < 420) navbar.classList.remove("nav-hidden");
    lastY = y; navTick = false; }); }
  if (navbar) { addEventListener("scroll", onScroll, { passive: true }); onScroll(); }

  /* ---- Mobile menu --------------------------------------------- */
  const burger = $("#hamburger");
  const setMenu = (open) => { navLinks.classList.toggle("open", open); burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open)); burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : ""; if (open && navbar) navbar.classList.remove("nav-hidden"); };
  burger?.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ---- Active nav link (homepage anchors) ---------------------- */
  const secs = $$("section[id]"), anchors = $$('#navLinks a[href^="#"]');
  if (secs.length) addEventListener("scroll", () => { let cur = "";
    secs.forEach(s => { if (scrollY >= s.offsetTop - 130) cur = s.id; });
    anchors.forEach(a => a.classList.toggle("active-link", a.getAttribute("href") === "#" + cur && !a.classList.contains("nav-cta"))); }, { passive: true });

  /* ---- Reveal static blocks ------------------------------------ */
  $$(".section-head, .step, .mock, .proof-card, .form-card, .acc-item").forEach(e => e.classList.add("reveal"));
  observe($$(".reveal"));

  /* ---- Star rating input --------------------------------------- */
  let rating = 0;
  (function starInput() { const box = $("#starInput"); if (!box) return;
    box.innerHTML = [1,2,3,4,5].map(n => `<button type="button" data-n="${n}" role="radio" aria-checked="false" aria-label="${n} star${n>1?"s":""}">★</button>`).join("");
    const paint = (v) => $$("button", box).forEach(b => b.classList.toggle("on", +b.dataset.n <= v));
    box.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; rating = +b.dataset.n; paint(rating);
      $$("button", box).forEach(x => x.setAttribute("aria-checked", String(+x.dataset.n === rating))); });
    box.addEventListener("mouseover", e => { const b = e.target.closest("button"); if (b) paint(+b.dataset.n); });
    box.addEventListener("mouseleave", () => paint(rating)); })();

  const fbText = $("#fb-text"), fbCount = $("#fbCount");
  fbText?.addEventListener("input", () => { if (fbCount) fbCount.textContent = fbText.value.length; });

  /* ---- Validation helpers -------------------------------------- */
  const fieldOf = (i) => i.closest(".field, fieldset.field") || i.parentElement;
  const markInvalid = (i, bad) => fieldOf(i)?.classList.toggle("invalid", bad);
  function validate(form, required) { let ok = true, first = null;
    required.forEach(sel => { const inp = $(sel, form); if (!inp) return; let bad;
      if (inp.type === "checkbox") bad = !inp.checked;
      else if (inp.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
      else bad = !inp.value.trim();
      markInvalid(inp, bad); if (bad && !first) first = inp; if (bad) ok = false; });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" }); return ok; }
  const status = (el, msg, good) => { el.textContent = msg; el.className = "form-status show " + (good ? "ok" : "bad"); };
  const openWA = (text) => window.open(waBase + "?text=" + encodeURIComponent(text), "_blank", "noopener");

  /* ---- Contact form (short) ------------------------------------ */
  const cForm = $("#contactForm");
  cForm?.addEventListener("submit", e => { e.preventDefault(); const st = $("#contactStatus");
    if (cForm.website.value) { status(st, "Thank you — your enquiry has been received.", true); cForm.reset(); return; }
    if (!validate(cForm, ["#c-name", "#c-contact", "#c-desc", '[name="consent"]'])) { status(st, "Please complete the highlighted fields.", false); return; }
    const g = (n) => (cForm[n]?.value || "").trim();
    const msg = `New enquiry — EduDesign UK\nName: ${g("name")}\nContact: ${g("contact")}\nType: ${g("type")}\nService: ${g("service")}`
      + `${g("deadline") ? "\nDeadline: " + g("deadline") : ""}\nDetails: ${g("description")}`
      + `${cForm.samples.checked ? "\nRequesting anonymised work samples." : ""}`;
    openWA(msg);
    status(st, "Thank you. Your enquiry is ready in WhatsApp — press send, and we aim to respond as soon as possible.", true);
    cForm.reset();
  });

  /* ---- Feedback form (rating + review, reviewed before publish) -
     Structured review (status:"pending") for owner moderation.       */
  const fForm = $("#feedbackForm");
  fForm?.addEventListener("submit", e => { e.preventDefault(); const st = $("#feedbackStatus");
    if (fForm.company.value) { status(st, "Thank you for your review. It will be reviewed before appearing publicly.", true); fForm.reset(); rating = 0; return; }
    let ok = validate(fForm, ["#fb-name", "#fb-service", "#fb-text", '[name="consent"]']);
    if (!rating) { $("#starInput")?.closest(".field")?.classList.add("invalid"); ok = false; }
    if (!ok) { status(st, "Please complete the highlighted fields and add a rating.", false); return; }
    const g = (n) => (fForm[n]?.value || "").trim();
    openWA(`New review (pending approval) — EduDesign UK\nName: ${g("name")}\nService: ${g("service")}\nRating: ${rating}/5\nReview: ${g("text")}`);
    status(st, "Thank you for your review. It will be reviewed before appearing publicly.", true);
    fForm.reset(); rating = 0; if (fbCount) fbCount.textContent = "0"; $$("#starInput button").forEach(b => b.classList.remove("on"));
  });

  $$("input, select, textarea").forEach(inp => inp.addEventListener("input", () => markInvalid(inp, false)));
  bindWa(document);

  /* ---- Remove intro splash once faded -------------------------- */
  setTimeout(() => { const i = document.getElementById("intro"); if (i) i.remove(); }, 2100);
})();
