// js/utils/storage.js
// localStorage helpers for Leafly & Co.

const STORAGE_KEYS = {
  SAVED_PLANTS: 'leafly_saved_plants',
  WATERING_LOG: 'leafly_watering_log',
  BOOKMARKS: 'leafly_bookmarks',
  COMMUNITY_POSTS: 'leafly_community_posts',
  NEWSLETTER: 'leafly_newsletter'
};

// ─── Generic Helpers ─────────────────────────────────────
function storageGet(key, fallback = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch (e) {
    console.warn('Storage read error:', e);
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('Storage write error:', e);
    return false;
  }
}

function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('Storage remove error:', e);
  }
}

// ─── Saved Plants ─────────────────────────────────────────
function getSavedPlants() {
  return storageGet(STORAGE_KEYS.SAVED_PLANTS, []);
}

function savePlant(plant) {
  const plants = getSavedPlants();
  const exists = plants.find(p => p.id === plant.id);
  if (!exists) {
    plants.push({
      id: plant.id,
      name: plant.name,
      emoji: plant.emoji,
      frequencyDays: plant.frequencyDays,
      difficulty: plant.difficulty,
      petSafe: plant.petSafe,
      addedAt: new Date().toISOString()
    });
    storageSet(STORAGE_KEYS.SAVED_PLANTS, plants);
    return true; // newly added
  }
  return false; // already exists
}

function removeSavedPlant(id) {
  const plants = getSavedPlants().filter(p => p.id !== id);
  storageSet(STORAGE_KEYS.SAVED_PLANTS, plants);
}

function isPlantSaved(id) {
  return getSavedPlants().some(p => p.id === id);
}

// ─── Custom Schedule Plants ────────────────────────────────
function getSchedulePlants() {
  return storageGet('leafly_schedule_plants', []);
}

function addSchedulePlant(plant) {
  const plants = getSchedulePlants();
  plants.push(plant);
  storageSet('leafly_schedule_plants', plants);
}

function removeSchedulePlant(id) {
  const plants = getSchedulePlants().filter(p => p.scheduleId !== id);
  storageSet('leafly_schedule_plants', plants);
}

// ─── Watering Log ─────────────────────────────────────────
function getWateringLog() {
  return storageGet(STORAGE_KEYS.WATERING_LOG, {});
}

function markWatered(plantId) {
  const log = getWateringLog();
  log[plantId] = new Date().toISOString();
  storageSet(STORAGE_KEYS.WATERING_LOG, log);
}

function getLastWatered(plantId) {
  const log = getWateringLog();
  return log[plantId] || null;
}

function getWateringStatus(plantId, frequencyDays) {
  const lastWatered = getLastWatered(plantId);
  if (!lastWatered) return { status: 'overdue', daysLeft: -frequencyDays, progress: 0 };

  const last = new Date(lastWatered);
  const now = new Date();
  const daysPassed = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  const daysLeft = frequencyDays - daysPassed;
  const progress = Math.min(daysPassed / frequencyDays, 1);

  let status;
  if (daysLeft > 2) status = 'ok';
  else if (daysLeft >= 0) status = 'soon';
  else status = 'overdue';

  return { status, daysLeft, daysPassed, progress };
}

// ─── Bookmarks ────────────────────────────────────────────
function getBookmarks() {
  return storageGet(STORAGE_KEYS.BOOKMARKS, []);
}

function toggleBookmark(tipId) {
  const bookmarks = getBookmarks();
  const idx = bookmarks.indexOf(tipId);
  if (idx === -1) {
    bookmarks.push(tipId);
    storageSet(STORAGE_KEYS.BOOKMARKS, bookmarks);
    return true; // added
  } else {
    bookmarks.splice(idx, 1);
    storageSet(STORAGE_KEYS.BOOKMARKS, bookmarks);
    return false; // removed
  }
}

function isBookmarked(tipId) {
  return getBookmarks().includes(tipId);
}

// ─── Community Posts ──────────────────────────────────────
function getCommunityPosts() {
  return storageGet(STORAGE_KEYS.COMMUNITY_POSTS, getDefaultPosts());
}

function saveCommunityPosts(posts) {
  storageSet(STORAGE_KEYS.COMMUNITY_POSTS, posts);
}

function addCommunityPost(post) {
  const posts = getCommunityPosts();
  posts.unshift(post);
  storageSet(STORAGE_KEYS.COMMUNITY_POSTS, posts);
}

function likePost(postId) {
  const posts = getCommunityPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    post.liked = true;
    storageSet(STORAGE_KEYS.COMMUNITY_POSTS, posts);
    return post.likes;
  }
  return 0;
}

function getDefaultPosts() {
  return [
    {
      id: 'post-001',
      author: 'Maya Chen',
      avatar: '🌸',
      plant: 'Monstera deliciosa',
      caption: 'My Monstera just pushed out its first fenestrated leaf! 5 months of patience paid off. The new leaf has 7 splits! 🌿✨',
      emoji: '🌿',
      likes: 48,
      liked: false,
      comments: 12,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      tags: ['monstera', 'newleaf', 'plantmom']
    },
    {
      id: 'post-002',
      author: 'James Rivera',
      avatar: '🌱',
      plant: 'Propagation Station',
      caption: 'My propagation station is thriving! 14 cuttings, 14 successes. Pothos, philodendron, and two mystery plants from a friend\'s garden. 💚',
      emoji: '🌱',
      likes: 35,
      liked: false,
      comments: 8,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      tags: ['propagation', 'plantlife', 'waterrooting']
    },
    {
      id: 'post-003',
      author: 'Sofia Andersson',
      avatar: '🌺',
      plant: 'Peace Lily',
      caption: 'My Peace Lily bloomed for the first time since I got it 8 months ago! Those white flowers against the dark green leaves... stunning 🤍',
      emoji: '🤍',
      likes: 62,
      liked: false,
      comments: 19,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['peacelily', 'blooming', 'indoorplants']
    },
    {
      id: 'post-004',
      author: 'Aiden Park',
      avatar: '🌵',
      plant: 'Succulent Collection',
      caption: 'Rearranged my succulent shelf today. 23 plants and counting! My echeveria collection is my pride and joy 🌸🌵',
      emoji: '🌵',
      likes: 29,
      liked: false,
      comments: 5,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['succulents', 'shelfie', 'echeveria']
    },
    {
      id: 'post-005',
      author: 'Priya Nair',
      avatar: '🍃',
      plant: 'Fiddle Leaf Fig',
      caption: 'Update on my Fiddle Leaf Fig rescue! 3 months ago it had 3 leaves left. Today: 11 new leaves and counting! Patience, consistency, and filtered water. 🎸',
      emoji: '🎸',
      likes: 89,
      liked: false,
      comments: 24,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['fiddleleaffig', 'plantrescue', 'growthupdate']
    },
    {
      id: 'post-006',
      author: 'Tom Laurent',
      avatar: '🌿',
      plant: 'Herb Garden',
      caption: 'Harvested my first batch of basil for homemade pesto! Growing your own herbs is one of life\'s simple pleasures 🌿🍝',
      emoji: '🌿',
      likes: 41,
      liked: false,
      comments: 15,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ['herbs', 'basil', 'kitchengarden', 'fromgarden']
    }
  ];
}

// ─── Newsletter ───────────────────────────────────────────
function hasSubscribed() {
  return storageGet(STORAGE_KEYS.NEWSLETTER, false);
}

function setSubscribed(email) {
  storageSet(STORAGE_KEYS.NEWSLETTER, { email, date: new Date().toISOString() });
}
