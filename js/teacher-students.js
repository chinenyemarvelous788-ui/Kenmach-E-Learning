(function () {
  'use strict';

  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      sidebar.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  mobileToggle.addEventListener('click', function () {
    const isOpen = sidebar.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', function (event) {
    if (
      window.innerWidth <= 900 &&
      sidebar.classList.contains('is-open') &&
      !sidebar.contains(event.target) &&
      !mobileToggle.contains(event.target)
    ) {
      sidebar.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  const rows = Array.from(document.querySelectorAll('.student-row'));
  const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
  const searchInput = document.getElementById('studentSearch');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');
  const totalStudents = 412;

  let currentFilter = 'all';
  let currentSearch = '';

  function applyFilters() {
    let shown = 0;
    rows.forEach(function (row) {
      const status = row.dataset.status;
      const name = (row.dataset.name || '').toLowerCase();
      const email = (row.dataset.email || '').toLowerCase();
      const statusMatch = currentFilter === 'all' || status === currentFilter;
      const searchMatch = !currentSearch || name.includes(currentSearch) || email.includes(currentSearch);
      const visible = statusMatch && searchMatch;
      row.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });

    emptyState.style.display = shown === 0 ? 'block' : 'none';
    resultsCount.textContent = 'Showing ' + shown + ' of ' + totalStudents + ' students';
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

  document.querySelectorAll('.row-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      const row = button.closest('.student-row');
      const name = row.dataset.name;
      window.alert(
        'Student profile for ' + name + ' is not available in this demo yet. Student details, course progress, quiz scores, messages, and certificates would appear here.'
      );
    });
  });

  document.getElementById('loadMore').addEventListener('click', function () {
    const button = this;
    const originalText = button.textContent;
    button.textContent = 'Loading…';
    button.disabled = true;
    window.setTimeout(function () {
      button.textContent = originalText;
      button.disabled = false;
      window.alert('Loading more students is not available in this static demo yet.');
    }, 800);
  });
})();
