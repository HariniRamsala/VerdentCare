// js/pages/community.js
// Stitch Community Feed with Real Plant Photography, Like Counters, and LocalStorage

document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('community-feed');
  const newPostBtn = document.getElementById('new-post-btn');
  const modalOverlay = document.getElementById('post-modal');
  const modalClose = document.getElementById('post-modal-close');
  const postForm = document.getElementById('post-form');

  const plantPhotos = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHAHzHUywv3XIQcTrw0ka8ruLx4JStmYARTtNOhtcySOyQ0vv2LC4PL_XsWmJFhbdm9o1pqJV_GH0wfSXv8_9-1ADU1aAjyjLWkDAcZjuW91BO3svMplTfM92qdY9sWCnbuo2VLHOJQ3SdTmrvREQz38QLM3yB-8OeAkSSeDXy7eRyuHWXwlzOxiHbDzu9TNmV3YPf0XSahYVZgPGDVWnkdrffEEmVy7ZU20VFccaZyvJ2YHAqpIlTA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBEcm3B6yuonSa7mjwo_82crUgpnO2oWtHkiCcyHDx1nRd3botI3WbU2aXy99azFVmUAknw8PrXrFzKZ9IfwXxf3Ccor-bPM-fWE0n_IxhSRRteyN-s3roQM3iq_hl8YGqXiaFE8iZPK1efE2ZrXIJrNDMnBIoP2T6yMotFCMqASfLfaycSRLrQ2UmdpZ4MyZypp62aKhI0Uwo8BrI-3iOLlWmSh9YG7xVpp3rBY9wtWrepA-jMmEPIIg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKjM_CerMM6eA5q9UmzMCD9XJttczrcn-NSANLHxK-rlHT0-EqUgk2MHFYwAId93pdYYAmmyGkg97PjH05Z3-GtNwc_K06d0wTb1btKHkMaBgQGWjKHHZ1kO73mkYEQ6PrbeVSRjYtl7isG6Q8XX8i3h_aVvX58N1zzTlgWbsj7jfci6We-Vl1Km_-_H6Dw7juNDnBmeHJMgZKx66vVi0IXkhPIsQvr_1KUEgXS_cqVwR3KUFsQjjyg'
  ];

  function timeAgo(isoString) {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  function renderPost(post) {
    const card = document.createElement('div');
    card.className = 'glass-card rounded-xl p-6 flex flex-col gap-4 reveal';

    const postPhoto = post.image || plantPhotos[Math.floor(Math.random() * plantPhotos.length)];

    card.innerHTML = `
      <!-- Author Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-primary-container/30 text-primary flex items-center justify-center text-lg font-bold border border-primary/20">
            <span class="material-symbols-outlined text-xl">person</span>
          </div>
          <div>
            <h4 class="font-headline-md text-headline-md text-on-surface text-base mb-0">${post.author}</h4>
            <div class="flex items-center gap-2 text-xs text-outline font-label-md">
              <span>${timeAgo(post.timestamp)}</span>
              ${post.plant ? `<span>·</span><span class="text-primary">🌿 ${post.plant}</span>` : ''}
            </div>
          </div>
        </div>
      </div>

      <!-- Caption -->
      <p class="font-body-md text-on-surface-variant leading-relaxed">${post.caption}</p>

      <!-- Real Plant Photography Attachment -->
      <div class="rounded-xl overflow-hidden relative h-64 md:h-80 w-full shadow-sm border border-white/40">
        <img src="${postPhoto}" alt="Community plant photo" class="w-full h-full object-cover" />
      </div>

      <!-- Tags -->
      ${post.tags && post.tags.length ? `
        <div class="flex flex-wrap gap-2">
          ${post.tags.map(t => `<span class="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-label-md">#${t}</span>`).join('')}
        </div>
      ` : ''}

      <!-- Actions Footer -->
      <div class="flex items-center gap-6 pt-3 border-t border-outline-variant/20 mt-1">
        <button class="like-btn flex items-center gap-1.5 text-sm font-label-md transition-colors ${post.liked ? 'text-secondary font-bold' : 'text-outline hover:text-secondary'}" data-id="${post.id}">
          <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' ${post.liked ? 1 : 0};">${post.liked ? 'favorite' : 'favorite_border'}</span>
          <span class="like-count">${post.likes || 0}</span>
        </button>
        <span class="flex items-center gap-1 text-sm text-outline font-label-md">
          <span class="material-symbols-outlined text-lg">chat_bubble_outline</span>
          <span>${post.comments || 0}</span>
        </span>
        <button class="ml-auto text-outline hover:text-primary transition-colors text-sm font-label-md flex items-center gap-1">
          <span class="material-symbols-outlined text-base">share</span> Share
        </button>
      </div>
    `;

    // Like Action
    const likeBtn = card.querySelector('.like-btn');
    const likeIcon = card.querySelector('.like-btn .material-symbols-outlined');
    const likeCount = card.querySelector('.like-count');

    likeBtn.addEventListener('click', () => {
      if (post.liked) {
        showToast('You already liked this post! ❤️', 'info');
        return;
      }
      const newCount = likePost(post.id);
      post.liked = true;
      post.likes = newCount;
      likeIcon.style.fontVariationSettings = "'FILL' 1";
      likeCount.textContent = newCount;
      likeBtn.classList.add('text-secondary', 'font-bold');
      showToast('Loved post! ❤️', 'success');
    });

    return card;
  }

  function renderFeed() {
    if (!feed) return;
    feed.innerHTML = '';
    const posts = getCommunityPosts();

    if (posts.length === 0) {
      feed.innerHTML = `
        <div class="glass-card rounded-xl p-12 text-center flex flex-col items-center gap-3">
          <span class="material-symbols-outlined text-5xl text-outline">forum</span>
          <h3 class="font-headline-md text-on-surface">No posts yet</h3>
          <p class="text-on-surface-variant">Be the first to share your plant journey with the community!</p>
        </div>
      `;
      return;
    }

    posts.forEach(post => {
      feed.appendChild(renderPost(post));
    });

    if (typeof initScrollReveal === 'function') initScrollReveal(feed);
  }

  function openModal() {
    if (modalOverlay) modalOverlay.classList.add('open');
  }
  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('open');
    if (postForm) postForm.reset();
  }

  if (newPostBtn) newPostBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  }

  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const authorInput = document.getElementById('post-author');
      const captionInput = document.getElementById('post-caption');
      const plantInput = document.getElementById('post-plant');
      const tagsInput = document.getElementById('post-tags');

      if (!authorInput?.value.trim() || !captionInput?.value.trim()) return;

      const tags = tagsInput?.value.trim()
        ? tagsInput.value.split(',').map(t => t.trim().toLowerCase().replace(/[^a-z0-9]/g, '')).filter(Boolean)
        : [];

      const newPost = {
        id: 'post-' + Date.now(),
        author: authorInput.value.trim(),
        plant: plantInput?.value.trim() || 'Houseplant',
        caption: captionInput.value.trim(),
        image: plantPhotos[Math.floor(Math.random() * plantPhotos.length)],
        likes: 0,
        liked: false,
        comments: 0,
        timestamp: new Date().toISOString(),
        tags
      };

      addCommunityPost(newPost);
      closeModal();
      renderFeed();
      showToast('Your story is live! 🌿', 'success');
    });
  }

  renderFeed();
});
