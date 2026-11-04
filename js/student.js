/* ============================================================
   CHIGOS · STUDENT PORTAL — GLOBAL SIDEBAR & NAVIGATION
   ============================================================ */
(function () {
  'use strict';

  if (window.__chigosStudentNavInitialized) return;
  window.__chigosStudentNavInitialized = true;

  function initStudentNav() {
    var toggle = document.getElementById('mobileToggle');
    var sidebar = document.getElementById('sidebar');
    var backdrop = document.getElementById('backdrop');
    var userPill = document.getElementById('userPill');
    var userMenu = document.getElementById('userMenu');
    var logoutBtn = document.getElementById('logoutBtn');
    var userAccount = userPill ? userPill.parentElement : null;

    if (!sidebar) return;

    /* --- MOBILE DRAWER --- */
    function closeDrawer() {
      sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openDrawer() {
      sidebar.classList.add('open');
      if (backdrop) backdrop.classList.add('show');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    if (toggle) {
      toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        if (sidebar.classList.contains('open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 900) closeDrawer();
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && sidebar.classList.contains('open')) {
        closeDrawer();
      }
    });

    /* --- USER MENU (DROPDOWN) --- */
    function closeUserMenu() {
      if (userPill) userPill.setAttribute('aria-expanded', 'false');
    }

    function toggleUserMenu() {
      if (!userPill) return;
      var isOpen = userPill.getAttribute('aria-expanded') === 'true';
      userPill.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }

    if (userPill) {
      userPill.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleUserMenu();
      });
    }

    if (userMenu) {
      userMenu.addEventListener('click', function () {
        closeUserMenu();
      });
    }

    document.addEventListener('click', function (event) {
      if (userAccount && !userAccount.contains(event.target)) {
        closeUserMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        var drawerWasOpen = sidebar.classList.contains('open');
        closeDrawer();
        closeUserMenu();
        if (drawerWasOpen && toggle) {
          toggle.focus();
        }
      }
    });

    /* --- LOGOUT --- */
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (event) {
        event.preventDefault();
        closeUserMenu();
        if (window.ChigosAuth && typeof window.ChigosAuth.logout === 'function') {
          window.ChigosAuth.logout();
        } else {
          try {
            localStorage.removeItem('chigos.currentUser');
          } catch (e) {}
        }
        window.location.href = 'login.html';
      });
    }

    /* --- ACTIVE NAVIGATION SYNC --- */
    var pathname = window.location.pathname;
    var filename = pathname.split('/').pop().toLowerCase() || 'student-dashboard.html';
    
    // Normalization mapping for sub-pages
    var activeMapping = {
      'student-course-player.html': 'student-my-courses.html'
    };
    var targetPage = activeMapping[filename] || filename;

    var navLinks = sidebar.querySelectorAll('.navigation .nav-link');
    navLinks.forEach(function (link) {
      var href = (link.getAttribute('href') || '').toLowerCase();
      if (href === targetPage) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });

    var userMenuItems = sidebar.querySelectorAll('.user-menu .user-menu-item');
    userMenuItems.forEach(function (item) {
      var href = (item.getAttribute('href') || '').toLowerCase();
      if (href === filename) {
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'page');
      } else {
        item.classList.remove('is-active');
        item.removeAttribute('aria-current');
      }
    });

    /* --- DYNAMIC USER METADATA SYNC --- */
    try {
      if (window.ChigosStorage) {
        var currentUserId = window.ChigosStorage.getCurrentUser();
        var user = currentUserId ? window.ChigosStorage.getUserById(currentUserId) : null;
        if (user) {
          var avatar = sidebar.querySelector('.user-avatar');
          var nameEl = sidebar.querySelector('.user-meta strong');
          if (avatar && user.name) {
            var parts = user.name.trim().split(/\s+/);
            avatar.textContent = parts.length > 1
              ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
              : parts[0].slice(0, 2).toUpperCase();
          }
          if (nameEl && user.name) {
            nameEl.textContent = user.name;
          }
        }
      }
    } catch (err) {}

    /* --- WISHLIST BADGE SYNC --- */
    try {
      if (window.ChigosWishlist) {
        var items = window.ChigosWishlist.getItems();
        var badges = document.querySelectorAll('#sidebarWishlistCount, #wishlistBadge');
        badges.forEach(function (b) {
          b.textContent = items.length;
        });
      }
    } catch (err) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStudentNav);
  } else {
    initStudentNav();
  }
}());