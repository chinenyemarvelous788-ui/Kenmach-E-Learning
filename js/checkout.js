/**
 * Chigos E-Learning — Checkout Engine
 * Dynamic order population, live card formatting, coupon calculation,
 * and direct teacher payout integration with ChigosStorage & ChigosPayments.
 */

(function () {
  'use strict';

  // Comprehensive Catalog Data for Course Matching with Teacher Bank Details
  const CATALOG = {
    'course-js': {
      id: 'course-js',
      teacherId: 'teacher-ada',
      title: 'Full-Stack JavaScript: From Zero to Deploy',
      cat: 'Web Development',
      watermark: 'JS',
      instructor: 'Adaeze Okafor',
      initials: 'AO',
      role: 'Senior Engineer · Ex-Paystack',
      price: 142000,
      oldPrice: 206000,
      rating: 4.9,
      reviews: '2,418',
      hours: '42 hrs',
      lectures: 148,
      projects: 24,
      bank: {
        bankName: 'Guaranty Trust Bank (GTBank)',
        accountNumber: '0128491024',
        accountName: 'Adaeze Okafor / Ada Makes'
      }
    },
    'course-systems': {
      id: 'course-systems',
      teacherId: 'teacher-tunde',
      title: 'Design Systems That Scale With Your Product',
      cat: 'UI / UX Design',
      watermark: 'UI',
      instructor: 'Tunde Martins',
      initials: 'TM',
      role: 'Design Lead · Ex-Flutterwave',
      price: 110000,
      oldPrice: 160000,
      rating: 4.8,
      reviews: '1,106',
      hours: '28 hrs',
      lectures: 96,
      projects: 18,
      bank: {
        bankName: 'Access Bank',
        accountNumber: '1029482716',
        accountName: 'Tunde Martins / Tunde Teaches'
      }
    },
    'course-api': {
      id: 'course-api',
      teacherId: 'teacher-ngozi',
      title: 'Python for Data Science & Machine Learning',
      cat: 'Data & Analytics',
      watermark: 'DA',
      instructor: 'Ngozi Kalu',
      initials: 'NK',
      role: 'Data Scientist · Ex-Google',
      price: 158000,
      oldPrice: 238000,
      rating: 4.9,
      reviews: '3,204',
      hours: '56 hrs',
      lectures: 184,
      projects: 32,
      bank: {
        bankName: 'Zenith Bank',
        accountNumber: '2091847192',
        accountName: 'Ngozi Kalu'
      }
    },
    'course-pricing': {
      id: 'course-pricing',
      teacherId: 'teacher-sarah',
      title: 'Product Management: From Idea to Launch',
      cat: 'Business',
      watermark: 'PM',
      instructor: 'Sarah Bello',
      initials: 'SB',
      role: 'Head of Product · Techstars',
      price: 45000,
      oldPrice: 68000,
      rating: 4.7,
      reviews: '892',
      hours: '12 hrs',
      lectures: 48,
      projects: 8,
      bank: {
        bankName: 'Kuda Microfinance Bank',
        accountNumber: '2001928471',
        accountName: 'Sarah Bello'
      }
    },
    'course-marketing': {
      id: 'course-marketing',
      teacherId: 'teacher-efe',
      title: 'Growth Marketing for Modern Startups',
      cat: 'Marketing',
      watermark: 'MKT',
      instructor: 'Efe Kalu',
      initials: 'EK',
      role: 'Growth Lead · 3x Founder',
      price: 126000,
      oldPrice: 185000,
      rating: 4.8,
      reviews: '1,547',
      hours: '20 hrs',
      lectures: 72,
      projects: 14,
      bank: {
        bankName: 'United Bank for Africa (UBA)',
        accountNumber: '2109482710',
        accountName: 'Efe Kalu'
      }
    },
    'course-figma': {
      id: 'course-figma',
      teacherId: 'teacher-jide',
      title: 'Building AI-Powered Apps with LLMs',
      cat: 'AI & Automation',
      watermark: 'AI',
      instructor: 'Jide Adeyemi',
      initials: 'JA',
      role: 'AI Engineer · Anthropic Fellow',
      price: 190000,
      oldPrice: 275000,
      rating: 4.9,
      reviews: '724',
      hours: '34 hrs',
      lectures: 112,
      projects: 20,
      bank: {
        bankName: 'First Bank of Nigeria',
        accountNumber: '3019482715',
        accountName: 'Jide Adeyemi'
      }
    }
  };

  // Valid promo coupons
  const COUPONS = {
    'CHIGOS20': { rate: 0.20, label: '20% Special Discount' },
    'LAUNCH50': { rate: 0.50, label: '50% Launch Promo' },
    'STUDENT10': { rate: 0.10, label: '10% Student Discount' }
  };

  let activeCourse = null;
  let appliedDiscount = 0;
  let activeCouponCode = null;

  function formatNaira(amount) {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  }

  /* Load Course Data */
  function getRequestedCourse() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'course-js';

    if (CATALOG[id]) return CATALOG[id];

    // Fallback: check storage
    if (window.ChigosStorage) {
      const stored = window.ChigosStorage.getCourseById(id);
      if (stored) {
        return {
          id: stored.id,
          teacherId: stored.teacherId || 'teacher-ada',
          title: stored.title,
          cat: stored.category || 'Professional Track',
          watermark: (stored.title.substring(0, 2) || 'CH').toUpperCase(),
          instructor: stored.teacherName || 'Adaeze Okafor',
          initials: 'AO',
          role: 'Verified Educator',
          price: Number(stored.price) || 142000,
          oldPrice: Math.round(Number(stored.price) * 1.45) || 206000,
          rating: 4.9,
          reviews: '1,280',
          hours: stored.duration || '30 hrs',
          lectures: stored.lessons || 80,
          projects: 16,
          bank: {
            bankName: 'Guaranty Trust Bank (GTBank)',
            accountNumber: '0128491024',
            accountName: (stored.teacherName || 'Adaeze Okafor') + ' (Teacher Account)'
          }
        };
      }
    }

    return CATALOG['course-js'];
  }

  /* Render Course in Sidebar & Payment Forms */
  function renderOrderSummary(course) {
    activeCourse = course;

    // Header & Meta
    const backLink = document.getElementById('backToCourseLink');
    if (backLink) backLink.href = 'course.html?id=' + encodeURIComponent(course.id);

    const heroBox = document.getElementById('summaryHero');
    if (heroBox) heroBox.setAttribute('data-watermark', course.watermark);

    const thumb = document.getElementById('summaryThumb');
    if (thumb) thumb.textContent = course.watermark;

    const catEl = document.getElementById('summaryCat');
    if (catEl) catEl.textContent = course.cat;

    const titleEl = document.getElementById('summaryTitle');
    if (titleEl) titleEl.textContent = course.title;

    const instEl = document.getElementById('summaryInstructor');
    if (instEl) instEl.textContent = course.instructor + ' · ' + course.role;

    // Mobile Order Glance banner
    const glanceThumb = document.getElementById('glanceThumb');
    if (glanceThumb) glanceThumb.textContent = course.watermark;
    const glanceCat = document.getElementById('glanceCat');
    if (glanceCat) glanceCat.textContent = course.cat;
    const glanceTitle = document.getElementById('glanceTitle');
    if (glanceTitle) glanceTitle.textContent = course.title;
    const glanceInst = document.getElementById('glanceInstructor');
    if (glanceInst) glanceInst.textContent = course.instructor;

    // Direct teacher payout notification in sidebar
    const directTeacherName = document.getElementById('summaryTeacherDirectName');
    if (directTeacherName) directTeacherName.textContent = course.instructor;

    // Direct Teacher Bank Details in Payment Form
    const teacherAvatar = document.getElementById('teacherBankAvatar');
    if (teacherAvatar) teacherAvatar.textContent = course.initials;

    const teacherBankTitle = document.getElementById('teacherBankNameTitle');
    if (teacherBankTitle) teacherBankTitle.textContent = 'Transfer directly to ' + course.instructor;

    const teacherBankName = document.getElementById('teacherBankName');
    if (teacherBankName && course.bank) teacherBankName.textContent = course.bank.bankName;

    const teacherAcctName = document.getElementById('teacherAccountName');
    if (teacherAcctName && course.bank) teacherAcctName.textContent = course.bank.accountName;

    const teacherAcctNum = document.getElementById('teacherAccountNumber');
    if (teacherAcctNum && course.bank) teacherAcctNum.textContent = course.bank.accountNumber;

    const teacherNoticeName = document.getElementById('teacherNoticeName');
    if (teacherNoticeName) teacherNoticeName.textContent = course.instructor;

    const ratingEl = document.getElementById('summaryRating');
    if (ratingEl) ratingEl.textContent = '★ ' + course.rating + ' (' + course.reviews + ')';

    // Pricing
    updatePricing();
  }

  /* Update Pricing Calculation */
  function updatePricing() {
    if (!activeCourse) return;

    const originalPrice = activeCourse.price;
    const oldPrice = activeCourse.oldPrice;
    const discountAmount = originalPrice * appliedDiscount;
    const finalTotal = Math.max(0, originalPrice - discountAmount);
    const teacherEarning = Math.max(0, finalTotal - 100);

    const originalPriceEl = document.getElementById('summaryOriginalPrice');
    if (originalPriceEl) originalPriceEl.textContent = formatNaira(originalPrice);

    const discountLine = document.getElementById('summaryDiscountLine');
    const discountAmountEl = document.getElementById('summaryDiscountAmount');
    if (discountLine && discountAmountEl) {
      if (appliedDiscount > 0) {
        discountLine.style.display = 'flex';
        discountAmountEl.textContent = '- ' + formatNaira(discountAmount);
      } else {
        discountLine.style.display = 'none';
      }
    }

    const teacherEarningEl = document.getElementById('summaryTeacherEarning');
    if (teacherEarningEl) teacherEarningEl.textContent = formatNaira(teacherEarning);

    const oldStrikeEl = document.getElementById('summaryOldStrike');
    if (oldStrikeEl) oldStrikeEl.textContent = formatNaira(oldPrice);

    const finalTotalEl = document.getElementById('summaryFinalTotal');
    if (finalTotalEl) finalTotalEl.textContent = formatNaira(finalTotal);

    const ctaBtn = document.getElementById('payCtaBtn');
    if (ctaBtn) {
      ctaBtn.innerHTML = '<span class="shimmer"></span>Pay ' + formatNaira(finalTotal) + ' &amp; Enroll &rarr;';
    }

    const glancePriceEl = document.getElementById('glancePrice');
    if (glancePriceEl) glancePriceEl.textContent = formatNaira(finalTotal);

    const mobileBarTotalEl = document.getElementById('mobileBarTotal');
    if (mobileBarTotalEl) mobileBarTotalEl.textContent = formatNaira(finalTotal);

    const mobileBarBtn = document.getElementById('mobileBarPayBtn');
    if (mobileBarBtn) {
      mobileBarBtn.innerHTML = '<span class="shimmer"></span>Pay ' + formatNaira(finalTotal) + ' &rarr;';
    }
  }

  /* Copy Teacher Account Number Handler */
  function initCopyAccountBtn() {
    const btn = document.getElementById('copyAcctBtn');
    const textEl = document.getElementById('copyAcctText');
    const acctEl = document.getElementById('teacherAccountNumber');
    if (!btn || !textEl || !acctEl) return;

    btn.addEventListener('click', () => {
      const num = acctEl.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(num).then(() => {
          textEl.textContent = 'Copied!';
          btn.style.background = 'var(--green-bg)';
          btn.style.color = 'var(--green-deep)';
          setTimeout(() => {
            textEl.textContent = 'Copy Account';
            btn.style.background = '';
            btn.style.color = '';
          }, 2200);
        }).catch(() => {
          textEl.textContent = 'Copied!';
          setTimeout(() => { textEl.textContent = 'Copy Account'; }, 2200);
        });
      } else {
        textEl.textContent = 'Copied!';
        setTimeout(() => { textEl.textContent = 'Copy Account'; }, 2200);
      }
    });
  }

  /* Coupon Code Handler */
  function initCoupons() {
    const input = document.getElementById('couponInput');
    const applyBtn = document.getElementById('applyCouponBtn');
    const alert = document.getElementById('couponAlert');
    const alertText = document.getElementById('couponAlertText');
    const alertRemove = document.getElementById('couponAlertRemove');

    if (!input || !applyBtn || !alert) return;

    applyBtn.addEventListener('click', () => {
      const code = input.value.trim().toUpperCase();
      if (!code) return;

      if (COUPONS[code]) {
        appliedDiscount = COUPONS[code].rate;
        activeCouponCode = code;
        alert.className = 'coupon-alert is-success';
        alertText.innerHTML = `<strong>${code}</strong>: ${COUPONS[code].label} applied!`;
        updatePricing();
      } else {
        alert.className = 'coupon-alert is-error';
        alertText.textContent = 'Invalid promo code. Try "CHIGOS20" for 20% off.';
      }
    });

    if (alertRemove) {
      alertRemove.addEventListener('click', () => {
        appliedDiscount = 0;
        activeCouponCode = null;
        input.value = '';
        alert.className = 'coupon-alert';
        alert.style.display = 'none';
        updatePricing();
      });
    }
  }

  /* Account Setup / Pre-filling */
  function initAccountInfo() {
    const user = window.ChigosAuth ? window.ChigosAuth.current() : null;
    const nameInput = document.getElementById('accName');
    const emailInput = document.getElementById('accEmail');
    const avatarEl = document.getElementById('accAvatar');
    const userTitleEl = document.getElementById('accUserTitle');
    const userSubEl = document.getElementById('accUserSub');
    const switchBtn = document.getElementById('accSwitchBtn');

    if (user) {
      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;
      if (userTitleEl) userTitleEl.textContent = user.name;
      if (userSubEl) userSubEl.textContent = user.email;
      if (avatarEl) {
        const parts = user.name.split(' ');
        avatarEl.textContent = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
      }
    } else {
      if (nameInput && !nameInput.value) nameInput.value = 'Amara James';
      if (emailInput && !emailInput.value) emailInput.value = 'student@chigos.test';
    }

    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        if (window.ChigosAuth) window.ChigosAuth.logout();
        window.location.href = 'login.html';
      });
    }
  }

  /* Live Card Number & Expiry Formatting */
  function initCardInputs() {
    const cardInput = document.getElementById('cardNumber');
    const expInput = document.getElementById('cardExpiry');
    const cvvInput = document.getElementById('cardCvv');
    const visaIcon = document.getElementById('iconVisa');
    const masterIcon = document.getElementById('iconMastercard');
    const verveIcon = document.getElementById('iconVerve');

    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 19);
        let formatted = v.match(/.{1,4}/g)?.join(' ') || v;
        e.target.value = formatted;

        if (visaIcon && masterIcon && verveIcon) {
          visaIcon.classList.remove('is-active');
          masterIcon.classList.remove('is-active');
          verveIcon.classList.remove('is-active');

          if (v.startsWith('4')) {
            visaIcon.classList.add('is-active');
          } else if (/^(5[1-5]|2[2-7])/.test(v)) {
            masterIcon.classList.add('is-active');
          } else if (/^(506|650)/.test(v)) {
            verveIcon.classList.add('is-active');
          }
        }
      });
    }

    if (expInput) {
      expInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 3) {
          e.target.value = v.substring(0, 2) + '/' + v.substring(2, 4);
        } else {
          e.target.value = v;
        }
      });
    }

    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      });
    }
  }

  /* Payment Method Toggle */
  function initPaymentMethods() {
    const methods = document.querySelectorAll('.payment-method-card');
    const cardDetailsBox = document.getElementById('cardDetailsBox');
    const bankDetailsBox = document.getElementById('bankDetailsBox');

    methods.forEach(card => {
      card.addEventListener('click', () => {
        methods.forEach(m => m.classList.remove('is-selected'));
        card.classList.add('is-selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        const val = radio?.value;
        if (val === 'bank') {
          if (cardDetailsBox) cardDetailsBox.style.display = 'none';
          if (bankDetailsBox) bankDetailsBox.style.display = 'block';
        } else {
          if (cardDetailsBox) cardDetailsBox.style.display = 'flex';
          if (bankDetailsBox) bankDetailsBox.style.display = 'none';
        }
      });
    });
  }

  /* Complete Purchase & Display Celebration */
  function initPurchaseAction() {
    const btn = document.getElementById('payCtaBtn');
    const mobileBtn = document.getElementById('mobileBarPayBtn');
    const form = document.getElementById('checkoutForm');
    const successModal = document.getElementById('successOverlay');
    const receiptOrder = document.getElementById('receiptOrderId');
    const receiptCourse = document.getElementById('receiptCourseName');
    const receiptAmount = document.getElementById('receiptPaidAmount');
    const receiptStudent = document.getElementById('receiptStudentName');

    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => {
        document.getElementById('hiddenFormSubmit')?.click();
      });
    }

    if (!btn || !form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.innerHTML = '<span class="shimmer"></span>Processing Secure Payment...';
      if (mobileBtn) {
        mobileBtn.disabled = true;
        mobileBtn.innerHTML = '<span class="shimmer"></span>Processing...';
      }

      const studentName = document.getElementById('accName')?.value.trim() || 'Amara James';
      const studentEmail = document.getElementById('accEmail')?.value.trim() || 'student@chigos.test';

      setTimeout(() => {
        try {
          if (window.ChigosStorage) {
            let user = window.ChigosAuth ? window.ChigosAuth.current() : null;
            if (!user) {
              user = window.ChigosStorage.getUserByEmail(studentEmail);
              if (!user) {
                user = {
                  id: 'student-' + Date.now().toString(36),
                  name: studentName,
                  email: studentEmail,
                  role: 'student',
                  createdAt: new Date().toISOString()
                };
                window.ChigosStorage.setUsers(window.ChigosStorage.getUsers().concat(user));
              }
              window.ChigosStorage.setCurrentUser(user.id);
            }

            // Record purchase
            const finalPrice = Math.max(0, activeCourse.price * (1 - appliedDiscount));
            const teacherEarning = Math.max(0, finalPrice - 100);

            const purchaseRecord = {
              id: 'CHG-' + Math.floor(100000 + Math.random() * 900000),
              studentId: user.id,
              courseId: activeCourse.id,
              courseTitle: activeCourse.title,
              teacherId: activeCourse.teacherId || 'teacher-ada',
              teacherName: activeCourse.instructor,
              amountPaid: finalPrice,
              teacherEarning: teacherEarning,
              platformFee: 100,
              date: new Date().toISOString()
            };
            window.ChigosStorage.setPurchases(window.ChigosStorage.getPurchases().concat(purchaseRecord));

            // Credit Teacher in storage directly
            let teacher = null;
            if (activeCourse.teacherId) {
              teacher = window.ChigosStorage.getUserById(activeCourse.teacherId);
            }
            if (!teacher) {
              teacher = window.ChigosStorage.getUsers().find(u => u.name && u.name.toLowerCase().includes(activeCourse.instructor.toLowerCase().split(' ')[0]));
            }
            if (!teacher) {
              teacher = window.ChigosStorage.getUsers().find(u => u.role === 'teacher');
            }

            if (teacher) {
              teacher.balance = Number(teacher.balance || 0) + teacherEarning;
              window.ChigosStorage.setUsers(window.ChigosStorage.getUsers().map(item => item.id === teacher.id ? teacher : item));
            }

            // Populate Receipt
            if (receiptOrder) receiptOrder.textContent = '#' + purchaseRecord.id;
            if (receiptCourse) receiptCourse.textContent = activeCourse.title;
            if (receiptAmount) receiptAmount.textContent = formatNaira(finalPrice);
            if (receiptStudent) receiptStudent.textContent = studentName;

            const receiptTeacher = document.getElementById('receiptTeacherName');
            if (receiptTeacher) receiptTeacher.textContent = activeCourse.instructor + ' (Instructor Account)';

            const receiptBank = document.getElementById('receiptTeacherBank');
            if (receiptBank && activeCourse.bank) receiptBank.textContent = activeCourse.bank.bankName + ' · ' + activeCourse.bank.accountNumber;

            const receiptEarning = document.getElementById('receiptTeacherEarning');
            if (receiptEarning) receiptEarning.textContent = formatNaira(teacherEarning);
          }

          // Trigger Success Modal
          if (successModal) {
            successModal.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            const mobileBar = document.getElementById('mobileStickyBar');
            if (mobileBar) mobileBar.style.display = 'none';
          }
        } catch (err) {
          console.error(err);
          btn.disabled = false;
          updatePricing();
          alert('Could not complete payment: ' + err.message);
        }
      }, 900);
    });
  }

  /* Initialization */
  document.addEventListener('DOMContentLoaded', () => {
    const course = getRequestedCourse();
    renderOrderSummary(course);
    initAccountInfo();
    initPaymentMethods();
    initCardInputs();
    initCopyAccountBtn();
    initCoupons();
    initPurchaseAction();
  });

})();
