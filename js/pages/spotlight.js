// js/pages/spotlight.js
// Stitch Botanical Matching Quiz & FileReader Gallery Preview with Real Plant Photography

document.addEventListener('DOMContentLoaded', () => {
  const quizStepLabel = document.getElementById('quiz-step-label');
  const quizCatLabel = document.getElementById('quiz-cat-label');
  const quizFill = document.getElementById('quiz-progress-fill');
  const quizLeaf = document.getElementById('quiz-progress-leaf');
  const quizContainer = document.getElementById('quiz-container');

  let currentStep = 1;
  let quizAnswers = { light: 'indirect', difficulty: 'easy', petSafe: 'yes' };

  // Step Data
  const steps = [
    {
      step: 1,
      category: 'Light Needs',
      title: 'How much natural light does your space get?',
      options: [
        { value: 'low', title: 'Low Light', desc: 'North-facing windows or rooms with minimal indirect sunlight.', icon: 'cloud' },
        { value: 'indirect', title: 'Indirect Light', desc: 'East or West facing windows with bright indirect light.', icon: 'partly_cloudy_day' },
        { value: 'bright', title: 'Direct Sunlight', desc: 'South-facing windows bathed in bright direct sun.', icon: 'wb_sunny' }
      ],
      key: 'light'
    },
    {
      step: 2,
      category: 'Care Level',
      title: 'How much time can you dedicate to plant care?',
      options: [
        { value: 'easy', title: 'Beginner / Low Care', desc: 'Low maintenance, drought tolerant, forgiving of neglect.', icon: 'spa' },
        { value: 'medium', title: 'Moderate Care', desc: 'Enjoys weekly watering, occasional misting and feeding.', icon: 'water_drop' },
        { value: 'hard', title: 'Plant Enthusiast', desc: 'Loves high humidity, precise watering and regular attention.', icon: 'psychology' }
      ],
      key: 'difficulty'
    },
    {
      step: 3,
      category: 'Pet Safety',
      title: 'Do you have furry friends at home?',
      options: [
        { value: 'yes', title: 'Pet-Safe Only 🐾', desc: 'Non-toxic plants safe for cats and dogs.', icon: 'pets' },
        { value: 'no', title: 'All Plants Welcome', desc: 'Open to all houseplants regardless of pet safety.', icon: 'yard' }
      ],
      key: 'petSafe'
    }
  ];

  function renderStep(stepIndex) {
    const s = steps[stepIndex - 1];
    if (!s || !quizContainer) return;

    const pct = Math.round((stepIndex / 3) * 100);
    if (quizStepLabel) quizStepLabel.textContent = `Step ${stepIndex} of 3`;
    if (quizCatLabel) quizCatLabel.textContent = s.category;
    if (quizFill) quizFill.style.width = `${pct}%`;
    if (quizLeaf) quizLeaf.style.left = `${pct}%`;

    quizContainer.innerHTML = `
      <div class="quiz-step">
        <h2 class="font-headline-lg text-headline-lg text-center mb-8 text-on-background">${s.title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-${s.options.length} gap-6">
          ${s.options.map(opt => `
            <button class="quiz-opt-btn glass-card rounded-xl p-6 flex flex-col items-center text-center gap-3 hover:border-primary border-2 border-transparent transition-all hover:scale-105" data-key="${s.key}" data-val="${opt.value}">
              <div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary text-3xl">
                <span class="material-symbols-outlined text-3xl">${opt.icon}</span>
              </div>
              <h3 class="font-headline-md text-headline-md text-on-surface text-lg">${opt.title}</h3>
              <p class="font-body-md text-on-surface-variant text-xs">${opt.desc}</p>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Bind Quiz Buttons
    quizContainer.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.key;
        const v = btn.dataset.val;
        quizAnswers[k] = v;

        if (currentStep < 3) {
          currentStep++;
          renderStep(currentStep);
        } else {
          showQuizResults();
        }
      });
    });
  }

  function showQuizResults() {
    if (!quizContainer) return;
    if (quizStepLabel) quizStepLabel.textContent = 'Results Ready!';
    if (quizCatLabel) quizCatLabel.textContent = 'Matching Completed';
    if (quizFill) quizFill.style.width = '100%';
    if (quizLeaf) quizLeaf.style.left = '100%';

    const matches = PLANTS.filter(p => {
      const matchLight = !quizAnswers.light || p.light.toLowerCase().includes(quizAnswers.light.toLowerCase());
      const matchDiff = !quizAnswers.difficulty || p.difficulty.toLowerCase() === quizAnswers.difficulty.toLowerCase();
      const matchPet = quizAnswers.petSafe === 'yes' ? p.petSafe : true;
      return matchLight || matchDiff || matchPet;
    }).slice(0, 3);

    const matchPlants = matches.length ? matches : PLANTS.slice(0, 3);

    quizContainer.innerHTML = `
      <div class="text-center flex flex-col items-center gap-6">
        <span class="material-symbols-outlined text-6xl text-primary">task_alt</span>
        <h2 class="font-headline-xl text-headline-lg text-on-surface">We Found Your Plant Soulmates!</h2>
        <p class="text-on-surface-variant max-w-xl">Based on your space &amp; lifestyle, here are the best houseplant matches for you:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          ${matchPlants.map(p => `
            <div class="glass-card rounded-xl p-6 flex flex-col items-center text-center gap-3">
              <div class="w-full h-40 rounded-xl overflow-hidden relative shadow-sm border border-white/40 mb-2">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" />
              </div>
              <h3 class="font-headline-md text-on-surface text-lg">${p.name}</h3>
              <span class="text-xs bg-primary-container/30 text-on-primary-container px-3 py-1 rounded-full font-label-md">${p.difficulty} Care</span>
              <a href="plant-detail.html?id=${p.id}" class="mt-2 bg-primary text-on-primary w-full py-2.5 rounded-full font-label-md text-sm hover:scale-105 transition-transform flex items-center justify-center gap-1">
                View Care Guide →
              </a>
            </div>
          `).join('')}
        </div>

        <button onclick="location.reload()" class="mt-6 glass-card text-on-surface px-8 py-3 rounded-full font-label-md hover:scale-105 transition-transform">
          Retake Quiz
        </button>
      </div>
    `;
  }

  // FileReader Gallery
  const uploadInput = document.getElementById('gallery-upload');
  const previewContainer = document.getElementById('gallery-preview');

  if (uploadInput && previewContainer) {
    uploadInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'relative rounded-xl overflow-hidden aspect-square glass-card shadow-sm border border-white/40';
          wrapper.innerHTML = `
            <img src="${ev.target.result}" alt="Uploaded plant photo" class="w-full h-full object-cover" />
            <button class="absolute top-2 right-2 bg-error text-on-error w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md remove-img" title="Remove">✕</button>
          `;
          wrapper.querySelector('.remove-img').addEventListener('click', () => wrapper.remove());
          previewContainer.appendChild(wrapper);
        };
        reader.readAsDataURL(file);
      });
      uploadInput.value = '';
    });
  }

  renderStep(1);
});
