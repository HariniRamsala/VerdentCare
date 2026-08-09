// js/data/plants.js
// Leafly & Co. Unique High-Definition Botanical Photography Dataset

const PLANTS = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'Foliage',
    difficulty: 'Easy',
    light: 'Bright Indirect',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: false,
    size: 'Large',
    emoji: '🌿',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtHAHzHUywv3XIQcTrw0ka8ruLx4JStmYARTtNOhtcySOyQ0vv2LC4PL_XsWmJFhbdm9o1pqJV_GH0wfSXv8_9-1ADU1aAjyjLWkDAcZjuW91BO3svMplTfM92qdY9sWCnbuo2VLHOJQ3SdTmrvREQz38QLM3yB-8OeAkSSeDXy7eRyuHWXwlzOxiHbDzu9TNmV3YPf0XSahYVZgPGDVWnkdrffEEmVy7ZU20VFccaZyvJ2YHAqpIlTA',
    description: 'Known for its iconic split leaves (fenestrations), the Swiss Cheese Plant is a dramatic tropical houseplant that adds instant jungle vibes to any room.',
    careInstructions: {
      watering: 'Water thoroughly when the top 2-3 inches of soil feel dry. Allow excess water to drain out. Reduce watering in winter.',
      light: 'Thrives in bright, indirect sunlight. Can tolerate medium light, but leaf splits will be less pronounced.',
      soil: 'Well-draining, peat-based potting mix with perlite and orchid bark.',
      humidity: 'Prefers 50%+ humidity. Mist leaves or place near a humidifier.',
      temperature: '65°F – 85°F (18°C – 29°C). Keep away from cold drafts.',
      fertilizer: 'Feed monthly during spring and summer with a balanced liquid fertilizer diluted to half strength.',
      repotting: 'Repot every 1-2 years in spring when roots become pot-bound.',
      propagation: 'Easily propagated via stem node cuttings rooted in water or moist sphagnum moss.'
    },
    funFact: 'In the wild, Monstera deliciosa produces edible fruit that tastes like a combination of pineapple and banana!'
  },
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    category: 'Succulent',
    difficulty: 'Easy',
    light: 'Low to Bright',
    waterFrequency: 'Every 14-21 days',
    frequencyDays: 14,
    petSafe: false,
    size: 'Medium',
    emoji: '🪴',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrNm-AyknpJ1PzVeL8ZBu9RycslFjavDsr2_cvqitRetYc2jGco59PD9OZXIy48FZsqwF9r2XypnfZTPdYktqAOfbRbPjqJUXuI8beGr5E7uuNfcSnvgQDE3S5-eF05ycIkgvxaHV8olaMeaIFmE6KyMzNNb3iX_9p7-N5Cngf6jUvVXU7g7pc2qZD7aGNVw-Fx3N3H9TTXfT27LDpXq5hrvXfcAARetQUW7zqoSFGQCctSG46oL0BSA',
    description: 'Extremely resilient and architectural. The Snake Plant features stiff, sword-like leaves with striking variegation. It tolerates neglect and low light with ease.',
    careInstructions: {
      watering: 'Allow soil to dry out completely between waterings. Water sparingly — overwatering causes root rot.',
      light: 'Adapts to almost any light level, from dark corners to bright direct sun.',
      soil: 'Fast-draining cactus or succulent mix.',
      humidity: 'Tolerates low humidity and dry indoor air.',
      temperature: '55°F – 85°F (13°C – 29°C). Protect from freezing temperatures.',
      fertilizer: 'Feed once in spring and once in summer with succulent food.',
      repotting: 'Repot every 3-4 years. Snake plants prefer being slightly root-bound.',
      propagation: 'Propagate by dividing rhizomes or taking leaf cuttings.'
    },
    funFact: 'Snake plants convert CO2 into oxygen at night, making them ideal bedroom companions for cleaner air while you sleep.'
  },
  {
    id: 'calathea-medallion',
    name: 'Calathea Medallion',
    scientificName: 'Calathea veitchiana',
    category: 'Foliage',
    difficulty: 'Medium',
    light: 'Medium Indirect',
    waterFrequency: 'Every 5-7 days',
    frequencyDays: 5,
    petSafe: true,
    size: 'Medium',
    emoji: '🌱',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEcm3B6yuonSa7mjwo_82crUgpnO2oWtHkiCcyHDx1nRd3botI3WbU2aXy99azFVmUAknw8PrXrFzKZ9IfwXxf3Ccor-bPM-fWE0n_IxhSRRteyN-s3roQM3iq_hl8YGqXiaFE8iZPK1efE2ZrXIJrNDMnBIoP2T6yMotFCMqASfLfaycSRLrQ2UmdpZ4MyZypp62aKhI0Uwo8BrI-3iOLlWmSh9YG7xVpp3rBY9wtWrepA-jMmEPIIg',
    description: 'A living work of art. Features large round leaves with intricate green pattern work on top and rich deep-purple undersides that fold up at night.',
    careInstructions: {
      watering: 'Keep soil consistently moist. Use filtered or distilled water to avoid leaf tip browning.',
      light: 'Medium to bright indirect light. Direct sun will scorch and fade its vivid leaf patterns.',
      soil: 'Moisture-retentive yet well-draining soil mix with perlite.',
      humidity: 'High humidity required (60%+). Humidifier highly recommended.',
      temperature: '65°F – 80°F (18°C – 27°C). Very sensitive to cold drafts.',
      fertilizer: 'Feed every 4 weeks in spring/summer with half-strength houseplant fertilizer.',
      repotting: 'Repot annually in spring using a pot 1-2 inches larger.',
      propagation: 'Propagate by root division during spring repotting.'
    },
    funFact: 'Calatheas are called "Prayer Plants" because their leaves fold upward at dusk, resembling hands folded in prayer.'
  },
  {
    id: 'golden-pothos',
    name: 'Golden Pothos',
    scientificName: 'Epipremnum aureum',
    category: 'Vining',
    difficulty: 'Easy',
    light: 'Low to Bright',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: false,
    size: 'Vining',
    emoji: '🍃',
    image: 'https://images.unsplash.com/photo-1596724811751-0ae381dc4f56?auto=format&fit=crop&w=800&q=80',
    description: 'The classic trailing houseplant. Heart-shaped green leaves splashed with golden yellow variegation. Nearly impossible to kill and grows fast.',
    careInstructions: {
      watering: 'Water when the top half of the soil dries out. Leaves will droop slightly when thirsty.',
      light: 'Tolerates low light, but variegated patterns stay brightest in bright indirect sun.',
      soil: 'Standard indoor potting soil.',
      humidity: 'Adapts well to normal household humidity levels.',
      temperature: '60°F – 85°F (15°C – 29°C).',
      fertilizer: 'Feed monthly in spring/summer.',
      repotting: 'Repot every 1-2 years or when roots fill the pot.',
      propagation: 'Roots effortlessly in water from stem node cuttings.'
    },
    funFact: 'Golden Pothos is often nicknamed "Devil’s Ivy" because it remains green and flourishes even in dark rooms.'
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'Tree',
    difficulty: 'Hard',
    light: 'Bright Indirect',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: false,
    size: 'Large',
    emoji: '🪴',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    description: 'Design favorite featuring large, scalloped fiddle-shaped leaves on tall woody stems. Makes a bold statement in bright living rooms.',
    careInstructions: {
      watering: 'Water when top 2 inches of soil dry. Thoroughly saturate until water drains.',
      light: 'Requires 4-6 hours of bright indirect sunlight daily.',
      soil: 'Rich, well-draining soil with perlite.',
      humidity: 'Prefers 50-65% humidity.',
      temperature: '65°F – 75°F (18°C – 24°C). Avoid location changes and drafts.',
      fertilizer: 'Feed monthly in spring/summer.',
      repotting: 'Repot every 2 years in spring.',
      propagation: 'Propagate by air layering or stem cuttings.'
    },
    funFact: 'Fiddle Leaf Fig leaves can grow up to 18 inches long and 12 inches wide under optimal conditions!'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    category: 'Foliage',
    difficulty: 'Easy',
    light: 'Low to Bright',
    waterFrequency: 'Every 14-21 days',
    frequencyDays: 14,
    petSafe: false,
    size: 'Medium',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
    description: 'Features waxy, naturally glossy dark green leaflets along arching stems. Stores water in potato-like underground rhizomes.',
    careInstructions: {
      watering: 'Allow soil to dry completely between waterings. Drought tolerant.',
      light: 'Tolerates deep shade, fluorescent light, or bright indirect sun.',
      soil: 'Well-draining potting soil mix.',
      humidity: 'Tolerates dry air.',
      temperature: '60°F – 80°F (15°C – 27°C).',
      fertilizer: 'Feed twice a year in spring and summer.',
      repotting: 'Repot every 2-3 years.',
      propagation: 'Propagate by leaflet cuttings or bulb division.'
    },
    funFact: 'The ZZ plant’s leaves are so glossy they look like they’ve been polished with wax!'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    category: 'Flowering',
    difficulty: 'Easy',
    light: 'Low to Medium',
    waterFrequency: 'Every 5-7 days',
    frequencyDays: 5,
    petSafe: false,
    size: 'Medium',
    emoji: '🌸',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80',
    description: 'Elegant deep green foliage producing graceful white spathe flowers. Communicates water needs by dramatically wilting when thirsty.',
    careInstructions: {
      watering: 'Keep soil evenly moist. Water when leaves begin to droop slightly.',
      light: 'Low to medium indirect light. Direct sun burns white flowers.',
      soil: 'Rich, peat-based potting soil.',
      humidity: 'High humidity preferred.',
      temperature: '65°F – 80°F (18°C – 27°C).',
      fertilizer: 'Feed bi-monthly in spring/summer.',
      repotting: 'Repot every 1-2 years.',
      propagation: 'Propagate by clump division.'
    },
    funFact: 'Peace Lilies explicitly "dramatize" thirst by wilting, but bounce back fully within 2 hours of watering.'
  },
  {
    id: 'rubber-tree',
    name: 'Rubber Tree',
    scientificName: 'Ficus elastica',
    category: 'Tree',
    difficulty: 'Easy',
    light: 'Bright Indirect',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: false,
    size: 'Large',
    emoji: '🪴',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTaqqLiYXGZRYw2qnkJN5XLbq0XWSy6ov0jj__oq3gp9CvxftJyTWJrdy-ljIwTUdu1unAh2scpYcLbiS8PE0BNeR17Ux0XtTM_Zh6GGslluFtxADMITFxwo8hsVkPovCe9USiIN1RIH5UxmthZzcAyzZA5DaB5n0JC6OFHlzgRnSLYzKLA8xCurXV6ZOBh8fMx-5KpL7uHWtG2GfyCJZrNvXkeKkC_y8RVtI-IiCVJUQiJWOI21IVUw',
    description: 'Stately plant with thick, rubbery dark burgundy or green leaves. Fast growing tree that adds clean modern height.',
    careInstructions: {
      watering: 'Water when top 2 inches dry out. Keep soil moist in summer, drier in winter.',
      light: 'Bright indirect sunlight. Wipe leaves with damp cloth to remove dust.',
      soil: 'Well-draining potting mix.',
      humidity: 'Moderate humidity.',
      temperature: '65°F – 80°F (18°C – 27°C).',
      fertilizer: 'Feed monthly in spring/summer.',
      repotting: 'Repot every 2 years.',
      propagation: 'Propagate by stem cuttings or air layering.'
    },
    funFact: 'The sap of Ficus elastica was historically used to manufacture natural rubber before synthetic rubber existed.'
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    scientificName: 'Nephrolepis exaltata',
    category: 'Fern',
    difficulty: 'Medium',
    light: 'Medium Indirect',
    waterFrequency: 'Every 3-5 days',
    frequencyDays: 3,
    petSafe: true,
    size: 'Medium',
    emoji: '🌿',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKjM_CerMM6eA5q9UmzMCD9XJttczrcn-NSANLHxK-rlHT0-EqUgk2MHFYwAId93pdYYAmmyGkg97PjH05Z3-GtNwc_K06d0wTb1btKHkMaBgQGWjKHHZ1kO73mkYEQ6PrbeVSRjYtl7isG6Q8XX8i3h_aVvX58N1zzTlgWbsj7jfci6We-Vl1Km_-_H6Dw7juNDnBmeHJMgZKx66vVi0IXkhPIsQvr_1KUEgXS_cqVwR3KUFsQjjyg',
    description: 'Feathery, arching green fronds creating a timeless lush display. Perfect in hanging baskets or pedestals.',
    careInstructions: {
      watering: 'Keep soil damp at all times. Never allow soil to dry out completely.',
      light: 'Filtered medium light. Protect from direct sun.',
      soil: 'Peat moss enriched potting mix.',
      humidity: 'Very high humidity required (65%+). Mist daily.',
      temperature: '60°F – 75°F (15°C – 24°C).',
      fertilizer: 'Feed every 3 weeks in spring/summer.',
      repotting: 'Repot in spring when root-bound.',
      propagation: 'Propagate by runner division.'
    },
    funFact: 'Boston Ferns date back to the Victorian era when fern gathering was a popular outdoor hobby called "Pteridomania".'
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    category: 'Foliage',
    difficulty: 'Easy',
    light: 'Bright Indirect',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: true,
    size: 'Small',
    emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=800&q=80',
    description: 'Classic variegated arching leaves producing miniature "spiderette" offshoots on trailing stems.',
    careInstructions: {
      watering: 'Water moderately when top inch of soil is dry.',
      light: 'Bright indirect light preserves green and white striping.',
      soil: 'Standard potting soil mix.',
      humidity: 'Adapts to average indoor humidity.',
      temperature: '55°F – 80°F (13°C – 27°C).',
      fertilizer: 'Feed bi-weekly in spring/summer.',
      repotting: 'Repot annually in spring.',
      propagation: 'Snip off spiderette plantlets and root directly in water.'
    },
    funFact: 'Spiderettes can be clipped off and grown into complete new plants within weeks!'
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis Miller',
    category: 'Succulent',
    difficulty: 'Easy',
    light: 'Direct Sun',
    waterFrequency: 'Every 14-21 days',
    frequencyDays: 14,
    petSafe: false,
    size: 'Small',
    emoji: '🪴',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    description: 'Fleshy serrated leaves filled with soothing gel. Functional medicinal succulent thriving on sunny windowsills.',
    careInstructions: {
      watering: 'Soak soil thoroughly then allow complete drying.',
      light: 'Needs 6+ hours of direct bright sunlight daily.',
      soil: 'Cactus and succulent mix.',
      humidity: 'Low dry humidity.',
      temperature: '55°F – 80°F (13°C – 27°C).',
      fertilizer: 'Feed once per year in spring.',
      repotting: 'Repot when pups overcrowd the container.',
      propagation: 'Separate offset pups from the parent root ball.'
    },
    funFact: 'The cooling gel inside Aloe Vera leaves has been used for over 4,000 years to soothe minor skin burns.'
  },
  {
    id: 'string-of-pearls',
    name: 'String of Pearls',
    scientificName: 'Senecio rowleyanus',
    category: 'Vining',
    difficulty: 'Hard',
    light: 'Bright Indirect',
    waterFrequency: 'Every 10-14 days',
    frequencyDays: 10,
    petSafe: false,
    size: 'Vining',
    emoji: '🍃',
    image: 'https://images.unsplash.com/photo-1599598425947-52028682976b?auto=format&fit=crop&w=800&q=80',
    description: 'Unique trailing succulent with spherical pea-like leaves on slender stems cascading gracefully over pot edges.',
    careInstructions: {
      watering: 'Bottom water when pearl spheres shrink or feel soft.',
      light: 'Bright light with 2-3 hours of direct morning sun.',
      soil: 'Cactus soil mix with pumice/perlite.',
      humidity: 'Low humidity.',
      temperature: '70°F – 80°F (21°C – 27°C).',
      fertilizer: 'Feed monthly in spring/summer.',
      repotting: 'Repot carefully every 2-3 years.',
      propagation: 'Coil stem strands over moist soil to root.'
    },
    funFact: 'Each round "pearl" leaf has a translucent vertical seam that acts as a window to let light inside!'
  },
  {
    id: 'chinese-money-plant',
    name: 'Chinese Money Plant',
    scientificName: 'Pilea peperomioides',
    category: 'Foliage',
    difficulty: 'Easy',
    light: 'Bright Indirect',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: true,
    size: 'Small',
    emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80',
    description: 'Charming round pancake-shaped leaves balancing on central stems. Known as the "Pass-It-Along" plant.',
    careInstructions: {
      watering: 'Water when soil is mostly dry. Rotate pot weekly for even growth.',
      light: 'Bright indirect light.',
      soil: 'Well-draining potting mix.',
      humidity: 'Average indoor humidity.',
      temperature: '60°F – 75°F (15°C – 24°C).',
      fertilizer: 'Feed monthly in spring/summer.',
      repotting: 'Repot annually in spring.',
      propagation: 'Separate underground baby plantlets.'
    },
    funFact: 'Pilea peperomioides earned the name "Pass-It-Along" plant because friends shared baby offsets for decades before commercial growers sold it.'
  },
  {
    id: 'bird-of-paradise',
    name: 'Bird of Paradise',
    scientificName: 'Strelitzia nicolai',
    category: 'Tree',
    difficulty: 'Medium',
    light: 'Direct Sun',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: false,
    size: 'Large',
    emoji: '🪴',
    image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80',
    description: 'Grand tropical plant with broad banana-like leaves reaching towering heights in bright sunny corners.',
    careInstructions: {
      watering: 'Keep top soil moist during summer growth; dry between waterings in winter.',
      light: 'Requires bright direct sunlight for strong upright growth.',
      soil: 'Rich loam potting mix.',
      humidity: 'High humidity preferred.',
      temperature: '65°F – 80°F (18°C – 27°C).',
      fertilizer: 'Feed bi-weekly in spring/summer.',
      repotting: 'Repot every 2 years in spring.',
      propagation: 'Propagate by root clump division.'
    },
    funFact: 'Naturally occurring leaf splits help wind pass through without tearing the large leaves in wild storms.'
  },
  {
    id: 'jade-plant',
    name: 'Jade Plant',
    scientificName: 'Crassula ovata',
    category: 'Succulent',
    difficulty: 'Easy',
    light: 'Direct Sun',
    waterFrequency: 'Every 14-21 days',
    frequencyDays: 14,
    petSafe: false,
    size: 'Medium',
    emoji: '🌿',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    description: 'Long-lived succulent with woody tree-like stems and glossy jade-green oval leaves. Symbol of prosperity.',
    careInstructions: {
      watering: 'Water deeply only when soil is completely dry.',
      light: 'Needs at least 4-6 hours of direct sunlight.',
      soil: 'Cactus/succulent soil mix.',
      humidity: 'Low dry humidity.',
      temperature: '65°F – 75°F (18°C – 24°C).',
      fertilizer: 'Feed quarterly during growing season.',
      repotting: 'Repot every 2-3 years.',
      propagation: 'Propagate by leaf or stem cuttings.'
    },
    funFact: 'Jade plants can live for over 70 years and are passed down as family heirlooms!'
  },
  {
    id: 'anthurium',
    name: 'Anthurium',
    scientificName: 'Anthurium andraeanum',
    category: 'Flowering',
    difficulty: 'Medium',
    light: 'Bright Indirect',
    waterFrequency: 'Every 7-10 days',
    frequencyDays: 7,
    petSafe: false,
    size: 'Small',
    emoji: '🌺',
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
    description: 'Stunning tropical featuring heart-shaped waxy red or pink spathes surrounding a yellow flower spike.',
    careInstructions: {
      watering: 'Water when top 1-2 inches dry out.',
      light: 'Bright indirect light encourages continuous blooming.',
      soil: 'Coarse potting mix with perlite and bark.',
      humidity: 'High humidity required (60%+).',
      temperature: '65°F – 80°F (18°C – 27°C).',
      fertilizer: 'Feed monthly with high-phosphorus bloom fertilizer.',
      repotting: 'Repot every 2 years in spring.',
      propagation: 'Propagate by root division.'
    },
    funFact: 'The shiny red "flower" is actually a modified leaf called a spathe that protects the central flower spike!'
  },
  {
    id: 'cast-iron-plant',
    name: 'Cast Iron Plant',
    scientificName: 'Aspidistra elatior',
    category: 'Foliage',
    difficulty: 'Easy',
    light: 'Low Light',
    waterFrequency: 'Every 10-14 days',
    frequencyDays: 10,
    petSafe: true,
    size: 'Medium',
    emoji: '🌱',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    description: 'Tough, resilient plant with deep green paddle leaves. Thrives in low-light dark corridors and tolerates neglect.',
    careInstructions: {
      watering: 'Allow top half of soil to dry before watering.',
      light: 'Low to medium shade. Keep away from direct sunlight.',
      soil: 'Standard potting mix.',
      humidity: 'Adapts to dry air.',
      temperature: '50°F – 75°F (10°C – 24°C).',
      fertilizer: 'Feed twice per year.',
      repotting: 'Repot every 3-4 years.',
      propagation: 'Propagate by root rhizome division.'
    },
    funFact: 'Earned its name "Cast Iron" during Victorian times because it survived dim gas-lit homes without sunlight.'
  },
  {
    id: 'majesty-palm',
    name: 'Majesty Palm',
    scientificName: 'Ravenea rivularis',
    category: 'Tree',
    difficulty: 'Hard',
    light: 'Bright Indirect',
    waterFrequency: 'Every 5-7 days',
    frequencyDays: 5,
    petSafe: true,
    size: 'Large',
    emoji: '🌴',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    description: 'Classic feathery indoor palm with majestic fronds adding regal tropical elegance.',
    careInstructions: {
      watering: 'Keep soil moist. Never allow complete drying out.',
      light: 'Bright indirect light.',
      soil: 'Moisture-retentive palm potting mix.',
      humidity: 'High humidity essential. Mist regularly.',
      temperature: '65°F – 85°F (18°C – 29°C).',
      fertilizer: 'Feed monthly with specialized palm fertilizer.',
      repotting: 'Repot every 2 years in spring.',
      propagation: 'Propagate by seeds.'
    },
    funFact: 'Native to wet riverbanks in Madagascar, Majesty Palms love consistent soil moisture!'
  }
];

// Helper Functions
function getPlantById(id) {
  return PLANTS.find(p => p.id === id);
}

function filterPlants(filters = {}) {
  return PLANTS.filter(p => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSci = p.scientificName.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchSci && !matchCat) return false;
    }
    if (filters.category && filters.category !== 'All' && p.category !== filters.category) return false;
    if (filters.difficulty && p.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) return false;
    if (filters.light && !p.light.toLowerCase().includes(filters.light.toLowerCase())) return false;
    if (filters.petSafe !== undefined && filters.petSafe !== '') {
      const wantPet = filters.petSafe === 'yes' || filters.petSafe === true;
      if (p.petSafe !== wantPet) return false;
    }
    return true;
  });
}
