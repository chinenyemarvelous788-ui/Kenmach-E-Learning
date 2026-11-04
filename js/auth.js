(function () {
  'use strict';

  var S = window.ChigosStorage;
  window.ChigosAuth = {
    current: function () {
      var id = S.getCurrentUser();
      return id ? S.getUserById(id) : null;
    },
    register: function (details) {
      if (S.getUserByEmail(details.email)) throw new Error('An account with that email already exists.');
      var user = {
        id: 'user-' + Date.now().toString(36),
        name: details.name.trim(),
        email: details.email.trim().toLowerCase(),
        password: details.password,
        role: details.role,
        channelName: details.channelName ? details.channelName.trim() : '',
        balance: 0,
        createdAt: new Date().toISOString()
      };
      S.setUsers(S.getUsers().concat(user));
      S.setCurrentUser(user.id);
      return user;
    },
    logout: function () {
      localStorage.removeItem(S.keys.currentUser);
    },
    requireRole: function (roles) {
      var user = this.current();
      if (!user || roles.indexOf(user.role) === -1) {
        window.location.href = 'login.html';
        return null;
      }
      return user;
    }
  };
}());
