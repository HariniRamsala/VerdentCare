// js/pages/my-garden.js
// Stitch My Garden Sanctuary dashboard & bento tasks renderer with Real Plant Photography

document.addEventListener('DOMContentLoaded', () => {
  const gardenGrid = document.getElementById('garden-grid');
  const emptyState = document.getElementById('garden-empty');
  const tasksList = document.getElementById('garden-tasks-list');
  const plantCountEl = document.getElementById('plant-count');
  const healthyCountEl = document.getElementById('healthy-count');
  const soonCountEl = document.getElementById('needs-water-count');
  const overdueCountEl = document.getElementById('overdue-count');
  const waterAllBtn = document.getElementById('water-all-btn');

  const defaultPhoto = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHAHzHUywv3XIQcTrw0ka8ruLx4JStmYARTtNOhtcySOyQ0vv2LC4PL_XsWmJFhbdm9o1pqJV_GH0wfSXv8_9-1ADU1aAjyjLWkDAcZjuW91BO3svMplTfM92qdY9sWCnbuo2VLHOJQ3SdTmrvREQz38QLM3yB-8OeAkSSeDXy7eRyuHWXwlzOxiHbDzu9TNmV3YPf0XSahYVZgPGDVWnkdrffEEmVy7ZU20VFccaZyvJ2YHAqpIlTA';

  function renderGarden() {
    const plants = getSavedPlants();

    if (plantCountEl) plantCountEl.textContent = plants.length;

    let overdue = 0, soon = 0, healthy = 0;
    plants.forEach(p => {
      const { status } = getWateringStatus(p.id, p.frequencyDays);
      if (status === 'overdue') overdue++;
      else if (status === 'soon') soon++;
      else healthy++;
    });

    if (overdueCountEl) overdueCountEl.textContent = overdue;
    if (soonCountEl) soonCountEl.textContent = soon;
    if (healthyCountEl) healthyCountEl.textContent = healthy;

    // Render Bento To-Do Tasks List
    if (tasksList) {
      tasksList.innerHTML = '';
      if (plants.length === 0) {
        tasksList.innerHTML = `
          <li class="text-xs text-on-surface-variant p-3 bg-surface-container-lowest/40 rounded-xl">
            No active plant tasks. Add plants to your collection!
          </li>
        `;
      } else {
        const needsCare = plants.filter(p => {
          const st = getWateringStatus(p.id, p.frequencyDays);
          return st.status === 'overdue' || st.status === 'soon';
        });

        if (needsCare.length === 0) {
          tasksList.innerHTML = `
            <li class="text-xs text-primary p-3 bg-surface-container-lowest/40 rounded-xl font-label-md flex items-center gap-2">
              <span class="material-symbols-outlined text-base">task_alt</span> All plants are happy &amp; hydrated!
            </li>
          `;
        } else {
          needsCare.slice(0, 3).forEach(plant => {
            const { status, daysLeft } = getWateringStatus(plant.id, plant.frequencyDays);
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest/50 border border-white/20 hover:bg-surface-container-lowest/90 transition-colors cursor-pointer';
            li.innerHTML = `
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl overflow-hidden relative border border-white/40 shrink-0">
                  <img src="${plant.image || defaultPhoto}" alt="${plant.name}" class="w-full h-full object-cover" />
                </div>
                <div>
                  <p class="font-label-md text-sm text-on-surface">Water ${plant.name}</p>
                  <p class="text-xs text-on-surface-variant">${status === 'overdue' ? `Overdue ${Math.abs(daysLeft)}d` : (daysLeft === 0 ? 'Due today' : `In ${daysLeft} days`)}</p>
                </div>
              </div>
              <button class="text-primary text-xs font-label-md bg-primary-container/30 px-3 py-1.5 rounded-full hover:bg-primary hover:text-on-primary transition-colors water-task-btn" data-id="${plant.id}">
                Water
              </button>
            `;

            li.querySelector('.water-task-btn').addEventListener('click', (e) => {
              e.stopPropagation();
              markWatered(plant.id);
              showToast(`${plant.name} watered! 💧`, 'success');
              renderGarden();
            });

            tasksList.appendChild(li);
          });
        }
      }
    }

    // Render Collection Grid
    if (plants.length === 0) {
      if (gardenGrid) gardenGrid.classList.add('hidden');
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (gardenGrid) gardenGrid.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');
    if (gardenGrid) gardenGrid.innerHTML = '';

    plants.forEach((plant) => {
      const { status, daysLeft } = getWateringStatus(plant.id, plant.frequencyDays);

      const statusBadge = {
        ok: `<span class="bg-primary-container/30 text-on-primary-container px-3 py-1 rounded-full text-xs font-label-md">💚 Hydrated (${daysLeft}d left)</span>`,
        soon: `<span class="bg-tertiary-container/30 text-on-tertiary-container px-3 py-1 rounded-full text-xs font-label-md">💛 Water Soon (${daysLeft === 0 ? 'Today' : daysLeft + 'd left'})</span>`,
        overdue: `<span class="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full text-xs font-label-md">🔴 Overdue (${Math.abs(daysLeft)}d late)</span>`
      }[status];

      const lastWatered = getLastWatered(plant.id);
      const addedDate = new Date(plant.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const card = document.createElement('div');
      card.className = 'glass-card rounded-[2rem] p-6 flex flex-col justify-between gap-4 border-t-4 border-t-primary hover:scale-[1.02] transition-transform reveal';

      card.innerHTML = `
        <div class="flex justify-between items-start">
          <div class="w-16 h-16 rounded-2xl overflow-hidden relative shadow-sm border border-white/40 shrink-0">
            <img src="${plant.image || defaultPhoto}" alt="${plant.name}" class="w-full h-full object-cover" />
          </div>
          ${statusBadge}
        </div>

        <div>
          <h3 class="font-headline-md text-headline-md text-on-surface text-xl mb-1">${plant.name}</h3>
          <div class="flex gap-2 mb-3">
            <span class="text-xs bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface">🌱 ${plant.difficulty}</span>
            <span class="text-xs ${plant.petSafe ? 'bg-primary-container/30 text-on-primary-container' : 'bg-secondary-container/30 text-on-secondary-container'} px-2.5 py-1 rounded-full">
              ${plant.petSafe ? '🐾 Pet Safe' : '⚠️ Toxic'}
            </span>
          </div>
          <div class="text-xs text-on-surface-variant font-body-md flex flex-col gap-1">
            <span>💧 Every ${plant.frequencyDays} days</span>
            <span>📅 Added: ${addedDate}</span>
            ${lastWatered ? `<span>🕐 Last watered: ${new Date(lastWatered).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>` : '<span>🕐 Never watered</span>'}
          </div>
        </div>

        <div class="flex gap-2 pt-3 border-t border-outline-variant/20 mt-2">
          <a href="plant-detail.html?id=${plant.id}" class="glass-card text-on-surface py-2.5 px-4 rounded-full text-xs font-label-md flex-1 text-center hover:scale-105 transition-transform">
            View Care
          </a>
          <button class="bg-primary text-on-primary py-2.5 px-4 rounded-full text-xs font-label-md flex-1 hover:scale-105 transition-transform shadow-md water-btn" data-id="${plant.id}">
            💧 Water
          </button>
          <button class="glass-card text-outline hover:text-secondary p-2.5 rounded-full transition-colors remove-btn" data-id="${plant.id}" title="Remove">
            <span class="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      `;

      card.querySelector('.water-btn').addEventListener('click', () => {
        markWatered(plant.id);
        showToast(`${plant.name} watered! 💧`, 'success');
        renderGarden();
      });

      card.querySelector('.remove-btn').addEventListener('click', () => {
        removeSavedPlant(plant.id);
        showToast(`${plant.name} removed from sanctuary`, 'info');
        renderGarden();
      });

      if (gardenGrid) gardenGrid.appendChild(card);
    });

    if (typeof initScrollReveal === 'function') initScrollReveal(gardenGrid);
  }

  if (waterAllBtn) {
    waterAllBtn.addEventListener('click', () => {
      const plants = getSavedPlants();
      const overdue = plants.filter(p => getWateringStatus(p.id, p.frequencyDays).status === 'overdue');
      overdue.forEach(p => markWatered(p.id));
      if (overdue.length > 0) {
        showToast(`${overdue.length} overdue plant${overdue.length > 1 ? 's' : ''} marked as watered! 💧`, 'success');
        renderGarden();
      } else {
        showToast('All garden plants are well hydrated! 🌿', 'info');
      }
    });
  }

  renderGarden();
});
