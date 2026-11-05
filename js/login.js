(function(){
  'use strict';

  /* ==================== VIEW SWITCHING ==================== */
  const emailView = document.getElementById('emailView');
  const googleView = document.getElementById('googleView');
  const appleView = document.getElementById('appleView');

  function hideAllViews() {
    emailView.classList.add('is-hidden');
    googleView.classList.remove('is-active');
    appleView.classList.remove('is-active');
  }

  function showEmailView() {
    hideAllViews();
    emailView.classList.remove('is-hidden');
    emailView.style.animation = 'none';
    void emailView.offsetWidth;
    emailView.style.animation = '';
    const first = emailView.querySelector('input');
    if (first) setTimeout(() => first.focus(), 100);
  }

  function showProviderView(provider) {
    hideAllViews();
    if (provider === 'Google') googleView.classList.add('is-active');
    if (provider === 'Apple') appleView.classList.add('is-active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* Social buttons → show provider view */
  document.querySelectorAll('.social-btn[data-provider]').forEach(btn => {
    btn.addEventListener('click', () => showProviderView(btn.dataset.provider));
  });

  /* Back buttons → return to email view */
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', showEmailView);
  });

  /* Provider "Continue" buttons */
  document.querySelectorAll('[data-provider-continue]').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.providerContinue;
      const urlParams = new URLSearchParams(window.location.search);
      const isTeacher = urlParams.get('role') === 'teacher';
      const targetDashboard = isTeacher ? 'teacher-dashboard.html' : 'student-dashboard.html';

      btn.disabled = true;
      btn.textContent = `Connecting to ${provider}…`;

      try {
        localStorage.setItem('chigos.currentUser', JSON.stringify(isTeacher ? 'teacher-ada' : 'student-demo'));
        localStorage.setItem('chigos_email', isTeacher ? 'teacher@chigos.com' : 'chioma.adebayo@gmail.com');
        localStorage.setItem('chigos_role', isTeacher ? 'teacher' : 'student');
      } catch(err){}

      setTimeout(() => {
        btn.textContent = 'Redirecting to dashboard…';
        setTimeout(() => {
          window.location.href = targetDashboard;
        }, 300);
      }, 500);
    });
  });

  /* "Use another account" */
  document.querySelectorAll('[data-use-other]').forEach(btn => {
    btn.addEventListener('click', () => {
      showEmailView();
      const emailInput = document.getElementById('email');
      if (emailInput) {
        emailInput.focus();
        emailInput.value = '';
        emailInput.placeholder = 'Enter a different Google email';
      }
    });
  });

  /* ==================== PASSWORD TOGGLE ==================== */
  const toggle = document.getElementById('togglePassword');
  const pwdInput = document.getElementById('password');
  const eyeOpen = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
  const eyeClosed = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

  toggle.addEventListener('click', () => {
    const isPassword = pwdInput.type === 'password';
    pwdInput.type = isPassword ? 'text' : 'password';
    toggle.innerHTML = isPassword ? eyeClosed : eyeOpen;
    toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });

  /* ==================== FORM VALIDATION & SIGN IN ==================== */
  const form = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');
  const alertError = document.getElementById('alertError');
  const alertErrorText = document.getElementById('alertErrorText');
  const emailInput = document.getElementById('email');
  const rememberCheck = document.getElementById('remember');

  function showFieldError(fieldName, msg) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const errEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (input) input.classList.add('has-error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('is-visible'); }
  }
  function clearFieldError(fieldName) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    const errEl = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (input) input.classList.remove('has-error');
    if (errEl) { errEl.textContent = ''; errEl.classList.remove('is-visible'); }
  }
  function showAlert(msg) {
    alertErrorText.textContent = msg;
    alertError.classList.add('is-visible');
  }
  function hideAlert() { alertError.classList.remove('is-visible'); }

  ['email','password'].forEach(name => {
    const el = form.querySelector(`[name="${name}"]`);
    if (el) el.addEventListener('input', () => { clearFieldError(name); hideAlert(); });
  });

  function validate() {
    let valid = true;
    clearFieldError('email');
    clearFieldError('password');

    const email = emailInput.value.trim();
    if (!email) { showFieldError('email', 'Please enter your email'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      showFieldError('email', 'Please enter a valid email address'); valid = false;
    }

    const pwd = pwdInput.value;
    if (!pwd) { showFieldError('password', 'Please enter your password'); valid = false; }
    else if (pwd.length < 6) { showFieldError('password', 'Password must be at least 6 characters'); valid = false; }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    let email = emailInput.value.trim();
    let pwd = pwdInput.value;

    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    const isTeacher = roleParam === 'teacher' || /teacher|instructor|ada|bello/i.test(email);

    // If user clicked Sign In without typing, default to demo credentials so they easily enter the dashboard
    if (!email && !pwd) {
      email = isTeacher ? 'teacher@chigos.com' : 'amara.james@gmail.com';
      emailInput.value = email;
      pwd = 'password123';
      pwdInput.value = pwd;
    } else if (!validate()) {
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');

    const targetDashboard = isTeacher ? 'teacher-dashboard.html' : 'student-dashboard.html';

    // Save session in localStorage
    try {
      if (rememberCheck && rememberCheck.checked) {
        localStorage.setItem('chigos_email', email);
      }
      localStorage.setItem('chigos.currentUser', JSON.stringify(isTeacher ? 'teacher-ada' : 'student-demo'));
      localStorage.setItem('chigos_role', isTeacher ? 'teacher' : 'student');
      if (isTeacher && !localStorage.getItem('chigos_teacher_name')) {
        localStorage.setItem('chigos_teacher_name', 'Sarah Bello');
      }
    } catch(err){}

    // Redirect directly to the appropriate dashboard
    setTimeout(() => {
      window.location.href = targetDashboard;
    }, 400);
  });

  /* ==================== REMEMBERED EMAIL ==================== */
  try {
    const saved = localStorage.getItem('chigos_email');
    if (saved) {
      emailInput.value = saved;
      rememberCheck.checked = true;
    }
  } catch(err){}

  /* ==================== FORGOT PASSWORD ==================== */
  document.getElementById('forgotLink').addEventListener('click', (e) => {
    e.preventDefault();
    showAlert('Password reset link sent to your email. Check your inbox.');
    alertError.classList.remove('alert--error');
    alertError.classList.add('alert--success');
  });

})();
