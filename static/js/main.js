/* ════════════════════════════════════════════════════════════
   EduDesign UK — interactions + render-from-config
   ════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  const C = window.EDU || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  const waNum = (C.business?.whatsapp || "").replace(/\D/g, "");
  const waBase = "https://wa.me/" + waNum;
  const waLink = (k) => waBase + "?text=" + encodeURIComponent((C.whatsappMessages?.[k]) || C.whatsappMessages?.general || "Hello EduDesign UK");
  const bindWa = (root = document) => $$(".wa-link", root).forEach(a => { a.href = waLink(a.dataset.msg || "general"); a.target = "_blank"; a.rel = "noopener"; });

  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Mobile intro splash: bouncing cards/icons, fades on swipe ---- */
  (function splash() {
    const sp = document.getElementById("splash"); if (!sp) return;
    if (!matchMedia("(max-width:600px)").matches) { sp.remove(); return; }
    const defs = [
      { cls: "sp-card sp-cv",   html: '<b>CV</b><span></span><span></span><span class="s"></span>' },
      { cls: "sp-card sp-cv",   html: '<b>CV</b><span></span><span class="s"></span><span></span>' },
      { cls: "sp-card sp-code", html: '<span class="c1"></span><span class="c2"></span><span class="c3"></span>' },
      { cls: "sp-chip pink", html: '<i class="fa-solid fa-graduation-cap"></i>' },
      { cls: "sp-chip blue", html: '<i class="fa-solid fa-code"></i>' },
      { cls: "sp-chip pink", html: '<i class="fa-solid fa-chart-line"></i>' },
      { cls: "sp-chip blue", html: '<i class="fa-solid fa-robot"></i>' },
      { cls: "sp-chip pink", html: '<i class="fa-solid fa-pen-nib"></i>' },
      { cls: "sp-chip blue", html: '<i class="fa-solid fa-file-lines"></i>' }
    ];
    const sgn = () => (Math.random() < 0.5 ? -1 : 1);
    const objs = defs.map(d => {
      const el = document.createElement("div");
      el.className = "sp-float " + d.cls; el.innerHTML = d.html;
      sp.appendChild(el);
      const w = el.offsetWidth || 44, h = el.offsetHeight || 44;
      return { el, w, h,
        x: Math.random() * Math.max(1, sp.clientWidth - w),
        y: Math.random() * Math.max(1, sp.clientHeight - h),
        vx: (0.35 + Math.random() * 0.55) * sgn(),
        vy: (0.35 + Math.random() * 0.55) * sgn(),
        rot: Math.random() * 24 - 12, vr: Math.random() * 0.4 - 0.2 };
    });
    let raf, done = false;
    const tick = () => {
      const W = sp.clientWidth, H = sp.clientHeight;
      for (const o of objs) {
        o.x += o.vx; o.y += o.vy; o.rot += o.vr;
        if (o.x <= 0) { o.x = 0; o.vx = Math.abs(o.vx); } else if (o.x + o.w >= W) { o.x = W - o.w; o.vx = -Math.abs(o.vx); }
        if (o.y <= 0) { o.y = 0; o.vy = Math.abs(o.vy); } else if (o.y + o.h >= H) { o.y = H - o.h; o.vy = -Math.abs(o.vy); }
        o.el.style.transform = `translate(${o.x}px,${o.y}px) rotate(${o.rot}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const hide = () => { if (done) return; done = true; cancelAnimationFrame(raf); sp.classList.add("hide"); setTimeout(() => sp.remove(), 650); };
    ["touchstart", "touchmove", "wheel", "scroll", "click", "keydown"].forEach(ev => window.addEventListener(ev, hide, { once: true, passive: true }));
    setTimeout(hide, 6000);
  })();

  /* reveal observer */
  let io = null;
  function observe(list) {
    if (!("IntersectionObserver" in window)) { list.forEach(e => e.classList.add("visible")); return; }
    if (!io) io = new IntersectionObserver((ents) => ents.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    list.forEach(e => io.observe(e));
  }

  /* ---- Trust strip --------------------------------------------- */
  (function trust() {
    const g = $("#trustGrid"); if (!g || !C.trustStrip) return;
    g.innerHTML = C.trustStrip.map(t => {
      const txt = esc(t.text).replace(/^(\d+)/, '<b class="cnt" data-n="$1">0</b>');
      return `<div class="trust-item"><i class="fa-solid ${esc(t.icon)}"></i><span>${txt}</span></div>`;
    }).join("");
    /* count-up when scrolled into view */
    const counters = $$(".cnt", g);
    if (counters.length && "IntersectionObserver" in window) {
      const cio = new IntersectionObserver(ents => ents.forEach(en => {
        if (!en.isIntersecting) return;
        cio.unobserve(en.target);
        const el = en.target, n = +el.dataset.n, t0 = performance.now(), dur = 1400;
        const step = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }), { threshold: 0, rootMargin: "200px 0px 200px 0px" });
      counters.forEach(c => cio.observe(c));
    } else counters.forEach(c => c.textContent = c.dataset.n);
  })();

  /* ---- Audience cards ------------------------------------------ */
  (function audiences() {
    const g = $("#audienceGrid"), a = C.audiences; if (!g || !a) return;
    const card = (d, cls) => `<article class="aud-card ${cls} reveal">
      <div class="aud-top"><div class="aud-ic"><i class="fa-solid ${esc(d.icon)}"></i></div><h3>${esc(d.title)}</h3></div>
      <p>${esc(d.blurb)}</p>
      <a href="${esc(d.target)}" class="aud-link">${esc(d.cta)} <i class="fa-solid fa-arrow-right"></i></a>
      <div class="aud-feats">${d.features.map(f => `<div class="aud-feat"><i class="fa-solid ${esc(f.icon)}"></i>${esc(f.t)}</div>`).join("")}</div>
    </article>`;
    g.innerHTML = card(a.students, "blue") + card(a.businesses, "yellow");
  })();

  /* ---- Services (summaries) ------------------------------------ */
  (function servicesHome() {
    const g = $("#servicesGrid"); if (!g || !C.services) return;
    g.innerHTML = C.services.map(s => `<article class="svc-card reveal">
      <button class="svc-head" type="button" aria-expanded="false">
        <span class="svc-ic"><i class="fa-solid ${esc(s.icon)}"></i></span>
        <h3>${esc(s.title)}</h3>
        <i class="fa-solid fa-chevron-down svc-chev"></i>
      </button>
      <div class="svc-body">
        <p>${esc(s.summary)}</p>
        <a class="svc-link" href="/services.html#${esc(s.id)}">Learn more <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </article>`).join("");
    g.addEventListener("click", e => {
      if (!matchMedia("(max-width:600px)").matches) return;
      const head = e.target.closest(".svc-head"); if (!head) return;
      const card = head.parentElement, open = card.classList.toggle("open");
      head.setAttribute("aria-expanded", String(open));
    });
  })();

  /* ---- Services FULL accordion (Services page) ----------------- */
  (function servicesAccordion() {
    const wrap = $("#servicesAccordion"); if (!wrap || !C.services) return;
    wrap.innerHTML = C.services.map((s, i) => `<div class="acc-item${i===0?" open":""}" id="${esc(s.id)}">
      <button class="acc-q" aria-expanded="${i===0}"><span class="acc-ic"><i class="fa-solid ${esc(s.icon)}"></i></span><span class="acc-t">${esc(s.title)}</span><i class="fa-solid fa-chevron-down acc-chev"></i></button>
      <div class="acc-a"${i===0?' style="max-height:2200px"':''}><div class="acc-inner">
        <p class="acc-sum">${esc(s.summary)}</p>
        <ul class="acc-list">${s.items.map(it => `<li><i class="fa-solid fa-check"></i> ${esc(it)}</li>`).join("")}</ul>
        ${s.tools ? `<p class="acc-tools"><strong>Tools &amp; tech:</strong> ${s.tools.map(esc).join(" · ")}</p>` : ""}
        <a class="svc-link wa-link" data-msg="${esc(s.whatsapp || "general")}">${esc(s.cta || "Discuss this service")} <i class="fa-solid fa-arrow-right"></i></a>
      </div></div></div>`).join("");
    wrap.addEventListener("click", e => { const q = e.target.closest(".acc-q"); if (!q) return;
      const item = q.parentElement, a = item.querySelector(".acc-a"), open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open)); a.style.maxHeight = open ? a.scrollHeight + "px" : "0"; });
    bindWa(wrap);
    if (location.hash) { const t = wrap.querySelector(location.hash); if (t && t.classList.contains("acc-item")) {
      t.classList.add("open"); const a = t.querySelector(".acc-a"); a.style.maxHeight = a.scrollHeight + "px";
      t.querySelector(".acc-q").setAttribute("aria-expanded","true"); setTimeout(() => t.scrollIntoView({behavior:"smooth",block:"start"}), 300); } }
  })();

  /* ---- Subjects + search (Services page) ----------------------- */
  (function subjects() {
    const g = $("#subjectsGrid"); if (!g || !C.subjects) return;
    g.innerHTML = C.subjects.map(s => `<li data-s="${esc(s.toLowerCase())}">${esc(s)}</li>`).join("");
    const input = $("#subjectSearch"), empty = $("#subjectsEmpty");
    input?.addEventListener("input", () => { const q = input.value.trim().toLowerCase(); let shown = 0;
      $$("li", g).forEach(li => { const ok = li.dataset.s.includes(q); li.style.display = ok ? "" : "none"; if (ok) shown++; });
      if (empty) empty.hidden = shown !== 0; });
  })();

  /* ---- Selected Work ------------------------------------------- */
  (function portfolio() {
    const g = $("#portfolioGrid"); if (!g || !C.portfolio) return;
    g.innerHTML = C.portfolio.map(p => `<article class="work-card reveal">
      <div class="work-thumb">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">` : `<i class="fa-solid fa-${esc(p.icon || "star")}"></i>`}</div>
      <h3>${esc(p.title)}</h3><span class="work-cat">${esc(p.category)}</span></article>`).join("");
    observe($$(".reveal", g));
  })();

  /* ---- FAQs ----------------------------------------------------- */
  (function faqs() {
    const wrap = $("#faqList"); if (!wrap || !C.faqs) return;
    wrap.innerHTML = C.faqs.map((f, i) => `<div class="faq-item">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}"><span>${esc(f.q)}</span><i class="fa-solid fa-chevron-down"></i></button>
      <div class="faq-a" id="faq-a-${i}"><p>${esc(f.a)}</p></div></div>`).join("");
    wrap.addEventListener("click", e => { const q = e.target.closest(".faq-q"); if (!q) return;
      const item = q.parentElement, a = item.querySelector(".faq-a"), open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", String(open)); a.style.maxHeight = open ? a.scrollHeight + "px" : "0"; });
  })();

  /* ---- Footer social + policies + contact info ----------------- */
  (function chrome() {
    const b = C.business || {};
    const social = [
      b.whatsapp && { icon: "fa-brands fa-whatsapp", href: waLink("general"), label: "WhatsApp" },
      b.instagram && { icon: "fa-brands fa-instagram", href: b.instagram, label: "Instagram" },
      b.facebook && { icon: "fa-brands fa-facebook-f", href: b.facebook, label: "Facebook" },
      b.email && { icon: "fa-solid fa-envelope", href: "mailto:" + b.email, label: "Email" }
    ].filter(Boolean);
    const fs = $("#footerSocial"); if (fs) fs.innerHTML = social.map(s => `<a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}"><i class="${s.icon}"></i></a>`).join("");
    const fp = $("#footerPolicies"); if (fp) fp.innerHTML = (C.policies || []).map(p => `<li><a href="${esc(p.url)}">${esc(p.title)}</a></li>`).join("");
    const ci = $("#contactInfoList");
    if (ci) {
      const wa2 = b.whatsapp2 ? "https://wa.me/" + b.whatsapp2.replace(/\D/g, "") : "";
      ci.innerHTML =
        (b.email ? `<li><i class="fa-solid fa-envelope"></i> <a href="mailto:${esc(b.email)}">${esc(b.email)}</a></li>` : "") +
        (b.whatsapp ? `<li><i class="fa-brands fa-whatsapp"></i> <a href="${waLink("general")}" target="_blank" rel="noopener">${esc(formatPhone(b.whatsapp))}</a></li>` : "") +
        (wa2 ? `<li><i class="fa-brands fa-whatsapp"></i> <a href="${wa2}" target="_blank" rel="noopener">${esc(formatPhone(b.whatsapp2))}</a></li>` : "") +
        (b.instagram ? `<li><i class="fa-brands fa-instagram"></i> <a href="${esc(b.instagram)}" target="_blank" rel="noopener">@edudesign_assignments_helper</a></li>` : "");
    }
  })();
  function formatPhone(n) { const d = String(n).replace(/\D/g, ""); return "+" + d; }

  /* ---- Service selects ----------------------------------------- */
  (function selects() {
    const opts = (C.services || []).map(s => `<option>${esc(s.title)}</option>`).join("") + `<option>Other</option>`;
    ["#c-service", "#fb-service"].forEach(sel => { const e = $(sel); if (e) e.insertAdjacentHTML("beforeend", opts); });
  })();

  /* ---- Navbar: scroll + auto hide/show + progress bar ----------- */
  const navbar = $("#navbar"), navLinks = $("#navLinks"), progress = $("#scrollProgress");
  let lastY = scrollY, navTick = false;
  function onScroll() { if (navTick) return; navTick = true; requestAnimationFrame(() => {
    const y = scrollY; navbar.classList.toggle("scrolled", y > 16);
    if (progress) { const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (max > 0 ? Math.min(y / max * 100, 100) : 0) + "%"; }
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

  /* ---- Active nav link ----------------------------------------- */
  const secs = $$("section[id]"), anchors = $$('#navLinks a[href^="#"]');
  if (secs.length) addEventListener("scroll", () => { let cur = "";
    secs.forEach(s => { if (scrollY >= s.offsetTop - 130) cur = s.id; });
    anchors.forEach(a => a.classList.toggle("active-link", a.getAttribute("href") === "#" + cur && !a.classList.contains("nav-cta"))); }, { passive: true });

  /* ---- Reveal -------------------------------------------------- */
  $$(".section-head, .svc-card, .aud-card, .pstep, .proof-card, .qb-card, .trust-card, .cta-card, .panel, .acc-item").forEach(e => e.classList.add("reveal"));
  observe($$(".reveal"));

  /* ---- Validation helpers -------------------------------------- */
  const fieldOf = (i) => i.closest(".field") || i.parentElement;
  const markInvalid = (i, bad) => fieldOf(i)?.classList.toggle("invalid", bad);
  function validate(form, required) { let ok = true, first = null;
    required.forEach(sel => { const inp = $(sel, form); if (!inp) return; let bad;
      if (inp.type === "checkbox") bad = !inp.checked; else bad = !inp.value.trim();
      markInvalid(inp, bad); if (bad && !first) first = inp; if (bad) ok = false; });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" }); return ok; }
  const status = (el, msg, good) => { el.textContent = msg; el.className = "form-status show " + (good ? "ok" : "bad"); };
  const openWA = (text) => window.open(waBase + "?text=" + encodeURIComponent(text), "_blank", "noopener");

  /* ---- Contact / message form ---------------------------------- */
  const cForm = $("#contactForm");
  cForm?.addEventListener("submit", e => { e.preventDefault(); const st = $("#contactStatus");
    if (cForm.website.value) { status(st, "Thank you — your message has been received.", true); cForm.reset(); return; }
    if (!validate(cForm, ["#c-name", "#c-contact", "#c-msg", '[name="consent"]'])) { status(st, "Please complete the highlighted fields.", false); return; }
    const g = (n) => (cForm[n]?.value || "").trim();
    openWA(`New enquiry — EduDesign UK\nName: ${g("name")}\nContact: ${g("contact")}${g("service") ? "\nService: " + g("service") : ""}\nMessage: ${g("message")}`);
    status(st, "Thank you. Your message is ready in WhatsApp — press send, and we aim to respond as soon as possible.", true);
    cForm.reset();
  });

  /* ---- Feedback form (only if present) ------------------------- */
  let rating = 0;
  (function starInput() { const box = $("#starInput"); if (!box) return;
    box.innerHTML = [1,2,3,4,5].map(n => `<button type="button" data-n="${n}" aria-label="${n} star">★</button>`).join("");
    const paint = (v) => $$("button", box).forEach(b => b.classList.toggle("on", +b.dataset.n <= v));
    box.addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; rating = +b.dataset.n; paint(rating); });
    box.addEventListener("mouseover", e => { const b = e.target.closest("button"); if (b) paint(+b.dataset.n); });
    box.addEventListener("mouseleave", () => paint(rating)); })();

  $$("input, select, textarea").forEach(inp => inp.addEventListener("input", () => markInvalid(inp, false)));
  bindWa(document);
})();
