(function () {
  'use strict';

  const searchInput = document.getElementById('helpSearch');
  const filterButtons = Array.from(document.querySelectorAll('[data-help-filter]'));
  const faqItems = Array.from(document.querySelectorAll('.help-faq-item'));
  const noResults = document.getElementById('helpNoResults');

  if (!searchInput || filterButtons.length === 0 || faqItems.length === 0 || !noResults) {
    console.error('The instructor help page controls could not be initialized.');
    return;
  }

  let activeCategory = 'all';
  let searchTerm = '';

  function filterArticles() {
    let visibleCount = 0;

    faqItems.forEach((item) => {
      const categoryMatches = activeCategory === 'all' || item.dataset.category === activeCategory;
      const textMatches = !searchTerm || item.textContent.toLowerCase().includes(searchTerm);
      const isVisible = categoryMatches && textMatches;

      item.hidden = !isVisible;
      if (!isVisible) item.open = false;
      if (isVisible) visibleCount += 1;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.trim().toLowerCase();
    filterArticles();
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.helpFilter;
      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle('is-active', isActive);
        filterButton.setAttribute('aria-pressed', String(isActive));
      });
      filterArticles();
    });
  });
})();
