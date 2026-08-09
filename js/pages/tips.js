// js/pages/tips.js
// Stitch Plant Tips rendering with Real Botanical Photography

document.addEventListener('DOMContentLoaded', () => {
  const tipsGrid = document.getElementById('tips-grid');
  const tabsContainer = document.getElementById('tips-tabs');
  const featuredBanner = document.getElementById('featured-tip');
  const bookmarkFilterBtn = document.getElementById('show-bookmarks');

  let activeCategory = 'All';
  let showingBookmarks = false;

  // Render Featured Tip Banner with Real Photography
  const featured = getFeaturedTip();
  if (featuredBanner && featured) {
    featuredBanner.innerHTML = `
      <div class="flex flex-col md:flex-row gap-8 items-center justify-between z-10 relative">
        <div class="flex-1 space-y-4">
          <span class="inline-block bg-tertiary-container text-on-tertiary-container font-label-md text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            ⭐ Tip of the Week
          </span>
          <h2 class="font-headline-xl text-headline-lg text-on-surface">${featured.title}</h2>
          <p class="font-body-lg text-on-surface-variant leading-relaxed max-w-2xl">${featured.body}</p>
          <div class="flex gap-4 items-center text-xs text-outline font-label-md pt-2">
            <span>By ${featured.author}</span>
            <span>·</span>
            <span>${featured.readTime} read</span>
          </div>
        </div>

        <div class="flex-1 relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-4 border-white/40 shadow-lg shrink-0">
          <img src="${featured.image}" alt="${featured.title}" class="object-cover w-full h-full" />
        </div>
      </div>
    `;
  }

  // Render Category Tabs
  if (tabsContainer) {
    TIP_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `whitespace-nowrap px-5 py-2.5 rounded-full font-label-md text-sm transition-all border ${cat === 'All' ? 'bg-primary text-on-primary border-primary shadow-sm' : 'glass-card text-on-surface-variant border-outline-variant hover:text-primary'}`;
      btn.textContent = cat;
      btn.dataset.category = cat;

      btn.addEventListener('click', () => {
        showingBookmarks = false;
        if (bookmarkFilterBtn) bookmarkFilterBtn.classList.remove('bg-tertiary', 'text-on-tertiary');
        document.querySelectorAll('#tips-tabs button').forEach(b => {
          b.className = 'whitespace-nowrap px-5 py-2.5 rounded-full font-label-md text-sm transition-all border glass-card text-on-surface-variant border-outline-variant hover:text-primary';
        });
        btn.className = 'whitespace-nowrap px-5 py-2.5 rounded-full font-label-md text-sm transition-all border bg-primary text-on-primary border-primary shadow-sm';
        activeCategory = cat;
        renderTips();
      });
      tabsContainer.appendChild(btn);
    });
  }

  // Bookmark Toggle Filter
  if (bookmarkFilterBtn) {
    bookmarkFilterBtn.addEventListener('click', () => {
      showingBookmarks = !showingBookmarks;
      bookmarkFilterBtn.classList.toggle('bg-tertiary', showingBookmarks);
      bookmarkFilterBtn.classList.toggle('text-on-tertiary', showingBookmarks);
      document.querySelectorAll('#tips-tabs button').forEach(b => {
        b.className = 'whitespace-nowrap px-5 py-2.5 rounded-full font-label-md text-sm transition-all border glass-card text-on-surface-variant border-outline-variant hover:text-primary';
      });
      activeCategory = 'All';
      renderTips();
    });
  }

  // Render Single Tip Card with Real Photography Banner
  function renderTipCard(tip) {
    const bookmarked = isBookmarked(tip.id);
    const card = document.createElement('div');
    card.className = 'glass-card rounded-xl overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-transform reveal';

    card.innerHTML = `
      <div>
        <div class="h-48 relative overflow-hidden">
          <img src="${tip.image}" alt="${tip.title}" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
          <button class="bookmark-btn absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-primary hover:text-tertiary transition-colors" data-id="${tip.id}">
            <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' ${bookmarked ? 1 : 0};">${bookmarked ? 'bookmark' : 'bookmark_border'}</span>
          </button>
        </div>

        <div class="p-6 flex flex-col gap-3">
          <span class="text-secondary font-label-md text-xs uppercase tracking-wider">${tip.category}</span>
          <h3 class="font-headline-md text-headline-md text-on-surface text-lg leading-snug">${tip.title}</h3>
          <p class="font-body-md text-on-surface-variant text-sm leading-relaxed">${tip.body}</p>
        </div>
      </div>

      <div class="px-6 pb-6 pt-2 flex justify-between items-center text-xs text-outline font-label-md">
        <span>By ${tip.author}</span>
        <span>Week ${tip.week}</span>
      </div>
    `;

    // Bookmark handler
    card.querySelector('.bookmark-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const added = toggleBookmark(tip.id);
      if (added) {
        showToast('Tip bookmarked! 🔖', 'success');
      } else {
        showToast('Bookmark removed', 'info');
      }
      renderTips();
    });

    return card;
  }

  // Render Grid
  function renderTips() {
    if (!tipsGrid) return;
    tipsGrid.innerHTML = '';

    let tips;
    if (showingBookmarks) {
      const bookmarks = getBookmarks();
      tips = TIPS.filter(t => bookmarks.includes(t.id));
    } else {
      tips = getTipsByCategory(activeCategory);
    }

    if (tips.length === 0) {
      tipsGrid.innerHTML = `
        <div class="col-span-full text-center py-16 flex flex-col items-center gap-4 glass-card rounded-xl">
          <span class="material-symbols-outlined text-6xl text-outline">bookmark_border</span>
          <h3 class="font-headline-md text-on-surface">${showingBookmarks ? 'No bookmarked tips yet' : 'No tips in this category'}</h3>
          <p class="text-on-surface-variant text-sm">Click the bookmark icon on any tip card to save it here.</p>
        </div>
      `;
      return;
    }

    tips.filter(t => !t.isFeatured).forEach(tip => {
      tipsGrid.appendChild(renderTipCard(tip));
    });

    if (typeof initScrollReveal === 'function') initScrollReveal(tipsGrid);
  }

  renderTips();
});
