// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').style.display = 'none', 800);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Counters
const counters = document.querySelectorAll('.num');
const runCounter = (el) => {
  const target = +el.dataset.count;
  const step = Math.max(1, Math.floor(target / 60));
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = cur;
  }, 16);
};
setTimeout(() => counters.forEach(runCounter), 1000);

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => io.observe(r));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
