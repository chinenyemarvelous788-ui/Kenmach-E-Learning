(function () {
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
  const PER_PAGE = 9;

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
      badge: badge
    });
  }

  const state = { currentPage: 1, sort: 'popular', category: 'all', query: '' };

  const grid         = document.getElementById('courseGrid');
  const paginationEl = document.getElementById('pagination');
  const resultsText  = document.getElementById('resultsText');
  const categoryList = document.getElementById('categoryList');
  const clearBtn     = document.getElementById('clearCategory');
  const sortSelect   = document.getElementById('sortSelect');
  const catalogExists = Boolean(grid && paginationEl && resultsText && categoryList && clearBtn && sortSelect);

  function formatNaira(n) { return '₦' + n.toLocaleString('en-NG'); }
  function getFilteredCourses() {
    const courses = (window.CHIGOS_CATALOG && window.CHIGOS_CATALOG.allCourses) ? window.CHIGOS_CATALOG.allCourses : allCourses;
    return courses.filter(course => {
      const matchesCategory = state.category === 'all' || course.catId === state.category;
      if (!matchesCategory) return false;
      if (!state.query) return true;
      const q = state.query.toLowerCase();
      const searchableText = `${course.title} ${course.category} ${course.instructor}`.toLowerCase();
      const kws = course.keywords || [];
      return searchableText.includes(q) || kws.some(k => k.includes(q));
    });
  }
  function getSortedCourses() {
    const copy = getFilteredCourses().slice();
    switch (state.sort) {
      case 'rating':     return copy.sort((a, b) => b.rating - a.rating);
      case 'newest':     return copy.sort((a, b) => b.id - a.id);
      case 'price-low':  return copy.sort((a, b) => a.price - b.price);
      case 'price-high': return copy.sort((a, b) => b.price - a.price);
      default:           return copy;
    }
  }
  function countByCategory(catId) {
    if (catId === 'all') return allCourses.length;
    return allCourses.filter(c => c.catId === catId).length;
  }

  function buildCategoryChip(cat) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'category-chip' + (state.category === cat.id ? ' is-active' : '');
    btn.dataset.category = cat.id;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', state.category === cat.id);
    btn.innerHTML = `
      <span class="category-icon">${ICONS[cat.icon] || ''}</span>
      <span class="category-label">
        <span class="category-name">${cat.name}</span>
        <span class="category-count">${countByCategory(cat.id)} courses</span>
      </span>
    `;
    return btn;
  }

  function renderCategories() {
    categoryList.innerHTML = '';
    CATEGORIES.forEach(cat => categoryList.appendChild(buildCategoryChip(cat)));
  }

  function buildCard(course) {
    const a = document.createElement('a');
    a.href = 'course.html';
    a.className = 'course-card';

    const badgeHTML = course.badge
      ? `<span class="card-badge ${course.badge.cls}">${course.badge.text}</span>`
      : '';

    const priceHTML = course.price === 0
      ? `<span class="card-price"><span class="free">Free</span></span>`
      : `<span class="card-price">${formatNaira(course.price)}</span>`;

    a.innerHTML = `
      <div class="card-cover ${course.cover}">
        ${badgeHTML}
        <span class="card-watermark">${course.watermark}</span>
      </div>
      <div class="card-body">
        <span class="card-cat">${course.category}</span>
        <h3 class="card-title">${course.title}</h3>
        <div class="card-instructor">
          <span class="card-avatar">${course.initials}</span>
          ${course.instructor}
        </div>
        <div class="card-rating">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/></svg>
          <strong>${course.rating}</strong> <span>(${course.reviews})</span>
        </div>
        <div class="card-footer">
          ${priceHTML}
          <span class="card-duration">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            ${course.hours}h
          </span>
        </div>
      </div>
    `;

    return a;
  }

    function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function updateURL() {
    const url = new URL(window.location.href);
    if (state.query) url.searchParams.set('q', state.query);
    else url.searchParams.delete('q');
    if (state.category && state.category !== 'all') url.searchParams.set('cat', state.category);
    else url.searchParams.delete('cat');
    if (state.sort && state.sort !== 'popular') url.searchParams.set('sort', state.sort);
    else url.searchParams.delete('sort');
    window.history.replaceState({}, '', url.toString());
  }

  function initFromURL() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || params.get('search');
    const cat = params.get('cat') || params.get('category');
    const sort = params.get('sort');

    if (q) {
      state.query = q.trim();
      if (navSearchInput) navSearchInput.value = q.trim();
    }
    if (cat && (cat === 'all' || CATEGORIES.some(c => c.id === cat))) {
      state.category = cat;
    }
    if (sort && ['popular','rating','newest','price-low','price-high'].includes(sort)) {
      state.sort = sort;
      if (sortSelect) sortSelect.value = sort;
    }
  }

  function renderPage(page, shouldScroll = true) {
    const sorted = getSortedCourses();
    const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));

    state.currentPage = Math.min(Math.max(page, 1), totalPages);

    const start = (state.currentPage - 1) * PER_PAGE;
    const slice = sorted.slice(start, start + PER_PAGE);

    grid.innerHTML = '';

    if (slice.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">${ICONS.empty}</div>
          <h3>No courses found</h3>
          <p>Try a different category or clear the filter.</p>
        </div>
      `;
    } else {
      slice.forEach((course, i) => {
        const card = buildCard(course);
        card.style.animationDelay = `${i * 30}ms`;
        grid.appendChild(card);
      });
    }

        const currentCat = CATEGORIES.find(c => c.id === state.category);
    let filterHTML = '';
    if (state.category !== 'all' && currentCat) {
      filterHTML += `<span class="filter-tag">${currentCat.name}</span>`;
    }
    if (state.query) {
      filterHTML += `
        <span class="search-filter-tag">
          "${escapeHtml(state.query)}"
          <button type="button" class="clear-search-btn" id="clearSearchQuery" aria-label="Clear search" title="Clear search">&times;</button>
        </span>
      `;
    }

    resultsText.innerHTML = `
      <strong>${sorted.length}</strong> ${sorted.length === 1 ? 'course' : 'courses'} found
      ${filterHTML}
    `;

    const clearQueryBtn = document.getElementById('clearSearchQuery');
    if (clearQueryBtn) {
      clearQueryBtn.addEventListener('click', () => {
        state.query = '';
        if (navSearchInput) navSearchInput.value = '';
        updateURL();
        renderPage(1, false);
      });
    }

    clearBtn.classList.toggle('is-visible', state.category !== 'all');

    grid.classList.remove('pulse');
    void grid.offsetWidth;
    grid.classList.add('pulse');

    renderPagination(totalPages);

    if (shouldScroll) {
      const top = grid.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  function getPageNumbers(current, total) {
    const pages = [];
    const addPage = (n) => { if (!pages.includes(n)) pages.push(n); };
    const addEllipsis = () => { if (pages[pages.length - 1] !== '…') pages.push('…'); };
    addPage(1);
    if (current > 3) addEllipsis();
    for (let n = Math.max(2, current - 1); n <= Math.min(total - 1, current + 1); n++) addPage(n);
    if (current < total - 2) addEllipsis();
    if (total > 1) addPage(total);
    return pages;
  }

  function makeBtn(label, opts = {}) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'page-btn';
    btn.innerHTML = label;
    if (opts.active)   btn.classList.add('is-active');
    if (opts.disabled) btn.disabled = true;
    if (opts.page !== undefined) btn.dataset.page = opts.page;
    if (opts.ariaLabel) btn.setAttribute('aria-label', opts.ariaLabel);
    return btn;
  }

  function renderPagination(totalPages) {
    paginationEl.innerHTML = '';
    if (totalPages <= 1) return;

    const prevSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`;
    const nextSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;

    paginationEl.appendChild(makeBtn(prevSVG, {
      disabled: state.currentPage === 1,
      page: state.currentPage - 1,
      ariaLabel: 'Previous page'
    }));

    getPageNumbers(state.currentPage, totalPages).forEach(p => {
      if (p === '…') {
        const span = document.createElement('span');
        span.className = 'page-ellipsis';
        span.textContent = '…';
        paginationEl.appendChild(span);
      } else {
        paginationEl.appendChild(makeBtn(String(p), {
          active: p === state.currentPage,
          page: p,
          ariaLabel: `Go to page ${p}`
        }));
      }
    });

    paginationEl.appendChild(makeBtn(nextSVG, {
      disabled: state.currentPage === totalPages,
      page: state.currentPage + 1,
      ariaLabel: 'Next page'
    }));
  }

  if (catalogExists) {
    categoryList.addEventListener('click', (e) => {
      const chip = e.target.closest('.category-chip');
      if (!chip) return;
      const catId = chip.dataset.category;
      if (catId === state.category) return;

      state.category = catId;
      state.currentPage = 1;

      categoryList.querySelectorAll('.category-chip').forEach(c => {
        const active = c.dataset.category === catId;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', active);
      });

      renderPage(1);
    });

    clearBtn.addEventListener('click', () => {
      state.category = 'all';
      state.currentPage = 1;
      categoryList.querySelectorAll('.category-chip').forEach(c => {
        const active = c.dataset.category === 'all';
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', active);
      });
      renderPage(1);
    });

    paginationEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.page-btn');
      if (!btn || btn.disabled || btn.classList.contains('is-active')) return;
      const page = Number(btn.dataset.page);
      if (!page || page === state.currentPage) return;
      renderPage(page);
    });

    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderPage(1);
    });
  }

  const nav = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const searchToggle = document.getElementById('searchToggle');
  const navSearch = document.getElementById('navSearch');
  const navSearchInput = navSearch ? navSearch.querySelector('input') : null;

  if (nav && menuToggle && searchToggle && navSearch && navSearchInput) {
    function closeMenu() {
      nav.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }

    function closeSearch() {
      nav.classList.remove('search-open');
      searchToggle.setAttribute('aria-expanded', 'false');
      searchToggle.setAttribute('aria-label', 'Open course search');
    }

    menuToggle.addEventListener('click', () => {
      closeSearch();
      const isOpen = nav.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    searchToggle.addEventListener('click', () => {
      closeMenu();
      const isOpen = nav.classList.toggle('search-open');
      searchToggle.setAttribute('aria-expanded', String(isOpen));
      searchToggle.setAttribute('aria-label', isOpen ? 'Close course search' : 'Open course search');
      if (isOpen) navSearchInput.focus();
    });

    nav.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (!nav.contains(event.target)) {
        closeMenu();
        closeSearch();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        closeSearch();
      }
    });

    if (window.matchMedia) {
      window.matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);
      window.matchMedia('(min-width: 1241px)').addEventListener('change', closeSearch);
    }

    navSearchInput.addEventListener('input', () => {
      if (!catalogExists) return;
      state.query = navSearchInput.value.trim();
      state.currentPage = 1;
      updateURL();
      renderPage(1, false);
    });

    navSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        state.query = navSearchInput.value.trim();
        state.currentPage = 1;
        updateURL();
        renderPage(1, true);
      }
    });

    let ticking = false;
    const update = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
      ticking = false;
    };
    update();
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  const langSwitcher = document.getElementById('langSwitcher');
  const langButton = document.getElementById('langBtn');
  const flag = document.getElementById('currentFlag');
  const langLabel = document.getElementById('currentLang');
  if (langSwitcher && langButton && flag && langLabel) {
    const langOptions = langSwitcher.querySelectorAll('.lang-menu button');
    langButton.addEventListener('click', () => {
      const isOpen = langSwitcher.classList.toggle('open');
      langButton.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', event => {
      if (!langSwitcher.contains(event.target)) {
        langSwitcher.classList.remove('open');
        langButton.setAttribute('aria-expanded', 'false');
      }
    });
    langOptions.forEach(option => option.addEventListener('click', () => {
      flag.textContent = option.dataset.flag;
      langLabel.textContent = option.dataset.label;
      langOptions.forEach(item => item.classList.toggle('active', item === option));
      langSwitcher.classList.remove('open');
      langButton.setAttribute('aria-expanded', 'false');
    }));
  }

  if (catalogExists) {
    initFromURL();
    renderCategories();
    renderPage(1, false);

    if (state.query || (state.category && state.category !== 'all')) {
      setTimeout(() => {
        const target = document.querySelector('.results-head') || grid;
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 150);
    }
  }

})();