(function () {
  'use strict';

  var form = document.getElementById('courseEditForm');
  var tabs = document.getElementById('tabs');
  var outcomesList = document.getElementById('outcomesList');
  var priceOptions = document.getElementById('priceOptions');
  var priceInput = document.getElementById('coursePrice');
  var priceCard = document.getElementById('priceCard');
  var coverInput = document.getElementById('coverInput');
  var coverPreview = document.getElementById('coverPreview');
  var previewDialog = document.getElementById('previewDialog');
  var saveStatus = document.getElementById('saveStatus');
  var storageKey = 'chigos-course-edit:' + (new URLSearchParams(window.location.search).get('id') || 'default');
  var coverObjectUrl = '';

  function setActiveTab(tab) {
    var selectedTab = tab.dataset.tab;
    tabs.querySelectorAll('.tab').forEach(function (item) {
      var isActive = item === tab;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });
    document.querySelectorAll('.tab-panel').forEach(function (panel) {
      var isActive = panel.dataset.panel === selectedTab;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }

  function updatePricePreview() {
    var value = Number(priceInput.value);
    document.getElementById('pricePreview').textContent = Number.isFinite(value) && value >= 0
      ? '₦' + value.toLocaleString('en-NG')
      : '₦0';
  }

  function setPriceType(option) {
    var isFree = option.dataset.value === 'free';
    priceOptions.querySelectorAll('.price-option').forEach(function (item) {
      var isSelected = item === option;
      item.classList.toggle('selected', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));
    });
    priceCard.hidden = isFree;
    priceInput.disabled = isFree;
  }

  function addOutcome(value, focusInput) {
    var item = document.createElement('div');
    item.className = 'outcome-item';
    item.innerHTML = '<span class="outcome-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span><input type="text" aria-label="Learning outcome"><button type="button" class="remove-btn" aria-label="Remove outcome"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    item.querySelector('input').value = value || '';
    outcomesList.appendChild(item);
    if (focusInput) item.querySelector('input').focus();
  }

  function createModule(title) {
    var module = document.createElement('article');
    module.className = 'module';
    module.innerHTML = '<div class="module-header"><button type="button" class="module-toggle" aria-expanded="true" aria-label="Collapse module"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></button><div class="module-title"><span>NEW MODULE</span><h3></h3></div><span class="module-count">0 lessons</span><button type="button" class="remove-btn module-remove" aria-label="Remove module"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div><div class="module-content"><button type="button" class="add-lesson">+ Add lesson</button></div>';
    module.querySelector('.module-title h3').textContent = title;
    document.getElementById('moduleList').insertBefore(module, document.getElementById('addModuleRow'));
  }

  function collectDraft() {
    return {
      title: document.getElementById('courseTitle').value,
      subtitle: document.getElementById('courseSubtitle').value,
      description: document.getElementById('courseDescription').value,
      category: document.getElementById('courseCategory').value,
      level: document.getElementById('courseLevel').value,
      outcomes: Array.prototype.map.call(outcomesList.querySelectorAll('input'), function (input) {
        return input.value;
      }),
      priceType: priceOptions.querySelector('.price-option.selected').dataset.value,
      price: priceInput.value
    };
  }

  function applyDraft(draft) {
    if (!draft || typeof draft !== 'object') return;
    document.getElementById('courseTitle').value = typeof draft.title === 'string' ? draft.title : '';
    document.getElementById('courseSubtitle').value = typeof draft.subtitle === 'string' ? draft.subtitle : '';
    document.getElementById('courseDescription').value = typeof draft.description === 'string' ? draft.description : '';
    document.getElementById('courseCategory').value = typeof draft.category === 'string' ? draft.category : 'Business';
    document.getElementById('courseLevel').value = typeof draft.level === 'string' ? draft.level : 'All levels';
    if (Array.isArray(draft.outcomes)) {
      outcomesList.replaceChildren();
      draft.outcomes.forEach(function (outcome) {
        addOutcome(typeof outcome === 'string' ? outcome : '', false);
      });
    }
    if (draft.priceType === 'free' || draft.priceType === 'paid') {
      setPriceType(priceOptions.querySelector('[data-value="' + draft.priceType + '"]'));
    }
    if (typeof draft.price === 'string' && /^\d+(\.\d+)?$/.test(draft.price)) {
      priceInput.value = draft.price;
    }
    updatePricePreview();
  }

  function saveChanges() {
    if (!form.reportValidity()) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(collectDraft()));
      saveStatus.textContent = 'Saved in this browser';
    } catch (error) {
      console.error('Unable to save course changes in this browser.', error);
      saveStatus.textContent = 'Could not save changes';
      window.alert('Your changes could not be saved in this browser. Please try again.');
    }
  }

  tabs.addEventListener('click', function (event) {
    var tab = event.target.closest('.tab');
    if (tab) setActiveTab(tab);
  });

  document.getElementById('addOutcomeBtn').addEventListener('click', function () {
    addOutcome('', true);
  });

  outcomesList.addEventListener('click', function (event) {
    var button = event.target.closest('.remove-btn');
    if (button) button.closest('.outcome-item').remove();
  });

  document.getElementById('moduleList').addEventListener('click', function (event) {
    var toggle = event.target.closest('.module-toggle');
    var remove = event.target.closest('.module-remove');
    var addLesson = event.target.closest('.add-lesson');
    var editLesson = event.target.closest('.lesson-edit');

    if (toggle) {
      var module = toggle.closest('.module');
      var collapsed = module.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded', String(!collapsed));
      return;
    }
    if (remove) {
      remove.closest('.module').remove();
      return;
    }
    if (addLesson) {
      var lessonTitle = window.prompt('Enter a lesson title:');
      if (!lessonTitle || !lessonTitle.trim()) return;
      var row = document.createElement('div');
      row.className = 'lesson-row';
      row.innerHTML = '<span class="lesson-grip" aria-hidden="true">⠿</span><span class="lesson-type lesson-type--video" aria-hidden="true">▶</span><div class="lesson-info"><strong></strong><span>New lesson</span></div><button type="button" class="lesson-edit">Edit lesson</button>';
      row.querySelector('.lesson-info strong').textContent = lessonTitle.trim();
      addLesson.before(row);
      return;
    }
    if (editLesson) {
      var currentTitle = editLesson.parentElement.querySelector('.lesson-info strong').textContent;
      var updatedTitle = window.prompt('Edit lesson title:', currentTitle);
      if (updatedTitle && updatedTitle.trim()) {
        editLesson.parentElement.querySelector('.lesson-info strong').textContent = updatedTitle.trim();
      }
    }
  });

  function promptForModule() {
    var title = window.prompt('Enter a module title:');
    if (title && title.trim()) createModule(title.trim());
  }

  document.getElementById('addModuleBtn').addEventListener('click', promptForModule);
  document.getElementById('addModuleRow').addEventListener('click', promptForModule);

  priceOptions.addEventListener('click', function (event) {
    var option = event.target.closest('.price-option');
    if (option) setPriceType(option);
  });

  priceInput.addEventListener('input', updatePricePreview);

  coverInput.addEventListener('change', function () {
    var file = coverInput.files && coverInput.files[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) {
      window.alert('Choose a JPG, PNG, or WebP image.');
      coverInput.value = '';
      return;
    }
    if (coverObjectUrl) URL.revokeObjectURL(coverObjectUrl);
    coverObjectUrl = URL.createObjectURL(file);
    var image = coverPreview.querySelector('img');
    if (!image) {
      image = document.createElement('img');
      image.alt = 'Selected course cover';
      coverPreview.prepend(image);
    }
    image.src = coverObjectUrl;
  });

  document.getElementById('saveBtn').addEventListener('click', saveChanges);
  document.getElementById('saveFooterBtn').addEventListener('click', saveChanges);
  document.getElementById('discardBtn').addEventListener('click', function () {
    if (window.confirm('Discard unsaved changes?')) window.location.reload();
  });

  document.getElementById('previewBtn').addEventListener('click', function () {
    document.getElementById('previewTitle').textContent = document.getElementById('courseTitle').value;
    document.getElementById('previewDescription').textContent = document.getElementById('courseDescription').value;
    document.getElementById('previewPrice').textContent = priceInput.disabled
      ? 'Free'
      : '₦' + (Number(priceInput.value) || 0).toLocaleString('en-NG');
    if (typeof previewDialog.showModal === 'function') previewDialog.showModal();
  });

  document.getElementById('closePreviewBtn').addEventListener('click', function () {
    previewDialog.close();
  });

  form.addEventListener('input', function () {
    saveStatus.textContent = '';
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveChanges();
  });

  try {
    var savedDraft = window.localStorage.getItem(storageKey);
    if (savedDraft) applyDraft(JSON.parse(savedDraft));
  } catch (error) {
    console.error('Unable to restore saved course changes.', error);
    saveStatus.textContent = 'Saved changes could not be loaded';
  }

  updatePricePreview();
})();
