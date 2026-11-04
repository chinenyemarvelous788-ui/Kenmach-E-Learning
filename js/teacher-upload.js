(function () {
  'use strict';

  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  const browseButton = document.getElementById('browseBtn');
  const uploadsList = document.getElementById('uploads');
  const uploadStatus = document.getElementById('uploadStatus');
  const requiredElements = [
    toggle, sidebar, backdrop, uploadZone, fileInput, browseButton,
    uploadsList, uploadStatus,
    document.getElementById('saveBtn'),
    document.getElementById('draftBtn'),
    document.getElementById('cancelBtn')
  ];

  if (requiredElements.some(function (element) { return !element; })) {
    console.error('The upload page controls could not be initialized.');
    return;
  }

  const draftKey = 'chigosTeacherCourseDraft';
  let draft = {};
  let previousBodyOverflow = '';

  try {
    draft = JSON.parse(sessionStorage.getItem(draftKey) || '{}');
    if (!draft || typeof draft !== 'object' || Array.isArray(draft)) draft = {};
  } catch (error) {
    console.error('Could not read the saved lesson draft.', error);
    uploadStatus.textContent = 'Your saved lesson could not be loaded in this browser session.';
  }

  function saveDraft() {
    draft.lesson = {
      title: document.getElementById('lessonTitle').value.trim(),
      description: document.getElementById('lessonDesc').value.trim(),
      module: document.getElementById('lessonModule').value,
      duration: document.getElementById('lessonDuration').value,
      settings: Array.from(document.querySelectorAll('.toggle input')).map(function (input) {
        return input.checked;
      }),
      files: draft.lesson && Array.isArray(draft.lesson.files) ? draft.lesson.files : []
    };

    try {
      sessionStorage.setItem(draftKey, JSON.stringify(draft));
      return true;
    } catch (error) {
      console.error('Could not save the lesson draft.', error);
      uploadStatus.textContent = 'Could not save your lesson in this browser. Check available storage and try again.';
      return false;
    }
  }

  const lessonDraft = draft.lesson || {};
  document.getElementById('lessonTitle').value = lessonDraft.title || '';
  document.getElementById('lessonDesc').value = lessonDraft.description || '';
  document.getElementById('lessonModule').value = lessonDraft.module || '';
  document.getElementById('lessonDuration').value = lessonDraft.duration || '';
  if (Array.isArray(lessonDraft.settings)) {
    document.querySelectorAll('.toggle input').forEach(function (input, index) {
      if (typeof lessonDraft.settings[index] === 'boolean') input.checked = lessonDraft.settings[index];
    });
  }

  ['lessonTitle', 'lessonDesc', 'lessonModule', 'lessonDuration'].forEach(function (id) {
    const field = document.getElementById(id);
    field.addEventListener('input', saveDraft);
    field.addEventListener('change', saveDraft);
  });
  document.querySelectorAll('.toggle input').forEach(function (input) {
    input.addEventListener('change', saveDraft);
  });

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

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }

  const supportedExtensions = {
    video: ['mp4', 'mov', 'webm', 'avi', 'mkv'],
    audio: ['mp3', 'wav', 'ogg', 'm4a'],
    doc: ['pdf', 'doc', 'docx', 'ppt', 'pptx']
  };
  const maxFileSize = 2 * 1024 * 1024 * 1024;

  function fileType(name) {
    const extension = name.split('.').pop().toLowerCase();
    if (supportedExtensions.video.includes(extension)) return 'video';
    if (supportedExtensions.audio.includes(extension)) return 'audio';
    if (supportedExtensions.doc.includes(extension)) return 'doc';
    return null;
  }

  function iconSVG(type) {
    if (type === 'video') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>';
    }
    if (type === 'audio') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    }
    if (type === 'doc') {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>';
  }

  function addFile(file) {
    const type = fileType(file.name);
    if (!type) return file.name + ': unsupported file type.';
    if (file.size > maxFileSize) return file.name + ': file exceeds the 2 GB limit.';

    const savedFiles = draft.lesson && Array.isArray(draft.lesson.files) ? draft.lesson.files : [];
    if (!savedFiles.some(function (savedFile) { return savedFile.name === file.name && savedFile.size === file.size; })) {
      savedFiles.push({ name: file.name, size: file.size });
    }
    if (!draft.lesson) draft.lesson = {};
    draft.lesson.files = savedFiles;

    const item = document.createElement('div');
    item.className = 'upload-item';

    const icon = document.createElement('div');
    icon.className = 'upload-item-icon';
    icon.innerHTML = iconSVG(type);

    const body = document.createElement('div');
    body.className = 'upload-item-body';

    const name = document.createElement('div');
    name.className = 'upload-item-name';
    name.textContent = file.name;

    const meta = document.createElement('div');
    meta.className = 'upload-item-meta';
    meta.textContent = formatSize(file.size) + ' · Demo progress…';

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    fill.style.width = '0%';
    progressBar.appendChild(fill);

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'upload-item-remove';
    removeButton.setAttribute('aria-label', 'Remove ' + file.name);
    removeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    body.appendChild(name);
    body.appendChild(meta);
    body.appendChild(progressBar);
    item.appendChild(icon);
    item.appendChild(body);
    item.appendChild(removeButton);
    uploadsList.appendChild(item);

    let progress = 0;
    const interval = window.setInterval(function () {
      progress = Math.min(progress + 16, 100);
      fill.style.width = progress + '%';
      if (progress === 100) {
        window.clearInterval(interval);
        meta.textContent = formatSize(file.size) + ' · Ready (demo only — not uploaded)';
        icon.classList.add('upload-done');
        icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      }
    }, 200);

    removeButton.addEventListener('click', function () {
      window.clearInterval(interval);
      item.remove();
    });

    return null;
  }

  function handleFiles(files) {
    const errors = [];
    Array.prototype.forEach.call(files, function (file) {
      const error = addFile(file);
      if (error) errors.push(error);
    });
    uploadStatus.textContent = errors.length
      ? errors.join(' ')
      : (files.length ? 'File added. Upload progress is only a local demo; nothing was sent to a server.' : '');
    saveDraft();
  }

  browseButton.addEventListener('click', function (event) {
    event.stopPropagation();
    fileInput.click();
  });
  uploadZone.addEventListener('click', function (event) {
    if (event.target !== uploadZone && event.target.closest('button')) return;
    fileInput.click();
  });
  uploadZone.addEventListener('keydown', function (event) {
    if (event.target === uploadZone && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      fileInput.click();
    }
  });
  fileInput.addEventListener('change', function () {
    if (fileInput.files.length) handleFiles(fileInput.files);
    fileInput.value = '';
  });

  ['dragenter', 'dragover'].forEach(function (eventName) {
    uploadZone.addEventListener(eventName, function (event) {
      event.preventDefault();
      event.stopPropagation();
      uploadZone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach(function (eventName) {
    uploadZone.addEventListener(eventName, function (event) {
      event.preventDefault();
      event.stopPropagation();
      uploadZone.classList.remove('dragover');
    });
  });
  uploadZone.addEventListener('drop', function (event) {
    if (event.dataTransfer.files.length) handleFiles(event.dataTransfer.files);
  });

  document.getElementById('saveBtn').addEventListener('click', function () {
    if (saveDraft()) window.location.href = 'teacher-pricing.html';
  });
  document.getElementById('draftBtn').addEventListener('click', function () {
    if (saveDraft()) window.alert('Saved in this browser session. You can continue from this page.');
  });
  document.getElementById('cancelBtn').addEventListener('click', function () {
    if (window.confirm('Discard this lesson? Unsaved changes will be lost.')) {
      window.location.href = 'teacher-courses.html';
    }
  });
})();
