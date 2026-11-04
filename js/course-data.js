/**
 * Chigos E-Learning — Global Course Catalog & Search Engine
 * Provides synchronized course data, categories, and fast fuzzy search across all pages.
 */
(function (global) {
  'use strict';

  const I = (path) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;

  const ICONS = {
    all:        I('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    code:       I('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    design:     I('<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>'),
    data:       I('<path d="M18 20V10M12 20V4M6 20v-6"/>'),
    business:   I('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    marketing:  I('<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>'),
    gaming:     I('<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="4"/>'),
    mobile:     I('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>'),
    security:   I('<path d="M12 2l7 5v10l-7 5-7-5V7l7-5z"/><path d="M9 12l2 2 4-4"/>'),
    music:      I('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'),
    photo:      I('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>'),
    video:      I('<rect x="2" y="6" width="14" height="12" rx="2"/><polygon points="22 8 16 12 22 16 22 8"/>'),
    language:   I('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    health:     I('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>'),
    cooking:    I('<path d="M6 2v20M18 2v20M2 10h20"/><circle cx="12" cy="14" r="4"/>'),
    finance:    I('<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
    personal:   I('<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/>'),
    writing:    I('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'),
    science:    I('<path d="M9 3h6v5l3 10a2 2 0 0 1-2 3H8a2 2 0 0 1-2-3l3-10V3z"/><path d="M9 3h6"/>'),
    math:       I('<path d="M5 5h14M5 12h14M5 19h14"/>'),
    craft:      I('<path d="M6 3h12l4 6-10 12L2 9z"/>'),
    parenting:  I('<circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>'),
    empty:      I('<circle cx="11" cy="11" r="6"/><path d="M21 21l-4.3-4.3"/>')
  };

  const CATEGORIES = [
    { id: 'all',          name: 'All courses',     icon: 'all' },
    { id: 'web',          name: 'Web Dev',         icon: 'code' },
    { id: 'design',       name: 'Design',          icon: 'design' },
    { id: 'data',         name: 'Data & AI',       icon: 'data' },
    { id: 'business',     name: 'Business',        icon: 'business' },
    { id: 'marketing',    name: 'Marketing',       icon: 'marketing' },
    { id: 'gaming',       name: 'Gaming',          icon: 'gaming' },
    { id: 'mobile',       name: 'Mobile Dev',      icon: 'mobile' },
    { id: 'cybersecurity',name: 'Cybersecurity',   icon: 'security' },
    { id: 'music',        name: 'Music',           icon: 'music' },
    { id: 'photography',  name: 'Photography',     icon: 'photo' },
    { id: 'video',        name: 'Video & Film',    icon: 'video' },
    { id: 'languages',    name: 'Languages',       icon: 'language' },
    { id: 'health',       name: 'Health & Fitness',icon: 'health' },
    { id: 'cooking',      name: 'Cooking',         icon: 'cooking' },
    { id: 'finance',      name: 'Finance',         icon: 'finance' },
    { id: 'personal',     name: 'Personal Growth', icon: 'personal' },
    { id: 'writing',      name: 'Writing',         icon: 'writing' },
    { id: 'science',      name: 'Science',         icon: 'science' },
    { id: 'math',         name: 'Math',            icon: 'math' },
    { id: 'crafts',       name: 'Arts & Crafts',   icon: 'craft' },
    { id: 'parenting',    name: 'Parenting',       icon: 'parenting' }
  ];

  const KEYWORDS = {
    web: ['javascript', 'js', 'html', 'css', 'react', 'node', 'fullstack', 'frontend', 'backend', 'web development', 'typescript', 'express', 'vue', 'nextjs'],
    design: ['figma', 'ui', 'ux', 'user interface', 'user experience', 'design systems', 'wireframe', 'prototype', 'graphic design', 'layout', 'photoshop'],
    data: ['python', 'ai', 'artificial intelligence', 'machine learning', 'data science', 'deep learning', 'pandas', 'sql', 'statistics', 'chatgpt', 'llm'],
    business: ['product management', 'startup', 'agile', 'scrum', 'leadership', 'strategy', 'mba', 'management', 'pitch', 'sales'],
    marketing: ['seo', 'digital marketing', 'content marketing', 'social media', 'google ads', 'copywriting', 'growth hacking', 'email marketing', 'brand'],
    gaming: ['unity', 'unreal engine', 'game design', 'game development', 'c#', '3d', 'blender', 'game art', 'shaders'],
    mobile: ['flutter', 'react native', 'ios', 'swift', 'android', 'kotlin', 'mobile app', 'dart'],
    cybersecurity: ['ethical hacking', 'cybersecurity', 'network security', 'pentest', 'infosec', 'linux', 'encryption', 'bug bounty'],
    music: ['music production', 'beats', 'guitar', 'piano', 'fl studio', 'ableton', 'audio engineering', 'mixing', 'mastering', 'sound design'],
    photography: ['photography', 'camera', 'lightroom', 'photoshop', 'portrait', 'lighting', 'composition', 'street photography'],
    video: ['video editing', 'premiere pro', 'davinci resolve', 'filmmaking', 'after effects', 'cinematography', 'youtube', 'color grading'],
    languages: ['english', 'french', 'spanish', 'arabic', 'german', 'yoruba', 'igbo', 'hausa', 'ielts', 'grammar', 'fluency'],
    health: ['fitness', 'workout', 'nutrition', 'weight loss', 'yoga', 'health', 'calisthenics', 'meal prep'],
    cooking: ['cooking', 'baking', 'culinary', 'chef', 'recipes', 'nigerian food', 'pastry', 'cuisine', 'jollof'],
    finance: ['crypto', 'cryptocurrency', 'bitcoin', 'forex', 'stocks', 'investing', 'personal finance', 'trading', 'wealth', 'budgeting'],
    personal: ['personal growth', 'productivity', 'public speaking', 'confidence', 'habits', 'mindset', 'time management', 'communication'],
    writing: ['creative writing', 'copywriting', 'blogging', 'storytelling', 'screenwriting', 'book', 'novel', 'publishing'],
    science: ['biology', 'chemistry', 'physics', 'astronomy', 'science', 'genetics'],
    math: ['algebra', 'calculus', 'statistics', 'mathematics', 'geometry', 'trigonometry'],
    crafts: ['arts', 'drawing', 'painting', 'illustration', 'crafts', 'pottery', 'sketching', 'watercolor'],
    parenting: ['parenting', 'child psychology', 'early childhood', 'family', 'babies', 'toddler']
  };

  const BASE_DATA = [
    { catId: 'web',          name: 'Web Development',   wm: 'JS',  price: 45000, hours: 42, instructor: 'Adaeze Okafor',  initials: 'AO', rating: 4.9, reviews: 2418 },
    { catId: 'design',       name: 'UI / UX Design',    wm: 'UI',  price: 35000, hours: 28, instructor: 'Tunde Martins',  initials: 'TM', rating: 4.8, reviews: 1106 },
    { catId: 'data',         name: 'Data & AI',         wm: 'DA',  price: 49000, hours: 56, instructor: 'Ngozi Kalu',     initials: 'NK', rating: 4.9, reviews: 3204 },
    { catId: 'business',     name: 'Business',          wm: 'PM',  price: 0,     hours: 12, instructor: 'Sarah Bello',    initials: 'SB', rating: 4.7, reviews: 892  },
    { catId: 'marketing',    name: 'Marketing',         wm: 'MKT', price: 39000, hours: 20, instructor: 'Efe Kalu',       initials: 'EK', rating: 4.8, reviews: 1547 },
    { catId: 'gaming',       name: 'Gaming',            wm: 'FF',  price: 25000, hours: 16, instructor: 'Chidi Nwosu',    initials: 'CN', rating: 4.9, reviews: 724  },
    { catId: 'mobile',       name: 'Mobile Dev',        wm: 'MB',  price: 42000, hours: 38, instructor: 'Jide Adeyemi',   initials: 'JA', rating: 4.8, reviews: 1205 },
    { catId: 'cybersecurity',name: 'Cybersecurity',     wm: 'CY',  price: 55000, hours: 32, instructor: 'Femi Balogun',   initials: 'FB', rating: 4.7, reviews: 638  },
    { catId: 'music',        name: 'Music',             wm: '♪',   price: 32000, hours: 24, instructor: 'Damola Ayeni',   initials: 'DA', rating: 4.9, reviews: 912  },
    { catId: 'photography',  name: 'Photography',       wm: '📷',  price: 28000, hours: 18, instructor: 'Amara Obi',      initials: 'AO', rating: 4.8, reviews: 618  },
    { catId: 'video',        name: 'Video & Film',      wm: '🎬',  price: 38000, hours: 26, instructor: 'Kunle Ade',      initials: 'KA', rating: 4.8, reviews: 545  },
    { catId: 'languages',    name: 'Languages',         wm: 'Aa',  price: 22000, hours: 30, instructor: 'Fatima Yusuf',   initials: 'FY', rating: 4.9, reviews: 1832 },
    { catId: 'health',       name: 'Health & Fitness',  wm: '⚡',  price: 19000, hours: 15, instructor: 'Tayo Ogundipe',  initials: 'TO', rating: 4.7, reviews: 728  },
    { catId: 'cooking',      name: 'Cooking',           wm: '🍳',  price: 24000, hours: 20, instructor: 'Chef Bola',      initials: 'CB', rating: 4.9, reviews: 1420 },
    { catId: 'finance',      name: 'Finance',           wm: '₦',   price: 42000, hours: 22, instructor: 'Chuka Obi',      initials: 'CO', rating: 4.8, reviews: 964  },
    { catId: 'personal',     name: 'Personal Growth',   wm: '✨',  price: 0,     hours: 10, instructor: 'Bisi Adeleke',   initials: 'BA', rating: 4.8, reviews: 2104 },
    { catId: 'writing',      name: 'Writing',           wm: '✍',   price: 26000, hours: 16, instructor: 'Ngozi Adichie',  initials: 'NA', rating: 4.9, reviews: 388  },
    { catId: 'science',      name: 'Science',           wm: '🔬',  price: 44000, hours: 36, instructor: 'Dr. Akande',     initials: 'DA', rating: 4.8, reviews: 524  },
    { catId: 'math',         name: 'Math',              wm: '∑',   price: 30000, hours: 28, instructor: 'Prof. Ibe',      initials: 'PI', rating: 4.7, reviews: 415  },
    { catId: 'crafts',       name: 'Arts & Crafts',     wm: '🎨',  price: 21000, hours: 14, instructor: 'Ifeoma Nwosu',   initials: 'IN', rating: 4.8, reviews: 336  },
    { catId: 'parenting',    name: 'Parenting',         wm: '👶',  price: 18000, hours: 12, instructor: 'Dr. Amina',      initials: 'DA', rating: 4.9, reviews: 602  }
  ];

  const TITLES = [
    'From Zero to Deploy', 'Masterclass', 'The Complete Guide', 'Fundamentals',
    'Advanced Techniques', 'Hands-On Bootcamp', 'Crash Course', 'Deep Dive',
    'Essentials', 'Professional Track'
  ];

  const CYCLES = 12;
  const TOTAL_COURSES = BASE_DATA.length * CYCLES;

  const allCourses = [];
  for (let i = 0; i < TOTAL_COURSES; i++) {
    const base = BASE_DATA[i % BASE_DATA.length];
    const variant = TITLES[Math.floor(i / BASE_DATA.length) % TITLES.length];
    const coverNum = (i % 6) + 1;

    const reviews = base.reviews + (i * 13);
    const rating = Math.min(5.0, base.rating + ((i % 3) - 1) * 0.1);
    const price = base.price === 0 ? 0 : base.price + (i % 5) * 2000;
    const hours = base.hours + (i % 4) * 2;

    let badge = null;
    if (i % 13 === 0) badge = { text: '🔥 Bestseller', cls: 'card-badge--hot' };
    else if (i % 9 === 0) badge = { text: '🔥 Trending', cls: 'card-badge--hot' };
    else if (price === 0) badge = { text: 'Free', cls: 'card-badge--free' };

    allCourses.push({
      id: i,
      catId: base.catId,
      category: base.name,
      watermark: base.wm,
      cover: `cover-${coverNum}`,
      title: `${base.name} ${variant}`,
      instructor: base.instructor,
      initials: base.initials,
      rating: Math.round(rating * 10) / 10,
      reviews: reviews.toLocaleString('en-NG'),
      price: price,
      hours: hours,
      badge: badge,
      keywords: KEYWORDS[base.catId] || []
    });
  }

  function formatNaira(n) {
    if (n === 0) return 'Free';
    return '₦' + n.toLocaleString('en-NG');
  }

  function search(query, limit = 5) {
    if (!query || !query.trim()) {
      return {
        query: '',
        courses: [],
        categories: [],
        totalCount: 0
      };
    }

    const q = query.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);

    // 1. Categories match
    const matchedCategories = CATEGORIES.filter(cat => {
      if (cat.id === 'all') return false;
      const name = cat.name.toLowerCase();
      const id = cat.id.toLowerCase();
      const kws = KEYWORDS[cat.id] || [];
      return name.includes(q) || id.includes(q) || kws.some(k => k.includes(q) || q.includes(k));
    });

    // 2. Courses match with relevance scoring
    const scoredCourses = [];

    for (let i = 0; i < allCourses.length; i++) {
      const c = allCourses[i];
      const titleLower = c.title.toLowerCase();
      const catLower = c.category.toLowerCase();
      const instLower = c.instructor.toLowerCase();
      const kws = c.keywords || [];

      let score = 0;

      // Exact title match
      if (titleLower === q) score += 100;
      else if (titleLower.startsWith(q)) score += 60;
      else if (titleLower.includes(q)) score += 40;

      // Category match
      if (catLower === q) score += 50;
      else if (catLower.includes(q)) score += 30;

      // Instructor match
      if (instLower.includes(q)) score += 35;

      // Keyword match
      if (kws.some(k => k === q)) score += 45;
      else if (kws.some(k => k.includes(q))) score += 25;

      // Multi-word matching
      if (words.length > 1) {
        const matchesAllWords = words.every(w =>
          titleLower.includes(w) || catLower.includes(w) || instLower.includes(w) || kws.some(k => k.includes(w))
        );
        if (matchesAllWords) score += 30;
      }

      if (score > 0) {
        scoredCourses.push({ course: c, score });
      }
    }

    // Sort by score descending, then by rating
    scoredCourses.sort((a, b) => b.score - a.score || b.course.rating - a.course.rating);

    const totalCount = scoredCourses.length;
    const courses = scoredCourses.slice(0, limit).map(item => item.course);

    return {
      query: query.trim(),
      courses,
      categories: matchedCategories.slice(0, 3),
      totalCount
    };
  }

  // Export to global scope
  global.CHIGOS_CATALOG = {
    ICONS,
    CATEGORIES,
    BASE_DATA,
    TITLES,
    allCourses,
    formatNaira,
    search
  };

})(typeof window !== 'undefined' ? window : this);

