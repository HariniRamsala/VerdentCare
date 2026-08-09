// js/nav.js
// Stitch shared navbar behavior & mobile menu toggle

(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.remove('hidden');
      mobileNav.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      mobileNav.classList.remove('flex');
      document.body.style.overflow = '';
    });
  }

  // Active page indicator
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a[href]').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      if (!link.classList.contains('bg-primary')) {
        link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
      }
    }
  });
})();
