/* ── Smooth scroll ── */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── Nav: add scrolled class ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

// Close menu when any nav item is clicked
mobileMenu.querySelectorAll('span').forEach(span => {
  span.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── Scroll-reveal ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || '0', 10);
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Spores: generate floating dots ── */
document.querySelectorAll('.spores').forEach(container => {
  const count = parseInt(container.dataset.count || '8', 10);
  const color = container.dataset.color || '#6b8f4e';

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'spore';

    const size    = 5 + (i % 4) * 4;
    const opacity = (0.09 + (i % 3) * 0.05).toFixed(2);
    const top     = (8 + (i * 11) % 82).toFixed(1);
    const left    = (3 + (i * 19) % 92).toFixed(1);
    const dur     = (7 + i * 0.8).toFixed(1);
    const anim    = `sf${i % 3}`;

    dot.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `background:${color}`,
      `opacity:${opacity}`,
      `top:${top}%`,
      `left:${left}%`,
      `animation:${anim} ${dur}s ease-in-out infinite`,
    ].join(';');

    container.appendChild(dot);
  }
});
