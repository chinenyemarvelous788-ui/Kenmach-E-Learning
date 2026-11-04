(function () {
  'use strict';

  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      document.querySelectorAll('.course-actions.is-open').forEach(function (actions) {
        actions.classList.remove('is-open');
        actions.querySelector('.actions-btn').setAttribute('aria-expanded', 'false');
      });
      sidebar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  toggle.addEventListener('click', function () {
    const isOpen = sidebar.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function (event) {
    if (
      window.innerWidth <= 900 &&
      sidebar.classList.contains('is-open') &&
      !sidebar.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      sidebar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.querySelectorAll('.course-actions').forEach(function (actions) {
    const button = actions.querySelector('.actions-btn');
    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', function (event) {
      event.stopPropagation();
      const shouldOpen = !actions.classList.contains('is-open');
      document.querySelectorAll('.course-actions.is-open').forEach(function (openActions) {
        openActions.classList.remove('is-open');
        openActions.querySelector('.actions-btn').setAttribute('aria-expanded', 'false');
      });
      actions.classList.toggle('is-open', shouldOpen);
      button.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    });
  });

  document.querySelectorAll('.actions-menu').forEach(function (menu) {
    menu.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

  document.addEventListener('click', function () {
    document.querySelectorAll('.course-actions.is-open').forEach(function (actions) {
      actions.classList.remove('is-open');
      actions.querySelector('.actions-btn').setAttribute('aria-expanded', 'false');
    });
  });

  const courses = Array.from(document.querySelectorAll('.course-card'));
  const newCard = document.querySelector('.new-course-card');
  const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
  const searchInput = document.getElementById('courseSearch');
  const emptyState = document.getElementById('emptyState');
  const emptyClear = document.getElementById('emptyClear');
  const coursesBadge = document.querySelector('.nav-item.is-active .badge');

  let currentFilter = 'all';
  let currentSearch = '';

  function updateFilterCounts() {
    filterTabs.forEach(function (tab) {
      const filter = tab.dataset.filter;
      const count = filter === 'all'
        ? courses.length
        : courses.filter(function (card) { return card.dataset.status === filter; }).length;
      tab.querySelector('.tab-count').textContent = count;
    });
    if (coursesBadge) coursesBadge.textContent = courses.length;
  }

  function applyFilters() {
    let shown = 0;
    courses.forEach(function (card) {
      const status = card.dataset.status;
      const title = (card.dataset.title || '').toLowerCase();
      const statusMatch = currentFilter === 'all' || status === currentFilter;
      const searchMatch = !currentSearch || title.includes(currentSearch);
      const visible = statusMatch && searchMatch;
      card.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });

    emptyState.style.display = shown === 0 ? 'block' : 'none';
    if (newCard) newCard.style.display = shown === 0 ? 'none' : '';
    updateFilterCounts();
  }

  filterTabs.forEach(function (tab) {
    tab.setAttribute('aria-pressed', tab.classList.contains('is-active') ? 'true' : 'false');
    tab.addEventListener('click', function () {
      filterTabs.forEach(function (item) {
        const isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      currentFilter = tab.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', function () {
    currentSearch = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  emptyClear.addEventListener('click', function () {
    currentFilter = 'all';
    currentSearch = '';
    searchInput.value = '';
    filterTabs.forEach(function (tab) {
      const isActive = tab.dataset.filter === 'all';
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    applyFilters();
  });

  document.querySelectorAll('[data-action="archive"]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const card = button.closest('.course-card');
      const title = card.dataset.title;
      if (!window.confirm('Archive "' + title + '"? It will be hidden from the catalog, but existing students keep access.')) return;

      card.dataset.status = 'archived';
      const badge = card.querySelector('.course-status');
      badge.className = 'course-status status-archived';
      badge.textContent = 'Archived';
      card.querySelector('.course-actions').classList.remove('is-open');
      card.querySelector('.actions-btn').setAttribute('aria-expanded', 'false');
      applyFilters();
    });
  });

  document.querySelectorAll('[data-action="delete"]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const card = button.closest('.course-card');
      const title = card.dataset.title;
      if (!window.confirm('Delete "' + title + '"? This cannot be undone.')) return;

      card.style.transition = 'opacity .3s, transform .3s';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      window.setTimeout(function () {
        card.remove();
        const index = courses.indexOf(card);
        if (index !== -1) courses.splice(index, 1);
        applyFilters();
      }, 300);
    });
  });

  updateFilterCounts();
})();
