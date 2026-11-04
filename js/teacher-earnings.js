(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobileToggle');

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

  const chartEl = document.getElementById('chart');
  const chartTotalEl = document.getElementById('chartTotal');
  const chartDeltaEl = document.getElementById('chartDelta');
  const chartDescription = document.querySelector('.chart-head p');

  const dataByRange = {
    '30d': {
      total: '₦142,300',
      delta: '+22.8%',
      description: 'Your earnings over the last 30 days',
      bars: [
        { label: 'Wk 1', value: 28000 },
        { label: 'Wk 2', value: 32400 },
        { label: 'Wk 3', value: 38600 },
        { label: 'Wk 4', value: 43300 }
      ]
    },
    '90d': {
      total: '₦386,800',
      delta: '+18.4%',
      description: 'Your earnings over the last 90 days',
      bars: [
        { label: 'Jan', value: 112000 },
        { label: 'Feb', value: 132500 },
        { label: 'Mar', value: 142300 }
      ]
    },
    '6m': {
      total: '₦846,400',
      delta: '+24.6%',
      description: 'Your monthly earnings over the last 6 months',
      bars: [
        { label: 'Oct', value: 102400 },
        { label: 'Nov', value: 118600 },
        { label: 'Dec', value: 138500 },
        { label: 'Jan', value: 112000 },
        { label: 'Feb', value: 132500 },
        { label: 'Mar', value: 142300 }
      ]
    },
    '1y': {
      total: '₦1,284,500',
      delta: '+31.2%',
      description: 'Your monthly earnings over the last year',
      bars: [
        { label: 'Apr', value: 62000 },
        { label: 'May', value: 78000 },
        { label: 'Jun', value: 94000 },
        { label: 'Jul', value: 88000 },
        { label: 'Aug', value: 112000 },
        { label: 'Sep', value: 106400 },
        { label: 'Oct', value: 102400 },
        { label: 'Nov', value: 118600 },
        { label: 'Dec', value: 138500 },
        { label: 'Jan', value: 112000 },
        { label: 'Feb', value: 132500 },
        { label: 'Mar', value: 142300 }
      ]
    }
  };

  function formatNaira(amount) {
    return '₦' + amount.toLocaleString('en-NG');
  }

  let currentRange = '6m';

  function renderChart(range) {
    const data = dataByRange[range];
    if (!data) return;

    currentRange = range;
    const maxValue = Math.max(...data.bars.map((bar) => bar.value));
    chartEl.replaceChildren();

    data.bars.forEach((bar, index) => {
      const barEl = document.createElement('div');
      barEl.className = 'chart-bar';

      const barDiv = document.createElement('div');
      barDiv.className = 'bar';
      barDiv.style.height = '0%';
      barDiv.dataset.value = formatNaira(bar.value);

      const labelEl = document.createElement('span');
      labelEl.className = 'bar-label';
      labelEl.textContent = bar.label;

      barEl.append(barDiv, labelEl);
      chartEl.appendChild(barEl);

      setTimeout(() => {
        barDiv.style.height = `${Math.max((bar.value / maxValue) * 100, 6)}%`;
      }, 60 + index * 50);
    });

    chartTotalEl.textContent = data.total;
    chartDeltaEl.textContent = data.delta;
    chartDescription.textContent = data.description;
  }

  document.querySelectorAll('.range-btn').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.range-btn').forEach((rangeButton) => {
        rangeButton.classList.remove('is-active');
        rangeButton.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
      renderChart(button.dataset.range);
    });
  });

  renderChart(currentRange);

  const modal = document.getElementById('withdrawModal');
  const withdrawBtn = document.getElementById('withdrawBtn');
  const instantBtn = document.getElementById('instantBtn');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  const withdrawInput = document.getElementById('withdrawAmount');
  const modalSub = modal.querySelector('.modal-sub');
  const availableBalance = 142300;
  const minimumWithdrawal = 1000;
  let returnFocusTo = null;

  function openModal(event) {
    returnFocusTo = event.currentTarget;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalSub.innerHTML = `Available: <strong>${formatNaira(availableBalance)}</strong>`;
    setTimeout(() => {
      withdrawInput.focus();
      withdrawInput.select();
    }, 100);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (returnFocusTo) returnFocusTo.focus();
  }

  withdrawBtn.addEventListener('click', openModal);
  instantBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalCancel.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  modalConfirm.addEventListener('click', () => {
    const amount = Number(withdrawInput.value);

    if (!Number.isInteger(amount) || amount < minimumWithdrawal) {
      alert(`Minimum withdrawal is ${formatNaira(minimumWithdrawal)}.`);
      withdrawInput.focus();
      return;
    }
    if (amount > availableBalance) {
      alert(`You can't withdraw more than ${formatNaira(availableBalance)}.`);
      withdrawInput.focus();
      return;
    }

    const originalText = modalConfirm.innerHTML;
    modalConfirm.disabled = true;
    modalConfirm.textContent = 'Processing…';

    setTimeout(() => {
      modalConfirm.disabled = false;
      modalConfirm.innerHTML = originalText;
      closeModal();
      alert(`Demo only: a withdrawal of ${formatNaira(amount)} would be initiated. No transfer has occurred.`);
    }, 1400);
  });

  document.getElementById('scheduleBtn').addEventListener('click', () => {
    alert('Payout scheduling is a demo and is not connected to a payout service yet.');
  });

  document.querySelectorAll('.panel-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Payout history is sample data; exporting or viewing more payouts is not available yet.');
    });
  });

  document.querySelector('.payout-method-change').addEventListener('click', () => {
    alert('Changing the payout method is not available in this demo.');
  });
})();
