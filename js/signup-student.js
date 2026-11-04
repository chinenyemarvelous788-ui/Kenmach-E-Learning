(function(){
  'use strict';

  /* ==================== ELEMENTS ==================== */
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const allForms = [step1, step2, step3];
  const stepperSteps = document.querySelectorAll('.step');
  const successOverlay = document.getElementById('successOverlay');
  const formFooter = document.querySelector('.form-footer');
  const stepperEl = document.getElementById('stepper');
  const formHead = document.querySelector('.form-head');
  const socialRow = document.querySelector('.social-row');
  const divider = document.querySelector('.divider');
  const roleTabs = document.querySelector('.role-tabs');

  /* ==================== STEP SWITCHING ==================== */
  function goToStep(n) {
    stepperSteps.forEach(s => {
      const stepN = Number(s.dataset.step);
      s.classList.toggle('is-active', stepN === n);
      s.classList.toggle('is-done', stepN < n);
    });

    allForms.forEach(f => f.classList.remove('is-active'));
    if (n === 1) step1.classList.add('is-active');
    if (n === 2) step2.classList.add('is-active');
    if (n === 3) step3.classList.add('is-active');

    successOverlay.classList.remove('is-active');
    stepperEl.style.display = '';
    formHead.style.display = '';
    socialRow.style.display = n === 1 ? '' : 'none';
    divider.style.display = n === 1 ? '' : 'none';
    formFooter.style.display = n === 1 ? '' : 'none';
    if (roleTabs) roleTabs.style.display = n === 1 ? '' : 'none';

    const active = document.querySelector('.signup-form.is-active');
    if (active) {
      const first = active.querySelector('input, button.interest');
      if (first) setTimeout(() => first.focus(), 100);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* Back buttons */
  document.getElementById('backTo1').addEventListener('click', () => goToStep(1));
  document.getElementById('backTo2').addEventListener('click', () => goToStep(2));

  /* ==================== STEP 1 — DETAILS ==================== */
  const alertError = document.getElementById('alertError');
  const alertErrorText = document.getElementById('alertErrorText');

  function showFieldError(stepEl, fieldName, msg) {
    const input = stepEl.querySelector(`[name="${fieldName}"]`);
    const errEl = stepEl.querySelector(`[data-error-for="${fieldName}"]`);
    if (input) input.classList.add('has-error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('is-visible'); }
  }
  function clearFieldError(stepEl, fieldName) {
    const input = stepEl.querySelector(`[name="${fieldName}"]`);
    const errEl = stepEl.querySelector(`[data-error-for="${fieldName}"]`);
    if (input) input.classList.remove('has-error');
    if (errEl) { errEl.textContent = ''; errEl.classList.remove('is-visible'); }
  }
  function showAlert(msg) {
    alertErrorText.textContent = msg;
    alertError.classList.add('is-visible');
  }
  function hideAlert() { alertError.classList.remove('is-visible'); }

  ['firstName','lastName','email','password','terms'].forEach(name => {
    const el = step1.querySelector(`[name="${name}"]`);
    if (el) {
      el.addEventListener('input', () => { clearFieldError(step1, name); hideAlert(); });
      el.addEventListener('change', () => { clearFieldError(step1, name); hideAlert(); });
    }
  });

  /* Password strength */
  const pwdInput = document.getElementById('password');
  const strengthFill = document.getElementById('strengthFill');
  const strengthLabel = document.getElementById('strengthLabel');

  function scorePassword(pwd) {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return Math.min(score, 5);
  }

  pwdInput.addEventListener('input', () => {
    const score = scorePassword(pwdInput.value);
    const widths = ['0%','20%','40%','60%','80%','100%'];
    const labels = ['Password strength','Weak','Fair','Good','Strong','Very strong'];
    const colors = ['var(--muted-lt)','var(--red)','var(--orange)','var(--gold)','var(--orange-deep)','var(--green)'];
    strengthFill.style.width = widths[score];
    strengthLabel.textContent = labels[score];
    strengthLabel.style.color = colors[score];
  });

  /* Password toggle */
  const toggle = document.getElementById('togglePassword');
  const eyeOpen = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  const eyeClosed = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
  toggle.addEventListener('click', () => {
    const isPwd = pwdInput.type === 'password';
    pwdInput.type = isPwd ? 'text' : 'password';
    toggle.innerHTML = isPwd ? eyeClosed : eyeOpen;
  });

  /* STEP 1 SUBMIT */
  step1.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();
    let valid = true;
    ['firstName','lastName','email','password','terms'].forEach(n => clearFieldError(step1, n));

    const fn = step1.firstName.value.trim();
    const ln = step1.lastName.value.trim();
    const em = step1.email.value.trim();
    const pwd = step1.password.value;

    if (!fn) { showFieldError(step1, 'firstName', 'Please enter your first name'); valid = false; }
    if (!ln) { showFieldError(step1, 'lastName', 'Please enter your last name'); valid = false; }
    if (!em) { showFieldError(step1, 'email', 'Please enter your email'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) { showFieldError(step1, 'email', 'Please enter a valid email'); valid = false; }
    if (!pwd) { showFieldError(step1, 'password', 'Please create a password'); valid = false; }
    else if (pwd.length < 8) { showFieldError(step1, 'password', 'Password must be at least 8 characters'); valid = false; }
    if (!step1.terms.checked) { showFieldError(step1, 'terms', 'You must agree to continue'); valid = false; }

    if (!valid) {
      const firstErr = step1.querySelector('.has-error');
      if (firstErr) firstErr.focus();
      return;
    }

    window.__signup = window.__signup || {};
    window.__signup.firstName = fn;
    window.__signup.email = em;
    goToStep(2);
  });

  /* ==================== STEP 2 — INTERESTS ==================== */
  const interests = document.getElementById('interests');
  const interestsCount = document.getElementById('interestsCount');
  const selectedTopics = new Set();

  interests.addEventListener('click', (e) => {
    const btn = e.target.closest('.interest');
    if (!btn) return;
    const topic = btn.dataset.topic;
    if (selectedTopics.has(topic)) {
      selectedTopics.delete(topic);
      btn.classList.remove('is-selected');
    } else {
      selectedTopics.add(topic);
      btn.classList.add('is-selected');
    }
    interestsCount.textContent = `${selectedTopics.size} selected`;
    interestsCount.style.color = '';
  });

  step2.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedTopics.size < 2) {
      interestsCount.textContent = 'Please pick at least 2 topics';
      interestsCount.style.color = 'var(--red)';
      return;
    }
    interestsCount.style.color = '';
    document.getElementById('verifyEmail').textContent = window.__signup.email || 'your email';
    goToStep(3);
  });

  /* ==================== STEP 3 — VERIFY ==================== */
  const codeInputs = document.querySelectorAll('#codeInputs input');
  const codeError = document.getElementById('codeError');

  codeInputs.forEach((input, i) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val.slice(0, 1);
      e.target.classList.toggle('is-filled', val.length > 0);
      if (val && i < codeInputs.length - 1) codeInputs[i + 1].focus();
      codeError.textContent = '';
      codeError.style.color = '';
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && i > 0) {
        codeInputs[i - 1].focus();
      }
    });
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData.getData('text') || '').replace(/\D/g, '');
      codeInputs.forEach((inp, idx) => {
        if (text[idx]) {
          inp.value = text[idx];
          inp.classList.add('is-filled');
        }
      });
      const next = Math.min(text.length, codeInputs.length - 1);
      codeInputs[next].focus();
    });
  });

  step3.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = Array.from(codeInputs).map(i => i.value).join('');
    if (code.length !== 6) {
      codeError.textContent = 'Please enter the full 6-digit code.';
      codeError.style.color = '';
      return;
    }

    const btn = document.getElementById('verifyBtn');
    btn.disabled = true;
    btn.classList.add('is-loading');
    btn.querySelector('.btn-label').textContent = 'Verifying…';

    setTimeout(() => {
      btn.disabled = false;
      btn.classList.remove('is-loading');
      btn.querySelector('.btn-label').textContent = 'Verify & continue';

      allForms.forEach(f => f.classList.remove('is-active'));
      stepperEl.style.display = 'none';
      formHead.style.display = 'none';
      socialRow.style.display = 'none';
      divider.style.display = 'none';
      formFooter.style.display = 'none';
      if (roleTabs) roleTabs.style.display = 'none';

      document.getElementById('successName').textContent = window.__signup.firstName || 'friend';
      successOverlay.classList.add('is-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  });

  document.getElementById('resendBtn').addEventListener('click', () => {
    codeError.style.color = 'var(--green)';
    codeError.textContent = 'New code sent ✉️';
    codeInputs.forEach(i => { i.value = ''; i.classList.remove('is-filled'); });
    codeInputs[0].focus();
    setTimeout(() => { codeError.textContent = ''; codeError.style.color = ''; }, 2000);
  });

  /* ==================== SOCIAL BUTTONS (DEMO) ==================== */
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = btn.dataset.provider;
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span>Connecting…</span>';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        showAlert(`Demo only — real ${p} signup would open ${p}'s auth flow.`);
      }, 900);
    });
  });

})();