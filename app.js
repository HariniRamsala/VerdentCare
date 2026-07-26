// Main Application Logic for Plant Care Companion

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initPlantLibrary();
  initWateringSchedule();
  initPlantTips();
  initModalListeners();
});

/* Toast Notification Utility */
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const bgClass = type === "success" ? "bg-primary text-white" : "bg-tertiary text-white";
  toast.className = `toast glass-card ${bgClass} px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm font-semibold tracking-wide`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-lg">${type === "success" ? "check_circle" : "info"}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* Mobile Menu Setup */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

/* Plant Library Filter & Search Logic */
let activeTypeFilters = new Set();
let activeLightFilter = "All";
let activeDifficultyFilter = "All";
let searchQuery = "";

function initPlantLibrary() {
  const gridContainer = document.getElementById("plant-grid-container");
  if (!gridContainer || typeof PLANTS_DATA === "undefined") return;

  const searchInput = document.getElementById("plant-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderPlantGrid();
    });
  }

  // Type Checkboxes
  const typeCheckboxes = document.querySelectorAll(".filter-type-checkbox");
  typeCheckboxes.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      if (e.target.checked) {
        activeTypeFilters.add(e.target.value);
      } else {
        activeTypeFilters.delete(e.target.value);
      }
      renderPlantGrid();
    });
  });

  // Light Radios
  const lightRadios = document.querySelectorAll(".filter-light-radio");
  lightRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      activeLightFilter = e.target.value;
      renderPlantGrid();
    });
  });

  // Difficulty Chips
  const difficultyBtns = document.querySelectorAll(".filter-difficulty-btn");
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      difficultyBtns.forEach((b) => b.classList.remove("ring-2", "ring-primary", "bg-primary", "text-white"));
      const diff = btn.dataset.difficulty;
      if (activeDifficultyFilter === diff) {
        activeDifficultyFilter = "All";
      } else {
        activeDifficultyFilter = diff;
        btn.classList.add("ring-2", "ring-primary", "bg-primary", "text-white");
      }
      renderPlantGrid();
    });
  });

  renderPlantGrid();
}

function renderPlantGrid() {
  const gridContainer = document.getElementById("plant-grid-container");
  const countElement = document.getElementById("plant-count");
  if (!gridContainer) return;

  const filtered = PLANTS_DATA.filter((plant) => {
    // Search filter
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery) ||
      plant.scientificName.toLowerCase().includes(searchQuery) ||
      plant.type.toLowerCase().includes(searchQuery);

    // Type filter
    const matchesType = activeTypeFilters.size === 0 || activeTypeFilters.has(plant.type);

    // Light filter
    const matchesLight =
      activeLightFilter === "All" ||
      plant.light.toLowerCase().includes(activeLightFilter.toLowerCase());

    // Difficulty filter
    const matchesDifficulty =
      activeDifficultyFilter === "All" || plant.difficulty === activeDifficultyFilter;

    return matchesSearch && matchesType && matchesLight && matchesDifficulty;
  });

  if (countElement) {
    countElement.textContent = `Showing ${filtered.length} plant${filtered.length === 1 ? "" : "s"}`;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-16 text-center glass-card rounded-2xl p-8">
        <span class="material-symbols-outlined text-5xl text-outline mb-3">search_off</span>
        <h3 class="text-xl font-bold text-primary mb-2">No matching plants found</h3>
        <p class="text-on-surface-variant max-w-md mx-auto mb-6">Try adjusting your search terms or clearing your filter selections to explore our full green index.</p>
        <button onclick="resetFilters()" class="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-secondary transition-colors">Reset All Filters</button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered
    .map(
      (plant) => `
    <div class="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between">
      <div class="relative h-64 overflow-hidden">
        <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
             src="${plant.image}" 
             alt="${plant.name}" />
        <div class="absolute top-4 right-4 ${plant.difficultyBadge} backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
          ${plant.difficulty} Care
        </div>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-bold text-xl text-on-surface">${plant.name}</h3>
            <span class="text-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-medium">${plant.type}</span>
          </div>
          <p class="text-sm italic text-on-surface-variant mb-3">${plant.scientificName}</p>
          <p class="text-sm text-on-surface-variant line-clamp-2">${plant.description}</p>
        </div>
        <div class="pt-2 border-t border-white/20 flex items-center justify-between">
          <div class="flex items-center gap-1.5 text-primary text-sm font-semibold">
            <span class="material-symbols-outlined text-base">${plant.lightIcon}</span>
            <span>${plant.light}</span>
          </div>
          <button onclick="openPlantModal('${plant.id}')" 
                  class="bg-primary text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-secondary transition-all shadow-sm hover:scale-105">
            View Details
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function resetFilters() {
  activeTypeFilters.clear();
  activeLightFilter = "All";
  activeDifficultyFilter = "All";
  searchQuery = "";

  const searchInput = document.getElementById("plant-search-input");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll(".filter-type-checkbox").forEach((cb) => (cb.checked = false));
  document.querySelectorAll(".filter-light-radio").forEach((r) => (r.checked = r.value === "All"));
  document.querySelectorAll(".filter-difficulty-btn").forEach((b) => b.classList.remove("ring-2", "ring-primary", "bg-primary", "text-white"));

  renderPlantGrid();
}

/* Plant Modal Popup Logic */
function openPlantModal(plantId) {
  const plant = PLANTS_DATA.find((p) => p.id === plantId);
  if (!plant) return;

  const modal = document.getElementById("plant-detail-modal");
  const content = document.getElementById("modal-content-area");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative">
      <div class="h-72 w-full overflow-hidden rounded-t-3xl relative">
        <img class="w-full h-full object-cover" src="${plant.image}" alt="${plant.name}">
        <div class="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
        <button onclick="closePlantModal()" class="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white hover:bg-white/40 p-2 rounded-full transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
        <div class="absolute bottom-6 left-6 right-6 text-white">
          <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full">${plant.type}</span>
          <h2 class="text-3xl font-bold mt-2">${plant.name}</h2>
          <p class="text-sm opacity-90 italic">${plant.scientificName}</p>
        </div>
      </div>
      <div class="p-6 md:p-8 space-y-6">
        <p class="text-on-surface-variant text-base leading-relaxed">${plant.description}</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-white/50 border border-white/60 text-center">
            <span class="material-symbols-outlined text-primary mb-1">${plant.lightIcon}</span>
            <p class="text-xs text-outline">Light Requirement</p>
            <p class="text-sm font-bold text-on-surface mt-0.5">${plant.light}</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/50 border border-white/60 text-center">
            <span class="material-symbols-outlined text-secondary mb-1">water_drop</span>
            <p class="text-xs text-outline">Watering Frequency</p>
            <p class="text-sm font-bold text-on-surface mt-0.5">${plant.waterFreq}</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/50 border border-white/60 text-center">
            <span class="material-symbols-outlined text-primary mb-1">thermostat</span>
            <p class="text-xs text-outline">Temperature</p>
            <p class="text-sm font-bold text-on-surface mt-0.5">${plant.temp}</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/50 border border-white/60 text-center">
            <span class="material-symbols-outlined ${plant.toxicToPets ? "text-tertiary" : "text-primary"} mb-1">pets</span>
            <p class="text-xs text-outline">Pet Safety</p>
            <p class="text-sm font-bold text-on-surface mt-0.5">${plant.toxicToPets ? "Toxic to Pets" : "Pet Friendly"}</p>
          </div>
        </div>

        <div class="space-y-3 bg-surface-container/50 p-4 rounded-2xl border border-white/40">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">potted_plant</span>
            <div>
              <h4 class="text-sm font-bold text-on-surface">Recommended Soil Mix</h4>
              <p class="text-xs text-on-surface-variant">${plant.soil}</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary">humidity_mid</span>
            <div>
              <h4 class="text-sm font-bold text-on-surface">Humidity Preference</h4>
              <p class="text-xs text-on-surface-variant">${plant.humidity}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 pt-2">
          <button onclick="addToSchedule('${plant.name}')" class="flex-1 bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary transition-all shadow-md flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">add_task</span>
            <span>Add to Watering Schedule</span>
          </button>
          <button onclick="closePlantModal()" class="py-3 px-6 rounded-full border border-outline text-on-surface-variant font-bold hover:bg-white/60 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePlantModal() {
  const modal = document.getElementById("plant-detail-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function initModalListeners() {
  const modal = document.getElementById("plant-detail-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closePlantModal();
    });
  }
}

function addToSchedule(plantName) {
  closePlantModal();
  showToast(`Added ${plantName} to your garden schedule!`);
}

/* Watering Schedule Persistence & Interactions */
function initWateringSchedule() {
  const scheduleContainer = document.getElementById("watering-schedule-list");
  if (!scheduleContainer) return;

  // Load saved state from LocalStorage
  const savedState = JSON.parse(localStorage.getItem("verdant_watered_plants") || "{}");

  const checkboxes = document.querySelectorAll(".water-checkbox");
  checkboxes.forEach((cb) => {
    const plantId = cb.dataset.plantId;
    if (savedState[plantId]) {
      cb.checked = true;
      updatePlantCardState(cb, true);
    }

    cb.addEventListener("change", (e) => {
      const isWatered = e.target.checked;
      savedState[plantId] = isWatered;
      localStorage.setItem("verdant_watered_plants", JSON.stringify(savedState));
      updatePlantCardState(cb, isWatered);

      if (isWatered) {
        showToast("Plant marked as watered! Hydration restored. 💧");
      } else {
        showToast("Watering schedule updated.");
      }
      updateDailyGoal();
    });
  });

  updateDailyGoal();
}

function updatePlantCardState(checkbox, isWatered) {
  const card = checkbox.closest(".glass-card");
  if (!card) return;

  const levelBadge = card.querySelector(".hydration-level-text");
  const progressBar = card.querySelector(".hydration-progress-bar");
  const statusIcon = card.querySelector(".status-indicator");

  if (isWatered) {
    if (levelBadge) levelBadge.textContent = "100%";
    if (progressBar) progressBar.style.width = "100%";
    if (statusIcon) {
      statusIcon.innerHTML = `
        <span class="material-symbols-outlined text-primary text-2xl">check_circle</span>
        <span class="text-[10px] font-bold text-primary uppercase tracking-wider">Hydrated</span>
      `;
    }
  } else {
    const defaultLevel = checkbox.dataset.defaultLevel || "20";
    if (levelBadge) levelBadge.textContent = `${defaultLevel}%`;
    if (progressBar) progressBar.style.width = `${defaultLevel}%`;
    if (statusIcon) {
      statusIcon.innerHTML = `
        <span class="material-symbols-outlined text-secondary text-2xl animate-bounce">water_drop</span>
        <span class="text-[10px] font-bold text-secondary uppercase tracking-wider">Thirsty</span>
      `;
    }
  }
}

function updateDailyGoal() {
  const total = document.querySelectorAll(".water-checkbox").length;
  const checked = document.querySelectorAll(".water-checkbox:checked").length;
  const goalSummary = document.getElementById("goal-progress-summary");
  if (goalSummary) {
    goalSummary.textContent = `${checked} of ${total} plants watered today`;
  }
}

/* Plant Tips Accordion & Filter Logic */
function initPlantTips() {
  const accordionButtons = document.querySelectorAll(".accordion-btn");
  accordionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".accordion-icon");
      if (content) {
        content.classList.toggle("hidden");
        if (icon) {
          icon.textContent = content.classList.contains("hidden") ? "expand_more" : "expand_less";
        }
      }
    });
  });
}
