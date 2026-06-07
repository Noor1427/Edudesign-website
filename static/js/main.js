/* ════════════════════════════════════════════════════════════
   EduDesign UK — interactions + render-from-config
   Data lives in /static/data/config.js (window.EDU)
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  const C = window.EDU || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  /* ---- WhatsApp links ------------------------------------------ */
  const waBase = "https://wa.me/" + (C.business?.whatsapp || "").replace(/\D/g, "");
  const waLink = (key) => waBase + "?text=" + encodeURIComponent((C.whatsappMessages?.[key]) || C.whatsappMessages?.general || "Hello EduDesign UK");
  const bindWa = (root = document) => $$(".wa-link", root).forEach(a => { a.href = waLink(a.dataset.msg || "general"); a.target = "_blank"; a.rel = "noopener"; });

  /* ---- Year ----------------------------------------------------- */
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Scroll-reveal observer (defined early; used by renderers) -- */
  let io = null;
  function observe(list) {
    if (!("IntersectionObserver" in window)) { list.forEach(e => e.classList.add("visible")); return; }
    if (!io) io = new IntersectionObserver((ents) => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    list.forEach(e => io.observe(e));
  }

  /* ---- Stats ---------------------------------------------------- */
  (function stats() {
    const grid = $("#statsGrid"); if (!grid || !C.stats) return;
    let note = "";
    const items = C.stats.filter(s => !s.deliverables || C.showDeliverables);
    grid.innerHTML = items.map(s => {
      if (s.note && (!s.deliverables || C.showDeliverables)) note = s.note;
      return `<li class="stat"><span class="v">${esc(s.value)}</span><span class="l">${esc(s.label)}</span></li>`;
    }).join("");
    const noteEl = $("#statsNote");
    if (noteEl && note) { noteEl.textContent = note; noteEl.hidden = false; }
  })();

  /* ---- Audiences ------------------------------------------------ */
  (function audiences() {
    const grid = $("#audienceGrid"), a = C.audiences; if (!grid || !a) return;
    const card = (d) => `<article class="aud-card reveal">
      <div class="aud-ic"><i class="fa-solid ${esc(d.icon)}"></i></div>
      <h3>${esc(d.title)}</h3>
      <ul class="aud-tags">${d.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      <a href="${esc(d.target)}" class="btn btn-ghost btn-sm">${esc(d.cta)}</a>
    </article>`;
    grid.innerHTML = card(a.students) + card(a.businesses);
  })();

  /* ---- Services ------------------------------------------------- */
  (function services() {
    const grid = $("#servicesGrid"); if (!grid || !C.services) return;
    grid.innerHTML = C.services.map(s => `
      <article class="svc-card reveal">
        <div class="svc-ic"><i class="fa-solid ${esc(s.icon)}"></i></div>
        ${s.badge ? `<span class="svc-badge">${esc(s.badge)}</span>` : ""}
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.desc)}</p>
        ${s.highlight ? `<p class="svc-highlight">${esc(s.highlight)}</p>` : ""}
        <ul class="svc-chips">${s.items.slice(0, 10).map(i => `<li>${esc(i)}</li>`).join("")}${s.items.length > 10 ? `<li>+${s.items.length - 10} more</li>` : ""}</ul>
        <a class="svc-link wa-link" data-msg="${esc(s.whatsapp || "general")}">Discuss this service <i class="fa-solid fa-arrow-right"></i></a>
      </article>`).join("");
    bindWa(grid);
  })();

  /* ---- Subjects + search --------------------------------------- */
  (function subjects() {
    const grid = $("#subjectsGrid"); if (!grid || !C.subjects) return;
    grid.innerHTML = C.subjects.map(s => `<li data-s="${esc(s.toLowerCase())}">${esc(s)}</li>`).join("");
    const input = $("#subjectSearch"), empty = $("#subjectsEmpty");
    input?.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      $$("li", grid).forEach(li => {
        const ok = li.dataset.s.includes(q);
        li.style.display = ok ? "" : "none"; if (ok) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  })();

  /* ---- Generic filter grid (results & portfolio) --------------- */
  function filterGrid(filterId, gridId, cards, render, emptyId) {
    const fbar = $("#" + filterId), grid = $("#" + gridId), empty = emptyId ? $("#" + emptyId) : null;
    if (!fbar || !grid) return;
    const filters = (filterId === "resultFilters" ? C.resultFilters : C.portfolioFilters) || ["All"];
    fbar.innerHTML = filters.map((f, i) => `<button class="chip${i === 0 ? " active" : ""}" data-f="${esc(f)}" role="tab">${esc(f)}</button>`).join("");
    const draw = (f) => {
      const list = (f === "All" || !f) ? cards : cards.filter(c => (c.category || c.type) === f || c.category === f);
      grid.innerHTML = list.map(render).join("");
      bindWa(grid);
      if (empty) empty.hidden = list.length !== 0;
      if (empty && !cards.length) empty.hidden = false;
      observe($$(".reveal", grid));
    };
    fbar.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", fbar).forEach(c => c.classList.remove("active"));
      b.classList.add("active"); draw(b.dataset.f);
    });
    draw("All");
  }

  /* ---- Results/Evidence are intentionally NOT shown publicly -----
     Evidence is confidential and shared privately on request (#results). */

  /* ---- Portfolio ------------------------------------------------ */
  filterGrid("portfolioFilters", "portfolioGrid", C.portfolio || [], (p) => `
    <article class="pf-card reveal">
      <div class="pf-media">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy">` : `<i class="fa-solid fa-${iconFor(p.category)}"></i>`}</div>
      <div class="pf-body">
        <span class="pf-type">${esc(p.type)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="pf-detail"><b>Objective:</b> ${esc(p.objective)}</p>
        <p class="pf-detail"><b>Work:</b> ${esc(p.work)}</p>
        <p class="pf-detail"><b>Tools:</b> ${esc(p.tools)}</p>
        <p class="pf-detail"><b>Output:</b> ${esc(p.output)}</p>
        <div class="pf-actions">
          <a class="mini solid wa-link" data-msg="general">Request Similar Work</a>
          <a class="mini wa-link" data-msg="general">Discuss Your Project</a>
        </div>
      </div>
    </article>`);
  function iconFor(cat) {
    return ({ Websites: "globe", CVs: "id-badge", Logos: "pen-nib", Analytics: "chart-line", Coding: "code", Presentations: "display", Academic: "file-lines" }[cat]) || "star";
  }

  /* ---- Reviews -------------------------------------------------- */
  (function reviews() {
    const grid = $("#reviewsGrid"), empty = $("#reviewsEmpty");
    if (!grid) return;
    // Displayed feedback lives in /static/data/feedback.js (window.EDU_FEEDBACK)
    const src = (window.EDU_FEEDBACK && window.EDU_FEEDBACK.length) ? window.EDU_FEEDBACK : (C.reviews || []);
    const list = src.filter(r => r && r.verified !== false);
    if (!list.length) { grid.style.display = "none"; if (empty) empty.hidden = false; return; }
    if (empty) empty.hidden = true;
    grid.style.display = "";
    grid.innerHTML = list.map(r => {
      const rate = Math.max(1, Math.min(5, r.rating || 5));
      const name = r.display === "anonymous" ? "Anonymous" : esc(r.name || "Anonymous");
      const initial = ((r.name || "A").trim()[0] || "A").toUpperCase();
      const sub = esc(r.category || r.service || "");
      return `<article class="review-card reveal">
        <div class="review-stars" aria-label="${rate} out of 5 stars">${"★".repeat(rate)}${"☆".repeat(5 - rate)}</div>
        <p>${esc(r.text || "")}</p>
        <div class="review-meta">
          <span class="review-av">${esc(initial)}</span>
          <span><span class="review-name">${name}</span><br><span class="review-cat">${sub}${r.date ? (sub ? " · " : "") + esc(r.date) : ""}</span></span>
          <span class="badge-verified"><i class="fa-solid fa-check"></i> Verified</span>
        </div>
      </article>`;
    }).join("");
    observe($$(".reveal", grid));
  })();

  /* ---- FAQs ----------------------------------------------------- */
  (function faqs() {
    const wrap = $("#faqList"); if (!wrap || !C.faqs) return;
    wrap.innerHTML = C.faqs.map((f, i) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
          <span>${esc(f.q)}</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
        </button>
        <div class="faq-a" id="faq-a-${i}" role="region"><p>${esc(f.a)}</p></div>
      </div>`).join("");
    wrap.addEventListener("click", e => {
      const q = e.target.closest(".faq-q"); if (!q) return;
      const item = q.parentElement, a = item.querySelector(".faq-a"), open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open));
      a.style.maxHeight = open ? a.scrollHeight + "px" : "0";
    });
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
    const fs = $("#footerSocial");
    if (fs) fs.innerHTML = social.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}"><i class="${s.icon}"></i></a>`).join("");
    const fp = $("#footerPolicies");
    if (fp) fp.innerHTML = (C.policies || []).map(p => `<li><a href="${esc(p.url)}">${esc(p.title)}</a></li>`).join("");
    const cd = $("#contactDirect");
    const wa2 = b.whatsapp2 ? "https://wa.me/" + b.whatsapp2.replace(/\D/g, "") + "?text=" + encodeURIComponent(C.whatsappMessages?.general || "Hello EduDesign UK") : "";
    if (cd) cd.innerHTML =
      `<a class="contact-pill wa wa-link" data-msg="general"><i class="fa-brands fa-whatsapp"></i> WhatsApp 1</a>` +
      (wa2 ? `<a class="contact-pill wa" href="${esc(wa2)}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp 2</a>` : "") +
      (b.instagram ? `<a class="contact-pill" href="${esc(b.instagram)}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i> Instagram</a>` : "") +
      (b.email ? `<a class="contact-pill" href="mailto:${esc(b.email)}"><i class="fa-solid fa-envelope"></i> Email</a>` : "");
  })();

  /* ---- Populate service selects -------------------------------- */
  (function selects() {
    const opts = (C.services || []).map(s => `<option>${esc(s.title)}</option>`).join("");
    ["#fb-service", "#c-service"].forEach(sel => { const e = $(sel); if (e) e.insertAdjacentHTML("beforeend", opts + `<option>Other</option>`); });
  })();

  /* ---- Navbar: scrolled + auto hide/show ----------------------- */
  const navbar = $("#navbar");
  const navLinks = $("#navLinks");
  let lastY = scrollY, navTick = false;
  function onScroll() {
    if (navTick) return; navTick = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      navbar.classList.toggle("scrolled", y > 20);
      const menuOpen = document.body.style.overflow === "hidden";
      if (!menuOpen && y > 420 && y > lastY + 6) navbar.classList.add("nav-hidden");
      else if (y < lastY - 6 || y < 420) navbar.classList.remove("nav-hidden");
      lastY = y; navTick = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---- Mobile menu --------------------------------------------- */
  const burger = $("#hamburger");
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    burger.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    if (open) navbar.classList.remove("nav-hidden");
  };
  burger?.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ---- Active nav link ----------------------------------------- */
  const secs = $$("section[id]");
  const anchors = $$('#navLinks a[href^="#"]');
  addEventListener("scroll", () => {
    let cur = "";
    secs.forEach(s => { if (scrollY >= s.offsetTop - 130) cur = s.id; });
    anchors.forEach(a => a.classList.toggle("active-link", a.getAttribute("href") === "#" + cur && !a.classList.contains("nav-cta")));
  }, { passive: true });

  /* ---- Scroll reveal: mark static blocks, then observe all ------ */
  $$(".section-head, .why-card, .step, .show-tile, .pricing-card, .confidential-box, .form-card").forEach(e => e.classList.add("reveal"));
  observe($$(".reveal"));

  /* ---- Star rating input --------------------------------------- */
  let rating = 0;
  (function starInput() {
    const box = $("#starInput"); if (!box) return;
    box.innerHTML = [1, 2, 3, 4, 5].map(n => `<button type="button" data-n="${n}" role="radio" aria-checked="false" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("");
    const paint = (v) => $$("button", box).forEach(b => b.classList.toggle("on", +b.dataset.n <= v));
    box.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; rating = +b.dataset.n; paint(rating); $$("button", box).forEach(x => x.setAttribute("aria-checked", String(+x.dataset.n === rating))); });
    box.addEventListener("mouseover", e => { const b = e.target.closest("button"); if (b) paint(+b.dataset.n); });
    box.addEventListener("mouseleave", () => paint(rating));
  })();

  /* ---- Char counter -------------------------------------------- */
  const fbText = $("#fb-text"), fbCount = $("#fbCount");
  fbText?.addEventListener("input", () => { if (fbCount) fbCount.textContent = fbText.value.length; });

  /* ---- Form helpers / validation ------------------------------- */
  function fieldOf(input) { return input.closest(".field, fieldset.field") || input.parentElement; }
  function markInvalid(input, bad) { fieldOf(input)?.classList.toggle("invalid", bad); }
  function validate(form, required) {
    let ok = true, first = null;
    required.forEach(sel => {
      const inp = $(sel, form); if (!inp) return;
      let bad = false;
      if (inp.type === "checkbox") bad = !inp.checked;
      else if (inp.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
      else bad = !inp.value.trim();
      markInvalid(inp, bad);
      if (bad && !first) first = inp;
      if (bad) ok = false;
    });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    return ok;
  }
  function status(el, msg, good) { el.textContent = msg; el.className = "form-status show " + (good ? "ok" : "bad"); }

  /* ---- Documented placeholder submission ----------------------
     No backend is connected yet. Submissions are composed into a
     WhatsApp message (the live channel) and the structured payload
     is returned for a future API.  Moderation states for feedback:
     "pending" -> "approved" -> "rejected" (owner adds approved
     reviews to EDU.reviews in config.js).                         */
  function openWhatsApp(text) { window.open(waBase + "?text=" + encodeURIComponent(text), "_blank", "noopener"); }

  /* ---- Contact form -------------------------------------------- */
  const cForm = $("#contactForm");
  cForm?.addEventListener("submit", e => {
    e.preventDefault();
    const st = $("#contactStatus");
    if (cForm.website.value) { status(st, "Thank you — your enquiry has been received.", true); cForm.reset(); return; } // honeypot
    if (!validate(cForm, ["#c-name", "#c-email", "#c-desc", '[name="consent"]'])) { status(st, "Please complete the highlighted fields.", false); return; }
    const g = (n) => (cForm[n]?.value || "").trim();
    const msg =
`New enquiry — EduDesign UK
Name: ${g("name")}
Email: ${g("email")}${g("phone") ? "\nPhone: " + g("phone") : ""}
Preferred contact: ${g("preferred")}
I am a: ${g("type")}
Service: ${g("service")}${g("subject") ? "\nSubject/Industry: " + g("subject") : ""}${g("deadline") ? "\nDeadline: " + g("deadline") : ""}${g("scope") ? "\nScope: " + g("scope") : ""}
Details: ${g("description")}${cForm.samples.checked ? "\nRequesting anonymised work samples." : ""}`;
    openWhatsApp(msg);
    status(st, "Thank you. Your enquiry is ready in WhatsApp — press send, and we aim to respond as soon as possible.", true);
    cForm.reset();
  });

  /* ---- Feedback form ------------------------------------------- */
  const fForm = $("#feedbackForm");
  fForm?.addEventListener("submit", e => {
    e.preventDefault();
    const st = $("#feedbackStatus");
    if (fForm.company.value) { status(st, "Thank you for your feedback. It will be reviewed before appearing publicly.", true); fForm.reset(); rating = 0; return; }
    let ok = validate(fForm, ["#fb-name", "#fb-contact", "#fb-service", "#fb-text", '[name="permission"]', '[name="consent"]']);
    if (!rating) { $("#starInput")?.closest(".field")?.classList.add("invalid"); ok = false; }
    if (!ok) { status(st, "Please complete the highlighted fields and add a rating.", false); return; }
    const g = (n) => (fForm[n]?.value || "").trim();
    // Structured review object (status: "pending") for owner moderation:
    const review = { name: g("name"), contact: g("contact"), service: g("service"), rating, text: g("text"), display: fForm.display.value, status: "pending", date: new Date().toISOString().slice(0, 10) };
    openWhatsApp(`New feedback (pending review) — EduDesign UK\nName: ${review.name}\nService: ${review.service}\nRating: ${review.rating}/5\nDisplay as: ${review.display}\nFeedback: ${review.text}`);
    status(st, "Thank you for your feedback. It will be reviewed before appearing publicly.", true);
    fForm.reset(); rating = 0; if (fbCount) fbCount.textContent = "0"; $$("#starInput button").forEach(b => b.classList.remove("on"));
  });

  /* ---- Clear invalid state on input ---------------------------- */
  $$("input, select, textarea").forEach(inp => inp.addEventListener("input", () => markInvalid(inp, false)));

  /* ---- Bind remaining WhatsApp links --------------------------- */
  bindWa(document);

  /* ---- Remove the intro splash once it has faded --------------- */
  setTimeout(() => { const i = document.getElementById("intro"); if (i) i.remove(); }, 2100);
})();
