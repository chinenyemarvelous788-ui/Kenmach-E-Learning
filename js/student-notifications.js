(function () {
  'use strict';

  var notifContainer = document.getElementById('notifContainer');
  var emptyState = document.getElementById('emptyState');
  var unreadPill = document.getElementById('unreadPill');
  var navBadge = document.getElementById('navNotifBadge') || document.getElementById('sidebarNotifCount');
  var filterTabs = document.getElementById('filterTabs');
  var viewToggle = document.getElementById('viewToggle');
  var markAllBtn = document.getElementById('markAllBtn');
  var currentFilter = 'all';
  var toastTimer;

  function getAllNotifications() {
    return Array.prototype.slice.call(notifContainer.querySelectorAll('.notif'));
  }

  function showToast(message) {
    var toast = document.querySelector('.notif-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'notif-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 2200);
  }

  function updateCounts() {
    var notifications = getAllNotifications();
    var unreadCount = notifications.filter(function (notification) {
      return notification.classList.contains('unread');
    }).length;

    document.getElementById('countAll').textContent = notifications.length;
    document.getElementById('countUnread').textContent = unreadCount;
    document.getElementById('countStudents').textContent = notifications.filter(function (notification) {
      return notification.getAttribute('data-cat') === 'students';
    }).length;
    document.getElementById('countCertificates').textContent = notifications.filter(function (notification) {
      return notification.getAttribute('data-cat') === 'certificates';
    }).length;
    document.getElementById('countPayouts').textContent = notifications.filter(function (notification) {
      return notification.getAttribute('data-cat') === 'payouts';
    }).length;
    document.getElementById('countSystem').textContent = notifications.filter(function (notification) {
      return notification.getAttribute('data-cat') === 'system';
    }).length;

    unreadPill.textContent = unreadCount + ' unread';
    unreadPill.hidden = unreadCount === 0;
    navBadge.textContent = unreadCount;
    navBadge.hidden = unreadCount === 0;
    markAllBtn.disabled = unreadCount === 0;
  }

  function applyFilter() {
    var visibleCount = 0;

    getAllNotifications().forEach(function (notification) {
      var category = notification.getAttribute('data-cat');
      var isUnread = notification.classList.contains('unread');
      var isVisible = currentFilter === 'all' ||
        (currentFilter === 'unread' && isUnread) ||
        (currentFilter !== 'unread' && category === currentFilter);

      notification.hidden = !isVisible;
      if (isVisible) visibleCount++;
    });

    notifContainer.querySelectorAll('.notif-group').forEach(function (group) {
      var hasVisibleNotification = group.querySelector('.notif:not([hidden])');
      group.hidden = !hasVisibleNotification;
    });

    notifContainer.hidden = visibleCount === 0;
    emptyState.hidden = visibleCount !== 0;
  }

  function markRead(notification) {
    if (!notification.classList.contains('unread')) return;
    notification.classList.remove('unread');
    var dot = notification.querySelector('.new-dot');
    if (dot) dot.remove();
    updateCounts();
    if (currentFilter === 'unread') applyFilter();
  }

  function dismiss(notification) {
    var group = notification.closest('.notif-group');
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(8px)';

    window.setTimeout(function () {
      notification.remove();
      if (group && group.querySelectorAll('.notif').length === 0) {
        group.remove();
      } else if (group) {
        var count = group.querySelectorAll('.notif').length;
        group.querySelector('.group-count').textContent =
          count + (count === 1 ? ' notification' : ' notifications');
      }
      updateCounts();
      applyFilter();
    }, 200);
  }

  filterTabs.addEventListener('click', function (event) {
    var tab = event.target.closest('.filter-tab');
    if (!tab) return;

    currentFilter = tab.getAttribute('data-filter');
    filterTabs.querySelectorAll('.filter-tab').forEach(function (button) {
      var active = button === tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    applyFilter();
  });

  viewToggle.addEventListener('click', function (event) {
    var button = event.target.closest('.view-btn');
    if (!button) return;

    var compact = button.getAttribute('data-view') === 'compact';
    viewToggle.querySelectorAll('.view-btn').forEach(function (viewButton) {
      var active = viewButton === button;
      viewButton.classList.toggle('active', active);
      viewButton.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    notifContainer.classList.toggle('compact', compact);
  });

  notifContainer.addEventListener('click', function (event) {
    var notification = event.target.closest('.notif');
    if (!notification) return;

    var actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      event.stopPropagation();
      if (actionButton.getAttribute('data-action') === 'read') markRead(notification);
      if (actionButton.getAttribute('data-action') === 'dismiss') dismiss(notification);
      return;
    }

    markRead(notification);
  });

  notifContainer.addEventListener('keydown', function (event) {
    if (event.target.matches('.notif') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      markRead(event.target);
    }
  });

  markAllBtn.addEventListener('click', function () {
    getAllNotifications().forEach(function (notification) {
      notification.classList.remove('unread');
      var dot = notification.querySelector('.new-dot');
      if (dot) dot.remove();
    });
    updateCounts();
    applyFilter();
    showToast('All notifications marked as read');
  });

  updateCounts();
  applyFilter();
}());
