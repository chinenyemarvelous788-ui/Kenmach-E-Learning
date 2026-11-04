(function () {
  'use strict';

  var S = window.ChigosStorage;
  if (!S.getUsers().length) {
    S.setUsers([
      { id: 'teacher-ada', name: 'Ada Okafor', email: 'ada@chigos.test', password: 'learn123', role: 'teacher', channelName: 'Ada Makes', balance: 32500, createdAt: '2025-01-12T09:00:00.000Z' },
      { id: 'teacher-tunde', name: 'Tunde Bello', email: 'tunde@chigos.test', password: 'learn123', role: 'teacher', channelName: 'Tunde Teaches', balance: 18800, createdAt: '2025-02-03T09:00:00.000Z' },
      { id: 'student-demo', name: 'Amara James', email: 'student@chigos.test', password: 'learn123', role: 'student', createdAt: '2025-03-10T09:00:00.000Z' },
      { id: 'admin-demo', name: 'Chigos Admin', email: 'admin@chigos.test', password: 'admin123', role: 'admin', createdAt: '2025-01-01T09:00:00.000Z' }
    ]);
  }

  if (!S.getCourses().length) {
    S.setCourses([
      { id: 'course-figma', title: 'Figma for your first real project', category: 'Design', description: 'Build a complete landing page in Figma, from the first frame to a handoff a developer can use.', teacherId: 'teacher-ada', price: 2500, duration: '1h 42m', level: 'Beginner', image: 'Teacher.jfif', lessons: 9, videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', featured: true, createdAt: '2025-01-18T09:00:00.000Z' },
      { id: 'course-js', title: 'JavaScript, without the fog', category: 'Development', description: 'A practical introduction to the language behind interactive websites, with small projects at every step.', teacherId: 'teacher-tunde', price: 3200, duration: '2h 15m', level: 'Beginner', image: 'Laptop.jfif', lessons: 12, videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c', featured: true, createdAt: '2025-01-22T09:00:00.000Z' },
      { id: 'course-systems', title: 'Design systems that stay useful', category: 'Design', description: 'Create a lean component library with thoughtful tokens, naming, and patterns your team will actually reuse.', teacherId: 'teacher-ada', price: 4800, duration: '2h 08m', level: 'Intermediate', image: 'Teacher.jfif', lessons: 11, videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', featured: true, createdAt: '2025-02-01T09:00:00.000Z' },
      { id: 'course-api', title: 'APIs made practical', category: 'Development', description: 'Understand requests, responses, JSON, and the habits that make integrating an API straightforward.', teacherId: 'teacher-tunde', price: 2800, duration: '1h 36m', level: 'Beginner', image: 'Laptop.jfif', lessons: 8, videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c', featured: false, createdAt: '2025-02-12T09:00:00.000Z' },
      { id: 'course-pricing', title: 'Price your freelance work', category: 'Business', description: 'Set clear project rates, explain your value, and make a simple pricing system you can keep using.', teacherId: 'teacher-ada', price: 2200, duration: '58m', level: 'All levels', image: 'Teacher.jfif', lessons: 6, videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U', featured: false, createdAt: '2025-02-22T09:00:00.000Z' },
      { id: 'course-marketing', title: 'A small-business marketing plan', category: 'Business', description: 'Turn what you know about your customers into a realistic weekly plan for finding more of them.', teacherId: 'teacher-tunde', price: 3500, duration: '1h 24m', level: 'Beginner', image: 'Laptop.jfif', lessons: 7, videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c', featured: false, createdAt: '2025-03-02T09:00:00.000Z' }
    ]);
  }

  if (!S.getPurchases().length) {
    S.setPurchases([
      { id: 'purchase-demo-1', studentId: 'student-demo', courseId: 'course-figma', amountPaid: 2500, platformFee: 100, teacherEarning: 2400, date: '2025-04-05T12:00:00.000Z' },
      { id: 'purchase-demo-2', studentId: 'student-demo', courseId: 'course-js', amountPaid: 3200, platformFee: 100, teacherEarning: 3100, date: '2025-04-07T12:00:00.000Z' }
    ]);
  }
}());
