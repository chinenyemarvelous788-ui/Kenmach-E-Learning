/* PRELOADER */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  let hidden = false;
  function hidePreloader() {
    if (hidden) return;
    hidden = true;
    preloader.classList.add('hidden');
    setTimeout(() => {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }, 800);
  }

  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 1400);
  });

  setTimeout(hidePreloader, 4000);
})();

/* NAVBAR */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

const glow = document.getElementById('navGlow');
navbar.addEventListener('mousemove', (e) => {
  const rect = navbar.getBoundingClientRect();
  glow.style.left = (e.clientX - rect.left) + 'px';
  glow.style.top  = (e.clientY - rect.top)  + 'px';
});

/* HEADLINE WORD SPLIT */
(function () {
  const headline = document.getElementById('headline');
  if (!headline) return;
  const nodes = Array.from(headline.childNodes);
  headline.innerHTML = '';
  let wordIndex = 0;
  const START_DELAY = 0.55;
  const STAGGER     = 0.09;
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/\s+/).filter(Boolean).forEach(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word + ' ';
        span.style.animationDelay = (START_DELAY + wordIndex * STAGGER) + 's';
        headline.appendChild(span);
        wordIndex++;
      });
    } else {
      const accentWords = node.textContent.trim().split(/\s+/).filter(Boolean);
      accentWords.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word hero-highlight';
        span.textContent = word + ' ';
        span.style.animationDelay = (START_DELAY + wordIndex * STAGGER) + 's';
        headline.appendChild(span);
        wordIndex++;
      });
    }
  });
})();

/* COUNT-UP STATS (hero) */
(function () {
  const counters = document.querySelectorAll('.hero-stat strong[data-count]');
  if (!counters.length) return;
  function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();
    function tick(now) {
      const t     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      el.textContent = value.toLocaleString('en-NG') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  setTimeout(() => counters.forEach(animateCount), 2200);
})();

/* PARALLAX */
(function () {
  const visual  = document.querySelector('.hero-visual');
  const frame   = document.querySelector('.hero-image-frame');
  const section = document.querySelector('.hero-section');
  if (!visual || !frame || !section) return;
  if (window.matchMedia('(hover: none)').matches) return;
  section.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    visual.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
    frame.style.transform  = `translate3d(${x * -6}px, ${y * -6}px, 0) rotate(${x * 1}deg)`;
  });
  section.addEventListener('mouseleave', () => {
    visual.style.transform = '';
    frame.style.transform  = '';
  });
})();

/* LEARNING PATHS */
const paths = [
  { title:'Become a Full-Stack Developer', tagline:'Master front-end, back-end, databases, and deployment in 6 months.', courses:12, hours:168, level:'Career Track', thumb:'hero-1', watermark:'</>', price:'₦180,000', oldPrice:'₦250,000', url:'courses.html?cat=web' },
  { title:'Become a UX/UI Designer', tagline:'Learn research, wireframing, prototyping, and design systems from scratch.', courses:9, hours:124, level:'Career Track', thumb:'hero-2', watermark:'UX', price:'₦150,000', oldPrice:null, url:'courses.html?cat=design' },
  { title:'Data Science & AI Specialist', tagline:'Python, statistics, machine learning, and deploying real AI models.', courses:11, hours:156, level:'Advanced', thumb:'hero-3', watermark:'AI', price:'₦220,000', oldPrice:'₦295,000', url:'courses.html?cat=data' },
  { title:'Digital Marketing Mastery', tagline:'SEO, paid ads, content, email, and analytics for modern startups.', courses:8, hours:92, level:'Beginner', thumb:'hero-4', watermark:'MKT', price:'₦120,000', oldPrice:null, url:'courses.html?cat=marketing' }
];

function buildPathCard(path) {
  const card = document.createElement('article');
  card.className = 'path-card';
  card.innerHTML = `
    <div class="path-hero ${path.thumb}">
      <span class="watermark">${path.watermark}</span>
      <div class="path-top-row"><span class="path-level">${path.level}</span></div>
      <div class="path-cert">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></svg>
        Certificate included
      </div>
    </div>
    <div class="path-body">
      <h3 class="path-title"><a href="${path.url}">${path.title}</a></h3>
      <p class="path-tagline">${path.tagline}</p>
      <div class="path-meta">
        <span class="meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>${path.courses} courses</span>
        <span class="meta-divider"></span>
        <span class="meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${path.hours} hrs</span>
      </div>
      <div class="path-footer">
        <div class="path-price">
          <span class="label">Full path</span>
          <span class="value">${path.price}${path.oldPrice ? `<span class="old">${path.oldPrice}</span>` : ''}</span>
        </div>
        <a href="${path.url}" class="path-cta" aria-label="Explore ${path.title} learning path">
          <span class="shimmer"></span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </div>`;

  const navigate = () => {
    window.location.href = path.url;
  };

  const cta = card.querySelector('.path-cta');
  if (cta) {
    cta.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate();
    });
  }

  card.addEventListener('click', () => {
    navigate();
  });

  return card;
}

function renderPaths() {
  const grid = document.getElementById('pathGrid');
  if (!grid) return;
  grid.innerHTML = '';
  paths.forEach((path, i) => {
    const card = buildPathCard(path);
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 80}ms`;
    grid.appendChild(card);
  });
}

/* WHY CHOOSE US */
const features = [
  { num:'01', title:'Learn at your own pace', desc:'No deadlines, no pressure. Watch lessons on your schedule, on any device — and pick up exactly where you left off.', link:'See how it works', url:'#how', icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` },
  { num:'02', title:'Taught by expert instructors', desc:'Every course is created by people who actually build, ship, and hire. Real-world lessons — not recycled textbook theory.', link:'Meet the instructors', url:'#instructors', icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { num:'03', title:'Build real projects', desc:'You learn by doing. Every path ships with portfolio-ready projects you can show employers or clients from day one.', link:'See sample projects', url:'courses.html', icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
  { num:'04', title:'Earn recognized certificates', desc:'Finish a path and get a verifiable certificate you can add to LinkedIn, your CV, and your portfolio in one click.', link:'View sample certificate', url:'student-certificates.html', icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></svg>` }
];

function buildFeatureCard(feature) {
  const card = document.createElement('article');
  card.className = 'feature-card';
  card.dataset.num = feature.num;
  card.innerHTML = `
    <div class="feature-icon">${feature.icon}</div>
    <h3 class="feature-title">${feature.title}</h3>
    <p class="feature-desc">${feature.desc}</p>
    <a class="feature-link" href="${feature.url}">
      ${feature.link}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>`;

  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    if (feature.url.startsWith('#')) {
      const target = document.querySelector(feature.url);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = feature.url;
    }
  });

  return card;
}

function renderFeatures() {
  const grid = document.getElementById('featureGrid');
  if (!grid) return;
  grid.innerHTML = '';
  features.forEach((feature, i) => {
    const card = buildFeatureCard(feature);
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 90}ms`;
    grid.appendChild(card);
  });
}

/* HOW IT WORKS */
(function () {
  const steps = document.querySelectorAll('.step');
  if (!steps.length) return;
  steps.forEach((step, i) => {
    step.classList.add('reveal');
    step.style.transitionDelay = `${i * 120}ms`;
  });
})();

/* TEACHER PRICING */
(function () {
  const PLATFORM_FEE = 100;
  const chips       = document.querySelectorAll('.chip');
  const saleValueEl = document.getElementById('saleValue');
  const youKeepEl   = document.getElementById('youKeep');
  const barPlatform = document.getElementById('barPlatform');
  const barYou      = document.getElementById('barYou');
  if (!chips.length) return;
  function formatNaira(n) { return '₦' + n.toLocaleString('en-NG'); }
  function animateNumber(el, from, to, duration = 600) {
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);
      el.textContent = formatNaira(value);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  let currentPrice = 5000;
  function updateMoney(newPrice) {
    const previousPrice = currentPrice;
    currentPrice = newPrice;
    const youKeep = newPrice - PLATFORM_FEE;
    const platformPct = (PLATFORM_FEE / newPrice) * 100;
    chips.forEach(c => {
      c.classList.toggle('active', Number(c.dataset.price) === newPrice);
    });
    animateNumber(saleValueEl, previousPrice, newPrice, 550);
    saleValueEl.classList.remove('bump');
    void saleValueEl.offsetWidth;
    saleValueEl.classList.add('bump');
    animateNumber(youKeepEl, previousPrice - PLATFORM_FEE, youKeep, 550);
    const platformWidth = Math.max(platformPct, 2.5);
    barPlatform.style.width = platformWidth + '%';
    barYou.style.width      = (100 - platformWidth) + '%';
    barYou.querySelector('span').textContent = formatNaira(youKeep);
  }
  chips.forEach(chip => {
    chip.addEventListener('click', () => updateMoney(Number(chip.dataset.price)));
  });
  window.addEventListener('load', () => setTimeout(() => updateMoney(5000), 700));
})();

/* INSTRUCTOR SPOTLIGHT */
const instructors = [
  { photo:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&auto=format&q=80', name:'Adaeze Okafor', role:'Senior Engineer · Ex-Paystack', credentials:[{icon:'code',label:'Full-Stack'},{icon:'brief',label:'10 yrs'}], bio:'Led payments infrastructure at Paystack. Now teaching the exact skills she hires for.', courses:8, rating:4.9 },
  { photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80', name:'Tunde Martins', role:'Design Lead · Ex-Flutterwave', credentials:[{icon:'pen',label:'Product Design'},{icon:'brief',label:'8 yrs'}], bio:'Built design systems used by 2M+ users. Teaches craft that scales with the product.', courses:6, rating:4.8 },
  { photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces&auto=format&q=80', name:'Ngozi Kalu', role:'Data Scientist · Ex-Google', credentials:[{icon:'chart',label:'ML & AI'},{icon:'brief',label:'12 yrs'}], bio:'Shipped ML models at Google and two startups. Makes complex data feel simple.', courses:7, rating:4.9 },
  { photo:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces&auto=format&q=80', name:'Efe Kalu', role:'Growth Lead · 3x Founder', credentials:[{icon:'rocket',label:'Marketing'},{icon:'brief',label:'9 yrs'}], bio:'Grew three startups from zero to seven figures. Teaches growth that actually converts.', courses:5, rating:4.8 }
];

const icons = {
  code: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  pen: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>`,
  chart: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
  rocket: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
  brief: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  star: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z"/></svg>`,
  book: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  badge: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/></svg>`,
  trophy: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
  money: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  miniCheck: `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

function buildInstructorCard(inst) {
  const card = document.createElement('article');
  card.className = 'instructor';
  const credsHTML = inst.credentials.map(c => `<span class="credential">${icons[c.icon] || ''}${c.label}</span>`).join('');
  card.innerHTML = `
    <div class="top-star">${icons.badge}</div>
    <div class="avatar-wrap">
      <div class="avatar"><img src="${inst.photo}" alt="${inst.name}" loading="lazy"></div>
      <div class="verified-badge">${icons.check}</div>
    </div>
    <h3 class="instructor-name">${inst.name}</h3>
    <p class="instructor-role">${inst.role}</p>
    <div class="credentials">${credsHTML}</div>
    <div class="bio-wrap"><div class="bio-inner"><p class="instructor-bio">${inst.bio}</p></div></div>
    <div class="instructor-foot">
      <span class="stat">${icons.book}${inst.courses} courses</span>
      <span class="divider-dot"></span>
      <span class="stat">${icons.star}${inst.rating}</span>
    </div>`;
  return card;
}

function renderInstructors() {
  const grid = document.getElementById('instructorGrid');
  if (!grid) return;
  grid.innerHTML = '';
  instructors.forEach((inst, i) => {
    const card = buildInstructorCard(inst);
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 90}ms`;
    grid.appendChild(card);
  });
}

/* STUDENT & TEACHER SUCCESS */
let scrollAnimationObserver;

const testimonials = [
  { type:'student', outcome:'Hired at Google', initials:'AO', avatar:'avatar-1', name:'Adaeze Okafor', role:'Software Engineer · Google', verified:true, quote:'I went from zero coding experience to a full-time offer in 7 months. The <span class="highlight">real projects</span> were the difference — recruiters actually cared about what I built.', rating:5 },
  { type:'teacher', outcome:'Earned ₦4.2M on Chigos', initials:'CN', avatar:'avatar-t1', name:'Chidi Nwosu', role:'Instructor · Free Fire Pro Coach', verified:true, quote:'I opened my channel for ₦2,000 and started selling my Free Fire coaching course. Within 8 months I\'d earned <span class="highlight">over ₦4 million</span> — more than my old job paid in a year.', rating:5, earnings:'₦4,200,000' },
  { type:'student', outcome:'Landed my first client', initials:'TM', avatar:'avatar-2', name:'Tunde Martins', role:'Freelance Designer', verified:true, quote:'The design path gave me a portfolio I was proud to show. Within 3 weeks of finishing, I signed my <span class="highlight">first ₦250k client</span> — something I\'d been trying to do for a year.', rating:5 },
  { type:'teacher', outcome:'Earned ₦1.8M on Chigos', initials:'SB', avatar:'avatar-t2', name:'Sarah Bello', role:'Instructor · Product Management', verified:true, quote:'I was a PM with 6 years of experience. I packaged what I knew into a course, opened a channel, and now earn <span class="highlight">₦300k+ every month</span> from sales — without leaving my day job.', rating:5, earnings:'₦1,800,000' },
  { type:'student', outcome:'Promoted to Data Lead', initials:'NK', avatar:'avatar-3', name:'Ngozi Kalu', role:'Data Lead · Flutterwave', verified:true, quote:'I was a junior analyst stuck in a dead-end role. The ML & AI path changed how I think. Six months later I was <span class="highlight">leading the team</span> I used to sit in.', rating:5 },
  { type:'teacher', outcome:'Earned ₦12M on Chigos', initials:'JA', avatar:'avatar-t3', name:'Jide Adeyemi', role:'Instructor · Full-Stack Development', verified:true, quote:'I was skeptical about a flat ₦100 platform fee, but it means I keep almost everything. My Full-Stack course earns <span class="highlight">millions every month</span> — 4,900 students and counting.', rating:5, earnings:'₦12,400,000' }
];

function buildTestimonial(t) {
  const card = document.createElement('article');
  card.className = 'testimonial' + (t.type === 'teacher' ? ' is-teacher' : '');
  card.dataset.type = t.type;
  const starsHTML = Array(t.rating).fill(icons.star).join('');
  const verifiedHTML = t.verified ? `<span class="verified-mini">${icons.miniCheck}</span>` : '';
  const badgeIcon = t.type === 'teacher' ? icons.money : icons.trophy;
  const earningsHTML = t.earnings
    ? `<div class="earnings"><span class="earnings-label">Total earned</span><span class="earnings-value">${t.earnings}</span></div>`
    : '';
  card.innerHTML = `
    <span class="quote-mark">"</span>
    <span class="outcome">${badgeIcon}${t.outcome}</span>
    ${earningsHTML}
    <div class="stars">${starsHTML}</div>
    <p class="quote">"${t.quote}"</p>
    <div class="author">
      <div class="author-avatar ${t.avatar}">${t.initials}</div>
      <div class="author-info">
        <div class="author-name">${t.name}${verifiedHTML}</div>
        <div class="author-role">${t.role}</div>
      </div>
    </div>`;
  return card;
}

function renderTestimonials(filter = 'all') {
  const grid = document.getElementById('testimonialGrid');
  if (!grid) return;
  if (scrollAnimationObserver) {
    grid.querySelectorAll('.testimonial').forEach(card => scrollAnimationObserver.unobserve(card));
  }
  grid.innerHTML = '';
  const list = filter === 'all' ? testimonials : testimonials.filter(t => t.type === filter);
  list.forEach((t, i) => {
    const card = buildTestimonial(t);
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 80}ms`;
    grid.appendChild(card);
    if (scrollAnimationObserver) {
      scrollAnimationObserver.observe(card);
      requestAnimationFrame(() => card.classList.add('is-visible'));
    }
  });
}

function initTestimonialFilters() {
  const tabs = document.querySelectorAll('.success-section .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTestimonials(tab.dataset.filter);
    });
  });
}

function initSuccessCounters() {
  const strip = document.querySelector('.success-stats-strip');
  if (!strip) return;
  const counters = strip.querySelectorAll('strong[data-count]');
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      let display;
      if (decimals > 0) display = value.toFixed(decimals);
      else display = Math.round(value).toLocaleString('en-NG');
      el.textContent = display + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(animateCount);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(strip);
}

/* LANGUAGE SWITCHER */
(function () {
  const switcher = document.getElementById('langSwitcher');
  const btn      = document.getElementById('langBtn');
  const flagEl   = document.getElementById('currentFlag');
  const labelEl  = document.getElementById('currentLang');
  if (!switcher || !btn) return;
  const options = switcher.querySelectorAll('.lang-menu button');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = switcher.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const flag  = opt.dataset.flag;
      const label = opt.dataset.label;
      flagEl.textContent  = flag;
      labelEl.textContent = label;
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      switcher.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      console.log(`Language switched to: ${label}`);
    });
  });
})();

function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.brand-trust, .featured-section, .paths-section, .why-section, .hiw-section, .teacher-section, .inst-section, .success-section, .path-card, .feature-card, .step, .instructor, .testimonial'
  );

  if (!targets.length) return;

  scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollAnimationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -5% 0px'
  });

  targets.forEach((target) => {
    target.classList.add('reveal');
    if (!target.style.transitionDelay) {
      target.style.transitionDelay = '0ms';
    }
    scrollAnimationObserver.observe(target);
  });
}

function initScrollToTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle('is-visible', window.scrollY > 420);
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const searchToggle = document.getElementById('searchToggle');
  const searchInput = document.querySelector('#navSearch input');
  if (!toggle || !searchToggle || !navbar) return;

  const closeMenu = () => {
    navbar.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  const closeSearch = () => {
    navbar.classList.remove('search-open');
    searchToggle.setAttribute('aria-expanded', 'false');
    searchToggle.setAttribute('aria-label', 'Open course search');
  };

  toggle.addEventListener('click', () => {
    closeSearch();
    const isOpen = navbar.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  searchToggle.addEventListener('click', () => {
    closeMenu();
    const isOpen = navbar.classList.toggle('search-open');
    searchToggle.setAttribute('aria-expanded', String(isOpen));
    searchToggle.setAttribute('aria-label', isOpen ? 'Close course search' : 'Open course search');
    if (isOpen) searchInput?.focus();
  });

  navbar.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target)) {
      closeMenu();
      closeSearch();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      closeSearch();
    }
  });

  window.matchMedia('(min-width: 821px)').addEventListener('change', closeMenu);
  window.matchMedia('(min-width: 1241px)').addEventListener('change', closeSearch);
}

/* INIT */

/* SEARCH AUTOCOMPLETE & LIVE DROPDOWN */
function setupSearchAutocomplete(opts) {
  const { input, form, dropdown } = opts;
  if (!input || !form || !dropdown) return;

  let activeIndex = -1;
  let debounceTimer = null;

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
  }

  function openDropdown() {
    dropdown.removeAttribute('hidden');
    input.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    dropdown.setAttribute('hidden', '');
    input.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
  }

  function renderSuggestions(query) {
    const q = (query || '').trim();
    const catalog = window.CHIGOS_CATALOG;

    if (!q) {
      dropdown.innerHTML = `
        <div class="search-sec-head">Popular searches</div>
        <div class="search-pills">
          <a href="courses.html?q=Web+Development" class="search-pill">&#9889; Web Development</a>
          <a href="courses.html?q=UI+%2F+UX+Design" class="search-pill">&#127912; UI / UX Design</a>
          <a href="courses.html?q=Python" class="search-pill">&#129302; Python &amp; AI</a>
          <a href="courses.html?q=Marketing" class="search-pill">&#128200; Marketing</a>
          <a href="courses.html?q=Cybersecurity" class="search-pill">&#128737; Cybersecurity</a>
          <a href="courses.html?q=Business" class="search-pill">&#128188; Business</a>
          <a href="courses.html?q=Finance" class="search-pill">&#128176; Finance</a>
        </div>
      `;
      openDropdown();
      return;
    }

    if (!catalog) {
      dropdown.innerHTML = `
        <a href="courses.html?q=${encodeURIComponent(q)}" class="search-view-all">
          Search all courses for "${escapeHtml(q)}" &rarr;
        </a>
      `;
      openDropdown();
      return;
    }

    const res = catalog.search(q, 4);

    if (res.courses.length === 0 && res.categories.length === 0) {
      dropdown.innerHTML = `
        <div class="search-empty">
          <span>No exact courses found matching "<strong>${escapeHtml(q)}</strong>"</span>
          <small>Search the entire catalog of 340+ courses:</small>
        </div>
        <a href="courses.html?q=${encodeURIComponent(q)}" class="search-view-all">
          Search all courses for "${escapeHtml(q)}" &rarr;
        </a>
      `;
      openDropdown();
      return;
    }

    let html = '';

    if (res.categories.length > 0) {
      html += `<div class="search-sec-head">Categories</div>`;
      res.categories.forEach(cat => {
        html += `
          <a href="courses.html?cat=${encodeURIComponent(cat.id)}" class="search-category-item" role="option">
            <span>Browse <strong>${escapeHtml(cat.name)}</strong> courses</span>
            <span>&#8599;</span>
          </a>
        `;
      });
    }

    if (res.courses.length > 0) {
      html += `<div class="search-sec-head">Courses (${res.totalCount})</div>`;
      res.courses.forEach(c => {
        html += `
          <a href="course.html?id=${c.id}" class="search-item" role="option">
            <div class="search-item-badge">${escapeHtml(c.watermark || 'JS')}</div>
            <div class="search-item-info">
              <span class="search-item-title">${highlightMatch(c.title, q)}</span>
              <span class="search-item-meta">
                <span>${escapeHtml(c.category)}</span>
                <span>&middot;</span>
                <span>${escapeHtml(c.instructor)}</span>
                <span>&middot;</span>
                <span>&#9733; ${c.rating}</span>
              </span>
            </div>
            <div class="search-item-price ${c.price === 0 ? 'free' : ''}">
              ${catalog.formatNaira(c.price)}
            </div>
          </a>
        `;
      });
    }

    html += `
      <a href="courses.html?q=${encodeURIComponent(q)}" class="search-view-all" role="option">
        <span>View all ${res.totalCount} results for "${escapeHtml(q)}" in Courses</span>
        <span>&rarr;</span>
      </a>
    `;

    dropdown.innerHTML = html;
    openDropdown();
  }

  input.addEventListener('focus', () => {
    renderSuggestions(input.value);
  });

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      renderSuggestions(input.value);
    }, 120);
  });

  input.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('.search-item, .search-category-item, .search-view-all, .search-pill');
    if (!items.length || dropdown.hasAttribute('hidden')) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < items.length) {
        e.preventDefault();
        items[activeIndex].click();
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });

  function updateActiveItem(items) {
    items.forEach((item, idx) => {
      item.classList.toggle('is-selected', idx === activeIndex);
      if (idx === activeIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) {
      window.location.href = `courses.html?q=${encodeURIComponent(q)}`;
    } else {
      window.location.href = 'courses.html';
    }
  });

  document.addEventListener('click', (e) => {
    if (!form.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });
}

function initSearchAutocomplete() {
  const heroInput = document.getElementById('heroSearchInput');
  const heroForm = document.getElementById('heroSearchForm');
  const heroDropdown = document.getElementById('heroSearchDropdown');
  if (heroInput && heroForm && heroDropdown) {
    setupSearchAutocomplete({ input: heroInput, form: heroForm, dropdown: heroDropdown });
  }

  const navInput = document.getElementById('navSearchInput');
  const navForm = document.getElementById('navSearchForm');
  const navDropdown = document.getElementById('navSearchDropdown');
  if (navInput && navForm && navDropdown) {
    setupSearchAutocomplete({ input: navInput, form: navForm, dropdown: navDropdown });
  }
}

function initCourseCards() {
  document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Allow links and buttons inside the card to trigger normally
      if (e.target.closest('a') || e.target.closest('button')) return;
      const titleLink = card.querySelector('.card-title a') || card.querySelector('a.overlay-btn');
      if (titleLink && titleLink.href) {
        window.location.href = titleLink.href;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSearchAutocomplete();
  initCourseCards();
  renderPaths();
  renderFeatures();
  renderInstructors();
  renderTestimonials('all');
  initScrollAnimations();
  initScrollToTop();
  initMobileNav();
  initTestimonialFilters();
  initSuccessCounters();
});