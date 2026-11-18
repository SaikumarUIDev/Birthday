const intro = document.getElementById('intro');
document.getElementById('openInvitation').addEventListener('click', () => {
  intro.classList.add('hide');
  document.body.classList.add('celebration-open');
  window.setTimeout(() => intro.remove(), 900);
});
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
document.querySelectorAll('.question-card').forEach(card => {
  card.addEventListener('click', () => {
    const open = card.classList.toggle('open');
    card.setAttribute('aria-expanded', String(open));
    if (open && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const heart = document.createElement('span');
      heart.textContent = '♡';
      heart.className = 'answer-pop';
      Object.assign(heart.style, {position:'absolute', color:'#ed168d', fontSize:'22px', right:'18px', top:'-8px', pointerEvents:'none', animation:'pop .5s ease'});
      card.style.position = 'relative';
      card.appendChild(heart);
      setTimeout(() => heart.remove(), 650);
    }
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 100}ms`;
  observer.observe(el);
});
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 500);
  const sections = [...document.querySelectorAll('main section[id]')];
  let current = 'home';
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 160) current = section.id; });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}, {passive:true});
backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// PHOTO REPLACEMENT GUIDE:
// Replace the image src values in index.html with your own local files, e.g. assets/saanvika-hero.jpg.
// Keep object-fit: cover in style.css to preserve the scrapbook frames.
