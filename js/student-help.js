(function () {
  'use strict';

  var searchInput = document.getElementById('helpSearch');
  var searchForm = document.getElementById('searchForm');
  var faqList = document.getElementById('faqList');
  var faqItems = Array.prototype.slice.call(faqList.querySelectorAll('.faq-item'));
  var noResults = document.getElementById('noResults');
  var clearFilter = document.getElementById('clearFilter');
  var activeTopic = '';
  var toastTimer;

  function showToast(message) {
    var toast = document.querySelector('.help-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'help-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 2400);
  }

  function closeFaq(item) {
    var button = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    button.setAttribute('aria-expanded', 'false');
    answer.hidden = true;
  }

  function filterFaqs() {
    var query = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    faqItems.forEach(function (item) {
      var topic = item.getAttribute('data-topic').split(/\s+/);
      var text = item.textContent.toLowerCase();
      var matchesQuery = !query || text.indexOf(query) !== -1;
      var matchesTopic = !activeTopic || topic.indexOf(activeTopic) !== -1;
      var visible = matchesQuery && matchesTopic;

      item.hidden = !visible;
      if (!visible) closeFaq(item);
      if (visible) visibleCount++;
    });

    noResults.hidden = visibleCount > 0;
    clearFilter.hidden = !activeTopic;
  }

  faqList.addEventListener('click', function (event) {
    var button = event.target.closest('.faq-question');
    if (!button) return;

    var item = button.closest('.faq-item');
    var shouldOpen = button.getAttribute('aria-expanded') !== 'true';
    faqItems.forEach(closeFaq);
    if (shouldOpen) {
      button.setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-answer').hidden = false;
    }
  });

  searchInput.addEventListener('input', function () {
    activeTopic = '';
    document.querySelectorAll('.category-card').forEach(function (card) {
      card.classList.remove('is-active');
      card.setAttribute('aria-pressed', 'false');
    });
    filterFaqs();
  });

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    filterFaqs();
    document.getElementById('faqPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('.popular [data-search]').forEach(function (button) {
    button.addEventListener('click', function () {
      searchInput.value = button.getAttribute('data-search');
      activeTopic = '';
      document.querySelectorAll('.category-card').forEach(function (card) {
        card.classList.remove('is-active');
        card.setAttribute('aria-pressed', 'false');
      });
      filterFaqs();
      document.getElementById('faqPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
      searchInput.focus({ preventScroll: true });
    });
  });

  document.querySelectorAll('.category-card').forEach(function (card) {
    card.setAttribute('aria-pressed', 'false');
    card.addEventListener('click', function () {
      activeTopic = card.getAttribute('data-topic');
      searchInput.value = '';
      document.querySelectorAll('.category-card').forEach(function (category) {
        var active = category === card;
        category.classList.toggle('is-active', active);
        category.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      filterFaqs();
      document.getElementById('faqPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  clearFilter.addEventListener('click', function () {
    activeTopic = '';
    searchInput.value = '';
    document.querySelectorAll('.category-card').forEach(function (card) {
      card.classList.remove('is-active');
      card.setAttribute('aria-pressed', 'false');
    });
    filterFaqs();
  });

  document.getElementById('liveChatBtn').addEventListener('click', function (event) {
    event.preventDefault();
    showToast('Live chat is not available yet. Please email support@chigos.com.');
  });

  document.querySelectorAll('.resource-card').forEach(function (button) {
    button.addEventListener('click', function () {
      showToast(button.getAttribute('data-guide') + ' guide is coming soon.');
    });
  });

  filterFaqs();
}());
