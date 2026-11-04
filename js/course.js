(function () {
  'use strict';

  /* ==================== NAVBAR SCROLL ==================== */
  const wrap = document.getElementById('navbar');
  let ticking = false;
  const update = () => {
    if (!wrap) return;
    wrap.classList.toggle('scrolled', window.scrollY > 20);
    ticking = false;
  };
  update();
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  /* ==================== CURRICULUM DATA ==================== */
  const CURRICULUM = [
    { title: 'Getting Started with Web Development', lessons: [
      { title: 'Welcome & what you\'ll build', duration: '5:24' },
      { title: 'Setting up your dev environment', duration: '12:08' },
      { title: 'How the web actually works', duration: '18:42' },
      { title: 'Your first HTML page', duration: '14:16' }
    ]},
    { title: 'HTML & CSS Foundations', lessons: [
      { title: 'HTML semantics that matter', duration: '22:10' },
      { title: 'CSS selectors, box model, and cascade', duration: '34:18' },
      { title: 'Flexbox & Grid — layouts that just work', duration: '42:05' },
      { title: 'Responsive design from scratch', duration: '28:33' },
      { title: 'Building your first real layout', duration: '38:12' }
    ]},
    { title: 'JavaScript Fundamentals', lessons: [
      { title: 'Variables, types, and operators', duration: '26:40' },
      { title: 'Functions and scope', duration: '31:22' },
      { title: 'Arrays, objects, and iteration', duration: '39:55' },
      { title: 'The DOM — bringing pages to life', duration: '44:10' },
      { title: 'Async/await and promises', duration: '36:28' }
    ]},
    { title: 'Modern Front-End with React', lessons: [
      { title: 'Why React? Mental model', duration: '18:44' },
      { title: 'Components, props, and state', duration: '42:16' },
      { title: 'Hooks: useState, useEffect, useRef', duration: '52:33' },
      { title: 'Routing and data fetching', duration: '38:11' },
      { title: 'Building a real dashboard', duration: '58:02' }
    ]},
    { title: 'Back-End with Node & Databases', lessons: [
      { title: 'Node.js & Express basics', duration: '34:22' },
      { title: 'REST APIs — designing and building', duration: '46:18' },
      { title: 'Databases: SQL vs NoSQL', duration: '28:44' },
      { title: 'Authentication & security', duration: '52:10' },
      { title: 'Building a full API end-to-end', duration: '1:04:33' }
    ]},
    { title: 'Deploy, Ship, and Land the Job', lessons: [
      { title: 'Deploying to Vercel & Railway', duration: '24:30' },
      { title: 'CI/CD and monitoring basics', duration: '32:15' },
      { title: 'Portfolio that gets interviews', duration: '28:40' },
      { title: 'Interview prep & next steps', duration: '36:22' }
    ]}
  ];

  function renderCurriculum() {
    const container = document.getElementById('curriculum');
    if (!container) return;

    CURRICULUM.forEach((section, idx) => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'section';
      const totalMin = section.lessons.length * 30;
      const meta = `${section.lessons.length} lectures · ${Math.round(totalMin/60)}h`;
      const isOpen = idx === 0;

      sectionEl.innerHTML = `
        <div class="section-head ${isOpen ? 'is-open' : ''}" data-toggle>
          <svg class="section-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
          <span class="section-title">${section.title}</span>
          <span class="section-meta">${meta}</span>
        </div>
        <div class="section-body">
          <div class="section-body-inner">
            ${section.lessons.map(l => `
              <div class="lesson">
                <span class="lesson-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5 19 12 8 19 8 5"/></svg>
                </span>
                <span class="lesson-title">${l.title}</span>
                <span class="lesson-duration">${l.duration}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.appendChild(sectionEl);
    });

    container.addEventListener('click', (e) => {
      const head = e.target.closest('.section-head');
      if (!head) return;
      head.classList.toggle('is-open');
    });
  }

  /* ==================== REVIEWS DATA ==================== */
  const REVIEWS = [
    {
      name: 'Tunde Martins',
      role: 'Software Engineer · Google',
      initials: 'TM',
      stars: 5,
      text: 'I went from zero coding experience to a full-time offer in 7 months. The real projects were the difference — recruiters actually cared about what I built. Adaeze explains things like a senior engineer, not a textbook.',
      date: '2 weeks ago',
      tags: ['Practical', 'Great projects', 'Instructor is clear']
    },
    {
      name: 'Ngozi Kalu',
      role: 'Data Lead · Flutterwave',
      initials: 'NK',
      stars: 5,
      text: 'I\'d tried three other courses before this one. The difference is Adaeze assumes you\'re smart but new — she respects your time. No filler, no fluff. Every lesson earned its place.',
      date: '1 month ago',
      tags: ['Well explained', 'Good pace']
    },
    {
      name: 'Efe Kalu',
      role: 'Front-End Developer · Freelance',
      initials: 'EK',
      stars: 5,
      text: 'Signed my first ₦250k client within 3 weeks of finishing. The portfolio module alone was worth the price. This course is what "practical" actually means.',
      date: '1 month ago',
      tags: ['Practical', 'Worth the price']
    }
  ];

  function renderReviews() {
    const list = document.getElementById('reviewList');
    if (!list) return;

    list.innerHTML = REVIEWS.map(r => `
      <article class="review">
        <div class="review-head">
          <div class="review-avatar">${r.initials}</div>
          <div class="review-info">
            <div class="review-name">${r.name}</div>
            <div class="review-role">${r.role}</div>
          </div>
        </div>
        <div class="review-stars-small">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <p class="review-text">"${r.text}"</p>
        ${r.tags && r.tags.length ? `<div class="review-tags">${r.tags.map(t => `<span class="review-tag">${t}</span>`).join('')}</div>` : ''}
        <div class="review-date">${r.date}</div>
      </article>
    `).join('');
  }

  /* ==================== ⭐ RATING SYSTEM ==================== */
  const rateState = {
    stars: 0,
    tags: new Set()
  };

  const RATING_LABELS = {
    1: 'We\'re sorry to hear that. What went wrong?',
    2: 'Not quite what you hoped. Tell us more?',
    3: 'Decent — but there\'s room to improve. What would make it better?',
    4: 'Glad you liked it! Anything we could polish?',
    5: 'Awesome — you loved it! What stood out most?'
  };

  const starPicker = document.getElementById('starPicker');
  const starBtns = starPicker ? starPicker.querySelectorAll('.star-btn') : [];
  const rateFeedback = document.getElementById('rateFeedback');
  const rateForm = document.getElementById('rateForm');
  const rateSubmit = document.getElementById('rateSubmit');
  const rateCancel = document.getElementById('rateCancel');
  const rateSuccess = document.getElementById('rateSuccess');
  const successStars = document.getElementById('successStars');
  const rateTagsWrap = document.getElementById('rateTags');
  const rateText = document.getElementById('rateText');

  function paintStars(value) {
    starBtns.forEach(btn => {
      const v = Number(btn.dataset.value);
      btn.classList.toggle('is-active', v <= value);
    });
  }

  function updateSubmitState() {
    if (!rateSubmit) return;
    rateSubmit.disabled = rateState.stars === 0;
  }

  starBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      paintStars(Number(btn.dataset.value));
    });
    btn.addEventListener('mouseleave', () => {
      paintStars(rateState.stars);
    });
    btn.addEventListener('click', () => {
      const value = Number(btn.dataset.value);
      rateState.stars = value;

      paintStars(value);
      updateSubmitState();

      // Pop animation
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');

      // Feedback message
      if (rateFeedback) {
        rateFeedback.style.opacity = '0';
        setTimeout(() => {
          rateFeedback.textContent = RATING_LABELS[value] || 'Thanks for your rating!';
          rateFeedback.style.opacity = '1';
        }, 150);
      }

      // Reveal form
      if (rateForm) rateForm.classList.add('is-visible');
    });
  });

  // Tag selection
  if (rateTagsWrap) {
    rateTagsWrap.addEventListener('click', (e) => {
      const tag = e.target.closest('.rate-tag');
      if (!tag) return;
      const t = tag.dataset.tag;
      if (rateState.tags.has(t)) {
        rateState.tags.delete(t);
        tag.classList.remove('is-selected');
      } else {
        rateState.tags.add(t);
        tag.classList.add('is-selected');
      }
    });
  }

  // Cancel
  if (rateCancel) {
    rateCancel.addEventListener('click', () => {
      rateState.stars = 0;
      rateState.tags.clear();
      paintStars(0);
      if (rateFeedback) rateFeedback.textContent = 'Tap a star to rate this course';
      if (rateForm) rateForm.classList.remove('is-visible');
      if (rateText) rateText.value = '';
      if (rateTagsWrap) {
        rateTagsWrap.querySelectorAll('.rate-tag').forEach(t => t.classList.remove('is-selected'));
      }
      updateSubmitState();
    });
  }

  // Submit
  if (rateForm) {
    rateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (rateState.stars === 0) return;

      const text = rateText ? rateText.value.trim() : '';
      const tags = Array.from(rateState.tags);

      // Prepend as a new review
      const newReview = {
        name: 'You',
        role: 'Student · Just now',
        initials: 'YU',
        stars: rateState.stars,
        text: text || 'Rated this course.',
        date: 'Just now',
        tags: tags,
        isNew: true
      };

      REVIEWS.unshift(newReview);
      renderReviews();

      // Mark it as new
      const firstReview = document.querySelector('#reviewList .review');
      if (firstReview) {
        firstReview.classList.add('is-new');
        // Add "You" tag
        const nameEl = firstReview.querySelector('.review-name');
        if (nameEl) {
          nameEl.insertAdjacentHTML('beforeend', '<span class="you-tag">You</span>');
        }
      }

      // Show success state
      if (successStars) {
        successStars.textContent = '★'.repeat(rateState.stars) + '☆'.repeat(5 - rateState.stars);
      }
      if (rateForm) rateForm.classList.remove('is-visible');
      if (rateSuccess) rateSuccess.classList.add('is-visible');
      if (rateFeedback) rateFeedback.textContent = 'Your rating has been submitted ✨';

      // Scroll the new review into view
      setTimeout(() => {
        if (firstReview) {
          firstReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    });
  }

  /* ==================== RELATED COURSES ==================== */
  const RELATED = [
    { title: 'Design Systems That Scale', wm: 'UI', cover: 'linear-gradient(135deg, #FFE8D6, #E8590C)', rating: 4.8, price: '₦35,000' },
    { title: 'Python for Data Science & ML', wm: 'PY', cover: 'linear-gradient(135deg, #FFCC99, #BF4A06)', rating: 4.9, price: '₦49,000' },
    { title: 'Building AI-Powered Apps with LLMs', wm: 'AI', cover: 'linear-gradient(135deg, #FFD9BA, #8A1C00)', rating: 4.9, price: '₦55,000' }
  ];

  function renderRelated() {
    const list = document.getElementById('relatedList');
    if (!list) return;

    list.innerHTML = RELATED.map(c => `
      <a href="#" class="related-item">
        <div class="related-thumb" style="background: ${c.cover}">${c.wm}</div>
        <div class="related-info">
          <div class="related-title">${c.title}</div>
          <div class="related-meta">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/></svg>
            ${c.rating}
            <span class="related-price" style="margin-left:auto">${c.price}</span>
          </div>
        </div>
      </a>
    `).join('');
  }

  /* ==================== COUNTDOWN ==================== */
  function startCountdown() {
    const hEl = document.getElementById('cdH');
    const mEl = document.getElementById('cdM');
    const sEl = document.getElementById('cdS');
    if (!hEl || !mEl || !sEl) return;

    let total = 5 * 3600 + 42 * 60 + 18;

    const tick = () => {
      if (total <= 0) total = 24 * 3600;
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      hEl.textContent = String(h).padStart(2, '0');
      mEl.textContent = String(m).padStart(2, '0');
      sEl.textContent = String(s).padStart(2, '0');
      total--;
    };

    tick();
    setInterval(tick, 1000);
  }

  /* ==================== MOBILE BAR ==================== */
  function initMobileBar() {
    const bar = document.getElementById('mobileBar');
    const enrollCard = document.querySelector('.enroll-card');
    if (!bar || !enrollCard) return;

    const check = () => {
      const rect = enrollCard.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      bar.style.display = (window.innerWidth <= 900 && !visible) ? 'flex' : 'none';
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
  }

  /* ==================== INIT ==================== */
  renderCurriculum();
  renderReviews();
  renderRelated();
  startCountdown();
  initMobileBar();

})();