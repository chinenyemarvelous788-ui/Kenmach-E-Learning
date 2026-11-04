(function () {
  'use strict';

  var STORAGE_KEY = 'chigos.wishlist';

  function getItems() {
    var stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    var items = JSON.parse(stored);
    if (!Array.isArray(items)) {
      throw new Error('Saved wishlist data is invalid.');
    }

    return items;
  }

  function saveItems(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items;
  }

  window.ChigosWishlist = {
    getItems: getItems,
    add: function (course) {
      if (!course || !course.id || !course.title) {
        throw new Error('Course details are incomplete.');
      }

      var items = getItems();
      if (items.some(function (item) { return item.id === course.id; })) {
        return false;
      }

      items.push(course);
      saveItems(items);
      return true;
    },
    remove: function (courseId) {
      saveItems(getItems().filter(function (item) { return item.id !== courseId; }));
    },
    clear: function () {
      saveItems([]);
    }
  };
}());
