(function () {
  'use strict';

  const accounts = document.querySelectorAll('.user-pill');

  accounts.forEach((currentPill, index) => {
    let pill = currentPill;
    let account = pill.closest('.user-account');

    if (!(pill instanceof HTMLButtonElement)) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'user-pill';
      while (pill.firstChild) button.appendChild(pill.firstChild);
      pill.replaceWith(button);
      pill = button;
    }

    if (!account) {
      account = document.createElement('div');
      account.className = 'user-account';
      pill.parentNode.insertBefore(account, pill);
      account.appendChild(pill);
    }

    const menuId = `userMenu${index ? `-${index + 1}` : ''}`;
    pill.setAttribute('aria-haspopup', 'true');
    pill.setAttribute('aria-expanded', 'false');
    pill.setAttribute('aria-controls', menuId);

    if (!pill.querySelector('.user-pill-chevron')) {
      pill.insertAdjacentHTML('beforeend', `
        <svg class="user-pill-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      `);
    }

    let menu = account.querySelector('.user-menu');
    if (!menu) {
      menu = document.createElement('div');
      menu.className = 'user-menu';
      menu.id = menuId;
      menu.innerHTML = `
        <a href="login.html" class="user-menu-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          <span>Switch account</span>
        </a>
        <a href="teacher-notifications.html" class="user-menu-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
            <path d="M10 21h4"/>
          </svg>
          <span>Notifications</span>
        </a>
        <a href="teacher-help.html" class="user-menu-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.8 1.2-1.8 2.7"/>
            <path d="M12 17h.01"/>
          </svg>
          <span>Help &amp; support</span>
        </a>
        <div class="user-menu-divider" aria-hidden="true"></div>
        <button type="button" class="user-menu-item user-menu-item--danger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Log out</span>
        </button>
      `;
      pill.insertAdjacentElement('afterend', menu);
    } else {
      menu.id = menuId;
    }

    if (!menu.querySelector('a[href="teacher-notifications.html"]')) {
      const notificationLink = document.createElement('a');
      notificationLink.href = 'teacher-notifications.html';
      notificationLink.className = 'user-menu-item';
      notificationLink.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>
          <path d="M10 21h4"/>
        </svg>
        <span>Notifications</span>
      `;
      const helpLink = menu.querySelector('a[href="teacher-help.html"]');
      menu.insertBefore(notificationLink, helpLink || menu.firstChild);
    }

    const notificationLink = menu.querySelector('a[href="teacher-notifications.html"]');
    if (notificationLink && !notificationLink.querySelector('.notification-count')) {
      const notificationBadge = document.createElement('span');
      notificationBadge.id = menuId + 'Badge';
      notificationBadge.className = 'notification-count';
      notificationBadge.setAttribute('aria-label', 'Unread notifications');
      notificationBadge.hidden = true;
      notificationLink.appendChild(notificationBadge);
    }

    pill.addEventListener('click', () => {
      const isExpanded = pill.getAttribute('aria-expanded') === 'true';
      pill.setAttribute('aria-expanded', String(!isExpanded));
    });

    menu.addEventListener('click', (event) => {
      const item = event.target.closest('.user-menu-item');
      if (!item) return;

      if (item.classList.contains('user-menu-item--danger')) {
        event.preventDefault();
        try {
          if (window.ChigosAuth && typeof window.ChigosAuth.logout === 'function') {
            window.ChigosAuth.logout();
            return;
          }
          sessionStorage.clear();
          localStorage.removeItem('chigos_auth');
          localStorage.removeItem('chigos_user');
        } catch (e) {}
        window.location.href = 'login.html';
        return;
      }

      pill.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (event) => {
      if (!account.contains(event.target)) pill.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && pill.getAttribute('aria-expanded') === 'true') {
        pill.setAttribute('aria-expanded', 'false');
        pill.focus();
        event.stopPropagation();
      }
    }, true);
  });
})();
