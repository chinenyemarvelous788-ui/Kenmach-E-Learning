/* ============================================================
   CHIGOS · STUDENT PORTAL — COURSE PLAYER
   ============================================================ */
(function () {
  'use strict';

  var toastTimer;

  window.ChigosToast = function (message, type) {
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + (type || 'success');
    toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    window.requestAnimationFrame(function () { toast.classList.add('show'); });
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('show');
      window.setTimeout(function () { toast.remove(); }, 250);
    }, 2400);
  };



  document.getElementById('videoPlaceholder').addEventListener('click', function () {
    window.ChigosToast('▶ Playing: User research fundamentals');
  });

  var tabs = document.getElementById('tabs');
  tabs.addEventListener('click', function (event) {
    var tab = event.target.closest('.tab');
    if (!tab || !tabs.contains(tab)) return;

    var target = tab.getAttribute('data-tab');
    tabs.querySelectorAll('.tab').forEach(function (item) {
      var active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active ? 'true' : 'false');
      item.tabIndex = active ? 0 : -1;
    });

    document.querySelectorAll('.tab-panel').forEach(function (panel) {
      var active = panel.getAttribute('data-panel') === target;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
  });

  var notesArea = document.getElementById('notesArea');
  var notesStatus = document.getElementById('notesStatus');
  var notesKey = 'chigos.student.lesson5.notes';
  var saveTimer;

  try {
    var savedNotes = window.localStorage.getItem(notesKey);
    if (savedNotes !== null) notesArea.value = savedNotes;
  } catch (error) {
    notesStatus.textContent = 'Autosave unavailable in this browser';
  }

  notesArea.addEventListener('input', function () {
    notesStatus.textContent = 'Saving…';
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(function () {
      try {
        window.localStorage.setItem(notesKey, notesArea.value);
        notesStatus.textContent = 'Saved';
      } catch (error) {
        notesStatus.textContent = 'Could not save notes';
        window.ChigosToast('Notes could not be saved in this browser', 'error');
      }
    }, 600);
  });

  document.getElementById('downloadNotesBtn').addEventListener('click', function () {
    if (!notesArea.value.trim()) {
      window.ChigosToast('No notes to download yet', 'error');
      return;
    }

    var file = new Blob([notesArea.value], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(file);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'lesson-5-notes.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    window.ChigosToast('Notes downloaded');
  });

  document.querySelectorAll('.resource-item').forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      window.ChigosToast('Downloading ' + item.getAttribute('data-download'));
    });
  });

  var qaForm = document.getElementById('qaForm');
  var qaInput = document.getElementById('qaInput');
  var qaList = document.getElementById('qaList');

  qaForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var question = qaInput.value.trim();
    if (!question) {
      window.ChigosToast('Type a question first', 'error');
      qaInput.focus();
      return;
    }

    var item = document.createElement('article');
    item.className = 'qa-item qa-item--new';
    var avatar = document.createElement('span');
    avatar.className = 'qa-avatar';
    avatar.textContent = 'AJ';
    var body = document.createElement('div');
    body.className = 'qa-body';
    var name = document.createElement('strong');
    name.textContent = 'Amara James';
    var text = document.createElement('p');
    text.textContent = question;
    var time = document.createElement('small');
    time.textContent = 'Just now';
    body.appendChild(name);
    body.appendChild(text);
    body.appendChild(time);
    item.appendChild(avatar);
    item.appendChild(body);
    qaList.prepend(item);
    qaInput.value = '';
    window.ChigosToast('Question posted — the instructor will be notified');
  });

  var progressRing = document.getElementById('progressRing');
  var progressRingText = document.getElementById('progressRingText');
  var completeBtn = document.getElementById('completeBtn');
  var currentPercent = 42;
  var completedLessons = 5;
  var isCompleted = false;

  function setProgress(percent) {
    var circumference = 113;
    progressRing.style.strokeDashoffset = circumference - circumference * percent / 100;
    progressRingText.textContent = percent + '%';
    document.querySelector('.progress-ring').setAttribute('aria-label', 'Lesson progress ' + percent + ' percent');
  }

  setProgress(currentPercent);

  function updateCourseProgress() {
    var chipFill = document.querySelector('.course-progress-chip .fill');
    var chipPercent = document.querySelector('.course-progress-chip strong');
    if (chipFill) chipFill.style.width = currentPercent + '%';
    if (chipPercent) chipPercent.textContent = currentPercent + '%';
    document.querySelector('.course-progress-chip').setAttribute('aria-label', 'Course progress: ' + currentPercent + ' percent');

    var footerStrong = document.querySelector('.progress-footer-text strong');
    var footerSpan = document.querySelector('.progress-footer-text span');
    if (footerStrong) footerStrong.textContent = "You're " + currentPercent + "% through this course";
    if (footerSpan) footerSpan.textContent = completedLessons + ' of 12 lessons completed';
  }

  function advanceToNextLesson() {
    var nextLesson = document.querySelector('.lesson-item.current');
    if (!nextLesson) {
      window.ChigosToast('You have reached the end of this course');
      return;
    }

    var title = nextLesson.querySelector('.lesson-text strong').textContent;
    var duration = nextLesson.querySelector('.lesson-text small').textContent;
    var lessonNumber = completedLessons;
    document.querySelector('.lesson-title').textContent = title;
    document.querySelector('.video-meta-overlay > span:first-child').innerHTML =
      'LESSON ' + lessonNumber + ' <i></i> ' + title.toUpperCase();
    document.querySelector('.lesson-num').innerHTML =
      'LESSON ' + lessonNumber + ' OF 12 <i></i> MODULE 2: DISCOVERY';
    document.querySelector('.video-duration').lastChild.textContent = ' ' + duration;
    document.getElementById('videoPlaceholder').setAttribute('aria-label', 'Play ' + title + ' lesson');

    isCompleted = false;
    completeBtn.innerHTML = 'Mark complete &amp; continue <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    window.ChigosToast('Ready for the next lesson: ' + title);
  }

  completeBtn.addEventListener('click', function () {
    if (isCompleted) {
      advanceToNextLesson();
      return;
    }

    isCompleted = true;
    var currentLesson = document.querySelector('.lesson-item.current');
    if (currentLesson) {
      currentLesson.classList.remove('current');
      currentLesson.classList.add('completed');
      currentLesson.removeAttribute('aria-current');
      var status = currentLesson.querySelector('.lesson-status');
      status.textContent = '';
      var check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      check.setAttribute('viewBox', '0 0 24 24');
      check.setAttribute('fill', 'none');
      check.setAttribute('stroke', 'currentColor');
      check.setAttribute('stroke-width', '2.5');
      check.setAttribute('stroke-linecap', 'round');
      check.setAttribute('stroke-linejoin', 'round');
      check.setAttribute('aria-hidden', 'true');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'm5 12 4 4L19 6');
      check.appendChild(path);
      status.appendChild(check);

      var nextLesson = currentLesson.nextElementSibling;
      if (nextLesson && nextLesson.classList.contains('lesson-item')) {
        nextLesson.classList.add('current');
        nextLesson.setAttribute('aria-current', 'true');
        nextLesson.querySelector('.lesson-status').textContent = '▶';
        var lock = nextLesson.querySelector('.lesson-lock');
        if (lock) lock.remove();
      }
    }

    completedLessons = Math.min(completedLessons + 1, 12);
    currentPercent = Math.round(completedLessons / 12 * 100);
    setProgress(currentPercent);
    updateCourseProgress();
    completeBtn.innerHTML = completedLessons === 12 ? 'Course completed' : 'Next lesson <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    if (completedLessons === 12) completeBtn.disabled = true;
    window.ChigosToast('✓ Lesson marked complete');
  });
}());
