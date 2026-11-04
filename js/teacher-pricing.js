(function () {
  'use strict';

  const draftKey = 'chigosTeacherCourseDraft';
  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const priceOptions = document.getElementById('priceOptions');
  const priceInput = document.getElementById('lessonPrice');
  const status = document.getElementById('pricingStatus');
  const continueButton = document.getElementById('continueBtn');

  if (!toggle || !sidebar || !backdrop || !priceOptions || !priceInput || !status || !continueButton) {
    console.error('The course pricing controls could not be initialized.');
    return;
  }

  let draft = {};
  let previousBodyOverflow = '';
  try {
    draft = JSON.parse(sessionStorage.getItem(draftKey) || '{}');
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

  function currentType() {
    const selected = priceOptions.querySelector('.price-option.selected');
    return selected ? selected.dataset.value : 'paid';
  }

  function updatePriceControls(type) {
    priceOptions.querySelectorAll('.price-option').forEach(function (option) {
      const selected = option.dataset.value === type;
      option.classList.toggle('selected', selected);
      option.setAttribute('aria-pressed', String(selected));
    });
    const isFree = type === 'free';
    priceInput.disabled = isFree;
    priceInput.required = !isFree;
    if (isFree) {
      priceInput.value = '0';
    } else if (Number(priceInput.value) === 0 || priceInput.value === '') {
      priceInput.value = '15000';
    }
  }

  function savePricing() {
    draft.pricing = {
      type: currentType(),
      amount: Number(priceInput.value)
    };
    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draft));
      status.textContent = '';
      return true;
    } catch (error) {
      console.error('Could not save your pricing choice.', error);
      status.textContent = 'Could not save your pricing in this browser. Check available storage and try again.';
      return false;
    }
  }

  const pricing = draft.pricing || { type: 'paid', amount: 15000 };
  priceInput.value = Number.isFinite(Number(pricing.amount)) ? String(pricing.amount) : '15000';
  updatePriceControls(['paid', 'free', 'subscription'].includes(pricing.type) ? pricing.type : 'paid');

  const lesson = draft.lesson || {};
  document.getElementById('summaryTitle').textContent = lesson.title || 'Untitled lesson';
  document.getElementById('summaryModule').textContent = lesson.module || 'Not selected';
  document.getElementById('summaryDuration').textContent = lesson.duration ? lesson.duration + ' minutes' : 'Not set';
  const files = Array.isArray(lesson.files) ? lesson.files : [];
  document.getElementById('summaryFiles').textContent = files.length
    ? files.length + (files.length === 1 ? ' file selected' : ' files selected')
    : 'No files selected';

  priceOptions.querySelectorAll('.price-option').forEach(function (option) {
    option.addEventListener('click', function () {
      updatePriceControls(option.dataset.value);
      savePricing();
    });
  });
  priceInput.addEventListener('input', savePricing);
  priceInput.addEventListener('change', savePricing);
  continueButton.addEventListener('click', function () {
    if (!priceInput.disabled && (!priceInput.value || Number(priceInput.value) <= 0)) {
      priceInput.setCustomValidity('Enter a price greater than zero, or choose the free option.');
      priceInput.reportValidity();
      return;
    }
    priceInput.setCustomValidity('');
    if (savePricing()) window.location.href = 'teacher-publish.html';
  });
})();
