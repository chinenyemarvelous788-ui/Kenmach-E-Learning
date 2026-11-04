/* ============================================================
   CHIGOS · STUDENT PORTAL — PURCHASE HISTORY
   ============================================================ */
(function () {
  'use strict';

  var rows = Array.prototype.slice.call(document.querySelectorAll('.txn-row'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.txn-group'));
  var filterTabs = document.getElementById('filterTabs');
  var searchInput = document.getElementById('searchInput');
  var emptyState = document.getElementById('emptyState');
  var transactions = document.getElementById('transactions');
  var receiptModal = document.getElementById('receiptModal');
  var modalClose = document.getElementById('modalClose');
  var currentFilter = 'all';
  var currentQuery = '';
  var previouslyFocusedElement = null;
  var toastTimer;

  function formatPrice(amount) {
    return '₦' + amount.toLocaleString('en-NG');
  }

  function toast(message) {
    var region = document.getElementById('toastRegion');
    var notice = document.createElement('div');
    notice.className = 'toast';
    notice.setAttribute('role', 'status');
    notice.textContent = message;
    region.replaceChildren(notice);
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      notice.classList.add('toast--leaving');
      window.setTimeout(function () {
        if (notice.parentNode === region) region.removeChild(notice);
      }, 200);
    }, 2600);
  }

  function updateCounts() {
    var total = rows.length;
    var thisYear = String(new Date().getFullYear());
    var paid = rows.filter(function (row) {
      return Number(row.getAttribute('data-price')) > 0;
    }).length;

    document.getElementById('countAll').textContent = total;
    document.getElementById('filterCountAll').textContent = total;
    document.getElementById('countYear').textContent = rows.filter(function (row) {
      return row.getAttribute('data-year') === thisYear;
    }).length;
    document.getElementById('countPaid').textContent = paid;
    document.getElementById('countFree').textContent = total - paid;
  }

  function applyFilter() {
    var visibleCount = 0;
    var query = currentQuery.trim().toLowerCase();
    var thisYear = String(new Date().getFullYear());

    rows.forEach(function (row) {
      var price = Number(row.getAttribute('data-price')) || 0;
      var haystack = [
        row.getAttribute('data-title'),
        row.getAttribute('data-instructor'),
        row.getAttribute('data-txn')
      ].join(' ').toLowerCase();
      var matchesFilter = currentFilter === 'all' ||
        (currentFilter === 'this-year' && row.getAttribute('data-year') === thisYear) ||
        (currentFilter === 'paid' && price > 0) ||
        (currentFilter === 'free' && price === 0);
      var matchesSearch = !query || haystack.indexOf(query) !== -1;
      var visible = matchesFilter && matchesSearch;

      row.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    groups.forEach(function (group) {
      var visibleRows = Array.prototype.slice.call(group.querySelectorAll('.txn-row')).filter(function (row) {
        return row.style.display !== 'none';
      });
      group.style.display = visibleRows.length ? '' : 'none';

      var groupTotal = visibleRows.reduce(function (total, row) {
        return total + (Number(row.getAttribute('data-price')) || 0);
      }, 0);
      var totalElement = group.querySelector('.group-total');
      if (totalElement) totalElement.textContent = formatPrice(groupTotal);
    });

    transactions.hidden = visibleCount === 0;
    emptyState.hidden = visibleCount !== 0;
  }

  function closeReceipt() {
    receiptModal.classList.remove('show');
    receiptModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previouslyFocusedElement) previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }

  function openReceipt(row) {
    var price = Number(row.getAttribute('data-price')) || 0;
    var dateParts = (row.getAttribute('data-date') || '').split('·');
    var method = document.getElementById('invMethod');
    var methodSub = document.createElement('span');

    document.getElementById('invId').textContent = row.getAttribute('data-txn') || '';
    document.getElementById('invDate').textContent = dateParts[0].trim();
    document.getElementById('invCourse').textContent = row.getAttribute('data-title') || '';
    document.getElementById('invInstructor').textContent = row.getAttribute('data-instructor') || '';
    method.textContent = row.getAttribute('data-method') || '';
    methodSub.className = 'receipt-sub';
    methodSub.textContent = row.getAttribute('data-method-sub') || '';
    method.appendChild(methodSub);
    document.getElementById('invStatus').textContent = row.getAttribute('data-status') || '';
    document.getElementById('invTotal').textContent = price > 0 ? formatPrice(price) : 'Free';

    previouslyFocusedElement = document.activeElement;
    receiptModal.classList.add('show');
    receiptModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  filterTabs.addEventListener('click', function (event) {
    var tab = event.target.closest('.filter-tab');
    if (!tab || !filterTabs.contains(tab)) return;

    filterTabs.querySelectorAll('.filter-tab').forEach(function (item) {
      var active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    currentFilter = tab.getAttribute('data-filter');
    applyFilter();
  });

  searchInput.addEventListener('input', function () {
    currentQuery = searchInput.value;
    applyFilter();
  });

  document.getElementById('clearFilters').addEventListener('click', function () {
    searchInput.value = '';
    currentQuery = '';
    currentFilter = 'all';
    filterTabs.querySelectorAll('.filter-tab').forEach(function (tab) {
      var active = tab.getAttribute('data-filter') === 'all';
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    applyFilter();
    searchInput.focus();
  });

  transactions.addEventListener('click', function (event) {
    var row = event.target.closest('.txn-row');
    if (row && transactions.contains(row)) openReceipt(row);
  });

  modalClose.addEventListener('click', closeReceipt);
  receiptModal.addEventListener('click', function (event) {
    if (event.target === receiptModal) closeReceipt();
  });

  document.addEventListener('keydown', function (event) {
    if (!receiptModal.classList.contains('show')) return;
    if (event.key === 'Escape') {
      closeReceipt();
      return;
    }
    if (event.key === 'Tab') {
      var focusable = receiptModal.querySelectorAll('button:not([disabled])');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.getElementById('modalDownload').addEventListener('click', function () {
    toast('Choose “Save as PDF” in the print dialog.');
    window.print();
  });

  document.getElementById('modalPrint').addEventListener('click', function () {
    window.print();
  });

  document.getElementById('exportBtn').addEventListener('click', function () {
    var headers = ['Transaction ID', 'Date', 'Course', 'Instructor', 'Payment method', 'Status', 'Amount (NGN)'];
    var records = rows.map(function (row) {
      return [
        row.getAttribute('data-txn'),
        row.getAttribute('data-date'),
        row.getAttribute('data-title'),
        row.getAttribute('data-instructor'),
        row.getAttribute('data-method'),
        row.getAttribute('data-status'),
        Number(row.getAttribute('data-price')) || 0
      ];
    });
    var csv = [headers].concat(records).map(function (record) {
      return record.map(function (value) {
        return '"' + String(value == null ? '' : value).replace(/"/g, '""') + '"';
      }).join(',');
    }).join('\r\n');
    var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');

    link.href = url;
    link.download = 'chigos-purchase-history.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
    toast('Your transaction history has been exported.');
  });

  updateCounts();
  applyFilter();
}());
