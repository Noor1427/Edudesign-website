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
      <div class="work-thumb"><i class="fa-solid fa-${esc(p.icon || "star")}"></i>${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.remove()">` : ""}</div>
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

  /* ---- Mobile showcase: auto-swiping carousel ------------------- */
  (function mobShow() {
    const track = $("#mobTrack"); if (!track || !matchMedia("(max-width:600px)").matches) return;
    const cards = $$(".ms-slide", track), dots = $("#mobDots");
    if (dots) dots.innerHTML = cards.map((_, i) => `<i${i === 0 ? ' class="on"' : ""}></i>`).join("");
    let idx = 0, paused = false, pauseT;
    const center = (el) => el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;
    setInterval(() => { if (paused || document.hidden) return;
      idx = (idx + 1) % cards.length;
      track.scrollTo({ left: center(cards[idx]), behavior: "smooth" }); }, 3000);
    track.addEventListener("touchstart", () => { paused = true; clearTimeout(pauseT); }, { passive: true });
    track.addEventListener("touchend", () => { pauseT = setTimeout(() => paused = false, 4000); }, { passive: true });
    /* bubble effect: active slide pops, neighbours shrink; image parallax */
    const paint = () => {
      const c = track.scrollLeft + track.clientWidth / 2;
      cards.forEach(el => {
        const d = (el.offsetLeft + el.clientWidth / 2 - c) / track.clientWidth;
        const t = Math.max(0, 1 - Math.abs(d));
        el.style.transform = `scale(${(0.9 + 0.1 * t).toFixed(3)})`;
        const img = el.querySelector("img");
        if (img) img.style.transform = `scale(${(1.18 - 0.18 * t).toFixed(3)}) translateX(${(-d * 26).toFixed(1)}px)`;
        const cap = el.querySelector("figcaption");
        if (cap) cap.style.opacity = (0.1 + 0.9 * t).toFixed(2);
      });
    };
    paint();
    track.addEventListener("scroll", () => {
      paint();
      const c = track.scrollLeft + track.clientWidth / 2;
      let best = 0, bd = 1e9;
      cards.forEach((el, i) => { const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - c); if (d < bd) { bd = d; best = i; } });
      idx = best;
      if (dots) $$("i", dots).forEach((d, i) => d.classList.toggle("on", i === best));
    }, { passive: true });
  })();

  /* ---- Pen trail: zig-zag pink line drawn down the page --------- */
  const trail = $("#penTrail"), trailPath = $("#penTrailPath"), trailPen = $("#penTrailPen");
  let trailLen = 0, doodleEls = [];
  const SVGNS = "http://www.w3.org/2000/svg";
  /* cute doodle shapes (path centred at cx,cy, radius s) */
  const doodleD = {
    heart: (x, y, s) => `M ${x} ${y + s} C ${x - s * 1.5} ${y - s * 0.2}, ${x - s * 0.55} ${y - s}, ${x} ${y - s * 0.3} C ${x + s * 0.55} ${y - s}, ${x + s * 1.5} ${y - s * 0.2}, ${x} ${y + s} Z`,
    bow: (x, y, s) => `M ${x} ${y} C ${x - s * 1.7} ${y - s}, ${x - s * 1.7} ${y + s}, ${x} ${y} C ${x + s * 1.7} ${y - s}, ${x + s * 1.7} ${y + s}, ${x} ${y} Z`,
    fly: (x, y, s) => `M ${x} ${y} C ${x - s * 1.7} ${y - s * 1.3}, ${x - s * 1.7} ${y - s * 0.1}, ${x} ${y} C ${x - s * 1.2} ${y + s * 1.4}, ${x - s * 0.1} ${y + s * 1.4}, ${x} ${y} C ${x + s * 0.1} ${y + s * 1.4}, ${x + s * 1.2} ${y + s * 1.4}, ${x} ${y} C ${x + s * 1.7} ${y - s * 0.1}, ${x + s * 1.7} ${y - s * 1.3}, ${x} ${y}`,
    swirl: (x, y, s) => `M ${x} ${y} C ${x} ${y - s * 0.7} ${x + s} ${y - s * 0.7} ${x + s} ${y} C ${x + s} ${y + s * 1.1} ${x - s} ${y + s * 1.1} ${x - s} ${y} C ${x - s} ${y - s * 1.6} ${x + s * 1.6} ${y - s * 1.6} ${x + s * 1.6} ${y}`,
    star: (x, y, s) => { let p = ""; for (let i = 0; i < 11; i++) { const r = i % 2 ? s * 0.45 : s, a = (-90 + i * 36) * Math.PI / 180; p += (i ? "L" : "M") + ` ${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)} `; } return p + "Z"; },
    flower: (x, y, s) => { let p = ""; for (let i = 0; i < 5; i++) { const a = (i * 72 - 90) * Math.PI / 180, ox = x + Math.cos(a) * s, oy = y + Math.sin(a) * s, lx = x + Math.cos(a - .6) * s * .55, ly = y + Math.sin(a - .6) * s * .55, rx = x + Math.cos(a + .6) * s * .55, ry = y + Math.sin(a + .6) * s * .55; p += `M ${x} ${y} C ${lx.toFixed(1)} ${ly.toFixed(1)}, ${ox.toFixed(1)} ${oy.toFixed(1)}, ${ox.toFixed(1)} ${oy.toFixed(1)} C ${ox.toFixed(1)} ${oy.toFixed(1)}, ${rx.toFixed(1)} ${ry.toFixed(1)}, ${x} ${y} `; } return p; }
  };
  const doodleKinds = ["heart", "bow", "fly", "star", "swirl", "flower"];
  function buildTrail() {
    if (!trail || !trailPath) return;
    const doc = document.documentElement, H = doc.scrollHeight, W = doc.clientWidth;
    trail.setAttribute("width", W);
    trail.setAttribute("height", H);
    /* route: run down the side gutters (clear of text), and swing across the
       page only inside the whitespace gaps between content blocks */
    const blocks = $$("main > section, main > .marquee, body > footer");
    const sY = scrollY;
    const inner = (b) => { const c = b.querySelector(":scope > .container") || b;
      const r = c.getBoundingClientRect(); return { top: r.top + sY, bottom: r.bottom + sY }; };
    const Lx = 9, Rx = W - 9;
    /* crossings rendered as S-curves with vertical tangents at both ends, so
       they join the straight gutter runs with no corner — flows like handwriting */
    let side = 1, d = `M ${Rx} 0`, prev = null;
    const gaps = [];
    blocks.forEach((b) => {
      if (b.getBoundingClientRect().height < 2) return; /* skip hidden sections */
      if (!prev) { prev = inner(b); return; }
      const cur = inner(b), gapTop = prev.bottom, gapBot = cur.top, gapH = gapBot - gapTop;
      if (gapH >= 18) {
        const mid = (gapTop + gapBot) / 2, m = Math.round(mid);
        const h = Math.min(56, Math.max(10, gapH / 2 - 4));
        const x1 = side ? Rx : Lx, x2 = side ? Lx : Rx;
        const y1 = Math.round(mid - h), y2 = Math.round(mid + h);
        /* clean, corner-free S-curve crossing (pen draws smoothly + stays centred) */
        d += ` L ${x1} ${y1} C ${x1} ${m}, ${x2} ${m}, ${x2} ${y2}`;
        if (gapH >= 40) gaps.push({ y1, y2 });
        side = 1 - side;
      }
      prev = cur;
    });
    d += ` L ${side ? Rx : Lx} ${H}`;
    trailPath.setAttribute("d", d);
    trailLen = trailPath.getTotalLength();
    trailPath.style.strokeDasharray = trailLen;
    buildDoodles(gaps);
    updTrail();
  }
  function buildDoodles(gaps) {
    doodleEls.forEach(o => o.el.remove());
    doodleEls = [];
    gaps.forEach((g, i) => {
      /* sample a point ALONG the pen's S-curve crossing, so the doodle sits
         exactly where the pen tip passes (left / centre / right varies by gap) */
      const fy = [0.34, 0.66, 0.5, 0.4, 0.62, 0.3, 0.7, 0.56][i % 8];
      const sampleY = g.y1 + (g.y2 - g.y1) * fy;
      const atLen = lenForY(sampleY);                 /* pen-tip length at this spot */
      const pt = trailPath.getPointAtLength(atLen);
      const kind = doodleKinds[(i * 3 + 1) % doodleKinds.length];
      const s = 15 + ((i * 37) % 11);                 /* 15–25px, varied */
      const rot = ((i * 53) % 30) - 15;               /* gentle tilt */
      const x = Math.round(pt.x), y = Math.round(pt.y);
      const el = document.createElementNS(SVGNS, "path");
      el.setAttribute("d", doodleD[kind](x, y, s));
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", "url(#trailGrad)");
      el.setAttribute("stroke-width", "2.4");
      el.setAttribute("stroke-linecap", "round");
      el.setAttribute("stroke-linejoin", "round");
      el.setAttribute("transform", `rotate(${rot} ${x} ${y})`);
      el.style.filter = "drop-shadow(0 2px 4px rgba(199,93,134,.25))";
      trail.insertBefore(el, trailPen);
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.opacity = "0";
      doodleEls.push({ el, atLen, len });
    });
  }
  function lenForY(targetY) {
    /* find path length whose point sits at targetY (path y is ~monotonic) */
    let lo = 0, hi = trailLen;
    for (let i = 0; i < 18; i++) {
      const m = (lo + hi) / 2;
      if (trailPath.getPointAtLength(m).y < targetY) lo = m; else hi = m;
    }
    return (lo + hi) / 2;
  }
  function updTrail() {
    if (!trailLen) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - innerHeight;
    const t = max > 0 ? Math.min(scrollY / max, 1) : 0;
    /* keep the pen tip riding near the centre of the screen */
    const targetY = Math.min(scrollY + innerHeight * (0.22 + 0.56 * t), doc.scrollHeight);
    const drawn = t >= 1 ? trailLen : (scrollY <= 0 ? Math.min(lenForY(targetY), trailLen * 0.02) : lenForY(targetY));
    trailPath.style.strokeDashoffset = trailLen - drawn;
    const pt = trailPath.getPointAtLength(drawn);
    if (trailPen) {
      /* tilt the pen into the curve like a writing hand */
      const pb = trailPath.getPointAtLength(Math.max(drawn - 12, 0));
      const ang = Math.atan2(pt.y - pb.y, pt.x - pb.x) * 180 / Math.PI;
      const tilt = Math.max(-30, Math.min(30, (ang - 90) * 0.6));
      trailPen.setAttribute("transform", `translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)}) rotate(${tilt.toFixed(1)})`);
    }
    /* each doodle is drawn BY the pen: it blooms exactly as the pen tip's
       drawn length sweeps through the doodle's spot on the path */
    for (const dd of doodleEls) {
      const p = Math.max(0, Math.min(1, (drawn - (dd.atLen - 8)) / 70));
      dd.el.style.strokeDashoffset = dd.len * (1 - p);
      dd.el.style.opacity = p < 0.04 ? "0" : "1";
    }
  }
  if (trail) {
    buildTrail();
    addEventListener("resize", buildTrail);
    if ("ResizeObserver" in window) new ResizeObserver(() => buildTrail()).observe(document.body);
  }

  /* ---- Navbar: scroll + auto hide/show -------------------------- */
  const navbar = $("#navbar"), navLinks = $("#navLinks");
  const parCollage = $(".hero .collage"), parShow = $(".mob-show");
  let lastY = scrollY, navTick = false;
  function onScroll() { if (navTick) return; navTick = true; requestAnimationFrame(() => {
    const y = scrollY; navbar.classList.toggle("scrolled", y > 16);
    updTrail();
    /* gentle hero parallax (depth) */
    if (y < innerHeight * 1.8) {
      if (parCollage) parCollage.style.translate = `0 ${(y * 0.1).toFixed(1)}px`;
      if (parShow) parShow.style.translate = `0 ${(y * 0.08).toFixed(1)}px`;
    }
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
  $$(".section-head, .svc-card, .aud-card, .pstep, .proof-card, .qb-card, .trust-card, .cta-card, .panel, .acc-item, .faq-item, .footer-grid").forEach(e => e.classList.add("reveal"));
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

  /* ════════ PREMIUM INTERACTIVE ANIMATION SUITE ════════ */

  // Utilities
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

  // 1. DOM Injection
  const transitionOverlay = document.createElement("div");
  transitionOverlay.className = "page-transition-overlay";
  document.body.appendChild(transitionOverlay);

  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  const sparkleCanvas = document.createElement("canvas");
  sparkleCanvas.id = "sparkleCanvas";
  document.body.appendChild(sparkleCanvas);
  const sCtx = sparkleCanvas.getContext("2d");

  // Resize canvas helpers
  const resizeSparkleCanvas = () => {
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
  };
  resizeSparkleCanvas();
  window.addEventListener("resize", resizeSparkleCanvas);

  // 2. Smooth Page Transitions
  setTimeout(() => {
    transitionOverlay.classList.add("fade-in");
  }, 50);

  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    const target = anchor.getAttribute("target");

    // Filter out external, download, and anchor links
    if (
      !href ||
      target === "_blank" ||
      href.startsWith("#") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("javascript:") ||
      href.includes("wa.me") ||
      href.includes("whatsapp.com") ||
      anchor.hasAttribute("download")
    ) {
      return;
    }

    e.preventDefault();
    transitionOverlay.classList.remove("fade-in");
    transitionOverlay.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = href;
    }, 320);
  });

  // 3. Glassy Cursor Glow Easing
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
  let isMouseMoving = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMouseMoving) {
      isMouseMoving = true;
      document.body.classList.add("mouse-active");
    }
  });

  const runGlowLoop = () => {
    glowX = lerp(glowX, mouseX, 0.07);
    glowY = lerp(glowY, mouseY, 0.07);
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
    requestAnimationFrame(runGlowLoop);
  };
  requestAnimationFrame(runGlowLoop);

  // 4. Scroll Progress Indicator & Navbar Progress
  const nav = $("#navbar");
  if (nav) {
    const progress = document.createElement("div");
    progress.className = "nav-scroll-progress";
    nav.appendChild(progress);

    const updateScrollProgress = () => {
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - window.innerHeight)) * 100;
      nav.style.setProperty("--scroll-pct", `${pct.toFixed(2)}%`);
    };
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  // 5. 3D Card Tilt & Glare Math
  const cards = $$(".svc-card, .work-card, .aud-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      
      const rx = ((py - 50) / 50) * -8; // max degrees
      const ry = ((px - 50) / 50) * 8;
      
      card.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      card.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      card.style.setProperty("--mx", `${px.toFixed(1)}%`);
      card.style.setProperty("--my", `${py.toFixed(1)}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });

  // 6. Magnetic Buttons
  const buttons = $$(".btn-primary, .btn-accent, .floating-whatsapp, .hamburger");
  const magnetForces = new Map();
  buttons.forEach(btn => magnetForces.set(btn, { bx: 0, by: 0, tx: 0, ty: 0 }));

  document.addEventListener("mousemove", (e) => {
    const isMobile = window.innerWidth <= 600;
    if (isMobile) return;

    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      const dx = e.clientX - btnX;
      const dy = e.clientY - btnY;
      const dist = Math.hypot(dx, dy);
      const force = magnetForces.get(btn);

      if (dist < 85) {
        const pull = (85 - dist) / 85 * 14; // max 14px pull
        force.tx = (dx / dist) * pull;
        force.ty = (dy / dist) * pull;
      } else {
        force.tx = 0;
        force.ty = 0;
      }
    });
  });

  const runMagnetLoop = () => {
    buttons.forEach(btn => {
      const force = magnetForces.get(btn);
      force.bx = lerp(force.bx, force.tx, 0.1);
      force.by = lerp(force.by, force.ty, 0.1);
      btn.style.setProperty("--bx", `${force.bx.toFixed(1)}px`);
      btn.style.setProperty("--by", `${force.by.toFixed(1)}px`);
    });
    requestAnimationFrame(runMagnetLoop);
  };
  requestAnimationFrame(runMagnetLoop);

  // 7. Text Node word-splitter utility
  const splitTextNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const words = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();
      words.forEach(word => {
        if (word.trim() === "") {
          fragment.appendChild(document.createTextNode(word));
        } else {
          const wrapper = document.createElement("span");
          wrapper.className = "reveal-word-wrap";
          const inner = document.createElement("span");
          inner.className = "reveal-word";
          inner.textContent = word;
          wrapper.appendChild(inner);
          fragment.appendChild(wrapper);
        }
      });
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName !== "SCRIPT" && node.tagName !== "STYLE" && !node.classList.contains("reveal-word-wrap")) {
        Array.from(node.childNodes).forEach(splitTextNode);
      }
    }
  };

  // Split text inside key titles
  const heroTitle = $(".hero-title");
  if (heroTitle) {
    splitTextNode(heroTitle);
    setTimeout(() => heroTitle.classList.add("revealed"), 150);
  }
  $$(".section-title").forEach(title => {
    splitTextNode(title);
  });

  // 8. Hero Particles Emitter Canvas
  const heroSec = $(".hero");
  if (heroSec) {
    const canvas = document.createElement("canvas");
    canvas.id = "heroParticlesCanvas";
    heroSec.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = heroSec.clientWidth;
      canvas.height = heroSec.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    if ("ResizeObserver" in window) {
      new ResizeObserver(() => resizeCanvas()).observe(heroSec);
    }

    const symbols = ["🎓", "💻", "📊", "⭐", "⚙️", "📚", "🚀", "💡"];
    const colors = ["#FF6B93", "#2563EB", "#FFE8A3", "#E6F1FF"];
    const particles = [];

    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 14 + Math.random() * 12,
        symbol: symbols[i % symbols.length],
        color: colors[i % colors.length],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        opacity: 0.12 + Math.random() * 0.18
      });
    }

    const runParticlesLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isMobile = window.innerWidth <= 600;

      const hRect = heroSec.getBoundingClientRect();
      const hMouseX = mouseX - hRect.left;
      const hMouseY = mouseY - hRect.top;

      particles.forEach(p => {
        if (!isMobile && mouseX > 0 && mouseY > 0 && hMouseX > 0 && hMouseY > 0) {
          const dx = p.x - hMouseX;
          const dy = p.y - hMouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.4;
            p.vx += (dx / dist) * force * 0.1;
            p.vy += (dy / dist) * force * 0.1;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx + (Math.random() - 0.5) * 0.05;
        p.y += p.vy + (Math.random() - 0.5) * 0.05;
        p.rotation += p.rotSpeed;

        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
        else if (p.x > canvas.width) { p.x = canvas.width; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
        else if (p.y > canvas.height) { p.y = canvas.height; p.vy = -Math.abs(p.vy); }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px Inter, sans-serif`;
        ctx.fillStyle = p.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      requestAnimationFrame(runParticlesLoop);
    };
    requestAnimationFrame(runParticlesLoop);
  }

  // 9. Sparkle Click Emitter Logic
  const activeSparkles = [];
  class Sparkle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 7.5;
      this.vy = (Math.random() - 0.5) * 7.5 - 2;
      this.size = 3 + Math.random() * 5;
      this.color = color || "#FF6B93";
      this.life = 1.0;
      this.decay = 0.025 + Math.random() * 0.02;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.12;
      this.vx *= 0.96;
      this.life -= this.decay;
    }
    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const runSparkleLoop = () => {
    sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
    for (let i = activeSparkles.length - 1; i >= 0; i--) {
      const sp = activeSparkles[i];
      sp.update();
      if (sp.life <= 0) {
        activeSparkles.splice(i, 1);
      } else {
        sp.draw(sCtx);
      }
    }
    requestAnimationFrame(runSparkleLoop);
  };
  requestAnimationFrame(runSparkleLoop);

  document.addEventListener("click", (e) => {
    const el = e.target;
    if (
      el.closest(".stars-input button") ||
      el.closest(".btn-accent") ||
      el.closest(".btn-primary") ||
      el.closest(".wa-link") ||
      el.closest(".hamburger")
    ) {
      const colors = ["#FF6B93", "#2563EB", "#FFE8A3", "#3b82f6", "#fca5c0"];
      for (let i = 0; i < 18; i++) {
        activeSparkles.push(new Sparkle(e.clientX, e.clientY, colors[i % colors.length]));
      }
    }
  });
})();

