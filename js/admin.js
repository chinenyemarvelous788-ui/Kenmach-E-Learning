/* ==========================================================================
   CHIGOS ADMIN PORTAL — CORE SCRIPT
   Provides layout interactions, sidebar drawer/collapse, dropdowns,
   toasts, modals, and dynamic data syncing with ChigosStorage.
   ========================================================================== */

(function () {
  'use strict';

  // Core Toast Manager
  window.AdminToast = {
    show: function (message, type) {
      type = type || 'success';
      var container = document.getElementById('adminToastContainer');
      if (!container) {
        container = document.createElement('div');
        container.id = 'adminToastContainer';
        document.body.appendChild(container);
      }

      var iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      if (type === 'danger') {
        iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
      } else if (type === 'info') {
        iconSvg = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
      }

      var toast = document.createElement('div');
      toast.className = 'admin-toast admin-toast--' + type;
      toast.innerHTML = iconSvg + '<span>' + message + '</span>';
      container.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add('is-visible');
      });

      setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }, 3500);
    }
  };

  // Modal Manager
  window.AdminModal = {
    open: function (id) {
      var modal = document.getElementById(id);
      if (modal) {
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    },
    close: function (id) {
      var modal = document.getElementById(id);
      if (modal) {
        modal.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    },
    confirm: function (options) {
      var overlay = document.getElementById('adminConfirmModal');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'adminConfirmModal';
        overlay.className = 'modal-overlay';
        overlay.innerHTML =
          '<div class="modal-dialog">' +
            '<div class="modal-header">' +
              '<h3 class="modal-title" id="adminConfirmTitle">Confirm Action</h3>' +
              '<button type="button" class="modal-close" data-close-confirm>' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
              '</button>' +
            '</div>' +
            '<div class="modal-body">' +
              '<p id="adminConfirmMessage" style="color:var(--ink-secondary); font-size:14px; line-height:1.6;"></p>' +
            '</div>' +
            '<div class="modal-footer">' +
              '<button type="button" class="btn btn--outline" data-close-confirm>Cancel</button>' +
              '<button type="button" class="btn btn--primary" id="adminConfirmBtn">Proceed</button>' +
            '</div>' +
          '</div>';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
          if (e.target === overlay || e.target.closest('[data-close-confirm]')) {
            AdminModal.close('adminConfirmModal');
          }
        });
      }

      document.getElementById('adminConfirmTitle').textContent = options.title || 'Please Confirm';
      document.getElementById('adminConfirmMessage').textContent = options.message || 'Are you sure you want to proceed?';
      var confirmBtn = document.getElementById('adminConfirmBtn');
      confirmBtn.textContent = options.confirmText || 'Confirm';
      confirmBtn.className = 'btn ' + (options.danger ? 'btn--danger' : 'btn--primary');

      // Clone button to remove previous listeners
      var newBtn = confirmBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

      newBtn.addEventListener('click', function () {
        AdminModal.close('adminConfirmModal');
        if (typeof options.onConfirm === 'function') {
          options.onConfirm();
        }
      });

      AdminModal.open('adminConfirmModal');
    }
  };

  // CSV Export Utility
  window.AdminExport = {
    toCSV: function (filename, rows) {
      if (!rows || !rows.length) return;
      var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null || row[j] === undefined ? '' : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
          if (j > 0) finalVal += ',';
          finalVal += result;
        }
        return finalVal + '\n';
      };

      var csvFile = '';
      for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
      }

      var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  // Main UI Initialization
  document.addEventListener('DOMContentLoaded', function () {
    var layout = document.getElementById('adminLayout');
    var sidebar = document.getElementById('adminSidebar');
    var collapseBtn = document.getElementById('collapseBtn');
    var mobileToggle = document.getElementById('mobileToggle');
    var userPill = document.getElementById('adminUserPill');
    var userMenu = document.getElementById('adminUserMenu');
    var logoutBtns = document.querySelectorAll('[data-admin-logout]');

    // Create backdrop for mobile drawer if not present
    var backdrop = document.getElementById('adminBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'adminBackdrop';
      backdrop.className = 'mobile-backdrop';
      document.body.appendChild(backdrop);
    }

    // Restore desktop collapsed state
    try {
      if (localStorage.getItem('chigos_admin_collapsed') === 'true' && layout && window.innerWidth > 900) {
        layout.classList.add('is-collapsed');
      }
    } catch (e) {}

    // Desktop Collapse Toggle
    if (collapseBtn && layout) {
      collapseBtn.addEventListener('click', function () {
        var isCollapsed = layout.classList.toggle('is-collapsed');
        try {
          localStorage.setItem('chigos_admin_collapsed', isCollapsed ? 'true' : 'false');
        } catch (e) {}
      });
    }

    // Mobile Drawer Open / Close
    function openMobileDrawer() {
      if (sidebar) sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-active');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
      if (sidebar) sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        if (sidebar && sidebar.classList.contains('is-open')) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeMobileDrawer);
    }

    // User Pill Dropdown Toggle
    if (userPill) {
      userPill.addEventListener('click', function (e) {
        e.stopPropagation();
        var expanded = userPill.getAttribute('aria-expanded') === 'true';
        userPill.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      });
    }

    // Outside click & ESC dismissal
    document.addEventListener('click', function (e) {
      if (userPill && !userPill.contains(e.target) && userMenu && !userMenu.contains(e.target)) {
        userPill.setAttribute('aria-expanded', 'false');
      }
      if (window.innerWidth <= 900 && sidebar && sidebar.classList.contains('is-open')) {
        if (!sidebar.contains(e.target) && (!mobileToggle || !mobileToggle.contains(e.target))) {
          closeMobileDrawer();
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (userPill) userPill.setAttribute('aria-expanded', 'false');
        closeMobileDrawer();
        // Close any open modals
        var activeModals = document.querySelectorAll('.modal-overlay.is-active');
        activeModals.forEach(function (m) {
          m.classList.remove('is-active');
        });
        document.body.style.overflow = '';
      }
    });

    // Logout Handler
    logoutBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        AdminModal.confirm({
          title: 'Log Out Administrator',
          message: 'Are you sure you want to end your administrator session?',
          confirmText: 'Log Out',
          danger: true,
          onConfirm: function () {
            if (window.ChigosAuth) {
              window.ChigosAuth.logout();
            }
            AdminToast.show('Logged out successfully. Redirecting...', 'info');
            setTimeout(function () {
              window.location.href = 'login.html';
            }, 800);
          }
        });
      });
    });

    // Sync live counts with ChigosStorage if available
    if (window.ChigosStorage) {
      try {
        var S = window.ChigosStorage;
        var courses = S.getCourses ? S.getCourses() : [];
        var users = S.getUsers ? S.getUsers() : [];

        var coursesBadge = document.getElementById('sidebarCoursesCount');
        if (coursesBadge && courses.length) {
          coursesBadge.textContent = courses.length;
        }

        var usersBadge = document.getElementById('sidebarUsersCount');
        if (usersBadge && users.length) {
          usersBadge.textContent = users.length;
        }
      } catch (err) {}
    }
  });
})();

