// Страница полностью работает и без этого файла — здесь только приятные мелочи.
document.documentElement.classList.add('js');

// Год в подвале
document.getElementById('year').textContent = new Date().getFullYear();

// Тонкая линия под шапкой, когда страница прокручена
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Плавное появление блоков при прокрутке
const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || reduceMotion) {
  revealItems.forEach((el) => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  revealItems.forEach((el) => revealObserver.observe(el));
}

// Подсветка текущего раздела в меню (видно на компьютере)
const navLinks = document.querySelectorAll('.nav a');
const sections = [...navLinks].map((a) => document.querySelector(a.getAttribute('href')));

if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach((s) => s && navObserver.observe(s));
}
