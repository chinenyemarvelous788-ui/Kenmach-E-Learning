(function () {
  'use strict';

  window.ChigosCards = {
    imageFor: function (course) {
      return 'assets/img/' + (course.image || 'Laptop.jfif');
    },
    initials: function (name) {
      return String(name || 'Chigos').split(/\s+/).slice(0, 2).map(function (part) { return part.charAt(0); }).join('').toUpperCase();
    }
  };
}());
