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

  const cards = Array.from(document.querySelectorAll('.review-card'));
  const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
  const searchInput = document.getElementById('reviewSearch');
  const emptyState = document.getElementById('emptyState');
  let currentFilter = 'all';
  let currentSearch = '';

  function applyFilters() {
    let shown = 0;

    cards.forEach((card) => {
      const rating = Number(card.dataset.rating);
      const answered = card.dataset.answered === 'true';
      const searchableText = [
        card.dataset.text,
        card.querySelector('.review-text').textContent,
        card.querySelector('.review-info strong').textContent,
        card.querySelector('.review-info span').textContent
      ].join(' ').toLowerCase();

      const matchesFilter =
        currentFilter === 'all' ||
        (currentFilter === 'unanswered' && !answered) ||
        (currentFilter === '5star' && rating === 5) ||
        (currentFilter === 'low' && rating <= 3);
      const matchesSearch = !currentSearch || searchableText.includes(currentSearch);
      const visible = matchesFilter && matchesSearch;

      card.hidden = !visible;
      if (visible) shown += 1;
    });

    emptyState.style.display = shown === 0 ? 'block' : 'none';
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((filterTab) => {
        const isActive = filterTab === tab;
        filterTab.classList.toggle('is-active', isActive);
        filterTab.setAttribute('aria-pressed', String(isActive));
      });
      currentFilter = tab.dataset.filter;
      applyFilters();
    });
  });

  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  function createActionButton(label, svgMarkup, primary) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `review-action${primary ? ' is-primary' : ''}`;
    button.innerHTML = `${svgMarkup}${label}`;
    return button;
  }

  const replyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  const helpfulIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';

  function createReplyForm(card, value, editing) {
    let form = card.querySelector('.reply-form');
    if (!form) {
      form = document.createElement('div');
      form.className = 'reply-form';
      const textarea = document.createElement('textarea');
      textarea.setAttribute('aria-label', `Reply to ${card.querySelector('.review-info strong').textContent}`);
      const actions = document.createElement('div');
      actions.className = 'reply-actions';
      const cancel = document.createElement('button');
      cancel.type = 'button';
      cancel.className = 'reply-btn reply-btn--ghost';
      cancel.dataset.cancelReply = '';
      cancel.textContent = 'Cancel';
      const submit = document.createElement('button');
      submit.type = 'button';
      submit.className = 'reply-btn reply-btn--primary';
      submit.dataset.submitReply = '';
      actions.append(cancel, submit);
      form.append(textarea, actions);
      card.querySelector('.review-actions').before(form);
    }

    form.dataset.editing = String(editing);
    form.querySelector('textarea').value = value || '';
    form.querySelector('[data-submit-reply]').textContent = editing ? 'Save reply' : 'Post reply';
    form.classList.add('is-open');
    form.querySelector('textarea').focus();
    return form;
  }

  function createResponse(card, reply) {
    const response = document.createElement('div');
    response.className = 'instructor-response';
    const label = document.createElement('div');
    label.className = 'instructor-response-label';
    label.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/></svg>Your response';
    const paragraph = document.createElement('p');
    paragraph.textContent = reply;
    response.append(label, paragraph);

    const oldResponse = card.querySelector('.instructor-response');
    if (oldResponse) oldResponse.replaceWith(response);
    else card.querySelector('.review-actions').before(response);
  }

  function updateReplyActions(card) {
    const actions = card.querySelector('.review-actions');
    const helpfulButton = Array.from(actions.querySelectorAll('.review-action'))
      .find((button) => button.textContent.includes('Helpful'));
    const currentCount = helpfulButton
      ? Number(helpfulButton.dataset.helpfulCount || helpfulButton.textContent.match(/Helpful(?:\s+\((\d+)\))?/)?.[1] || 0)
      : 0;
    const helpful = createActionButton(`Helpful (${currentCount})`, helpfulIcon, false);
    helpful.dataset.helpfulCount = String(currentCount);
    helpful.setAttribute('aria-pressed', 'false');

    actions.replaceChildren(
      createActionButton('Edit reply', replyIcon, false),
      helpful
    );
  }

  document.querySelectorAll('.review-actions .review-action').forEach((button) => {
    if (button.textContent.includes('Helpful')) {
      const count = button.textContent.match(/Helpful\s*\((\d+)\)/);
      button.dataset.helpfulCount = count ? count[1] : '0';
      button.setAttribute('aria-pressed', 'false');
    }
  });

  document.getElementById('reviewsList').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const card = button.closest('.review-card');
    if (!card) return;

    if (button.matches('[data-open-reply]')) {
      createReplyForm(card, '', false);
      return;
    }

    if (button.matches('[data-cancel-reply]')) {
      const form = button.closest('.reply-form');
      form.remove();
      return;
    }

    if (button.matches('[data-submit-reply]')) {
      const form = button.closest('.reply-form');
      const reply = form.querySelector('textarea').value.trim();
      if (reply.length < 3) {
        alert('Please write a reply of at least 3 characters before posting.');
        form.querySelector('textarea').focus();
        return;
      }

      createResponse(card, reply);
      card.dataset.answered = 'true';
      form.remove();
      updateReplyActions(card);
      applyFilters();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (button.textContent.trim() === 'Edit reply') {
      const response = card.querySelector('.instructor-response p');
      if (response) createReplyForm(card, response.textContent, true);
      return;
    }

    if (button.textContent.includes('Helpful')) {
      const isHelpful = button.getAttribute('aria-pressed') === 'true';
      const count = Number(button.dataset.helpfulCount || 0) + (isHelpful ? -1 : 1);
      button.dataset.helpfulCount = String(count);
      button.setAttribute('aria-pressed', String(!isHelpful));
      button.innerHTML = `${helpfulIcon}Helpful (${count})`;
    }
  });

  applyFilters();
})();
