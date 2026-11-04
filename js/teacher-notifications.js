(function () {
  'use strict';

  const notifList = document.getElementById('notifList');
  const emptyState = document.getElementById('emptyState');
  const tabs = document.getElementById('tabs');
  const status = document.getElementById('notificationStatus');
  const requiredElements = [
    notifList,
    emptyState,
    tabs,
    status,
    document.getElementById('markAllBtn'),
    document.getElementById('clearBtn'),
    document.getElementById('preferencesBtn')
  ];

  if (requiredElements.some(function (element) { return !element; })) {
    console.error('The notifications page controls could not be initialized.');
    return;
  }

  let activeFilter = 'all';
  const countIds = {
    all: 'countAll',
    unread: 'countUnread',
    students: 'countStudents',
    reviews: 'countReviews',
    payouts: 'countPayouts',
    system: 'countSystem'
  };

  const navBadges = document.querySelectorAll('.user-menu .notification-count');

  function getNotifications() {
    return Array.from(notifList.querySelectorAll('.notif'));
  }

  function updateCounts() {
    const notifications = getNotifications();
    const unreadCount = notifications.filter(function (item) {
      return item.classList.contains('unread');
    }).length;

    Object.keys(countIds).forEach(function (category) {
      const count = category === 'all'
        ? notifications.length
        : category === 'unread'
          ? unreadCount
          : notifications.filter(function (item) {
            return item.dataset.cat === category;
          }).length;
      const countElement = document.getElementById(countIds[category]);
      if (countElement) countElement.textContent = String(count);
    });

    const summary = document.getElementById('unreadSummary');
    if (summary) {
      summary.textContent = unreadCount
        ? unreadCount + ' unread notification' + (unreadCount === 1 ? '' : 's')
        : 'You’re all caught up';
    }

    navBadges.forEach(function (badge) {
      badge.textContent = String(unreadCount);
      badge.hidden = unreadCount === 0;
    });
  }

  function applyFilter() {
    const notifications = getNotifications();
    notifications.forEach(function (item) {
      const visible = activeFilter === 'all'
        || (activeFilter === 'unread' && item.classList.contains('unread'))
        || item.dataset.cat === activeFilter;
      item.hidden = !visible;
    });

    notifList.querySelectorAll('.notif-group').forEach(function (group) {
      const hasVisibleItems = Array.from(group.querySelectorAll('.notif')).some(function (item) {
        return !item.hidden;
      });
      group.hidden = !hasVisibleItems;
    });

    emptyState.hidden = notifications.some(function (item) {
      return !item.hidden;
    });
  }

  function setRead(item) {
    item.classList.remove('unread');
    updateCounts();
    applyFilter();
  }

  function dismissNotification(item) {
    const group = item.closest('.notif-group');
    item.style.transition = 'opacity .2s ease, transform .2s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateX(10px)';
    window.setTimeout(function () {
      item.remove();
      if (group && !group.querySelector('.notif')) group.remove();
      updateCounts();
      applyFilter();
      status.textContent = 'Notification dismissed.';
    }, 200);
  }

  tabs.addEventListener('click', function (event) {
    const tab = event.target.closest('.tab');
    if (!tab || !tabs.contains(tab)) return;

    tabs.querySelectorAll('.tab').forEach(function (item) {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    activeFilter = tab.dataset.filter;
    applyFilter();
    status.textContent = 'Showing ' + tab.textContent.trim().replace(/\s+\d+$/, '') + ' notifications.';
  });

  notifList.addEventListener('click', function (event) {
    const action = event.target.closest('.notif-action');
    if (action) {
      event.stopPropagation();
      const item = action.closest('.notif');
      if (!item) return;
      if (action.dataset.action === 'read') {
        setRead(item);
        status.textContent = 'Notification marked as read.';
      } else if (action.dataset.action === 'dismiss') {
        dismissNotification(item);
      }
      return;
    }

    const item = event.target.closest('.notif');
    if (item && item.classList.contains('unread')) {
      setRead(item);
      status.textContent = 'Notification marked as read.';
    }
  });

  document.getElementById('markAllBtn').addEventListener('click', function () {
    getNotifications().forEach(function (item) {
      item.classList.remove('unread');
    });
    updateCounts();
    applyFilter();
    status.textContent = 'All notifications marked as read.';
  });

  document.getElementById('clearBtn').addEventListener('click', function () {
    if (!window.confirm('Clear all notifications? This cannot be undone.')) return;
    notifList.replaceChildren();
    updateCounts();
    applyFilter();
    status.textContent = 'All notifications cleared.';
  });

  document.getElementById('preferencesBtn').addEventListener('click', function () {
    window.alert('Notification preferences are not connected yet.');
  });

  updateCounts();
  applyFilter();
})();
