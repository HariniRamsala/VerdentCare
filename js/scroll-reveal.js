// js/scroll-reveal.js
// IntersectionObserver-based scroll reveal animations

(function () {
  const THRESHOLD = 0.1;
  const ROOT_MARGIN = '0px 0px -60px 0px';

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after reveal (uncomment to only animate once)
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: THRESHOLD, rootMargin: ROOT_MARGIN });

  // Observe all .reveal elements
  function initReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  // Expose for dynamic content
  window.initScrollReveal = function (container = document) {
    container.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  };
})();
