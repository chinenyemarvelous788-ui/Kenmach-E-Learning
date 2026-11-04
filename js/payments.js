(function () {
  'use strict';

  var S = window.ChigosStorage;
  window.ChigosPayments = {
    platformFee: 100,
    purchase: function (courseId) {
      var user = window.ChigosAuth.current();
      var course = S.getCourseById(courseId);
      if (!user || user.role !== 'student') throw new Error('A student account is required to continue.');
      if (!course) throw new Error('This lesson could not be found.');
      if (S.getPurchasesByStudent(user.id).some(function (purchase) { return purchase.courseId === course.id; })) {
        return { alreadyOwned: true, course: course };
      }
      if (course.price < 200) throw new Error('Course prices start at ₦200.');

      var purchase = {
        id: 'purchase-' + Date.now().toString(36),
        studentId: user.id,
        courseId: course.id,
        amountPaid: Number(course.price),
        platformFee: this.platformFee,
        teacherEarning: Number(course.price) - this.platformFee,
        date: new Date().toISOString()
      };
      S.setPurchases(S.getPurchases().concat(purchase));
      var teacher = S.getUserById(course.teacherId);
      if (teacher) {
        teacher.balance = Number(teacher.balance || 0) + purchase.teacherEarning;
        S.setUsers(S.getUsers().map(function (item) { return item.id === teacher.id ? teacher : item; }));
      }
      return { purchase: purchase, course: course };
    }
  };
}());
