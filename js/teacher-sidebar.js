(function () {
  'use strict';

  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  if (!mobileToggle || !sidebar) {
    console.error('The teacher sidebar controls could not be initialized.');
    return;
  }

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
})();
