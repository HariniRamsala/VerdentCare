// js/pages/plant-detail.js
// Stitch Plant Detail Page renderer with Real Botanical Photography

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const plantId = params.get('id');
  const plant = plantId ? getPlantById(plantId) : null;

  const detailSection = document.getElementById('plant-detail-content');
  const notFound = document.getElementById('plant-not-found');
  const addBtn = document.getElementById('add-to-garden-btn');

  if (!plant) {
    if (detailSection) detailSection.classList.add('hidden');
    if (notFound) notFound.classList.remove('hidden');
    return;
  }

  // Set titles
  document.title = `${plant.name} Care Guide | VerdentCare`;
  const breadcrumbPlant = document.getElementById('breadcrumb-plant');
  if (breadcrumbPlant) breadcrumbPlant.textContent = plant.name;

  // Header Details
  const heroImage = document.getElementById('detail-image');
  const heroName = document.getElementById('detail-name');
  const heroScientific = document.getElementById('detail-scientific');
  const heroDesc = document.getElementById('detail-description');
  const heroBadges = document.getElementById('detail-badges');

  if (heroImage) {
    heroImage.src = plant.image;
    heroImage.alt = plant.name;
  }
  if (heroName) heroName.textContent = plant.name;
  if (heroScientific) heroScientific.textContent = plant.scientificName;
  if (heroDesc) heroDesc.textContent = plant.description;

  if (heroBadges) {
    heroBadges.innerHTML = `
      <span class="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-label-md">📦 ${plant.size} Size</span>
      <span class="bg-primary-container/30 text-on-primary-container px-3 py-1 rounded-full text-xs font-label-md">🌿 ${plant.category}</span>
      <span class="bg-tertiary-container/30 text-on-tertiary-container px-3 py-1 rounded-full text-xs font-label-md">🌱 ${plant.difficulty} Level</span>
      <span class="${plant.petSafe ? 'bg-primary-container/30 text-on-primary-container' : 'bg-secondary-container/30 text-on-secondary-container'} px-3 py-1 rounded-full text-xs font-label-md">
        ${plant.petSafe ? '🐾 Pet Safe' : '⚠️ Toxic'}
      </span>
    `;
  }

  // Care Instructions Grid
  const careContainer = document.getElementById('care-instructions');
  if (careContainer && plant.careInstructions) {
    const iconMap = {
      watering: 'water_drop',
      light: 'wb_sunny',
      soil: 'landscape',
      humidity: 'air',
      temperature: 'thermostat',
      fertilizer: 'science',
      repotting: 'potted_plant',
      propagation: 'spa'
    };

    careContainer.innerHTML = Object.entries(plant.careInstructions).map(([key, value]) => `
      <div class="glass-card rounded-xl p-6 flex flex-col gap-2 border-l-4 border-l-primary hover:scale-[1.02] transition-transform">
        <div class="flex items-center gap-2 text-primary">
          <span class="material-symbols-outlined text-2xl">${iconMap[key] || 'eco'}</span>
          <h3 class="font-headline-md text-headline-md text-on-surface text-lg uppercase tracking-wider">${key}</h3>
        </div>
        <p class="font-body-md text-on-surface-variant text-sm leading-relaxed">${value}</p>
      </div>
    `).join('');
  }

  // Fun Fact
  const funFactEl = document.getElementById('fun-fact');
  if (funFactEl) funFactEl.textContent = plant.funFact;

  // Add to Garden Button Logic
  if (addBtn) {
    const alreadySaved = isPlantSaved(plant.id);
    updateAddBtn(alreadySaved);

    addBtn.addEventListener('click', () => {
      const added = savePlant(plant);
      if (added) {
        updateAddBtn(true);
        showToast(`${plant.name} added to your garden! 🪴`, 'success');
      } else {
        showToast(`${plant.name} is already in your garden!`, 'info');
      }
    });
  }

  function updateAddBtn(isSaved) {
    if (!addBtn) return;
    if (isSaved) {
      addBtn.innerHTML = '<span class="material-symbols-outlined text-lg">check_circle</span> In Your Garden';
      addBtn.classList.remove('bg-primary');
      addBtn.classList.add('glass-card', 'text-primary');
    } else {
      addBtn.innerHTML = '<span class="material-symbols-outlined text-lg">potted_plant</span> Add to My Garden';
      addBtn.classList.remove('glass-card', 'text-primary');
      addBtn.classList.add('bg-primary', 'text-on-primary');
    }
  }

  // Share Link
  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Care guide link copied to clipboard! 📋', 'info');
      });
    });
  }
});
