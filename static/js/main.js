/* ════════════════════════════════════════════
   edudesign_uk by Noor — Interactions
   ════════════════════════════════════════════ */

// ── Navbar: shadow on scroll + smooth auto hide/show by direction ──
const navbar = document.getElementById('navbar');
let lastY = window.scrollY;
let navTicking = false;
const onScroll = () => {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);
    // Hide when scrolling down past the hero, reveal when scrolling up.
    // Never hide while the full-screen menu is open (body scroll is locked then).
    const menuOpen = document.body.style.overflow === 'hidden';
    if (!menuOpen && y > 400 && y > lastY + 6) {
      navbar.classList.add('nav-hidden');
    } else if (y < lastY - 6 || y < 400) {
      navbar.classList.remove('nav-hidden');
    }
    lastY = y;
    navTicking = false;
  });
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const setMenu = (open) => {
  navLinks.classList.toggle('open', open);
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  // Lock background scroll while the full-screen menu is open
  document.body.style.overflow = open ? 'hidden' : '';
  // Make sure the navbar (with the close button) is visible when opening
  if (open) navbar.classList.remove('nav-hidden');
};
hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
// Close on Escape
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// ── Scroll reveal (staggered) ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── Animated number counters ──
const animateCount = (el) => {
  const target = Number(el.dataset.target) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ── Active nav link highlight on scroll ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const highlightNav = () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

// ── Subtle parallax on hero blobs (desktop only — skipped on phones for smoothness) ──
const blobs = document.querySelectorAll('.blob');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (window.innerWidth > 680 && !prefersReduced) {
  let blobTicking = false;
  window.addEventListener('scroll', () => {
    if (blobTicking) return;
    blobTicking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        blobs.forEach((blob, i) => {
          blob.style.transform = `translateY(${y * (0.08 + i * 0.04)}px)`;
        });
      }
      blobTicking = false;
    });
  }, { passive: true });
}
