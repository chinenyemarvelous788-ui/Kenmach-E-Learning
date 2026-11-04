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

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && editModal && editModal.classList.contains('show') && typeof closeModal === 'function') {
      closeModal();
    }
  });

  /* SHARE */
  document.getElementById('shareBtn').addEventListener('click', function(){
    var url = window.location.origin + window.location.pathname.replace('student-profile.html','profile/amara-james');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function(){
        toast('Profile link copied to clipboard');
      }).catch(function(){
        toast('Could not copy — try again');
      });
    } else {
      toast('Profile link copied');
    }
  });

  /* CHANGE PHOTO */
  document.getElementById('changePhotoBtn').addEventListener('click', function(){
    toast('Photo upload — hook this up to your file picker');
  });

  /* EDIT MODAL */
  var editModal = document.getElementById('editModal');
  var previouslyFocusedElement = null;
  function openModal(){
    previouslyFocusedElement = document.activeElement;
    editModal.classList.add('show');
    editModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    document.getElementById('inputName').focus();
  }
  function closeModal(){
    editModal.classList.remove('show');
    editModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(previouslyFocusedElement)previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
  document.getElementById('editBtn').addEventListener('click', openModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalCancel').addEventListener('click', closeModal);
  editModal.addEventListener('click', function(e){
    if (e.target === editModal) closeModal();
  });

  /* SAVE — LIVE UPDATE */
  document.getElementById('modalSave').addEventListener('click', function(){
    var name = document.getElementById('inputName').value.trim() || 'Amara James';
    var headline = document.getElementById('inputHeadline').value.trim();
    var bio = document.getElementById('inputBio').value.trim();
    var location = document.getElementById('inputLocation').value.trim();
    var website = document.getElementById('inputWebsite').value.trim();

    document.getElementById('displayName').textContent = name;
    document.getElementById('displayHeadline').textContent = headline;
    document.getElementById('displayBio').textContent = bio;
    document.getElementById('displayLocation').textContent = location;
    document.getElementById('infoLocation').textContent = location;
    document.getElementById('infoWebsite').textContent = website;

    var initials = name.split(' ').map(function(w){ return w[0] || ''; }).slice(0,2).join('').toUpperCase();
    document.getElementById('heroAvatar').textContent = initials;
    document.getElementById('sidebarAvatar').textContent = initials;
    document.getElementById('sidebarName').textContent = name;

    closeModal();
    toast('Profile updated');
  });

})();
