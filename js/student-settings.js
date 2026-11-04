(function(){
  'use strict';

  /* TOAST */
  function toast(msg){
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('show'); });
    setTimeout(function(){
      t.classList.remove('show');
      setTimeout(function(){ t.remove(); }, 250);
    }, 2200);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && typeof closeModal === 'function') {
      closeModal();
    }
  });

  /* SETTINGS NAV */
  var nav = document.getElementById('settingsNav');
  var panels = document.querySelectorAll('.settings-panel');

  nav.addEventListener('click', function(e){
    var btn = e.target.closest('.settings-nav-item');
    if (!btn) return;
    nav.querySelectorAll('.settings-nav-item').forEach(function(b){
      var active=b===btn;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',active?'true':'false');
    });
    var section = btn.getAttribute('data-section');
    panels.forEach(function(p){
      p.classList.toggle('active', p.getAttribute('data-panel') === section);
    });
    // On mobile, scroll content into view
    if (window.innerWidth <= 1024) {
      var activePanel = document.querySelector('.settings-panel.active');
      if (activePanel) activePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* SAVE ALL */
  document.getElementById('saveAllBtn').addEventListener('click', function(){
    toast('Settings saved');
  });

  /* PHOTO */
  document.getElementById('uploadPhotoBtn').addEventListener('click', function(){
    toast('Photo upload — hook up to your file picker');
  });
  document.getElementById('removePhotoBtn').addEventListener('click', function(){
    toast('Photo removed');
  });

  /* PASSWORD STRENGTH */
  var newPw = document.getElementById('newPw');
  var strengthLabel = document.getElementById('strengthLabel');
  var segments = document.querySelectorAll('.strength-segment');

  function scorePassword(pw){
    var score = 0;
    if (pw.length >= 8) score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
  }

  newPw.addEventListener('input', function(){
    var pw = newPw.value;
    var score = pw ? scorePassword(pw) : 0;
    var labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    var classes = ['', 'weak', 'fair', 'good', 'strong'];

    segments.forEach(function(seg, i){
      seg.classList.remove('active','weak','fair','good','strong');
      if (i < score) {
        seg.classList.add('active');
        seg.classList.add(classes[score]);
      }
    });

    strengthLabel.textContent = pw ? (labels[score] || 'Enter a password') : 'Enter a password';
  });

  /* UPDATE PASSWORD */
  document.getElementById('updatePwBtn').addEventListener('click', function(){
    var current = document.getElementById('currentPw').value;
    var newVal = newPw.value;
    var confirm = document.getElementById('confirmPw').value;
    if (!current) { toast('Enter your current password'); return; }
    if (newVal.length < 8) { toast('New password must be at least 8 characters'); return; }
    if (newVal !== confirm) { toast('Passwords do not match'); return; }
    document.getElementById('currentPw').value = '';
    newPw.value = '';
    document.getElementById('confirmPw').value = '';
    segments.forEach(function(s){ s.classList.remove('active','weak','fair','good','strong'); });
    strengthLabel.textContent = 'Enter a password';
    toast('Password updated');
  });

  /* 2FA */
  var twofaToggle = document.getElementById('twofaToggle');
  var twofaField = document.getElementById('twofaField');
  twofaToggle.addEventListener('change', function(){
    if (twofaToggle.checked) {
      twofaField.style.display = 'flex';
      toast('Enter the code from your authenticator app');
    } else {
      twofaField.style.display = 'none';
      toast('Two-factor authentication disabled');
    }
  });

  /* SESSIONS REVOKE */
  document.querySelectorAll('.session-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.closest('.session-item');
      item.style.transition = 'opacity .2s, transform .2s';
      item.style.opacity = '0';
      item.style.transform = 'translateX(8px)';
      setTimeout(function(){
        item.remove();
        toast('Session revoked');
      }, 200);
    });
  });

  /* DANGER ZONE */
  document.getElementById('pauseBtn').addEventListener('click', function(){
    toast('Account pause — hook up to your backend');
  });
  document.getElementById('downloadDataBtn').addEventListener('click', function(){
    toast('Data export requested — check your email');
  });

  /* DELETE MODAL */
  var deleteModal = document.getElementById('deleteModal');
  var deleteConfirm = document.getElementById('deleteConfirm');
  var previouslyFocusedElement = null;

  document.getElementById('deleteBtn').addEventListener('click', function(){
    previouslyFocusedElement = document.activeElement;
    deleteModal.classList.add('show');
    deleteModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    deleteConfirm.focus();
  });
  function closeModal(){
    deleteModal.classList.remove('show');
    deleteModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    deleteConfirm.value = '';
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  deleteModal.addEventListener('click', function(e){
    if (e.target === deleteModal) closeModal();
  });
  document.getElementById('modalConfirm').addEventListener('click', function(){
    if (deleteConfirm.value.trim().toLowerCase() !== 'delete my account') {
      toast('Type "delete my account" to confirm');
      return;
    }
    closeModal();
    toast('Account deletion requested');
  });

})();
