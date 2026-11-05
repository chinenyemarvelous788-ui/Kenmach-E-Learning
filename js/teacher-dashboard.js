(function () {
  'use strict';

  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);
  let previousBodyOverflow = '';

  function closeDrawer() {
    sidebar.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = previousBodyOverflow;
  }

  function openDrawer() {
    if (window.innerWidth > 900) return;
    previousBodyOverflow = document.body.style.overflow;
    sidebar.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
      closeDrawer();
      toggle.focus();
      return;
    }
  });

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  sidebar.querySelectorAll('.nav-item').forEach((navItem) => {
    navItem.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeDrawer();
    });
  });

  document.addEventListener('click', (e) => {
    if (
      window.innerWidth <= 900 &&
      sidebar.classList.contains('is-open') &&
      !sidebar.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && sidebar.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  const chartEl = document.getElementById('chart');
  const chartTotalEl = document.getElementById('chartTotal');

  const DATA = {
    '7d': {
      total: '₦84,500',
      bars: [
        { label: 'Mon', value: 6000 },
        { label: 'Tue', value: 9800 },
        { label: 'Wed', value: 12400 },
        { label: 'Thu', value: 8200 },
        { label: 'Fri', value: 15200 },
        { label: 'Sat', value: 18600 },
        { label: 'Sun', value: 14300 }
      ]
    },
    '30d': {
      total: '₦342,800',
      bars: [
        { label: 'W1', value: 62000 },
        { label: 'W2', value: 84000 },
        { label: 'W3', value: 98000 },
        { label: 'W4', value: 98800 }
      ]
    },
    '90d': {
      total: '₦1,024,500',
      bars: [
        { label: 'Jan', value: 280000 },
        { label: 'Feb', value: 342000 },
        { label: 'Mar', value: 402500 }
      ]
    }
  };

  function formatNaira(n) {
    return '₦' + n.toLocaleString('en-NG');
  }

  let currentRange = '7d';

  function renderChart(range) {
    currentRange = range;
    const data = DATA[range];
    const maxVal = Math.max(...data.bars.map(b => b.value));

    chartEl.innerHTML = '';
    data.bars.forEach((bar, i) => {
      const barEl = document.createElement('div');
      barEl.className = 'chart-bar';

      const height = Math.max((bar.value / maxVal) * 100, 6);
      const barDiv = document.createElement('div');
      barDiv.className = 'bar';
      barDiv.style.height = '0%';
      barDiv.dataset.value = formatNaira(bar.value);

      const labelEl = document.createElement('span');
      labelEl.className = 'bar-label';
      labelEl.textContent = bar.label;

      barEl.appendChild(barDiv);
      barEl.appendChild(labelEl);
      chartEl.appendChild(barEl);

      setTimeout(() => {
        barDiv.style.height = height + '%';
      }, 60 + i * 60);
    });

    chartTotalEl.textContent = data.total;
  }

  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderChart(btn.dataset.range);
    });
  });

  renderChart('7d');

  // Sync teacher name if saved in localStorage
  try {
    const savedName = localStorage.getItem('chigos_teacher_name');
    if (savedName) {
      const accent = document.querySelector('.topbar-copy h1 .accent');
      if (accent) accent.textContent = savedName.split(' ')[0];

      const strongName = document.querySelector('.user-meta strong');
      if (strongName) strongName.textContent = savedName;

      const avatar = document.querySelector('.user-pill .user-avatar');
      if (avatar) {
        const parts = savedName.trim().split(/\s+/);
        avatar.textContent = parts.length > 1
          ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
          : parts[0].slice(0, 2).toUpperCase();
      }
    }
  } catch(e) {}

})();
