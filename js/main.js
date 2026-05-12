// =============================================
// Md Fahim Ahammed - Portfolio JS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    // Back to top
    const btn = document.getElementById('backTop');
    if (btn) btn.classList.toggle('visible', window.scrollY > 300);
  });

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function setActiveNavLink(link) {
    navAnchors.forEach(a => a.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  function setActiveNavLinkFromUrl() {
    const path = window.location.pathname.split('/').pop();
    const hash = window.location.hash;
    let active = null;

    if (hash) {
      active = document.querySelector(`.nav-links a[href="${hash}"]`);
    }

    if (!active) {
      if (!path || path === 'index.html') {
        active = document.querySelector('.nav-links a[href="#home"]');
      } else {
        active = document.querySelector(`.nav-links a[href="${path}"]`)
          || document.querySelector(`.nav-links a[href="./${path}"]`)
          || document.querySelector(`.nav-links a[href="../${path}"]`);
      }
    }

    setActiveNavLink(active);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) setActiveNavLink(active);
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => observer.observe(sec));
  setActiveNavLinkFromUrl();
  window.addEventListener('hashchange', setActiveNavLinkFromUrl);

  // ---- Typed Text Effect ----
  const typed = document.getElementById('typedText');
  if (typed) {
    const words = ['Problem Solver', 'Web Developer', 'CST Student', 'Competitive Programmer', 'Football Lover ⚽'];
    let wordIdx = 0, charIdx = 0, deleting = false;
    function type() {
      const current = words[wordIdx];
      if (!deleting) {
        typed.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typed.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

  // ---- Scroll Fade-Up Animations ----
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => fadeObs.observe(el));

  // ---- Contact Form Submit ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.innerHTML = '<span>⏳</span> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '✅ Message Sent!';
        form.reset();
        showToast();
        setTimeout(() => {
          btn.innerHTML = '<span>📤</span> Send Message';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ---- Toast Notification ----
  function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // ---- Gallery Lightbox ----
  window.openLightbox = function(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lb && img && src) {
      img.src = src;
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (lb) {
      lb.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeLightbox();
  });

  // ---- Stagger animation delays ----
  document.querySelectorAll('.skills-grid .skill-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });

  document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });

});
