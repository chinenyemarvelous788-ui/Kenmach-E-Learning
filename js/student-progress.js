/* ============================================================
   CHIGOS · STUDENT PORTAL — PROGRESS
   ============================================================ */
(function () {
  'use strict';

  function toast(message, type) {
    var notification = document.createElement('div');
    notification.className = 'toast toast--' + (type || 'success');
    notification.setAttribute('role', 'status');
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(function () {
      notification.classList.add('show');
    });

    setTimeout(function () {
      notification.classList.remove('show');
      setTimeout(function () {
        notification.remove();
      }, 300);
    }, 2400);
  }

  var data = {
    week: {
      bars: [
        { label: 'Mon', value: 45 },
        { label: 'Tue', value: 30 },
        { label: 'Wed', value: 60 },
        { label: 'Thu', value: 20 },
        { label: 'Fri', value: 75 },
        { label: 'Sat', value: 90 },
        { label: 'Sun', value: 40, today: true }
      ],
      total: '6h 0m',
      average: '51<span class="unit">min</span>',
      goal: '4h 20m / 5h',
      goalPercent: 86
    },
    month: {
      bars: [
        { label: 'W1', value: 240 },
        { label: 'W2', value: 310 },
        { label: 'W3', value: 280 },
        { label: 'W4', value: 340, today: true }
      ],
      total: '19h 30m',
      average: '4h 52m<span class="unit">/wk</span>',
      goal: '15h 20m / 20h',
      goalPercent: 77
    },
    year: {
      bars: [
        { label: 'Jan', value: 180 },
        { label: 'Feb', value: 240 },
        { label: 'Mar', value: 320 },
        { label: 'Apr', value: 280 },
        { label: 'May', value: 350 },
        { label: 'Jun', value: 410 },
        { label: 'Jul', value: 380 },
        { label: 'Aug', value: 320 },
        { label: 'Sep', value: 290 },
        { label: 'Oct', value: 340 },
        { label: 'Nov', value: 360 },
        { label: 'Dec', value: 420, today: true }
      ],
      total: '64h 50m',
      average: '5h 24m<span class="unit">/mo</span>',
      goal: '60h / 75h',
      goalPercent: 80
    }
  };

  var chartBars = document.getElementById('chartBars');
  var chartTotal = document.getElementById('chartTotal');
  var chartAverage = document.getElementById('chartAvg');
  var chartGoalText = document.getElementById('chartGoalText');
  var chartGoalFill = document.getElementById('chartGoalFill');
  var rangeTabs = document.getElementById('rangeTabs');

  function renderChart(range) {
    var chart = data[range];
    if (!chart) return;

    var maxValue = Math.max.apply(null, chart.bars.map(function (bar) {
      return bar.value;
    }));

    chartBars.innerHTML = chart.bars.map(function (bar) {
      var classes = 'day-bar';
      if (bar.today) classes += ' today';
      if (bar.value === 0) classes += ' empty';

      return '<div class="chart-day">' +
        '<div class="day-bar-wrap">' +
          '<div class="' + classes + '" data-value="' + bar.value + ' min"></div>' +
        '</div>' +
        '<span class="day-label' + (bar.today ? ' today' : '') + '">' + bar.label + '</span>' +
      '</div>';
    }).join('');

    requestAnimationFrame(function () {
      chartBars.querySelectorAll('.day-bar').forEach(function (barElement, index) {
        var barValue = chart.bars[index].value;
        var percentage = Math.max((barValue / maxValue) * 100, 4);
        setTimeout(function () {
          barElement.style.height = percentage + '%';
        }, index * 40);
      });
    });

    chartTotal.textContent = chart.total;
    chartAverage.innerHTML = chart.average;
    chartGoalText.textContent = chart.goal;
    chartGoalFill.style.width = chart.goalPercent + '%';
  }

  rangeTabs.addEventListener('click', function (event) {
    var tab = event.target.closest('.range-tab');
    if (!tab) return;

    rangeTabs.querySelectorAll('.range-tab').forEach(function (rangeTab) {
      rangeTab.classList.remove('active');
      rangeTab.setAttribute('aria-pressed', 'false');
    });

    tab.classList.add('active');
    tab.setAttribute('aria-pressed', 'true');
    renderChart(tab.getAttribute('data-range'));
  });

  renderChart('week');

  document.getElementById('exportBtn').addEventListener('click', function () {
    var selectedRange = rangeTabs.querySelector('.range-tab.active').getAttribute('data-range');
    var chart = data[selectedRange];
    var rows = [
      ['Learning progress report', ''],
      ['Activity range', selectedRange],
      ['Total learning time', chart.total],
      ['Average learning time', chart.average.replace(/<[^>]*>/g, '')],
      ['Learning goal', chart.goal],
      ['Goal completion', chart.goalPercent + '%'],
      ['', ''],
      ['Learning activity', 'Minutes'],
      chart.bars.map(function (bar) { return [bar.label, bar.value]; })
    ];
    var csv = rows.map(function (row) {
      return row.map(function (value) {
        return '"' + String(value).replace(/"/g, '""') + '"';
      }).join(',');
    }).join('\r\n');
    var report = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(report);
    var download = document.createElement('a');
    download.href = url;
    download.download = 'chigos-learning-progress-' + selectedRange + '.csv';
    document.body.appendChild(download);
    download.click();
    download.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    toast('Progress report downloaded');
  });
}());
