/* ============================================================
   CHIGOS · STUDENT PORTAL — MY COURSES
   ============================================================ */
(function () {
  'use strict';

  var tabs = document.getElementById('tabs');
  var grid = document.getElementById('coursesGrid');
  var emptyState = document.getElementById('emptyState');

  function updateCounts() {
    var counts = { all: 0, 'in-progress': 0, completed: 0, 'not-started': 0 };
    grid.querySelectorAll('.course-card').forEach(function (card) {
      var status = card.getAttribute('data-status');
      counts.all++;
      if (Object.prototype.hasOwnProperty.call(counts, status)) counts[status]++;
    });

    document.getElementById('countAll').textContent = counts.all;
    document.getElementById('countInProgress').textContent = counts['in-progress'];
    document.getElementById('countCompleted').textContent = counts.completed;
    document.getElementById('countNotStarted').textContent = counts['not-started'];
    document.getElementById('sidebarCourseCount').textContent = counts.all;
  }

  function applyFilter(filter) {
    var visibleCount = 0;
    grid.querySelectorAll('.course-card').forEach(function (card) {
      var visible = filter === 'all' || card.getAttribute('data-status') === filter;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    grid.hidden = visibleCount === 0;
    emptyState.hidden = visibleCount !== 0;
  }

  tabs.addEventListener('click', function (event) {
    var tab = event.target.closest('.tab');
    if (!tab || !tabs.contains(tab)) return;

    tabs.querySelectorAll('.tab').forEach(function (item) {
      var active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    applyFilter(tab.getAttribute('data-filter'));
  });

  updateCounts();
  applyFilter('all');
}());
