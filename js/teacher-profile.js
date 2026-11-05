(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobileToggle');

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      sidebar.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

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

  const modal = document.getElementById('editModal');
  const editButtons = [
    document.getElementById('editProfileBtn'),
    document.getElementById('editAboutBtn')
  ].filter(Boolean);
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const modalSave = document.getElementById('modalSave');
  const editName = document.getElementById('editName');
  const editRole = document.getElementById('editRole');
  const editBio = document.getElementById('editBio');
  const editLocation = document.getElementById('editLocation');
  const editWebsite = document.getElementById('editWebsite');

  const profileName = document.querySelector('.profile-name-row h2');
  const profileRole = document.querySelector('.profile-role');
  const profileBio = document.querySelector('.profile-bio');
  const locationPill = document.querySelector('.profile-meta-row .meta-pill');
  const websiteLink = document.querySelector('.info-link');
  const websiteContact = Array.from(document.querySelectorAll('.contact-row')).find((row) =>
    row.querySelector('.contact-info strong')?.textContent.trim() === 'Website'
  );
  let returnFocusTo = null;

  function initialsFromName(name) {
    return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  }

  function getWebsiteUrl(value) {
    const normalized = value.trim();
    if (!normalized) return '';

    try {
      const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(normalized) ? normalized : `https://${normalized}`);
      return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
    } catch (error) {
      return '';
    }
  }

  function syncFormWithProfile() {
    editName.value = profileName.textContent.trim();
    editRole.value = profileRole.textContent.trim();
    editBio.value = profileBio.textContent.trim();
    editLocation.value = locationPill.lastChild.textContent.trim();
    editWebsite.value = websiteLink.textContent.replace(/\s*→\s*$/, '').trim();
  }

  function openModal(event) {
    returnFocusTo = event.currentTarget;
    syncFormWithProfile();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => editName.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (returnFocusTo) returnFocusTo.focus();
  }

  editButtons.forEach((button) => button.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);
  modalCancel.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  modalSave.addEventListener('click', () => {
    const newName = editName.value.trim();
    const newRole = editRole.value.trim();
    const newBio = editBio.value.trim();
    const newLocation = editLocation.value.trim();
    const newWebsite = editWebsite.value.trim();

    if (!newName) {
      alert('Please enter your name.');
      editName.focus();
      return;
    }

    const websiteUrl = newWebsite ? getWebsiteUrl(newWebsite) : '';
    if (newWebsite && !websiteUrl) {
      alert('Please enter a valid website address.');
      editWebsite.focus();
      return;
    }

    profileName.textContent = newName;
    profileRole.textContent = newRole;
    profileBio.textContent = newBio;
    locationPill.lastChild.textContent = newLocation ? ` ${newLocation}` : '';

    const initials = initialsFromName(newName);
    document.querySelectorAll('.profile-avatar, .user-avatar').forEach((avatar) => {
      avatar.textContent = initials;
    });
    document.querySelectorAll('.user-meta strong').forEach((name) => {
      name.textContent = newName;
    });

    websiteLink.textContent = newWebsite ? `${newWebsite} →` : 'Add a website →';
    if (websiteUrl) {
      websiteLink.href = websiteUrl;
      websiteLink.target = '_blank';
      websiteLink.rel = 'noopener noreferrer';
    } else {
      websiteLink.removeAttribute('href');
      websiteLink.removeAttribute('target');
      websiteLink.removeAttribute('rel');
    }
    if (websiteContact) {
      websiteContact.querySelector('.contact-info span').textContent = newWebsite || 'Not provided';
    }

    const aboutIntro = document.querySelector('.about-body p');
    aboutIntro.textContent = newBio;
    closeModal();
  });

  const previewProfileBtn = document.getElementById('previewProfileBtn');
  previewProfileBtn.addEventListener('click', () => {
    window.open('instructor.html?instructor=adaeze-okafor', '_blank');
  });

  document.getElementById('shareBtn').addEventListener('click', async (event) => {
    event.preventDefault();
    const url = window.location.href;

    if (!navigator.clipboard) {
      alert(`Copy this link to share: ${url}`);
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      alert('Profile link copied to clipboard!');
    } catch (error) {
      console.warn('Could not copy the profile link.', error);
      alert(`Copy this link to share: ${url}`);
    }
  });

  document.querySelectorAll('.avatar-change, .contact-edit').forEach((button) => {
    button.addEventListener('click', () => {
      alert('Photo and contact editing are demo actions and are not connected yet.');
    });
  });
})();
