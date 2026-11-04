(function () {
  'use strict';

  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  mobileToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
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

  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  const toastIcon = document.getElementById('toastIcon');
  let toastTimer;

  function showToast(message, type) {
    window.clearTimeout(toastTimer);
    toastText.textContent = message;
    toast.classList.remove('toast--success', 'toast--error');

    if (type === 'error') {
      toast.classList.add('toast--error');
      toastIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
    } else {
      toast.classList.add('toast--success');
      toastIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
    }

    toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  const navItems = Array.from(document.querySelectorAll('.settings-nav-item'));
  const panels = Array.from(document.querySelectorAll('.settings-panel'));

  navItems.forEach((item) => {
    const section = item.dataset.section;
    item.setAttribute('aria-controls', 'panel-' + section);
    item.setAttribute('aria-current', item.classList.contains('is-active') ? 'page' : 'false');

    item.addEventListener('click', () => {
      navItems.forEach((navItem) => {
        const isActive = navItem === item;
        navItem.classList.toggle('is-active', isActive);
        navItem.setAttribute('aria-current', isActive ? 'page' : 'false');
      });

      panels.forEach((panel) => panel.classList.toggle('is-active', panel.id === 'panel-' + section));

      if (window.innerWidth <= 1100) {
        document.querySelector('.settings-nav').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  const secNew = document.getElementById('secNew');
  const strengthFill = document.getElementById('strengthFill');
  const strengthLabel = document.getElementById('strengthLabel');

  function scorePassword(password) {
    let score = 0;
    if (!password) return score;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return Math.min(score, 4);
  }

  secNew.addEventListener('input', () => {
    const score = scorePassword(secNew.value);
    const widths = ['0%', '25%', '50%', '75%', '100%'];
    const colors = ['#DC2626', '#DC2626', '#FFB800', '#4ADE80', '#1A8A4A'];
    const labels = ['Password strength', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthFill.style.width = widths[score];
    strengthFill.style.background = colors[score];
    strengthLabel.textContent = labels[score];
  });

  const twoFactorToggle = document.getElementById('twoFactorToggle');
  const secTwoFactor = document.getElementById('secTwoFactor');

  twoFactorToggle.addEventListener('change', () => {
    secTwoFactor.disabled = !twoFactorToggle.checked;
    if (twoFactorToggle.checked) {
      secTwoFactor.focus();
      showToast('2FA enabled in this demo. Enter your authenticator code to confirm.', 'success');
    } else {
      secTwoFactor.value = '';
      showToast('2FA disabled in this demo.', 'error');
    }
  });

  secTwoFactor.addEventListener('input', () => {
    secTwoFactor.value = secTwoFactor.value.replace(/\D/g, '').slice(0, 6);
  });

  const secCurrent = document.getElementById('secCurrent');
  const secConfirm = document.getElementById('secConfirm');

  document.getElementById('updatePasswordBtn').addEventListener('click', () => {
    if (!secCurrent.value) {
      showToast('Please enter your current password.', 'error');
      secCurrent.focus();
      return;
    }
    if (secNew.value.length < 8) {
      showToast('New password must be at least 8 characters.', 'error');
      secNew.focus();
      return;
    }
    if (secNew.value !== secConfirm.value) {
      showToast('Passwords do not match.', 'error');
      secConfirm.focus();
      return;
    }

    showToast('Password update is a demo and was not sent to a server.', 'success');
    secCurrent.value = '';
    secNew.value = '';
    secConfirm.value = '';
    strengthFill.style.width = '0%';
    strengthFill.style.background = '#DC2626';
    strengthLabel.textContent = 'Password strength';
  });

  document.querySelectorAll('.session-revoke').forEach((button) => {
    button.addEventListener('click', () => {
      const row = button.closest('.session-row');
      if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        window.setTimeout(() => row.remove(), 300);
      }
      showToast('Session revoked in this demo.', 'success');
    });
  });

  const deactivateBtn = document.getElementById('deactivateBtn');
  const deactivateModal = document.getElementById('deactivateModal');
  const deactivateCancel = document.getElementById('deactivateCancel');
  const deactivateConfirm = document.getElementById('deactivateConfirm');

  function openDeactivateModal() {
    deactivateModal.classList.add('is-open');
    deactivateModal.setAttribute('aria-hidden', 'false');
    deactivateCancel.focus();
  }

  function closeDeactivateModal() {
    deactivateModal.classList.remove('is-open');
    deactivateModal.setAttribute('aria-hidden', 'true');
    deactivateBtn.focus();
  }

  deactivateModal.setAttribute('aria-hidden', 'true');
  deactivateBtn.addEventListener('click', openDeactivateModal);
  deactivateCancel.addEventListener('click', closeDeactivateModal);
  deactivateModal.addEventListener('click', (event) => {
    if (event.target === deactivateModal) closeDeactivateModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && deactivateModal.classList.contains('is-open')) {
      closeDeactivateModal();
    }
  });
  deactivateConfirm.addEventListener('click', () => {
    closeDeactivateModal();
    showToast('Account deactivation is a demo; no account changes were made.', 'error');
  });

  document.querySelectorAll('.theme-option').forEach((option) => {
    const input = option.querySelector('input');
    input.addEventListener('change', () => {
      document.querySelectorAll('.theme-option').forEach((themeOption) => {
        themeOption.classList.toggle('is-selected', themeOption === option);
      });
      showToast('Theme selection is a demo and was not saved.', 'success');
    });
  });

  document.getElementById('saveAllBtn').addEventListener('click', () => {
    showToast('Settings are a demo and were not saved to an account.', 'success');
  });

  document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
    showToast('Photo upload is a demo; no file was uploaded.', 'success');
  });

  document.getElementById('viewPayoutsBtn').addEventListener('click', () => {
    showToast('Payout history is not connected in this demo.', 'success');
  });

  document.getElementById('editPayoutBtn').addEventListener('click', () => {
    showToast('Payout method editing is not connected in this demo.', 'success');
  });

  document.getElementById('downloadTaxBtn').addEventListener('click', () => {
    showToast('Tax summary download is not available in this demo.', 'error');
  });
})();
