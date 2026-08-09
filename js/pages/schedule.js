// js/pages/schedule.js
// Stitch Watering Schedule with Vine Progress Indicator and Real Plant Photos

document.addEventListener('DOMContentLoaded', () => {
  const scheduleGrid = document.getElementById('schedule-grid');
  const addPlantBtn = document.getElementById('add-plant-btn');
  const modalOverlay = document.getElementById('add-plant-modal');
  const modalClose = document.getElementById('modal-close');
  const addPlantForm = document.getElementById('add-plant-form');
  const sidebarWaterAll = document.getElementById('sidebar-water-all');

  const statOverdue = document.getElementById('stat-overdue-count');
  const statSoon = document.getElementById('stat-soon-count');
  const statOk = document.getElementById('stat-ok-count');

  const defaultPhoto = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHAHzHUywv3XIQcTrw0ka8ruLx4JStmYARTtNOhtcySOyQ0vv2LC4PL_XsWmJFhbdm9o1pqJV_GH0wfSXv8_9-1ADU1aAjyjLWkDAcZjuW91BO3svMplTfM92qdY9sWCnbuo2VLHOJQ3SdTmrvREQz38QLM3yB-8OeAkSSeDXy7eRyuHWXwlzOxiHbDzu9TNmV3YPf0XSahYVZgPGDVWnkdrffEEmVy7ZU20VFccaZyvJ2YHAqpIlTA';

  // Gather all schedule plants
  function getAllSchedulePlants() {
    const saved = getSavedPlants();
    const custom = getSchedulePlants();
    return [
      ...saved.map(p => ({ ...p, scheduleId: p.id, source: 'garden' })),
      ...custom
    ];
  }

  // Build Vine Progress Bar component
  function buildVineProgress(progress, status) {
    const pct = Math.min(Math.round(progress * 100), 100);
    const leafIcon = status === 'overdue' ? 'warning' : 'eco';
    const fillClass = status === 'overdue' ? 'bg-secondary' : (status === 'soon' ? 'bg-tertiary-container' : 'bg-primary');
    
    return `
      <div class="w-full my-2">
        <div class="flex justify-between items-center text-xs mb-1 font-label-md">
          <span class="text-on-surface-variant">Care Progress</span>
          <span class="text-primary font-bold">${pct}%</span>
        </div>
        <div class="vine-track">
          <div class="vine-fill ${fillClass}" style="width: ${pct}%;"></div>
          <div class="vine-leaf" style="left: ${pct}%;">
            <span class="material-symbols-outlined text-xs">${leafIcon}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Render Card
  function renderScheduleCard(plant) {
    const { status, daysLeft, daysPassed, progress } = getWateringStatus(plant.scheduleId, plant.frequencyDays);
    const lastWatered = getLastWatered(plant.scheduleId);

    const statusBadge = {
      ok: `<span class="bg-primary-container/30 text-on-primary-container px-3 py-1 rounded-full text-xs font-label-md flex items-center gap-1"><span class="material-symbols-outlined text-xs">check_circle</span> Hydrated (${daysLeft}d left)</span>`,
      soon: `<span class="bg-tertiary-container/30 text-on-tertiary-container px-3 py-1 rounded-full text-xs font-label-md flex items-center gap-1"><span class="material-symbols-outlined text-xs">schedule</span> Water Soon (${daysLeft === 0 ? 'Today' : daysLeft + 'd left'})</span>`,
      overdue: `<span class="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full text-xs font-label-md flex items-center gap-1"><span class="material-symbols-outlined text-xs">warning</span> Overdue (${Math.abs(daysLeft)}d late)</span>`
    }[status];

    const lastWateredStr = lastWatered
      ? new Date(lastWatered).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : 'Never';

    const card = document.createElement('div');
    card.className = `glass-card rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 ${status === 'overdue' ? 'border-l-secondary' : (status === 'soon' ? 'border-l-tertiary' : 'border-l-primary')}`;

    card.innerHTML = `
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="w-14 h-14 rounded-2xl overflow-hidden relative shadow-sm border border-white/40 shrink-0">
          <img src="${plant.image || defaultPhoto}" alt="${plant.name}" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col gap-1 flex-grow">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-headline-md text-headline-md text-on-surface text-lg">${plant.name}</h3>
            ${statusBadge}
          </div>
          <span class="text-xs text-on-surface-variant font-body-md">
            Every ${plant.frequencyDays} days · Last watered: <strong>${lastWateredStr}</strong>
          </span>
          ${buildVineProgress(progress, status)}
        </div>
      </div>

      <div class="flex items-center gap-2 w-full md:w-auto justify-end mt-2 md:mt-0">
        <button class="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-md text-sm hover:scale-105 transition-transform flex items-center gap-1 shadow-md water-btn" data-id="${plant.scheduleId}">
          <span class="material-symbols-outlined text-sm">water_drop</span> Water Now
        </button>
        <button class="glass-card text-on-surface-variant hover:text-secondary p-2.5 rounded-full transition-colors remove-btn" data-id="${plant.scheduleId}" data-source="${plant.source || 'custom'}" title="Remove plant">
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    `;

    // Bind Water Now
    card.querySelector('.water-btn').addEventListener('click', () => {
      markWatered(plant.scheduleId);
      showToast(`${plant.name} marked as watered! 💧`, 'success');
      renderSchedule();
    });

    // Bind Remove
    card.querySelector('.remove-btn').addEventListener('click', () => {
      const source = card.querySelector('.remove-btn').dataset.source;
      if (source === 'garden') {
        removeSavedPlant(plant.scheduleId);
      } else {
        removeSchedulePlant(plant.scheduleId);
      }
      showToast(`${plant.name} removed from schedule`, 'info');
      renderSchedule();
    });

    return card;
  }

  // Render Full Schedule
  function renderSchedule() {
    if (!scheduleGrid) return;
    scheduleGrid.innerHTML = '';

    const plants = getAllSchedulePlants();

    // Stats
    let overdueCount = 0, soonCount = 0, okCount = 0;
    plants.forEach(p => {
      const { status } = getWateringStatus(p.scheduleId, p.frequencyDays);
      if (status === 'overdue') overdueCount++;
      else if (status === 'soon') soonCount++;
      else okCount++;
    });

    if (statOverdue) statOverdue.textContent = overdueCount;
    if (statSoon) statSoon.textContent = soonCount;
    if (statOk) statOk.textContent = okCount;

    if (plants.length === 0) {
      scheduleGrid.innerHTML = `
        <div class="text-center py-12 flex flex-col items-center gap-3">
          <span class="material-symbols-outlined text-5xl text-outline">water_drop</span>
          <h3 class="font-headline-md text-on-surface">No plants in your schedule</h3>
          <p class="text-on-surface-variant text-sm">Add plants from the Plant Library or add a custom plant below.</p>
          <button class="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-md mt-2" onclick="document.getElementById('add-plant-btn').click()">
            + Add Custom Plant
          </button>
        </div>
      `;
      return;
    }

    // Sort overdue first
    plants.sort((a, b) => {
      const sa = getWateringStatus(a.scheduleId, a.frequencyDays);
      const sb = getWateringStatus(b.scheduleId, b.frequencyDays);
      return sa.daysLeft - sb.daysLeft;
    });

    plants.forEach(plant => {
      scheduleGrid.appendChild(renderScheduleCard(plant));
    });
  }

  // Modal Handlers
  function openModal() {
    if (modalOverlay) modalOverlay.classList.add('open');
  }
  function closeModal() {
    if (modalOverlay) modalOverlay.classList.remove('open');
    if (addPlantForm) addPlantForm.reset();
  }

  if (addPlantBtn) addPlantBtn.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Add Plant Submit
  if (addPlantForm) {
    addPlantForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('plant-name-input');
      const freqInput = document.getElementById('plant-freq-input');

      if (!nameInput.value.trim()) return;
      const freq = parseInt(freqInput.value, 10);
      if (!freq || freq < 1) return;

      const newPlant = {
        scheduleId: 'custom-' + Date.now(),
        id: 'custom-' + Date.now(),
        name: nameInput.value.trim(),
        image: defaultPhoto,
        frequencyDays: freq,
        source: 'custom',
        addedAt: new Date().toISOString()
      };

      addSchedulePlant(newPlant);
      closeModal();
      renderSchedule();
      showToast(`${newPlant.name} added to schedule! 🌿`, 'success');
    });
  }

  if (sidebarWaterAll) {
    sidebarWaterAll.addEventListener('click', () => {
      const plants = getAllSchedulePlants();
      const overdue = plants.filter(p => getWateringStatus(p.scheduleId, p.frequencyDays).status === 'overdue');
      overdue.forEach(p => markWatered(p.scheduleId));
      if (overdue.length > 0) {
        showToast(`${overdue.length} overdue plant${overdue.length > 1 ? 's' : ''} marked as watered! 💧`, 'success');
        renderSchedule();
      } else {
        showToast('All plants are well watered! 🌿', 'info');
      }
    });
  }

  renderSchedule();
});
