(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var hero = document.querySelector('.hero');
    if (hero) window.requestAnimationFrame(function () { hero.classList.add('is-ready'); });
  });
}());
