// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Set correct photo on load
const pic = document.getElementById('profile-pic');
if (pic) {
  pic.src = localStorage.getItem('theme') === 'light'
    ? '/src/assets/images/kenneth-light.jpg'
    : '/src/assets/images/kenneth-dark.png';
}

// Check saved preference
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLight = body.classList.contains('light-mode');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  // ===== SWAP PROFILE PICTURE =====
  const pic = document.getElementById('profile-pic');
  if (pic) {
    pic.src = isLight
      ? '/src/assets/images/kenneth-light.jpg'
      : '/src/assets/images/kenneth-dark.png';
  }

  // ===== INSTANTLY UPDATE NAVBAR COLOR =====
  if (window.scrollY > 50) {
    navbar.style.background = isLight
      ? 'rgba(255,255,255,0.98)'
      : 'rgba(10,10,15,0.98)';
  } else {
    navbar.style.background = isLight
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(10,10,15,0.85)';
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const isLight = document.body.classList.contains('light-mode');
  if (window.scrollY > 50) {
    navbar.style.background = isLight
      ? 'rgba(255,255,255,0.98)'
      : 'rgba(10,10,15,0.98)';
  } else {
    navbar.style.background = isLight
      ? 'rgba(255,255,255,0.92)'
      : 'rgba(10,10,15,0.85)';
  }
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.project-card, .skill-item, .about-grid, .contact-links'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// ===== TYPED HERO TEXT =====
const typedEl = document.querySelector('#typed');
const words = ['Developer.', 'Designer.', 'Creator.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = words[wordIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();

// ===== TOUCH: CARD FLIP =====
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
  document.querySelectorAll('.project-card.has-preview').forEach(card => {
    card.addEventListener('click', () => {
      const isFlipped = card.classList.contains('touch-flipped');
      document.querySelectorAll('.project-card.has-preview.touch-flipped').forEach(c => c.classList.remove('touch-flipped'));
      if (!isFlipped) card.classList.add('touch-flipped');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.project-card.has-preview')) {
      document.querySelectorAll('.project-card.has-preview.touch-flipped').forEach(c => c.classList.remove('touch-flipped'));
    }
  });
}

// ===== CUSTOM CURSOR =====
if (window.matchMedia('(pointer: fine)').matches) {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '';
    ring.style.opacity = '';
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-clicking'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-clicking'));

  document.addEventListener('mouseover', e => {
    const isInteractive = e.target.closest('a, button, .project-card, .skill-category, .timeline-card, .about-img');
    document.body.classList.toggle('cursor-hovering', !!isInteractive);
  });

  (function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
    requestAnimationFrame(animateRing);
  })();

  document.body.classList.add('has-custom-cursor');
}