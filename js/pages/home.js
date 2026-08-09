// js/pages/home.js
// Home page interactivity

document.addEventListener('DOMContentLoaded', () => {

  // ─── Plant of the Month ────────────────────────────────
  const potmContainer = document.getElementById('potm-card');
  if (potmContainer) {
    const featured = getFeaturedPlant();
    potmContainer.innerHTML = `
      <div class="plant-emoji-display" style="height:220px;font-size:6rem;border-radius:var(--radius-lg) var(--radius-lg) 0 0;background:linear-gradient(135deg,#E8F5E4,#C8DFC4);">
        ${featured.emoji}
      </div>
      <div class="card-body">
        <div class="flex-between mb-sm">
          <span class="badge badge-sage">${featured.category}</span>
          <span class="badge ${featured.petSafe ? 'badge-success' : 'badge-danger'}">${featured.petSafe ? '🐾 Pet Safe' : '⚠️ Toxic'}</span>
        </div>
        <h3 class="plant-card-name" style="font-size:var(--fs-xl)">${featured.name}</h3>
        <p class="plant-card-scientific">${featured.scientificName}</p>
        <p style="color:var(--color-text-mid);font-size:var(--fs-sm);margin:var(--space-md) 0;line-height:1.7">
          ${featured.description.substring(0, 180)}...
        </p>
        <div class="flex gap-sm flex-wrap mb-lg">
          <span class="badge badge-mint">💡 ${featured.light}</span>
          <span class="badge badge-sky">💧 Every ${featured.frequencyDays} days</span>
          <span class="badge badge-terracotta">🌱 ${featured.difficulty}</span>
        </div>
        <a href="plant-detail.html?id=${featured.id}" class="btn btn-primary w-full" style="justify-content:center;">
          View Full Care Guide →
        </a>
      </div>
    `;
  }

  // ─── Testimonials Carousel ─────────────────────────────
  const testimonials = [
    {
      text: "VerdentCare completely transformed my relationship with plants. I went from killing every plant I touched to maintaining a thriving indoor jungle of 30+ plants!",
      author: "Sarah M.",
      role: "Proud Plant Parent",
      avatar: "🌸"
    },
    {
      text: "The watering schedule feature is an absolute game-changer. I never forget to water anymore, and my plants have never looked healthier. Highly recommend!",
      author: "James K.",
      role: "Succulent Enthusiast",
      avatar: "🌵"
    },
    {
      text: "I used to be so intimidated by plant care. The detailed guides on this app made it so approachable. My Monstera is now sending out leaves every week!",
      author: "Priya L.",
      role: "New Plant Mom",
      avatar: "🌿"
    },
    {
      text: "The community feature is my favorite — I've learned so many tips from other plant lovers. It feels like having a green-thumbed friend always available.",
      author: "Tom R.",
      role: "Herb Garden Lover",
      avatar: "🌱"
    }
  ];

  let currentSlide = 0;
  let autoSlide;

  const testimonialEl = document.getElementById('testimonial-text');
  const testimonialAuthor = document.getElementById('testimonial-author');
  const testimonialRole = document.getElementById('testimonial-role');
  const testimonialAvatar = document.getElementById('testimonial-avatar');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');

  function updateTestimonial(idx) {
    if (!testimonialEl) return;
    const t = testimonials[idx];
    testimonialEl.style.opacity = '0';
    testimonialEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
      testimonialEl.textContent = `"${t.text}"`;
      if (testimonialAuthor) testimonialAuthor.textContent = t.author;
      if (testimonialRole) testimonialRole.textContent = t.role;
      if (testimonialAvatar) testimonialAvatar.textContent = t.avatar;
      testimonialEl.style.opacity = '1';
      testimonialEl.style.transform = 'translateY(0)';
    }, 200);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    updateTestimonial(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentSlide);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      updateTestimonial(currentSlide);
      resetAutoSlide();
    });
  });

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }

  if (testimonialEl) {
    updateTestimonial(0);
    resetAutoSlide();
  }

  // ─── Stats Count-up ────────────────────────────────────
  const stats = document.querySelectorAll('.stat-number[data-count]');

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    
    function update(time) {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => statsObserver.observe(el));

  // ─── Newsletter Form ────────────────────────────────────
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterInput = document.getElementById('newsletter-email');
  const newsletterError = document.getElementById('newsletter-error');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm) {
    // Pre-fill if subscribed
    const subData = storageGet ? storageGet('leafly_newsletter', false) : null;

    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterInput ? newsletterInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (newsletterError) newsletterError.textContent = '';
      if (newsletterInput) newsletterInput.classList.remove('error');

      if (!email) {
        if (newsletterError) newsletterError.textContent = 'Please enter your email address.';
        if (newsletterInput) newsletterInput.classList.add('error');
        return;
      }
      if (!emailRegex.test(email)) {
        if (newsletterError) newsletterError.textContent = 'Please enter a valid email address.';
        if (newsletterInput) newsletterInput.classList.add('error');
        return;
      }

      // Success
      if (typeof setSubscribed === 'function') setSubscribed(email);
      if (newsletterForm) newsletterForm.style.display = 'none';
      if (newsletterSuccess) {
        newsletterSuccess.style.display = 'flex';
        newsletterSuccess.classList.add('anim-fade-in');
      }
      if (typeof showToast === 'function') showToast('Welcome to the VerdentCare family! 🌿', 'success');
    });
  }

  // ─── Quick add featured plant link ────────────────────────
  const heroCta = document.getElementById('hero-explore-btn');
  if (heroCta) {
    heroCta.href = 'library.html';
  }

});
