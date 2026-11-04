(function () {
  'use strict';

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!button || !answer) return;

    const answerId = `contact-faq-answer-${index + 1}`;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', answerId);
    answer.id = answerId;

    button.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('is-open');
        faqItem.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitButton = document.getElementById('submitBtn');
  const sendAnother = document.getElementById('sendAnother');
  if (!form || !success || !submitButton || !sendAnother) return;

  function getField(fieldName) {
    return form.elements.namedItem(fieldName);
  }

  function showError(fieldName, message) {
    const input = getField(fieldName);
    const error = form.querySelector(`[data-error-for="${fieldName}"]`);
    input?.classList.add('has-error');
    if (error) {
      error.textContent = message;
      error.classList.add('is-visible');
    }
  }

  function clearError(fieldName) {
    const input = getField(fieldName);
    const error = form.querySelector(`[data-error-for="${fieldName}"]`);
    input?.classList.remove('has-error');
    if (error) {
      error.textContent = '';
      error.classList.remove('is-visible');
    }
  }

  function clearAllErrors() {
    form.querySelectorAll('input, select, textarea').forEach((field) => field.classList.remove('has-error'));
    form.querySelectorAll('.field-error').forEach((error) => {
      error.textContent = '';
      error.classList.remove('is-visible');
    });
  }

  function validate() {
    clearAllErrors();
    let valid = true;
    const name = getField('name').value.trim();
    if (!name) {
      showError('name', 'Please enter your name');
      valid = false;
    } else if (name.length < 2) {
      showError('name', 'Name must be at least 2 characters');
      valid = false;
    }

    const email = getField('email').value.trim();
    if (!email) {
      showError('email', 'Please enter your email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showError('email', 'Please enter a valid email');
      valid = false;
    }

    if (!getField('topic').value) {
      showError('topic', 'Please choose a topic');
      valid = false;
    }

    const message = getField('message').value.trim();
    if (!message) {
      showError('message', 'Please write a message');
      valid = false;
    } else if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters');
      valid = false;
    }

    if (!getField('consent').checked) {
      showError('consent', 'You must agree to proceed');
      valid = false;
    }

    return valid;
  }

  ['name', 'email', 'topic', 'message', 'consent'].forEach((fieldName) => {
    const field = getField(fieldName);
    field?.addEventListener('input', () => clearError(fieldName));
    field?.addEventListener('change', () => clearError(fieldName));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) {
      form.querySelector('.has-error')?.focus();
      return;
    }

    submitButton.disabled = true;
    submitButton.classList.add('is-loading');

    window.setTimeout(() => {
      form.hidden = true;
      success.classList.add('is-visible');
      submitButton.disabled = false;
      submitButton.classList.remove('is-loading');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });

  sendAnother.addEventListener('click', () => {
    form.reset();
    clearAllErrors();
    form.hidden = false;
    success.classList.remove('is-visible');
    getField('name').focus();
  });
})();
