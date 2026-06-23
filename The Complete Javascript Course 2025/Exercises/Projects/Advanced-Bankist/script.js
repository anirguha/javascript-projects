'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const tabContainer = document.querySelectorAll('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Navigation of sections by clicking the top row options (Features, Operations, Testimnials) (using event delegation)
navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  const link = e.target.closest('.nav__link');
  if (!link) return;

  const sectionId = link.getAttribute('href');
  if (!sectionId) return;

  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// Tab Navigation
tabs.forEach((t) => {
  t.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    tabs.forEach((t) => t.classList.remove('operations__tab--active'));
    tabContents.forEach((t) =>
      t.classList.remove('operations__content--active')
    );

    clicked.classList.add('operations__tab--active');

    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add('operations__content--active');
  });
});

// Menu Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;

    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== clicked) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.3));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation

const navHeight = nav.getBoundingClientRect().height;
const stickyStart = header.getBoundingClientRect().height - navHeight;

const stickyNav = function () {
  if (window.scrollY > stickyStart) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

window.addEventListener('scroll', stickyNav, { passive: true });
stickyNav();

// Revealing Sections on scroll
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
}; // Function to trigger once the trigget for the Intersection Observer is reached

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
}); // Defince the Interesection Observer

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
}); // Instantiate the Intersection Observer

// Ensure placeholders are visibly blurred before high-res images are loaded.
imgTargets.forEach((img) => img.classList.add('lazy-img'));

// Lazy loading images
const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '0px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Slider function
let curslide = 0;
const maxSlide = slides.length;

// slider.style.overflow = 'hidden';

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const createDots = () => {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (slide) => {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

const nextSlide = () => {
  if (curslide === maxSlide - 1) curslide = 0;
  else curslide++;
  goToSlide(curslide);
  activateDot(curslide);
};

const prevSlide = () => {
  if (curslide === 0) curslide = maxSlide - 1;
  else curslide--;
  goToSlide(curslide);
  activateDot(curslide);
};

// Navigate to the next slide
btnRight.addEventListener('click', nextSlide);

// Navigate to the previous slide
btnLeft.addEventListener('click', prevSlide);

// Navigating through slides using arrow keys
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
});

dotContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.dots__dot');
  if (!clicked) return;

  const { slide } = clicked.dataset;
  curslide = Number(slide);
  goToSlide(curslide);
  activateDot(curslide);
});
