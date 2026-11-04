(function () {
  'use strict';

  var S = window.ChigosStorage;
  var Auth = window.ChigosAuth;
  var Payments = window.ChigosPayments;
  var Cards = window.ChigosCards;
  var main = document.getElementById('main');
  var params = new URLSearchParams(window.location.search);
  var page = document.body.getAttribute('data-page') || location.pathname.split('/').pop().replace('.html', '') || 'index';

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function formatNaira(amount) {
    return '₦' + Number(amount || 0).toLocaleString('en-NG');
  }

  function getCourse(id) { return S.getCourseById(id) || S.getCourses()[0]; }
  function teacherName(course) {
    var teacher = course && S.getUserById(course.teacherId);
    return teacher ? (teacher.channelName || teacher.name) : 'Chigos educator';
  }
  function ownsCourse(userId, courseId) {
    return S.getPurchasesByStudent(userId).some(function (item) { return item.courseId === courseId; });
  }
  function externalVideoUrl(url) {
    var videoUrl = new URL(url || 'https://www.youtube.com/embed/ysz5S6PUM-U', location.href);
    if (videoUrl.hostname.indexOf('youtube.com') !== -1 && videoUrl.pathname.indexOf('/embed/') === 0) {
      return 'https://www.youtube.com/watch?v=' + encodeURIComponent(videoUrl.pathname.split('/').pop());
    }
    return videoUrl.href;
  }
  function courseCard(course) {
    return '<article class="course-card reveal">' +
      '<a class="course-card__image" href="course.html?id=' + encodeURIComponent(course.id) + '"><img src="' + escapeHtml(Cards.imageFor(course)) + '" alt="" loading="lazy"><span class="course-card__category">' + escapeHtml(course.category) + '</span></a>' +
      '<div class="course-card__body"><div class="course-card__meta">' + escapeHtml(course.level) + ' <span aria-hidden="true">·</span> ' + escapeHtml(course.duration) + '</div>' +
      '<h3><a href="course.html?id=' + encodeURIComponent(course.id) + '">' + escapeHtml(course.title) + '</a></h3>' +
      '<p class="course-card__teacher">' + escapeHtml(teacherName(course)) + '</p>' +
      '<div class="course-card__foot"><strong>' + formatNaira(course.price) + '</strong><a class="text-link" href="course.html?id=' + encodeURIComponent(course.id) + '">View lesson <span aria-hidden="true">↗</span></a></div></div></article>';
  }
  function pageHead(eyebrow, title, description) {
    return '<section class="page-head"><div class="container"><span class="eyebrow">' + eyebrow + '</span><h1 class="page-head__title">' + title + '</h1><p class="page-head__sub">' + description + '</p></div></section>';
  }
  function setPage(title, content) {
    document.title = title + ' — Chigos';
    main.innerHTML = content;
    initReveal();
  }
  function initReveal() {
    var nodes = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach(function (node) { observer.observe(node); });
  }
  function renderNav() {
    var user = Auth.current();
    var nav = document.getElementById('site-navbar');
    if (!nav) return;
    var userLink = user ? '<a class="nav-user" href="' + (user.role === 'admin' ? 'admin.html' : 'student-dashboard.html') + '"><span class="avatar">' + escapeHtml(Cards.initials(user.name)) + '</span><span>' + escapeHtml(user.name.split(' ')[0]) + '</span></a>' : '';
    if (user && user.role === 'teacher') {
      userLink = '<span class="nav-user"><span class="avatar">' + escapeHtml(Cards.initials(user.name)) + '</span><span>' + escapeHtml(user.name.split(' ')[0]) + '</span></span>';
    }
    nav.innerHTML = '<div class="nav-wrap container"><a class="brand" href="index.html" aria-label="Chigos home"><img src="assets/img/logo-mark.svg" alt=""><span>chigos<span class="brand__dot">.</span></span></a>' +
      '<button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-menu-toggle><span></span><span></span></button>' +
      '<nav class="nav-links" aria-label="Main navigation"><a href="courses.html">Explore</a><a href="about.html">Our story</a><a href="contact.html">Contact</a></nav>' +
      '<div class="nav-actions">' + (user ? userLink + '<button class="btn btn--small btn--outline" type="button" data-logout>Sign out</button>' : '<a class="nav-signin" href="login.html">Sign in</a><a class="btn btn--small btn--orange" href="signup-student.html">Join Chigos <span aria-hidden="true">↗</span></a>') + '</div></div>';
  }
  function renderFooter() {
    var footer = document.getElementById('site-footer');
    if (footer) footer.innerHTML = '<div class="container footer__inner"><a class="brand brand--footer" href="index.html"><img src="assets/img/logo-mark.svg" alt=""><span>chigos<span class="brand__dot">.</span></span></a><p>Good lessons. Fair prices. Made for learning.</p><nav aria-label="Footer"><a href="courses.html">Explore</a><a href="about.html">About</a><a href="contact.html">Contact</a></nav><small>© ' + new Date().getFullYear() + ' Chigos. Demo platform.</small></div>';
  }
  function renderHome() {
    var courses = S.getCourses();
    setPage('Learn from people who do the work', '<section class="hero"><div class="container hero__grid"><div class="hero__copy"><span class="eyebrow"><i></i> A better way to learn</span><h1>Make room for<br><em>what’s next.</em></h1><p>Short, useful lessons from people who know their craft. Pay once, learn at your pace, keep it for good.</p><div class="hero__actions"><a class="btn btn--orange btn--lg" href="courses.html">Explore lessons <span aria-hidden="true">↗</span></a><a class="btn btn--text" href="signup-teacher.html">Teach on Chigos <span aria-hidden="true">→</span></a></div><div class="hero__proof"><div class="avatar-stack"><span>A</span><span>T</span><span>M</span></div><span>Learn on your own terms <b>·</b> from ₦2,200</span></div></div><div class="hero__visual"><img src="assets/img/Teacher.jfif" alt="Teacher sharing a practical lesson"><div class="hero-note"><span class="hero-note__icon">✳</span><div><strong>Keep what you learn</strong><small>One payment. Lifetime access.</small></div></div><div class="hero-index">01 <span>/</span> 06</div></div></div><div class="hero__side-note">CHOOSE YOUR NEXT SKILL <span>↓</span></div></section>' +
      '<section class="section section--paper"><div class="container"><div class="section-heading"><div><span class="eyebrow">A good place to start</span><h2>Learn something useful.</h2></div><a class="text-link" href="courses.html">All lessons <span aria-hidden="true">→</span></a></div><div class="course-grid">' + courses.filter(function (course) { return course.featured; }).slice(0, 3).map(courseCard).join('') + '</div></div></section>' +
      '<section class="section section--dark"><div class="container split-callout"><div><span class="eyebrow eyebrow--light">For independent teachers</span><h2>Your work has value.<br><em>Make it count.</em></h2></div><div><p>Share a lesson, set a fair price, and earn from every student who watches. Clear fees, straightforward tools, no subscription.</p><a class="btn btn--lime" href="signup-teacher.html">Start teaching <span aria-hidden="true">↗</span></a></div></div></section>' +
      '<section class="section"><div class="container"><div class="section-heading"><div><span class="eyebrow">Why Chigos</span><h2>Less noise. More progress.</h2></div></div><div class="value-grid"><article><span class="value-number">01</span><h3>One lesson at a time</h3><p>No bundles you’ll never finish. Choose exactly what you want to learn.</p></article><article><span class="value-number">02</span><h3>Fair by design</h3><p>Teachers set their prices and keep the course earnings, minus a clear ₦100 fee.</p></article><article><span class="value-number">03</span><h3>Learn at your pace</h3><p>Buy once and return whenever you need a refresher.</p></article></div></div></section>');
  }
  function renderCourses() {
    var categories = ['All', 'Design', 'Development', 'Business'];
    setPage('Explore lessons', pageHead('The lesson library', 'Small lessons. <em>Big momentum.</em>', 'Practical skills, taught by people who use them every day.') + '<section class="section section--catalog"><div class="container"><div class="catalog-tools"><label class="search-box"><span aria-hidden="true">⌕</span><input id="course-search" type="search" placeholder="Search lessons, skills, teachers" value="' + escapeHtml(params.get('q') || '') + '"><kbd>↵</kbd></label><div class="filter-row" role="group" aria-label="Filter by category">' + categories.map(function (cat) { return '<button type="button" class="filter-chip' + (cat === (params.get('category') || 'All') ? ' is-active' : '') + '" data-category="' + cat + '">' + cat + '</button>'; }).join('') + '</div></div><p class="results-count" id="results-count"></p><div class="course-grid" id="course-results"></div></div></section>');
    updateCourseResults();
  }
  function updateCourseResults() {
    var results = document.getElementById('course-results');
    if (!results) return;
    var query = (document.getElementById('course-search').value || '').toLowerCase().trim();
    var category = document.querySelector('[data-category].is-active').getAttribute('data-category');
    var filtered = S.getCourses().filter(function (course) {
      var haystack = [course.title, course.description, course.category, teacherName(course)].join(' ').toLowerCase();
      return (category === 'All' || course.category === category) && (!query || haystack.indexOf(query) !== -1);
    });
    document.getElementById('results-count').textContent = filtered.length + (filtered.length === 1 ? ' lesson' : ' lessons');
    results.innerHTML = filtered.length ? filtered.map(courseCard).join('') : '<div class="empty-state"><span>⌕</span><h2>No lessons found</h2><p>Try another search or category.</p></div>';
    initReveal();
  }
  function renderCourse() {
    var course = getCourse(params.get('id'));
    var teacher = S.getUserById(course.teacherId);
    setPage(course.title, '<section class="section section--course-detail"><div class="container detail-layout"><div class="detail-main"><a class="back-link" href="courses.html">← All lessons</a><div class="detail-image"><img src="' + escapeHtml(Cards.imageFor(course)) + '" alt="" ><span>' + escapeHtml(course.category) + '</span></div><div class="detail-copy"><div class="course-card__meta">' + escapeHtml(course.level) + ' <span>·</span> ' + escapeHtml(course.duration) + ' <span>·</span> ' + course.lessons + ' lessons</div><h1>' + escapeHtml(course.title) + '</h1><p class="detail-description">' + escapeHtml(course.description) + '</p><div class="teacher-byline"><span class="avatar avatar--large">' + escapeHtml(Cards.initials(teacher ? teacher.name : 'Chigos')) + '</span><div><small>TAUGHT BY</small><strong>' + escapeHtml(teacherName(course)) + '</strong></div></div><div class="lesson-list"><h2>What you’ll learn</h2><ul><li>Follow a clear, practical step-by-step process</li><li>Build confidence with real-world examples</li><li>Leave with a skill you can put to work immediately</li></ul></div></div></div><aside class="purchase-panel"><div class="purchase-panel__price">' + formatNaira(course.price) + '<span>one-time payment</span></div><button class="btn btn--orange btn--wide btn--lg" type="button" data-buy="' + escapeHtml(course.id) + '">' + (Auth.current() && ownsCourse(Auth.current().id, course.id) ? 'Continue learning' : 'Get lifetime access') + ' <span aria-hidden="true">↗</span></button><p class="purchase-panel__fine">Secure access in demo mode · No subscription</p><div class="purchase-panel__rule"></div><p><span>◷</span> ' + escapeHtml(course.duration) + ' of focused video</p><p><span>↗</span> Learn on your own schedule</p><p><span>✓</span> Lifetime access after purchase</p></aside></div></section>');
  }
  function renderCheckout() {
    var course = getCourse(params.get('id'));
    var fee = Payments.platformFee;
    setPage('Checkout', pageHead('Checkout', 'One last step.', 'Review your lesson before continuing.') + '<section class="section"><div class="container checkout-layout"><article class="checkout-course"><img src="' + escapeHtml(Cards.imageFor(course)) + '" alt=""><div><span class="eyebrow">' + escapeHtml(course.category) + '</span><h2>' + escapeHtml(course.title) + '</h2><p>' + escapeHtml(teacherName(course)) + '</p></div></article><aside class="checkout-summary"><h2>Order summary</h2><div class="price-line"><span>Lesson</span><strong>' + formatNaira(course.price - fee) + '</strong></div><div class="price-line"><span>Platform fee</span><strong>' + formatNaira(fee) + '</strong></div><div class="price-line price-line--total"><span>Total</span><strong>' + formatNaira(course.price) + '</strong></div><button class="btn btn--orange btn--wide btn--lg" type="button" data-confirm-purchase="' + escapeHtml(course.id) + '">Complete demo purchase <span aria-hidden="true">↗</span></button><p class="demo-note">Demo only: this button records a purchase in this browser. No payment details are collected and no money moves.</p></aside></div></section>');
  }
  function renderWatch() {
    var course = getCourse(params.get('id'));
    var user = Auth.current();
    var hasAccess = user && (user.role === 'admin' || user.role === 'teacher' && user.id === course.teacherId || ownsCourse(user.id, course.id));
    if (!hasAccess) {
      setPage('Lesson access', '<section class="section"><div class="container empty-state empty-state--wide"><span>◎</span><h1>This lesson is waiting for you.</h1><p>Purchase this lesson to unlock it and keep lifetime access.</p><a class="btn btn--orange" href="course.html?id=' + encodeURIComponent(course.id) + '">View lesson <span aria-hidden="true">→</span></a></div></section>');
      return;
    }
    setPage('Now learning: ' + course.title, '<section class="watch-page"><div class="container"><div class="watch-top"><a class="back-link" href="student-dashboard.html">← My learning</a><span class="eyebrow">' + escapeHtml(teacherName(course)) + '</span></div><div class="watch-layout"><div class="video-frame video-frame--poster"><img src="' + escapeHtml(Cards.imageFor(course)) + '" alt=""><div class="video-frame__overlay"><span>YOUR LESSON</span><h2>' + escapeHtml(course.title) + '</h2><a class="btn btn--lime" href="' + escapeHtml(externalVideoUrl(course.videoUrl)) + '" target="_blank" rel="noopener">Open lesson video <span aria-hidden="true">↗</span></a></div></div><aside class="watch-info"><span class="eyebrow">' + escapeHtml(course.category) + '</span><h1>' + escapeHtml(course.title) + '</h1><p>' + escapeHtml(course.description) + '</p><div class="watch-progress"><span>YOUR PROGRESS</span><strong>Ready when you are</strong><div><i></i></div></div><p class="demo-note">Demo lesson: video opens from its source in a new tab. Secure in-page streaming requires a hosted video service.</p></aside></div></div></section>');
  }
  function renderSignup(role) {
    var teacher = role === 'teacher';
    setPage(teacher ? 'Teach on Chigos' : 'Join Chigos', '<section class="auth-page"><div class="auth-art auth-art--signup"><img src="assets/img/Teacher.jfif" alt="Teacher sharing knowledge"><div><span class="eyebrow eyebrow--light">' + (teacher ? 'For independent educators' : 'A fresh start') + '</span><p>' + (teacher ? 'Teach what you know.<br>Earn what you’re worth.' : 'Your next skill is<br>closer than you think.') + '</p></div></div><div class="auth-form-wrap"><form class="form-panel" data-form="signup" data-role="' + role + '"><span class="eyebrow">' + (teacher ? 'Teacher account' : 'Student account') + '</span><h1>' + (teacher ? 'Share your craft.' : 'Start learning.') + '</h1><p class="form-intro">' + (teacher ? 'Create your channel and share a lesson.' : 'Create an account to keep your lessons together.') + '</p><label>Your name<input type="text" name="name" autocomplete="name" required></label>' + (teacher ? '<label>Channel name<input type="text" name="channelName" placeholder="e.g. Ada Makes" required></label>' : '') + '<label>Email address<input type="email" name="email" autocomplete="email" required></label><label>Password<input type="password" name="password" minlength="6" autocomplete="new-password" required></label>' + (teacher ? '<p class="form-hint">Teacher registration is ₦2,000 in the real service. Demo mode skips payment.</p>' : '') + '<div class="form-error" role="alert" hidden></div><button class="btn btn--orange btn--wide btn--lg" type="submit">Create ' + (teacher ? 'teacher' : 'student') + ' account <span aria-hidden="true">↗</span></button><p class="form-switch">Already have an account? <a href="login.html">Sign in</a></p><p class="demo-note">This prototype stores account details in your browser only. Use a demo email, not sensitive information.</p></form></div></section>');
  }
  function renderStudentDashboard() {
    var user = Auth.current();
    if (!user || user.role !== 'student') return roleGate('student');
    var purchases = S.getPurchasesByStudent(user.id);
    var courses = purchases.map(function (item) { return S.getCourseById(item.courseId); }).filter(Boolean);
    setPage('My learning', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Your learning</span><h1>Keep going, ' + escapeHtml(user.name.split(' ')[0]) + '.</h1><p>Your lessons are right where you left them.</p></div><a class="btn btn--orange" href="courses.html">Find a new lesson <span aria-hidden="true">↗</span></a></div><div class="dash-stats"><div><span>Lessons owned</span><strong>' + courses.length + '</strong></div><div><span>Learning since</span><strong>' + new Date(user.createdAt).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }) + '</strong></div><div><span>Learning style</span><strong>At your pace</strong></div></div><div class="section-heading section-heading--compact"><div><span class="eyebrow">Your library</span><h2>Ready when you are.</h2></div></div><div class="course-grid">' + (courses.length ? courses.map(function (course) { return courseCard(course).replace(/course\.html\?id=/g, 'watch.html?id=').replace('View lesson', 'Watch now'); }).join('') : '<div class="empty-state"><span>◎</span><h2>Your library is ready for a first lesson.</h2><p>Find a practical skill and learn whenever it suits you.</p><a class="btn btn--orange" href="courses.html">Explore lessons</a></div>') + '</div></div></section>');
  }
  function roleGate(role) {
    var title = role === 'teacher' ? 'Your teaching space starts here.' : 'Sign in to open your learning space.';
    setPage('Sign in required', '<section class="section"><div class="container empty-state empty-state--wide"><span>↗</span><h1>' + title + '</h1><p>Sign in with the right account type to continue.</p><a class="btn btn--orange" href="login.html">Sign in</a></div></section>');
  }
  function teacherNav(activePage) {
    var links = [
      ['teacher-dashboard', 'Overview', 'teacher-dashboard.html'],
      ['teacher-videos', 'Lessons', 'teacher-videos.html'],
      ['teacher-upload', 'Create lesson', 'teacher-upload.html'],
      ['teacher-students', 'Students', 'teacher-students.html'],
      ['teacher-analytics', 'Analytics', 'teacher-analytics.html'],
      ['teacher-earnings', 'Earnings', 'teacher-earnings.html'],
      ['teacher-reviews', 'Reviews & Q&A', 'teacher-reviews.html'],
      ['teacher-settings', 'Channel settings', 'teacher-settings.html'],
      ['teacher-notifications', 'Notifications', 'teacher-notifications.html'],
      ['teacher-help', 'Help', 'teacher-help.html']
    ];
    return '<nav class="teacher-nav" aria-label="Teacher dashboard">' + links.map(function (item) {
      return '<a href="' + item[2] + '"' + (item[0] === activePage ? ' class="is-active" aria-current="page"' : '') + '>' + item[1] + '</a>';
    }).join('') + '</nav>';
  }
  function renderTeacherDashboard() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    var courses = S.getCourses().filter(function (course) { return course.teacherId === user.id; });
    var sales = S.getPurchases().filter(function (purchase) { return courses.some(function (course) { return course.id === purchase.courseId; }); });
    setPage('Teacher studio', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Good work, ' + escapeHtml(user.name.split(' ')[0]) + '.</h1><p>' + escapeHtml(user.channelName || user.name) + ' · Your teaching at a glance.</p></div><a class="btn btn--orange" href="teacher-upload.html">＋ Add a lesson</a></div>' + teacherNav('teacher-dashboard') + '<div class="dash-stats"><div><span>Published lessons</span><strong>' + courses.length + '</strong></div><div><span>Total sales</span><strong>' + sales.length + '</strong></div><div><span>Available balance</span><strong>' + formatNaira(user.balance) + '</strong></div></div><div class="dashboard-links"><a href="teacher-videos.html"><span>01</span><strong>Your lessons</strong><span>Manage published lessons →</span></a><a href="teacher-earnings.html"><span>02</span><strong>Earnings</strong><span>Review your sales →</span></a><a href="teacher-upload.html"><span>03</span><strong>Upload a lesson</strong><span>Share something useful →</span></a><a href="teacher-students.html"><span>04</span><strong>Students</strong><span>See course enrollments →</span></a><a href="teacher-analytics.html"><span>05</span><strong>Analytics</strong><span>Track lesson sales →</span></a><a href="teacher-settings.html"><span>06</span><strong>Channel settings</strong><span>Update your profile →</span></a></div><div class="section-heading section-heading--compact"><div><span class="eyebrow">Recently published</span><h2>Your lessons.</h2></div><a class="text-link" href="teacher-videos.html">See all →</a></div><div class="course-grid">' + (courses.length ? courses.slice(0, 3).map(courseCard).join('') : '<div class="empty-state"><h2>Your first lesson starts here.</h2><p>Share a focused, practical lesson with learners.</p><a class="btn btn--orange" href="teacher-upload.html">Create a lesson</a></div>') + '</div></div></section>');
  }
  function renderTeacherUpload() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    setPage('Publish a lesson', '<section class="dashboard-page"><div class="container form-page"><a class="back-link" href="teacher-dashboard.html">← Teacher studio</a><span class="eyebrow">Teacher studio</span><h1>Make a lesson.</h1><p class="page-head__sub">Keep it focused: one useful outcome, taught clearly.</p>' + teacherNav('teacher-upload') + '<form class="form-panel form-panel--wide" data-form="course"><label>Lesson title<input type="text" name="title" maxlength="80" required placeholder="What will your student learn?"></label><label>Short description<textarea name="description" rows="4" maxlength="240" required placeholder="Describe the practical outcome."></textarea></label><div class="form-row"><label>Category<select name="category"><option>Design</option><option>Development</option><option>Business</option><option>Writing</option><option>Photography</option></select></label><label>Level<select name="level"><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All levels</option></select></label></div><div class="form-row"><label>Price in naira<input type="number" name="price" min="200" step="100" value="2500" required></label><label>Duration<input type="text" name="duration" placeholder="e.g. 1h 20m" required></label></div><label>Lesson video URL<input type="url" name="videoUrl" placeholder="https://www.youtube.com/embed/..." required><small>Use an embeddable video URL. Uploads and access protection need a server in a live service.</small></label><div class="form-error" role="alert" hidden></div><button class="btn btn--orange btn--lg" type="submit">Publish lesson <span aria-hidden="true">↗</span></button><p class="demo-note">Demo: this lesson is saved in your browser and appears in the catalog immediately. Minimum lesson price: ₦200.</p></form></div></section>');
  }
  function renderTeacherVideos() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    var courses = S.getCourses().filter(function (course) { return course.teacherId === user.id; });
    setPage('Your lessons', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Your lessons.</h1><p>Published lessons and their current prices.</p></div><a class="btn btn--orange" href="teacher-upload.html">＋ Add a lesson</a></div>' + teacherNav('teacher-videos') + '<div class="table-wrap"><table class="table"><thead><tr><th>Lesson</th><th>Category</th><th>Price</th><th>Sales</th><th></th></tr></thead><tbody>' + (courses.map(function (course) { return '<tr><td><a class="table-link" href="course.html?id=' + encodeURIComponent(course.id) + '">' + escapeHtml(course.title) + '</a></td><td>' + escapeHtml(course.category) + '</td><td>' + formatNaira(course.price) + '</td><td>' + S.getPurchasesByCourse(course.id).length + '</td><td><button class="btn btn--small btn--text" type="button" data-delete-course="' + escapeHtml(course.id) + '">Remove</button></td></tr>'; }).join('') || '<tr><td colspan="5">No lessons published yet.</td></tr>') + '</tbody></table></div></div></section>');
  }
  function renderTeacherEarnings() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    var courses = S.getCourses().filter(function (course) { return course.teacherId === user.id; });
    var sales = S.getPurchases().filter(function (purchase) { return courses.some(function (course) { return course.id === purchase.courseId; }); });
    setPage('Earnings', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Your earnings.</h1><p>A clear view of every lesson sale.</p></div></div>' + teacherNav('teacher-earnings') + '<div class="earnings-total"><span>Available balance</span><strong>' + formatNaira(user.balance) + '</strong><p>Teacher earnings are added automatically in this browser demo.</p></div><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Lesson</th><th>Paid</th><th>Platform fee</th><th>You earned</th></tr></thead><tbody>' + (sales.slice().reverse().map(function (sale) { var course = S.getCourseById(sale.courseId); return '<tr><td>' + new Date(sale.date).toLocaleDateString('en-NG') + '</td><td>' + escapeHtml(course ? course.title : 'Removed lesson') + '</td><td>' + formatNaira(sale.amountPaid) + '</td><td>' + formatNaira(sale.platformFee) + '</td><td><strong>' + formatNaira(sale.teacherEarning) + '</strong></td></tr>'; }).join('') || '<tr><td colspan="5">No sales yet. Your next student could be one lesson away.</td></tr>') + '</tbody></table></div><p class="demo-note">Payouts are not available in this prototype. Balance and sales data are saved locally.</p></div></section>');
  }
  function getTeacherSales(userId) {
    var courses = S.getCourses().filter(function (course) { return course.teacherId === userId; });
    return {
      courses: courses,
      sales: S.getPurchases().filter(function (purchase) {
        return courses.some(function (course) { return course.id === purchase.courseId; });
      })
    };
  }
  function renderTeacherStudents() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    var data = getTeacherSales(user.id);
    var rows = data.sales.slice().reverse().map(function (sale) {
      var student = S.getUserById(sale.studentId);
      var course = S.getCourseById(sale.courseId);
      return '<tr><td>' + escapeHtml(student ? student.name : 'Student account') + '</td><td>' + escapeHtml(student ? student.email : 'Unavailable') + '</td><td>' + escapeHtml(course ? course.title : 'Removed lesson') + '</td><td>' + new Date(sale.date).toLocaleDateString('en-NG') + '</td></tr>';
    }).join('');
    setPage('Students', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Your students.</h1><p>Students who have purchased one of your lessons.</p></div></div>' + teacherNav('teacher-students') + '<div class="dash-stats"><div><span>Enrollments</span><strong>' + data.sales.length + '</strong></div><div><span>Lessons</span><strong>' + data.courses.length + '</strong></div></div><div class="table-wrap"><table class="table"><thead><tr><th>Student</th><th>Email</th><th>Lesson</th><th>Enrolled</th></tr></thead><tbody>' + (rows || '<tr><td colspan="4">No students yet. Enrollments will appear here after a lesson purchase.</td></tr>') + '</tbody></table></div><p class="demo-note">This prototype lists purchase enrollments; it does not yet provide student messaging.</p></div></section>');
  }
  function renderTeacherAnalytics() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    var data = getTeacherSales(user.id);
    var revenue = data.sales.reduce(function (total, sale) { return total + Number(sale.teacherEarning || 0); }, 0);
    var now = new Date();
    var months = [];
    for (var offset = 5; offset >= 0; offset--) {
      var monthDate = new Date(now.getFullYear(), now.getMonth() - offset, 1);
      var year = monthDate.getFullYear();
      var month = monthDate.getMonth();
      var monthSales = data.sales.filter(function (sale) {
        var date = new Date(sale.date);
        return date.getFullYear() === year && date.getMonth() === month;
      });
      months.push({ label: monthDate.toLocaleDateString('en-NG', { month: 'short', year: '2-digit' }), sales: monthSales.length,
        revenue: monthSales.reduce(function (total, sale) { return total + Number(sale.teacherEarning || 0); }, 0) });
    }
    var maxRevenue = Math.max.apply(null, months.map(function (month) { return month.revenue; }).concat([1]));
    var bars = months.map(function (month) {
      var width = Math.round(month.revenue / maxRevenue * 100);
      return '<div class="analytics-row"><span>' + escapeHtml(month.label) + '</span><div class="analytics-track"><i style="width:' + width + '%"></i></div><strong>' + formatNaira(month.revenue) + '</strong><small>' + month.sales + ' sales</small></div>';
    }).join('');
    var topCourse = data.courses.map(function (course) {
      return { title: course.title, sales: data.sales.filter(function (sale) { return sale.courseId === course.id; }).length };
    }).sort(function (a, b) { return b.sales - a.sales; })[0];
    setPage('Analytics', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Lesson analytics.</h1><p>Sales and earnings recorded in this browser demo.</p></div></div>' + teacherNav('teacher-analytics') + '<div class="dash-stats"><div><span>Total enrollments</span><strong>' + data.sales.length + '</strong></div><div><span>Lessons published</span><strong>' + data.courses.length + '</strong></div><div><span>Total teacher earnings</span><strong>' + formatNaira(revenue) + '</strong></div><div><span>Top lesson</span><strong>' + escapeHtml(topCourse ? topCourse.title : 'Not yet') + '</strong></div></div><section class="analytics-panel"><h2>Monthly earnings</h2>' + bars + '</section><p class="demo-note">Analytics are based on saved purchase records. Views, completion rates, and refunds are not tracked yet.</p></div></section>');
  }
  function renderTeacherReviews() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    setPage('Reviews & Q&A', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Reviews &amp; Q&amp;A.</h1><p>Keep up with learner feedback on your lessons.</p></div></div>' + teacherNav('teacher-reviews') + '<div class="empty-state empty-state--wide"><span>✳</span><h2>Feedback tools are not available yet.</h2><p>This prototype does not store course reviews or learner questions. When those features are added, feedback for your lessons will appear here.</p><a class="btn btn--orange" href="teacher-videos.html">View your lessons</a></div></div></section>');
  }
  function renderTeacherSettings() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    setPage('Channel settings', '<section class="dashboard-page"><div class="container form-page"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Channel settings.</h1><p>Update the name and contact details associated with your teacher account.</p></div></div>' + teacherNav('teacher-settings') + '<form class="form-panel form-panel--wide" data-form="teacher-settings"><label>Your name<input type="text" name="name" autocomplete="name" maxlength="100" required value="' + escapeHtml(user.name) + '"></label><label>Channel name<input type="text" name="channelName" maxlength="100" required value="' + escapeHtml(user.channelName || user.name) + '"></label><label>Email address<input type="email" name="email" autocomplete="email" required value="' + escapeHtml(user.email) + '"></label><div class="form-error" role="alert" hidden></div><button class="btn btn--orange btn--lg" type="submit">Save changes</button><p class="demo-note">Changes are stored in this browser only. Password changes and public profile images are not supported yet.</p></form></div></section>');
  }
  function renderTeacherNotifications() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    var data = getTeacherSales(user.id);
    var items = data.sales.slice().sort(function (a, b) { return new Date(b.date) - new Date(a.date); }).map(function (sale) {
      var student = S.getUserById(sale.studentId);
      var course = S.getCourseById(sale.courseId);
      return '<article class="notification-item"><span class="notification-mark" aria-hidden="true">↗</span><div><h2>New lesson sale</h2><p>' + escapeHtml(student ? student.name : 'A student') + ' purchased <strong>' + escapeHtml(course ? course.title : 'a lesson') + '</strong>. Your earnings: ' + formatNaira(sale.teacherEarning) + '.</p><time datetime="' + escapeHtml(sale.date) + '">' + new Date(sale.date).toLocaleString('en-NG') + '</time></div></article>';
    }).join('');
    setPage('Notifications', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Notifications.</h1><p>Recent purchase activity for your lessons.</p></div></div>' + teacherNav('teacher-notifications') + '<div class="notification-list">' + (items || '<div class="empty-state"><h2>You’re all caught up.</h2><p>New lesson purchases will appear here.</p></div>') + '</div></div></section>');
  }
  function renderTeacherHelp() {
    var user = Auth.current();
    if (!user || user.role !== 'teacher') return roleGate('teacher');
    setPage('Teacher help', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Teacher studio</span><h1>Help &amp; support.</h1><p>Quick answers for managing your teaching studio.</p></div></div>' + teacherNav('teacher-help') + '<div class="help-list"><article><h2>How do I publish a lesson?</h2><p>Choose “Create lesson,” add a title, description, category, price, duration, and embeddable video URL, then submit the form.</p><a class="text-link" href="teacher-upload.html">Create a lesson →</a></article><article><h2>Where can I see lesson sales?</h2><p>Your Earnings page lists purchase amounts, platform fees, and teacher earnings. The available balance is stored in this browser demo.</p><a class="text-link" href="teacher-earnings.html">View earnings →</a></article><article><h2>Can I receive payouts or contact students?</h2><p>Not in this prototype. Payout processing, student messaging, reviews, and support tickets need additional services and are not enabled.</p><a class="text-link" href="contact.html">Contact Chigos →</a></article></div></div></section>');
  }
  function renderAdmin() {
    var user = Auth.current();
    if (!user || user.role !== 'admin') return roleGate('admin');
    var users = S.getUsers();
    var courses = S.getCourses();
    var purchases = S.getPurchases();
    var teachers = users.filter(function (item) { return item.role === 'teacher'; });
    var students = users.filter(function (item) { return item.role === 'student'; });
    var feeTotal = purchases.reduce(function (total, item) { return total + Number(item.platformFee); }, 0);
    var registrationTotal = teachers.length * 2000;
    setPage('Admin overview', '<section class="dashboard-page"><div class="container"><div class="dash-heading"><div><span class="eyebrow">Platform administration</span><h1>Admin overview.</h1><p>Live totals from this browser’s demo data.</p></div></div><div class="dash-stats"><div><span>Teachers</span><strong>' + teachers.length + '</strong></div><div><span>Students</span><strong>' + students.length + '</strong></div><div><span>Lessons</span><strong>' + courses.length + '</strong></div><div><span>Platform fees</span><strong>' + formatNaira(feeTotal) + '</strong></div><div><span>Registration fees</span><strong>' + formatNaira(registrationTotal) + '</strong></div></div><div class="admin-section"><h2>Teachers</h2><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Channel</th><th>Email</th><th>Balance</th></tr></thead><tbody>' + (teachers.map(function (item) { return '<tr><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.channelName) + '</td><td>' + escapeHtml(item.email) + '</td><td>' + formatNaira(item.balance) + '</td></tr>'; }).join('') || '<tr><td colspan="4">No teachers yet.</td></tr>') + '</tbody></table></div></div><div class="admin-section"><h2>Students</h2><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Joined</th></tr></thead><tbody>' + (students.map(function (item) { return '<tr><td>' + escapeHtml(item.name) + '</td><td>' + escapeHtml(item.email) + '</td><td>' + new Date(item.createdAt).toLocaleDateString('en-NG') + '</td></tr>'; }).join('') || '<tr><td colspan="3">No students yet.</td></tr>') + '</tbody></table></div></div><div class="admin-section"><h2>Lessons</h2><div class="table-wrap"><table class="table"><thead><tr><th>Title</th><th>Teacher</th><th>Price</th><th>Sales</th><th></th></tr></thead><tbody>' + (courses.map(function (course) { return '<tr><td>' + escapeHtml(course.title) + '</td><td>' + escapeHtml(teacherName(course)) + '</td><td>' + formatNaira(course.price) + '</td><td>' + S.getPurchasesByCourse(course.id).length + '</td><td><button class="btn btn--small btn--text" type="button" data-delete-course="' + escapeHtml(course.id) + '">Remove</button></td></tr>'; }).join('') || '<tr><td colspan="5">No lessons published yet.</td></tr>') + '</tbody></table></div></div><div class="admin-section"><h2>Transactions</h2><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Student</th><th>Lesson</th><th>Paid</th><th>Fee</th><th>Teacher earned</th></tr></thead><tbody>' + (purchases.slice().reverse().map(function (sale) { var student = S.getUserById(sale.studentId); var course = S.getCourseById(sale.courseId); return '<tr><td>' + new Date(sale.date).toLocaleDateString('en-NG') + '</td><td>' + escapeHtml(student ? student.name : '—') + '</td><td>' + escapeHtml(course ? course.title : 'Removed lesson') + '</td><td>' + formatNaira(sale.amountPaid) + '</td><td>' + formatNaira(sale.platformFee) + '</td><td>' + formatNaira(sale.teacherEarning) + '</td></tr>'; }).join('') || '<tr><td colspan="6">No transactions yet.</td></tr>') + '</tbody></table></div></div><button class="btn btn--text" type="button" data-reset-demo>Reset demo data</button><p class="demo-note">Reset removes local accounts, lessons, and purchases and restores the sample content.</p></div></section>');
  }
  function renderAbout() {
    setPage('About', pageHead('About Chigos', 'A quieter kind of <em>learning marketplace.</em>', 'Useful lessons, fair prices, and a little more room to focus.') + '<section class="section"><div class="container about-layout"><div><span class="eyebrow">Our story</span><h2>Learning should work for everyone in the room.</h2></div><div><p>Nigerian teachers have been sharing lessons online for years. Students are surrounded by content, but it can be hard to find one useful lesson at a fair price. Chigos brings the two together: teachers set a price for a focused lesson, and students pay only for what they want to learn.</p><p>No subscriptions. No bundles you may never finish. Just clear prices and a simple way to share what you know.</p></div></div><div class="container about-values"><article><span>01</span><h3>Clarity</h3><p>Every lesson has one visible price. The platform fee is clear before checkout.</p></article><article><span>02</span><h3>Craft</h3><p>A quieter space that respects your attention and the work behind a good lesson.</p></article><article><span>03</span><h3>Fairness</h3><p>Teachers set their own prices and earn the course price minus a ₦100 fee.</p></article></div><div class="container demo-banner"><strong>Prototype, not a live marketplace.</strong><p>All data stays in this browser. Payments are simulated; secure payment processing, video hosting, and account protection require a backend.</p></div></section>');
  }
  function renderContact() {
    setPage('Contact', pageHead('Contact', 'Let’s talk.', 'Questions, feedback, or an idea for making Chigos better?') + '<section class="section"><div class="container contact-layout"><div class="contact-copy"><span class="eyebrow">We’re listening</span><h2>Good things start with a conversation.</h2><p>Send a note and we’ll keep it here in the demo. A live contact inbox needs a connected service.</p><a class="contact-email" href="mailto:hello@chigos.test">hello@chigos.test <span>↗</span></a></div><form class="form-panel form-panel--wide" data-form="contact"><label>Your name<input type="text" name="name" required></label><label>Email address<input type="email" name="email" required></label><label>Your message<textarea name="message" rows="5" required></textarea></label><div class="form-error" role="alert" hidden></div><button class="btn btn--orange" type="submit">Send message <span aria-hidden="true">↗</span></button><p class="demo-note">Demo mode: no message leaves your device.</p></form></div></section>');
  }
  function render404() {
    setPage('Not found', '<section class="not-found"><div class="container"><span class="not-found__number">404</span><span class="eyebrow">A little detour</span><h1>That lesson isn’t here.</h1><p>The link may be broken or the page may have moved. There are plenty of good things to learn from here.</p><a class="btn btn--orange btn--lg" href="index.html">Back to home <span aria-hidden="true">↗</span></a></div></section>');
  }
  function toast(message, kind) {
    var region = document.getElementById('toast-region');
    if (!region) return;
    region.innerHTML = '<div class="toast toast--' + (kind || 'success') + '" role="status">' + escapeHtml(message) + '</div>';
    window.setTimeout(function () { region.innerHTML = ''; }, 3500);
  }

  document.addEventListener('click', function (event) {
    var target = event.target.closest('button, a');
    if (!target) return;
    if (target.hasAttribute('data-menu-toggle')) {
      var nav = document.querySelector('.nav-links');
      var expanded = target.getAttribute('aria-expanded') === 'true';
      target.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    }
    if (target.hasAttribute('data-logout')) {
      Auth.logout();
      renderNav();
      toast('You have signed out.');
      if (/dashboard|teacher-|admin/.test(page)) window.location.href = 'index.html';
    }
    if (target.hasAttribute('data-category')) {
      document.querySelectorAll('[data-category]').forEach(function (button) { button.classList.toggle('is-active', button === target); });
      updateCourseResults();
    }
    if (target.hasAttribute('data-buy')) {
      var courseId = target.getAttribute('data-buy');
      var current = Auth.current();
      if (current && ownsCourse(current.id, courseId)) {
        window.location.href = 'watch.html?id=' + encodeURIComponent(courseId);
      } else if (!current || current.role !== 'student') {
        window.location.href = 'login.html';
      } else {
        window.location.href = 'checkout.html?id=' + encodeURIComponent(courseId);
      }
    }
    if (target.hasAttribute('data-confirm-purchase')) {
      try {
        var result = Payments.purchase(target.getAttribute('data-confirm-purchase'));
        window.location.href = 'watch.html?id=' + encodeURIComponent(result.course.id);
      } catch (error) { toast(error.message, 'error'); }
    }
    if (target.hasAttribute('data-delete-course')) {
      var course = S.getCourseById(target.getAttribute('data-delete-course'));
      if (course && window.confirm('Remove “' + course.title + '” from the catalog?')) {
        S.deleteCourse(course.id);
        toast('Lesson removed.');
        if (page === 'admin') renderAdmin(); else renderTeacherVideos();
      }
    }
    if (target.hasAttribute('data-reset-demo') && window.confirm('Reset all Chigos demo data in this browser?')) {
      S.reset();
      window.location.href = 'index.html';
    }
  });
  document.addEventListener('input', function (event) {
    if (event.target.id === 'course-search') updateCourseResults();
  });
  document.addEventListener('submit', function (event) {
    var form = event.target;
    var kind = form.getAttribute('data-form');
    if (!kind) return;
    event.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    var errorBox = form.querySelector('.form-error');
    if (errorBox) { errorBox.hidden = true; errorBox.textContent = ''; }
    try {
      if (kind === 'signup') {
        var role = form.getAttribute('data-role');
        Auth.register({ name: data.name, email: data.email, password: data.password, role: role, channelName: data.channelName });
        window.location.href = role === 'teacher' ? 'teacher-dashboard.html' : 'student-dashboard.html';
      } else if (kind === 'course') {
        var user = Auth.current();
        var course = {
          id: 'course-' + Date.now().toString(36),
          title: data.title.trim(), description: data.description.trim(), category: data.category,
          level: data.level, price: Number(data.price), duration: data.duration.trim(), lessons: 1,
          image: 'Laptop.jfif', videoUrl: data.videoUrl.trim(), featured: false,
          teacherId: user.id, createdAt: new Date().toISOString()
        };
        if (course.price < 200) throw new Error('Set a lesson price of at least ₦200.');
        S.setCourses(S.getCourses().concat(course));
        window.location.href = 'teacher-videos.html';
      } else if (kind === 'teacher-settings') {
        var currentUser = Auth.current();
        if (!currentUser || currentUser.role !== 'teacher') throw new Error('A teacher account is required to update these settings.');
        var updatedEmail = String(data.email || '').trim().toLowerCase();
        var existingUser = S.getUserByEmail(updatedEmail);
        if (existingUser && existingUser.id !== currentUser.id) throw new Error('That email address is already associated with another account.');
        currentUser.name = String(data.name || '').trim();
        currentUser.channelName = String(data.channelName || '').trim();
        currentUser.email = updatedEmail;
        S.setUsers(S.getUsers().map(function (item) { return item.id === currentUser.id ? currentUser : item; }));
        renderNav();
        toast('Channel settings saved.');
      } else if (kind === 'contact') {
        form.reset();
        toast('Message noted for this demo. Thanks for reaching out.');
      }
    } catch (error) {
      if (errorBox) { errorBox.textContent = error.message; errorBox.hidden = false; }
      else toast(error.message, 'error');
    }
  });

  renderNav();
  renderFooter();
  function renderBlankTeacherPage() {}
  var routes = {
    index: renderHome, '': renderHome, courses: renderCourses, course: renderCourse,
    checkout: renderCheckout, watch: renderWatch,
    'signup-student': function () { renderSignup('student'); },
    'signup-teacher': function () { renderSignup('teacher'); },
    'student-dashboard': renderStudentDashboard, 'teacher-dashboard': renderBlankTeacherPage,
    'teacher-upload': renderBlankTeacherPage, 'teacher-videos': renderBlankTeacherPage,
    'teacher-earnings': renderBlankTeacherPage, 'teacher-students': renderBlankTeacherPage,
    'teacher-analytics': renderBlankTeacherPage, 'teacher-reviews': renderBlankTeacherPage,
    'teacher-settings': renderBlankTeacherPage, 'teacher-notifications': renderBlankTeacherPage,
    'teacher-help': renderBlankTeacherPage, admin: renderAdmin,
    about: renderAbout, contact: renderContact, '404': render404
  };
  (routes[page] || render404)();
  window.App = { formatNaira: formatNaira, escapeHtml: escapeHtml, initReveal: initReveal, toast: toast };
}());
