(function () {
  'use strict';

  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const status = document.getElementById('publishStatus');
  const publishButton = document.getElementById('publishBtn');

  if (!toggle || !sidebar || !backdrop || !status || !publishButton) {
    console.error('The publish review controls could not be initialized.');
    return;
  }

  let draft = {};
  let previousBodyOverflow = '';
  try {
    draft = JSON.parse(sessionStorage.getItem('chigosTeacherCourseDraft') || '{}');
    if (!draft || typeof draft !== 'object' || Array.isArray(draft)) draft = {};
  } catch (error) {
    console.error('Could not read the saved lesson draft.', error);
    status.textContent = 'Could not load your saved lesson in this browser session.';
  }

  function closeDrawer() {
    sidebar.classList.remove('is-open');
    backdrop.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = previousBodyOverflow;
  }

  function openDrawer() {
    if (window.innerWidth > 900) return;
    previousBodyOverflow = document.body.style.overflow;
    sidebar.classList.add('is-open');
    backdrop.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    if (sidebar.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  });
  backdrop.addEventListener('click', closeDrawer);
  sidebar.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 900) closeDrawer();
    });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeDrawer();
      toggle.focus();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && sidebar.classList.contains('is-open')) closeDrawer();
  });

  const lesson = draft.lesson || {};
  const pricing = draft.pricing || { type: 'paid', amount: 15000 };
  const files = Array.isArray(lesson.files) ? lesson.files : [];
  const typeNames = { paid: 'One-time purchase', free: 'Free', subscription: 'Monthly subscription' };
  const formattedAmount = Number(pricing.amount || 0).toLocaleString('en-NG');

  document.getElementById('reviewTitle').textContent = lesson.title || 'Untitled lesson';
  document.getElementById('reviewModule').textContent = lesson.module || 'Not selected';
  document.getElementById('reviewDuration').textContent = lesson.duration ? lesson.duration + ' minutes' : 'Not set';
  document.getElementById('reviewPricing').textContent = pricing.type === 'free'
    ? 'Free'
    : (typeNames[pricing.type] || typeNames.paid) + ' — ₦' + formattedAmount;
  document.getElementById('reviewFiles').textContent = files.length
    ? files.length + (files.length === 1 ? ' file selected' : ' files selected')
    : 'No files selected';
  document.getElementById('reviewDescription').textContent = lesson.description || 'No lesson description added.';

  publishButton.addEventListener('click', function () {
    status.textContent = 'Publishing is not available yet. Connect this page to the course backend to make the lesson live.';
  });
})();
