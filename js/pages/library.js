// js/pages/library.js
// Stitch 3D Flip Card Plant Library with Guaranteed Valid Botanical Photography

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('plants-grid');
  const searchInput = document.getElementById('search-input');
  const lightFilter = document.getElementById('filter-light');
  const diffFilter = document.getElementById('filter-difficulty');
  const petFilter = document.getElementById('filter-pet');
  const countEl = document.getElementById('results-count');

  const defaultPlantImg = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHAHzHUywv3XIQcTrw0ka8ruLx4JStmYARTtNOhtcySOyQ0vv2LC4PL_XsWmJFhbdm9o1pqJV_GH0wfSXv8_9-1ADU1aAjyjLWkDAcZjuW91BO3svMplTfM92qdY9sWCnbuo2VLHOJQ3SdTmrvREQz38QLM3yB-8OeAkSSeDXy7eRyuHWXwlzOxiHbDzu9TNmV3YPf0XSahYVZgPGDVWnkdrffEEmVy7ZU20VFccaZyvJ2YHAqpIlTA';

  let currentFilters = { search: '', light: '', difficulty: '', petSafe: '', size: '' };

  // ─── Show Skeleton ─────────────────────────────────────
  function showSkeletons(count = 6) {
    if (!grid) return;
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const sk = document.createElement('div');
      sk.className = 'skeleton h-[420px] rounded-xl';
      grid.appendChild(sk);
    }
  }

  // ─── Render 3D Flip Plant Card with Real Photography ──
  function renderCard(plant) {
    const card = document.createElement('div');
    card.className = 'group h-[420px] perspective-1000 cursor-pointer card-flip-group reveal';
    card.setAttribute('data-id', plant.id);

    const diffBadge = {
      Easy: 'bg-primary-container/30 text-on-primary-container',
      Medium: 'bg-tertiary-container/30 text-on-tertiary-container',
      Hard: 'bg-secondary-container/30 text-on-secondary-container'
    }[plant.difficulty] || 'bg-primary-container/30 text-on-primary-container';

    const plantImg = plant.image || defaultPlantImg;

    card.innerHTML = `
      <div class="card-flip-inner relative w-full h-full transform-style-3d">
        <!-- Front of Card (Real Botanical Photography) -->
        <div class="card-front glass-card absolute inset-0 backface-hidden p-5 flex flex-col rounded-xl overflow-hidden justify-between">
          <div class="flex justify-between items-center z-10">
            <span class="bg-surface-container-high/80 backdrop-blur-md text-on-surface px-3 py-1 rounded-full font-label-md text-xs">
              ${plant.category}
            </span>
            <span class="${diffBadge} px-3 py-1 rounded-full font-label-md text-xs backdrop-blur-md">
              ${plant.difficulty}
            </span>
          </div>

          <!-- Real Plant Photo Container -->
          <div class="my-3 rounded-xl overflow-hidden relative h-44 shadow-sm bg-surface-container-high">
            <img src="${plantImg}" alt="${plant.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='${defaultPlantImg}'" />
          </div>

          <div>
            <div class="flex justify-between items-baseline mb-1">
              <h3 class="font-headline-md text-headline-md text-on-surface text-lg">${plant.name}</h3>
              <span class="text-xs text-primary font-label-md flex items-center gap-1">
                Hover to Flip <span class="material-symbols-outlined text-sm">autorenew</span>
              </span>
            </div>
            <p class="font-body-md text-on-surface-variant italic text-xs mb-2">${plant.scientificName}</p>
            <div class="flex gap-2">
              <span class="text-xs bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">wb_sunny</span> ${plant.light}
              </span>
              <span class="text-xs ${plant.petSafe ? 'bg-primary-container/30 text-on-primary-container' : 'bg-secondary-container/30 text-on-secondary-container'} px-2.5 py-1 rounded-full flex items-center gap-1">
                <span class="material-symbols-outlined text-xs">${plant.petSafe ? 'pets' : 'warning'}</span> ${plant.petSafe ? 'Pet Safe' : 'Toxic'}
              </span>
            </div>
          </div>
        </div>

        <!-- Back of Card (Flipped - Care Guide Details) -->
        <div class="card-back glass-card absolute inset-0 backface-hidden rotate-y-180 p-6 flex flex-col justify-between rounded-xl bg-surface-container/95 border border-white/40">
          <div>
            <h4 class="font-headline-md text-headline-md text-primary mb-4 text-center border-b border-primary/20 pb-3">Quick Care Guide</h4>
            <div class="flex flex-col gap-4">
              <div class="flex items-start gap-3">
                <div class="bg-surface-container-high p-2 rounded-full text-primary shrink-0">
                  <span class="material-symbols-outlined">water_drop</span>
                </div>
                <div>
                  <p class="font-label-md text-label-md text-on-surface">Watering</p>
                  <p class="font-body-md text-on-surface-variant text-xs">${plant.careInstructions.watering.substring(0, 75)}...</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="bg-surface-container-high p-2 rounded-full text-tertiary shrink-0">
                  <span class="material-symbols-outlined">wb_sunny</span>
                </div>
                <div>
                  <p class="font-label-md text-label-md text-on-surface">Light Requirements</p>
                  <p class="font-body-md text-on-surface-variant text-xs">${plant.careInstructions.light.substring(0, 75)}...</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="bg-surface-container-high p-2 rounded-full text-secondary shrink-0">
                  <span class="material-symbols-outlined">air</span>
                </div>
                <div>
                  <p class="font-label-md text-label-md text-on-surface">Humidity &amp; Temp</p>
                  <p class="font-body-md text-on-surface-variant text-xs">${plant.careInstructions.humidity.substring(0, 75)}...</p>
                </div>
              </div>
            </div>
          </div>

          <a href="plant-detail.html?id=${plant.id}" class="w-full bg-primary text-on-primary py-3 rounded-full font-label-md text-center hover:scale-105 transition-transform flex items-center justify-center gap-1 shadow-md">
            View Complete Guide <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    `;

    // Click handler on front to navigate directly if clicked
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (window.innerWidth < 768) {
        card.classList.toggle('flipped');
      }
    });

    return card;
  }

  // ─── Render Grid ───────────────────────────────────────
  function renderGrid(plants) {
    if (!grid) return;
    grid.innerHTML = '';

    if (plants.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 flex flex-col items-center gap-4 glass-card rounded-xl">
          <span class="material-symbols-outlined text-6xl text-outline">search_off</span>
          <h3 class="font-headline-md text-on-surface">No plants found</h3>
          <p class="text-on-surface-variant">Try adjusting your search query or reset the filters.</p>
          <button class="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md" onclick="clearFilters()">Clear All Filters</button>
        </div>
      `;
      if (countEl) countEl.textContent = '0 plants';
      return;
    }

    plants.forEach((plant) => {
      grid.appendChild(renderCard(plant));
    });

    if (typeof initScrollReveal === 'function') initScrollReveal(grid);
    if (countEl) countEl.textContent = `${plants.length} plant${plants.length !== 1 ? 's' : ''}`;
  }

  // ─── Apply Filters ─────────────────────────────────────
  function applyFilters() {
    const filtered = filterPlants(currentFilters);
    renderGrid(filtered);
  }

  // ─── Event Listeners ───────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentFilters.search = e.target.value;
      applyFilters();
    });
  }

  if (lightFilter) {
    lightFilter.addEventListener('change', (e) => {
      currentFilters.light = e.target.value;
      applyFilters();
    });
  }

  if (diffFilter) {
    diffFilter.addEventListener('change', (e) => {
      currentFilters.difficulty = e.target.value;
      applyFilters();
    });
  }

  if (petFilter) {
    petFilter.addEventListener('change', (e) => {
      currentFilters.petSafe = e.target.value;
      applyFilters();
    });
  }

  window.clearFilters = function () {
    currentFilters = { search: '', light: '', difficulty: '', petSafe: '', size: '' };
    if (searchInput) searchInput.value = '';
    if (lightFilter) lightFilter.value = '';
    if (diffFilter) diffFilter.value = '';
    if (petFilter) petFilter.value = '';
    applyFilters();
  };

  showSkeletons(6);
  setTimeout(() => {
    renderGrid(PLANTS);
  }, 350);
});
