// js/data/tips.js
// VerdentCare Plant Wisdom & Tips Data matching Stitch Design

const TIPS = [
  {
    id: 'tip-featured',
    title: 'Sunlight Secrets: Dappled Indirect Light',
    category: 'Light',
    readTime: '3 min',
    author: 'Elena Vance, Horticulturalist',
    isFeatured: true,
    week: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAE20va8zEoEZlxLebr42DLI0Lt9B1-yZm3dQGOiOEeIUTer1Lcf0mCFuMbPXZis1ccSluvV_GwgeVqbLCR-oyXX3O1rTBFeEKV-owaonTOoXveNEXtgR4LRnNb4Xk1KnM_zjGWzpWGQOs5MY0PKILDsU1TCi2boFd_KnsAHytRrCPZCPI2JSJYW5vhZyo3AutpBJe-QIpmSSZy-bRiCO99JL2WEbF2aK3p9trXKD7Sh6X11hTrHhVgg',
    body: 'Mastering the delicate balance of indirect light to help your monsteras thrive this season. Remember, morning sun is a gentle hug; afternoon sun can be a harsh slap.'
  },
  {
    id: 'tip-1',
    title: 'The Golden Rule of Watering: Soil Reading',
    category: 'Watering',
    readTime: '3 min',
    author: 'Elena Vance, Horticulturalist',
    isFeatured: false,
    week: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWtw_SCBg9WChn_Up5oIPqQKZqSqiQ5OjSrG9oCP6Fh5zjz3fP722pZdFb3kOYVYDlYJC8ASLdhOe78qIyvAXbN4zhwqzgMs3LitM81f_TyEfDTsSUmsQcL6aWM5GKZqlGXxddjhuJUW8ZQ6NTBzWetHnwkcgyuiAv3O04qmWkySjmeRxRWL31tgLHhtCKlWxtjOYG0s5jA0bK9wCkOdLSQpRw9NsJJbHm4Nm7Q6QTN-f62NQGninElQ',
    body: 'When in doubt, wait it out. Overwatering is the number one cause of indoor plant heartbreak. Learn how to read the soil by inserting your finger 2 inches into the pot.'
  },
  {
    id: 'tip-2',
    title: 'Why Are My Leaves Dropping?',
    category: 'Troubleshooting',
    readTime: '4 min',
    author: 'Dr. Clara Thorne',
    isFeatured: false,
    week: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTaqqLiYXGZRYw2qnkJN5XLbq0XWSy6ov0jj__oq3gp9CvxftJyTWJrdy-ljIwTUdu1unAh2scpYcLbiS8PE0BNeR17Ux0XtTM_Zh6GGslluFtxADMITFxwo8hsVkPovCe9USiIN1RIH5UxmthZzcAyzZA5DaB5n0JC6OFHlzgRnSLYzKLA8xCurXV6ZOBh8fMx-5KpL7uHWtG2GfyCJZrNvXkeKkC_y8RVtI-IiCVJUQiJWOI21IVUw',
    body: 'Don\'t panic. Leaf drop can be a sign of shock, drafts, or simple seasonality. Here is a step-by-step diagnostic checklist for your indoor jungle.'
  },
  {
    id: 'tip-3',
    title: 'Paws & Plants: A Safe Haven',
    category: 'Pet Safety',
    readTime: '4 min',
    author: 'Sarah Lin, Plant Stylist',
    isFeatured: false,
    week: 3,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKjM_CerMM6eA5q9UmzMCD9XJttczrcn-NSANLHxK-rlHT0-EqUgk2MHFYwAId93pdYYAmmyGkg97PjH05Z3-GtNwc_K06d0wTb1btKHkMaBgQGWjKHHZ1kO73mkYEQ6PrbeVSRjYtl7isG6Q8XX8i3h_aVvX58N1zzTlgWbsj7jfci6We-Vl1Km_-_H6Dw7juNDnBmeHJMgZKx66vVi0IXkhPIsQvr_1KUEgXS_cqVwR3KUFsQjjyg',
    body: 'Creating a lush indoor jungle that won\'t send your furry friends to the vet. Discover our curated non-toxic plant list featuring Boston Ferns & Calatheas.'
  },
  {
    id: 'tip-4',
    title: 'Boosting Humidity Without a Humidifier',
    category: 'Humidity',
    readTime: '3 min',
    author: 'Elena Vance',
    isFeatured: false,
    week: 4,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7odBmrGWKx2KrYgm0DfW7B4w1MWiritm7zMbegC77SxmsWaqnDNIOKHKzJTI9cv6nho-xw9VwhONLjnbHXqlKxletpV2i3nUMk8azzW7BE6c1q_GhixMvltLfUbTDlHv_jrBJ-O3fXIqYulfm4z76OybQkGYYBqEe4vIEJ46Td3_KtuciYVXEQtTj-T_EDF_ZMlhn-s7jMP6bFN-NGngu3dDQK9zrP8M2MJ9MZHeFiLdilt1FdXUn5A',
    body: 'Group tropical plants together to create a microclimate transpiration bubble, or place pots over a pebble tray filled with water.'
  },
  {
    id: 'tip-5',
    title: 'Water Propagation Node Guide',
    category: 'Troubleshooting',
    readTime: '6 min',
    author: 'Marcus Reed',
    isFeatured: false,
    week: 5,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    body: 'When propagating Pothos or Monstera stem cuttings, always ensure at least one brown root node is submerged in clean water.'
  }
];

const TIP_CATEGORIES = ['All', 'Watering', 'Light', 'Humidity', 'Troubleshooting', 'Pet Safety'];

function getFeaturedTip() {
  return TIPS.find(t => t.isFeatured) || TIPS[0];
}

function getTipsByCategory(category) {
  if (!category || category === 'All') return TIPS;
  return TIPS.filter(t => t.category.toLowerCase() === category.toLowerCase());
}
