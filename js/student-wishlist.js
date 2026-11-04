/* ============================================================
   CHIGOS · STUDENT PORTAL — WISHLIST
   ============================================================ */
(function () {
  'use strict';

  var grid = document.getElementById('wishlistGrid');
  var emptyState = document.getElementById('emptyState');
  var summaryBar = document.getElementById('summaryBar');
  var summaryCount = document.getElementById('summaryCount');
  var summaryTotal = document.getElementById('summaryTotal');
  var summaryRating = document.getElementById('summaryRating');
  var wishlistBadge = document.getElementById('wishlistBadge') || document.getElementById('sidebarWishlistCount');

  function toast(message, type) {
    var notification = document.createElement('div');
    notification.className = 'toast toast--' + (type || 'success');
    notification.setAttribute('role', 'status');
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(function () {
      notification.classList.add('show');
    });

    window.setTimeout(function () {
      notification.classList.remove('show');
      window.setTimeout(function () {
        notification.remove();
      }, 300);
    }, 2400);
  }

  function getCards() {
    return Array.prototype.slice.call(grid.querySelectorAll('.course-card'));
  }

  function getNumericAttribute(card, attribute) {
    var value = parseFloat(card.getAttribute(attribute) || '0');
    return Number.isFinite(value) ? value : 0;
  }

  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function createSavedCard(course) {
    var card = makeElement('article', 'course-card');
    card.dataset.courseId = course.id;
    card.dataset.price = course.price;
    card.dataset.rating = course.rating;
    card.dataset.title = course.title;

    var cover = makeElement('div', 'course-cover ' + (course.cover || 'cover-web'));
    cover.appendChild(makeElement('span', 'course-level', course.level || 'Course'));
    var removeButton = makeElement('button', 'course-wish');
    removeButton.type = 'button';
    removeButton.setAttribute('aria-label', 'Remove ' + course.title + ' from wishlist');
    removeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    cover.appendChild(removeButton);
    cover.appendChild(makeElement('span', 'course-watermark', course.watermark || ''));

    var body = makeElement('div', 'course-body');
    body.appendChild(makeElement('div', 'course-cat', course.category || 'Course'));
    body.appendChild(makeElement('h2', 'course-title', course.title));

    var instructor = makeElement('div', 'course-instructor');
    instructor.appendChild(makeElement('span', 'instructor-avatar avatar-web', course.initials || 'CH'));
    instructor.appendChild(makeElement('span', '', course.instructor || 'Chigos'));
    body.appendChild(instructor);

    var rating = makeElement('div', 'course-rating');
    rating.appendChild(makeElement('span', 'stars', '★★★★★'));
    rating.lastChild.setAttribute('aria-label', course.rating + ' out of 5 stars');
    rating.appendChild(makeElement('strong', '', Number(course.rating || 0).toFixed(1)));
    rating.appendChild(makeElement('span', 'dot-sep'));
    rating.appendChild(makeElement('span', '', Number(course.students || 0).toLocaleString('en-NG') + ' students'));
    body.appendChild(rating);

    var meta = makeElement('div', 'course-meta');
    meta.appendChild(makeElement('span', 'course-meta-item', '◷ ' + (course.duration || '')));
    meta.appendChild(makeElement('span', 'course-meta-item', '▤ ' + (course.lessons || 0) + ' lessons'));
    meta.appendChild(makeElement('span', 'course-saved-at', 'Saved just now'));
    body.appendChild(meta);

    var footer = makeElement('div', 'course-footer');
    var price = makeElement('span', 'course-price' + (Number(course.price) === 0 ? ' free' : ''),
      Number(course.price) === 0 ? 'Free' : '₦' + Number(course.price || 0).toLocaleString('en-NG'));
    footer.appendChild(price);
    var enrollButton = makeElement('button', 'enroll-btn');
    enrollButton.type = 'button';
    enrollButton.appendChild(makeElement('span', '', '＋'));
    enrollButton.appendChild(document.createTextNode(' Enroll'));
    footer.appendChild(enrollButton);

    card.appendChild(cover);
    card.appendChild(body);
    card.appendChild(footer);
    return card;
  }

  function renderSavedCourses() {
    try {
      var existingIds = getCards().map(function (card) {
        return card.getAttribute('data-course-id');
      });
      window.ChigosWishlist.getItems().forEach(function (course) {
        if (course && course.id && existingIds.indexOf(course.id) === -1) {
          grid.appendChild(createSavedCard(course));
          existingIds.push(course.id);
        }
      });
    } catch (error) {
      toast('Unable to load saved courses. Please try again.', 'error');
    }
  }

  function updateSummary() {
    var cards = getCards();
    var count = cards.length;
    var total = cards.reduce(function (sum, card) {
      return sum + getNumericAttribute(card, 'data-price');
    }, 0);
    var averageRating = count
      ? (cards.reduce(function (sum, card) {
        return sum + getNumericAttribute(card, 'data-rating');
      }, 0) / count).toFixed(1)
      : '0.0';

    summaryCount.textContent = count;
    summaryTotal.textContent = count ? '₦' + total.toLocaleString('en-NG') : '₦0';
    summaryRating.innerHTML = averageRating + ' <span class="unit">★</span>';
    wishlistBadge.textContent = count;

    var isEmpty = count === 0;
    grid.style.display = isEmpty ? 'none' : '';
    summaryBar.style.display = isEmpty ? 'none' : '';
    emptyState.hidden = !isEmpty;
  }

  function removeCard(card, silent) {
    if (card.classList.contains('removing')) return;

    var courseId = card.getAttribute('data-course-id');
    if (courseId) {
      try {
        window.ChigosWishlist.remove(courseId);
      } catch (error) {
        toast('Unable to remove this course. Please try again.', 'error');
        return;
      }
    }

    card.classList.add('removing');
    window.setTimeout(function () {
      card.remove();
      updateSummary();
      if (!silent) toast('Removed from wishlist');
    }, 250);
  }

  function enrollCard(card) {
    var title = card.getAttribute('data-title') || 'this course';
    var enrollButton = card.querySelector('.enroll-btn');
    if (enrollButton.disabled) return;

    enrollButton.disabled = true;
    enrollButton.style.opacity = '0.6';
    enrollButton.textContent = '✓ Enrolled';
    toast('Enrolled in "' + title + '"! Opening course…');
    window.setTimeout(function () {
      window.location.href = 'student-course-player.html';
    }, 900);
  }

  grid.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;

    var card = target.closest('.course-card');
    if (!card) return;

    if (target.closest('.course-wish')) {
      event.stopPropagation();
      removeCard(card, false);
      return;
    }

    if (target.closest('.enroll-btn')) {
      event.stopPropagation();
      enrollCard(card);
    }
  });

  document.getElementById('clearWishlistBtn').addEventListener('click', function () {
    var cards = getCards();
    if (!cards.length) return;
    if (!window.confirm('Remove all ' + cards.length + ' courses from your wishlist?')) return;

    try {
      window.ChigosWishlist.clear();
    } catch (error) {
      toast('Unable to clear saved courses. Please try again.', 'error');
      return;
    }

    cards.forEach(function (card) {
      removeCard(card, true);
    });
    window.setTimeout(function () {
      toast('Wishlist cleared');
    }, 300);
  });

  document.getElementById('enrollAllBtn').addEventListener('click', function () {
    var cards = getCards();
    if (!cards.length) return;

    var total = cards.reduce(function (sum, card) {
      return sum + getNumericAttribute(card, 'data-price');
    }, 0);
    if (!window.confirm('Enroll in all ' + cards.length + ' courses? This will charge ₦' + total.toLocaleString('en-NG') + '.')) return;

    toast('Enrolling in ' + cards.length + ' courses…');
    window.setTimeout(function () {
      window.location.href = 'student-my-courses.html';
    }, 1000);
  });

  renderSavedCourses();
  updateSummary();
}());
