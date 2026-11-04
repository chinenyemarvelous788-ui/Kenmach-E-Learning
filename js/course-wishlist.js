(function () {
  'use strict';

  var button = document.querySelector('.wish-btn');
  var feedback = document.getElementById('wishlistFeedbackText');
  var wishlistLink = document.getElementById('wishlistLink');
  if (!button || !feedback || !wishlistLink) return;

  var course = {
    id: 'course-web-development-masterclass',
    title: 'Web Development Masterclass',
    category: 'Web Development',
    instructor: 'Adaeze Okafor',
    initials: 'AO',
    price: 45000,
    rating: 4.9,
    students: 2418,
    duration: '42h',
    lessons: 148,
    level: 'Beginner',
    cover: 'cover-web',
    watermark: 'JS',
    savedAt: new Date().toISOString()
  };

  function showAdded(message) {
    button.setAttribute('aria-pressed', 'true');
    button.classList.add('is-added');
    button.querySelector('span').textContent = 'Added to wishlist';
    feedback.textContent = message;
    wishlistLink.hidden = false;
  }

  try {
    var saved = window.ChigosWishlist.getItems().some(function (item) {
      return item.id === course.id;
    });
    if (saved) showAdded('This course is already in your wishlist.');
  } catch (error) {
    feedback.textContent = 'Your wishlist could not be loaded. Please try again.';
  }

  button.addEventListener('click', function () {
    try {
      var added = window.ChigosWishlist.add(course);
      showAdded(added ? 'Course saved to your wishlist.' : 'This course is already in your wishlist.');
    } catch (error) {
      feedback.textContent = 'Unable to save this course. Please try again.';
      wishlistLink.hidden = true;
    }
  });
}());
