(function () {
  'use strict';

  var PREFIX = 'chigos.';
  var KEYS = {
    users: PREFIX + 'users',
    courses: PREFIX + 'courses',
    purchases: PREFIX + 'purchases',
    currentUser: PREFIX + 'currentUser'
  };

  function read(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  window.ChigosStorage = {
    keys: KEYS,
    getUsers: function () { return read(KEYS.users, []); },
    setUsers: function (users) { return write(KEYS.users, users); },
    getCourses: function () { return read(KEYS.courses, []); },
    setCourses: function (courses) { return write(KEYS.courses, courses); },
    getPurchases: function () { return read(KEYS.purchases, []); },
    setPurchases: function (purchases) { return write(KEYS.purchases, purchases); },
    getCurrentUser: function () { return read(KEYS.currentUser, null); },
    setCurrentUser: function (userId) { return write(KEYS.currentUser, userId); },
    getUserById: function (id) { return this.getUsers().find(function (user) { return user.id === id; }) || null; },
    getUserByEmail: function (email) {
      var normalized = String(email || '').trim().toLowerCase();
      return this.getUsers().find(function (user) { return user.email.toLowerCase() === normalized; }) || null;
    },
    getCourseById: function (id) { return this.getCourses().find(function (course) { return course.id === id; }) || null; },
    getPurchasesByStudent: function (studentId) { return this.getPurchases().filter(function (purchase) { return purchase.studentId === studentId; }); },
    getPurchasesByCourse: function (courseId) { return this.getPurchases().filter(function (purchase) { return purchase.courseId === courseId; }); },
    deleteCourse: function (id) {
      this.setCourses(this.getCourses().filter(function (course) { return course.id !== id; }));
    },
    reset: function () {
      Object.keys(KEYS).forEach(function (key) { localStorage.removeItem(KEYS[key]); });
    }
  };
}());
