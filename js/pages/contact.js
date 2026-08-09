// js/pages/contact.js
// Contact form with vanilla JS validation

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('contact-success');

  if (!form) return;

  const fields = {
    name: { el: document.getElementById('contact-name'), error: document.getElementById('name-error'), validate: v => v.trim().length >= 2 || 'Name must be at least 2 characters' },
    email: { el: document.getElementById('contact-email'), error: document.getElementById('email-error'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address' },
    subject: { el: document.getElementById('contact-subject'), error: document.getElementById('subject-error'), validate: v => v.trim().length >= 3 || 'Subject must be at least 3 characters' },
    message: { el: document.getElementById('contact-message'), error: document.getElementById('message-error'), validate: v => v.trim().length >= 20 || 'Message must be at least 20 characters' }
  };

  // Real-time validation on blur
  Object.values(fields).forEach(({ el, error, validate }) => {
    if (!el) return;
    el.addEventListener('blur', () => {
      const result = validate(el.value);
      if (result === true) {
        el.classList.remove('error');
        if (error) error.textContent = '';
      } else {
        el.classList.add('error');
        if (error) error.textContent = result;
      }
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const result = validate(el.value);
        if (result === true) {
          el.classList.remove('error');
          if (error) error.textContent = '';
        }
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let allValid = true;
    Object.values(fields).forEach(({ el, error, validate }) => {
      if (!el) return;
      const result = validate(el.value);
      if (result !== true) {
        el.classList.add('error');
        if (error) error.textContent = result;
        allValid = false;
      } else {
        el.classList.remove('error');
        if (error) error.textContent = '';
      }
    });

    if (!allValid) {
      showToast('Please fix the errors above', 'error');
      return;
    }

    // Simulate sending
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = 'Sending... ✈️';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      form.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        form.style.display = 'none';
        if (successMessage) {
          successMessage.style.display = 'flex';
          successMessage.classList.add('anim-fade-in-up');
        }
        showToast('Message sent! We\'ll get back to you soon 🌿', 'success');
      }, 300);
    }, 1200);
  });
});
