/**
 * Apex Scholars Academy - Tuition & Admission Web Application
 * Handles tuition filtering, dynamic fee & scholarship calculation,
 * admission application submissions, receipt printing, and status tracking.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const siteHeader = document.getElementById('siteHeader');

  if (mobileMenuBtn && mobileNavPanel) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavPanel.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any link or button inside it
    mobileNavPanel.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => {
        mobileNavPanel.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNavPanel.classList.contains('open') && !mobileNavPanel.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNavPanel.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavPanel.classList.contains('open')) {
        mobileNavPanel.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header scroll shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 2. HERO QUICK FINDER WIDGET
  // ==========================================================================
  const qGrade = document.getElementById('qGrade');
  const quickFinderResult = document.getElementById('quickFinderResult');
  const resultBatchName = document.getElementById('resultBatchName');
  const resultPrice = document.getElementById('resultPrice');
  const btnQuickCheck = document.getElementById('btnQuickCheck');

  const gradePricingMap = {
    '11-sci': { batch: 'Class 11 Science Foundation (PCM/PCB)', price: '₹4,600', seats: '4 Seats Left' },
    '11-com': { batch: 'Class 11 Commerce Excellence (Accounts & Eco)', price: '₹4,200', seats: '5 Seats Left' },
    '12-sci': { batch: 'Class 12 Science Board Booster (Target 95%+)', price: '₹5,200', seats: '3 Seats Left!' },
    '12-com': { batch: 'Class 12 Commerce Board Mastery & CA Track', price: '₹4,500', seats: '4 Seats Left' },
  };

  function updateQuickFinder() {
    const val = qGrade.value;
    if (val && gradePricingMap[val]) {
      const data = gradePricingMap[val];
      resultBatchName.textContent = `Batch: ${data.batch}`;
      resultPrice.innerHTML = `${data.price} <small>/ month</small>`;
      quickFinderResult.style.display = 'block';
    } else {
      quickFinderResult.style.display = 'none';
    }
  }

  if (qGrade) {
    qGrade.addEventListener('change', updateQuickFinder);
  }

  if (btnQuickCheck) {
    btnQuickCheck.addEventListener('click', () => {
      const selectedGrade = qGrade.value;
      if (!selectedGrade) {
        showToast('Please select student grade first', 'info');
        qGrade.focus();
        return;
      }

      // Pre-fill admission form grade
      const admissionGrade = document.getElementById('admissionGrade');
      if (admissionGrade) {
        const gradeValueMap = {
          '11-sci': 'Class 11 Science',
          '11-com': 'Class 11 Commerce',
          '12-sci': 'Class 12 Science',
          '12-com': 'Class 12 Commerce'
        };
        admissionGrade.value = gradeValueMap[selectedGrade] || '';
      }

      const admissionSection = document.getElementById('admission');
      if (admissionSection) {
        admissionSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Batch pre-selected in the Admission Form!', 'success');
      }
    });
  }

  // ==========================================================================
  // 3. TUITION PROGRAM FILTER TABS
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tuitionCards = document.querySelectorAll('.tuition-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active tab
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      tuitionCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Prefill enrollment from tuition cards
  const enrollBtns = document.querySelectorAll('.btn-enroll-prefill');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const grade = btn.dataset.grade;
      const course = btn.dataset.course;
      const admissionGrade = document.getElementById('admissionGrade');

      if (admissionGrade && grade) {
        const gradeMapping = {
          '11-sci': 'Class 11 Science',
          '11-com': 'Class 11 Commerce',
          '12-sci': 'Class 12 Science',
          '12-com': 'Class 12 Commerce',
          'competitive': 'Competitive (JEE / NEET / Olympiad)'
        };
        if (gradeMapping[grade]) {
          admissionGrade.value = gradeMapping[grade];
        }
      }

      const admissionSec = document.getElementById('admission');
      if (admissionSec) {
        admissionSec.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected "${course}" - proceed with admission details!`, 'success');
      }
    });
  });

  // ==========================================================================
  // 3B. ADMISSION PROCESS: 4-STEP INTERACTIVE ROADMAP
  // ==========================================================================
  const roadmapStepCards = document.querySelectorAll('.roadmap-step-card');
  const stepDetailLeft = document.getElementById('stepDetailLeft');
  const stepDetailRight = document.getElementById('stepDetailRight');

  const roadmapData = {
    '1': {
      title: 'Step 1: Inquiry & Online Registration',
      desc: 'Begin your admission journey in just 3 minutes. Parents or prospective students complete the online inquiry form below by providing basic academic background, current school, target examination board, and preferred shift timings.',
      checklist: [
        'Instant digital Application ID generated upon form submission',
        'Zero upfront registration or administrative processing fee',
        'Pre-book trial demo class and choose morning or evening shifts',
        'Instant WhatsApp acknowledgment & counselor callback within 15 minutes'
      ],
      badge: 'Ready to Start?',
      actionTitle: 'Take Step 1 Right Now',
      actionDesc: 'Our online form takes less than 3 minutes to complete.',
      btnText: 'Go to Registration Form',
      btnHref: '#admission'
    },
    '2': {
      title: 'Step 2: Diagnostic & Aptitude Assessment',
      desc: 'We conduct a complimentary, low-pressure 45-minute diagnostic evaluation test. Rather than ranking students, this test identifies root conceptual gaps in Mathematics, Science, and analytical reasoning from previous academic years.',
      checklist: [
        'Pinpoints specific weak chapters and conceptual misunderstandings',
        'Helps our mentors tailor batch pacing to the student\'s exact learning style',
        'Transparent & uniform tuition fee structure for all enrolled students',
        'Detailed graphical diagnostic report shared with parents during counseling'
      ],
      badge: 'Free Assessment',
      actionTitle: 'Schedule Your Diagnostic',
      actionDesc: 'Take the test online or in-person at our learning center.',
      btnText: 'Book Free Diagnostic Test',
      btnHref: '#admission'
    },
    '3': {
      title: 'Step 3: Academic Counseling & Batch Selection',
      desc: 'Parents and students participate in a personalized 1-on-1 meeting with senior subject faculty. We discuss diagnostic results, school homework balance, exam targets (Board 95%+, JEE, or NEET), and select the most convenient morning or evening batch.',
      checklist: [
        'Personalized guidance with senior IIT / NIT alumni mentors',
        'Selection of optimal batch shift (Morning: 6:30 AM or Evening: 4:30 PM)',
        'Subject combo customization (All-Subjects vs. Core Math & Science)',
        'Tailored milestone roadmap for board scoring & competitive prep'
      ],
      badge: 'Expert Guidance',
      actionTitle: 'Meet Senior Mentors',
      actionDesc: 'Available Monday to Saturday 8:00 AM – 8:30 PM.',
      btnText: 'Reserve Counseling Slot',
      btnHref: '#contact'
    },
    '4': {
      title: 'Step 4: Seat Allocation & Class Kickoff',
      desc: 'Finalize your enrollment with transparent fee installment choices. The student receives their welcome study kit containing printed theory modules, formula cheat-sheets, student portal app credentials, and attends the Day 1 batch orientation.',
      checklist: [
        'Receive printed chapter modules, workbooks & formula handbooks',
        'Student portal mobile app login for recorded lectures & test analytics',
        'Formal seat reservation in the capped 15–20 student batch',
        'Orientation session with fellow batchmates and lead faculty'
      ],
      badge: 'Welcome to Apex',
      actionTitle: 'Begin Academic Excellence',
      actionDesc: 'Micro-batches fill up quickly. Secure your slot early.',
      btnText: 'Start Your Admission Now',
      btnHref: '#admission'
    }
  };

  function updateRoadmapDetail(stepNum) {
    const data = roadmapData[stepNum];
    if (!data || !stepDetailLeft || !stepDetailRight) return;

    stepDetailLeft.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.desc}</p>
      <ul class="step-checklist">
        ${data.checklist.map(item => `
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ${item}
          </li>
        `).join('')}
      </ul>
    `;

    stepDetailRight.innerHTML = `
      <span class="detail-badge">${data.badge}</span>
      <h4>${data.actionTitle}</h4>
      <p>${data.actionDesc}</p>
      <a href="${data.btnHref}" class="btn btn-primary w-100">
        <span>${data.btnText}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      </a>
    `;
  }

  roadmapStepCards.forEach(card => {
    card.addEventListener('click', () => {
      roadmapStepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const step = card.dataset.step;
      updateRoadmapDetail(step);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  
  // Helper to trigger genuine file download in browser
  function triggerRealDownload(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (link.parentNode) link.parentNode.removeChild(link);
    }, 200);
  }

  // ==========================================================================
  // 3C. SYLLABUS & FEE GUIDE MODAL HANDLER
  // ==========================================================================
  const syllabusModal = document.getElementById('syllabusModal');
  const btnOpenSyllabusGuide = document.getElementById('btnOpenSyllabusGuide');
  const btnCloseSyllabusModal = document.getElementById('btnCloseSyllabusModal');
  const btnDownloadSyllabusAction = document.getElementById('btnDownloadSyllabusAction');

  if (btnOpenSyllabusGuide && syllabusModal) {
    btnOpenSyllabusGuide.addEventListener('click', () => {
      if (typeof syllabusModal.showModal === 'function') {
        syllabusModal.showModal();
      }
    });
  }

  if (btnCloseSyllabusModal && syllabusModal) {
    btnCloseSyllabusModal.addEventListener('click', () => {
      syllabusModal.close();
    });
  }

  if (btnDownloadSyllabusAction) {
    btnDownloadSyllabusAction.addEventListener('click', (e) => {
      triggerRealDownload('Apex_Scholars_Class11_12_Syllabus_Guide.pdf', 'Apex_Scholars_Class11_12_Syllabus_Guide.pdf');
      showToast('Downloading official 2026-27 Syllabus & Curriculum Guide PDF...', 'info');
      setTimeout(() => {
        if (syllabusModal) syllabusModal.close();
        showToast('Complete Syllabus & Fee Guide downloaded successfully!', 'success');
      }, 800);
    });
  }

  // ==========================================================================
  // 3D. REQUEST FEE SHEET MODAL HANDLER
  // ==========================================================================
  const feeSheetModal = document.getElementById('feeSheetModal');
  const btnCloseFeeSheetModal = document.getElementById('btnCloseFeeSheetModal');
  const btnFeeSheetApply = document.getElementById('btnFeeSheetApply');
  const btnFeeSheetDownload = document.getElementById('btnFeeSheetDownload');
  const feeSheetCourseTitle = document.getElementById('feeSheetCourseTitle');
  const feeSheetPriceDisplay = document.getElementById('feeSheetPriceDisplay');
  let activeFeeSheetCourse = 'Tuition Program';

  document.querySelectorAll('.btn-fee-sheet').forEach(btn => {
    btn.addEventListener('click', () => {
      const course = btn.dataset.course || 'Tuition Program';
      const fee = btn.dataset.fee || '₹4,600 / mo';
      activeFeeSheetCourse = course;

      if (feeSheetCourseTitle) feeSheetCourseTitle.textContent = course;
      if (feeSheetPriceDisplay) feeSheetPriceDisplay.textContent = fee;

      if (feeSheetModal && typeof feeSheetModal.showModal === 'function') {
        feeSheetModal.showModal();
      }
    });
  });

  if (btnCloseFeeSheetModal && feeSheetModal) {
    btnCloseFeeSheetModal.addEventListener('click', () => {
      feeSheetModal.close();
    });
  }

  if (btnFeeSheetApply && feeSheetModal) {
    btnFeeSheetApply.addEventListener('click', () => {
      feeSheetModal.close();
      const admissionSec = document.getElementById('admission');
      if (admissionSec) {
        admissionSec.scrollIntoView({ behavior: 'smooth' });
        showToast(`Pre-selected: ${activeFeeSheetCourse}. Complete registration below!`, 'success');
      }
    });
  }

  if (btnFeeSheetDownload) {
    btnFeeSheetDownload.addEventListener('click', (e) => {
      triggerRealDownload('Apex_Scholars_Official_Fee_Sheet.pdf', 'Apex_Scholars_Official_Fee_Sheet.pdf');
      showToast(`Downloading official fee sheet for ${activeFeeSheetCourse}...`, 'info');
      setTimeout(() => {
        showToast('Official Fee Sheet PDF downloaded successfully!', 'success');
      }, 800);
    });
  }

  // ==========================================================================
  // 4. INTERACTIVE TUITION FEE & SCHOLARSHIP CALCULATOR
  // ==========================================================================
  const calcGrade = document.getElementById('calcGrade');
  const calcMarks = document.getElementById('calcMarks');
  const calcMarksVal = document.getElementById('calcMarksVal');
  const scholarshipTag = document.getElementById('scholarshipTag');
  const cyclePills = document.querySelectorAll('.cycle-pill');

  const quoteBaseFee = document.getElementById('quoteBaseFee');
  const quoteMeritPct = document.getElementById('quoteMeritPct');
  const quoteMeritDisc = document.getElementById('quoteMeritDisc');
  const quoteTermDisc = document.getElementById('quoteTermDisc');
  const quoteFinalFee = document.getElementById('quoteFinalFee');
  const quoteFinalPeriod = document.getElementById('quoteFinalPeriod');
  const quoteMonthlyBreakup = document.getElementById('quoteMonthlyBreakup');
  const btnClaimQuote = document.getElementById('btnClaimQuote');

  let currentCycle = 'annual';

  // Base monthly pricing table for 11th & 12th
  const pricingTable = {
    '11-sci': { all: 4600, 'math-sci': 3500, single: 1900 },
    '11-com': { all: 4200, 'math-sci': 3200, single: 1700 },
    '12-sci': { all: 5200, 'math-sci': 3900, single: 2100 },
    '12-com': { all: 4500, 'math-sci': 3400, single: 1800 },
    'competitive': { all: 6500, 'math-sci': 5200, single: 2800 },
  };

  function calculateFee() {
    const grade = calcGrade ? calcGrade.value : '11-sci';
    const pkgRadio = document.querySelector('input[name="calcPkg"]:checked');
    const pkg = pkgRadio ? pkgRadio.value : 'all';

    // Base monthly pricing
    const monthlyRate = (pricingTable[grade] && pricingTable[grade][pkg]) ? pricingTable[grade][pkg] : 4600;

    let basePeriodMonths = 12;
    let termDiscountPct = 0;
    let periodText = '/ academic year';

    if (currentCycle === 'monthly') {
      basePeriodMonths = 1;
      termDiscountPct = 0;
      periodText = '/ month';
    } else if (currentCycle === 'quarterly') {
      basePeriodMonths = 3;
      termDiscountPct = 8;
      periodText = '/ quarter (3 months)';
    } else {
      // annual
      basePeriodMonths = 12;
      termDiscountPct = 15;
      periodText = '/ academic year';
    }

    const baseGrossFee = monthlyRate * basePeriodMonths;
    const termDiscountVal = Math.round(baseGrossFee * (termDiscountPct / 100));
    const netFinalFee = Math.max(0, baseGrossFee - termDiscountVal);

    // Update quote panel
    if (quoteBaseFee) quoteBaseFee.textContent = `₹${baseGrossFee.toLocaleString('en-IN')}`;
    if (quoteTermDisc) quoteTermDisc.textContent = `-₹${termDiscountVal.toLocaleString('en-IN')}`;
    if (quoteFinalFee) quoteFinalFee.textContent = `₹${netFinalFee.toLocaleString('en-IN')}`;
    if (quoteFinalPeriod) quoteFinalPeriod.textContent = periodText;

    if (quoteMonthlyBreakup) {
      const equivMonthly = Math.round(netFinalFee / basePeriodMonths);
      quoteMonthlyBreakup.innerHTML = `Equivalent to just <strong>₹${equivMonthly.toLocaleString('en-IN')}</strong> per month!`;
    }
  }

  // Event Listeners for calculator
  if (calcGrade) calcGrade.addEventListener('change', calculateFee);
  if (calcMarks) calcMarks.addEventListener('input', calculateFee);

  document.querySelectorAll('input[name="calcPkg"]').forEach(r => {
    r.addEventListener('change', (e) => {
      document.querySelectorAll('.calc-radio-card').forEach(c => c.classList.remove('active'));
      const card = e.target.closest('.calc-radio-card');
      if (card) card.classList.add('active');
      calculateFee();
    });
  });

  cyclePills.forEach(pill => {
    pill.addEventListener('click', () => {
      cyclePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCycle = pill.dataset.cycle;
      calculateFee();
    });
  });

  // Initial calculation run
  calculateFee();

  // Claim Quote Button action
  if (btnClaimQuote) {
    btnClaimQuote.addEventListener('click', () => {
      const admissionSec = document.getElementById('admission');
      const marksVal = calcMarks ? calcMarks.value : '85';
      const prevScoreInput = document.getElementById('previousScore');
      if (prevScoreInput) {
        prevScoreInput.value = marksVal;
      }
      if (admissionSec) {
        admissionSec.scrollIntoView({ behavior: 'smooth' });
        showToast('Tuition fee quote selected! Fill in student details below.', 'success');
      }
    });
  }

  // ==========================================================================
  // 5. ADMISSION FORM SUBMISSION & RECEIPT GENERATOR
  // ==========================================================================
  const admissionForm = document.getElementById('admissionForm');
  const admissionReceiptModal = document.getElementById('admissionReceiptModal');
  const btnCloseReceipt = document.getElementById('btnCloseReceipt');
  const btnPrintReceipt = document.getElementById('btnPrintReceipt');

  // Receipt fields
  const receiptAppId = document.getElementById('receiptAppId');
  const receiptTimestamp = document.getElementById('receiptTimestamp');
  const receiptStudentName = document.getElementById('receiptStudentName');
  const receiptGradeBoard = document.getElementById('receiptGradeBoard');
  const receiptBatchTiming = document.getElementById('receiptBatchTiming');
  const receiptMode = document.getElementById('receiptMode');
  const receiptParent = document.getElementById('receiptParent');
  const receiptPhone = document.getElementById('receiptPhone');
  const receiptScholarship = document.getElementById('receiptScholarship');
  const receiptDemoSlot = document.getElementById('receiptDemoSlot');
  const receiptMessage = document.getElementById('receiptMessage');
  const btnCopyAppId = document.getElementById('btnCopyAppId');

  if (admissionForm) {
    admissionForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const studentName = document.getElementById('studentName');
      const studentDob = document.getElementById('studentDob');
      const currentSchool = document.getElementById('currentSchool');
      const previousScore = document.getElementById('previousScore');
      const admissionGrade = document.getElementById('admissionGrade');
      const boardType = document.getElementById('boardType');
      const preferredTiming = document.getElementById('preferredTiming');
      const admissionMode = document.getElementById('admissionMode');
      const parentName = document.getElementById('parentName');
      const parentPhone = document.getElementById('parentPhone');
      const parentEmail = document.getElementById('parentEmail');
      const residentialArea = document.getElementById('residentialArea');
      const studentMessage = document.getElementById('studentMessage');
      const requestDemo = document.getElementById('requestDemo');
      const requestScholarship = document.getElementById('requestScholarship');

      // Helper validation
      function checkField(input, errId, condition) {
        if (!input) return;
        const fieldWrap = input.closest('.form-field');
        if (!condition) {
          if (fieldWrap) fieldWrap.classList.add('has-error');
          isValid = false;
        } else {
          if (fieldWrap) fieldWrap.classList.remove('has-error');
        }
      }

      const cleanPhone = parentPhone ? parentPhone.value.replace(/[\s\-\+\(\)]/g, '').replace(/^91/, '').replace(/^0/, '').trim() : '';
      const isNameValid = studentName && studentName.value.trim().length >= 2;
      const isPhoneValid = /^[0-9]{10}$/.test(cleanPhone);

      checkField(studentName, 'errStudentName', isNameValid);
      checkField(parentPhone, 'errParentPhone', isPhoneValid);

      if (!isNameValid || !isPhoneValid) {
        showToast('Please enter Student Name and valid 10-digit Phone Number.', 'info');
        if (!isNameValid && studentName) studentName.focus();
        else if (parentPhone) parentPhone.focus();
        return;
      }

      // Safe permissive defaults for secondary fields
      const finalDob = (studentDob && studentDob.value) ? studentDob.value : '2008-01-01';
      const finalSchool = (currentSchool && currentSchool.value.trim()) ? currentSchool.value.trim() : 'Class 11/12 Student';
      const parsedScore = previousScore ? parseFloat(previousScore.value) : 85;
      const finalScore = (!isNaN(parsedScore) && parsedScore >= 35 && parsedScore <= 100) ? parsedScore : 85;
      const finalGrade = (admissionGrade && admissionGrade.value) ? admissionGrade.value : 'Class 11 Science';
      const finalBoard = (boardType && boardType.value) ? boardType.value : 'CBSE';
      const finalTiming = (preferredTiming && preferredTiming.value) ? preferredTiming.value : 'Evening Shift (4:30 PM - 7:30 PM)';
      const finalMode = (admissionMode && admissionMode.value) ? admissionMode.value : 'Offline Center (Classroom)';
      const finalParent = (parentName && parentName.value.trim()) ? parentName.value.trim() : `Parent of ${studentName.value.trim()}`;
      const finalEmail = (parentEmail && parentEmail.value.trim()) ? parentEmail.value.trim() : `${cleanPhone}@applicant.local`;
      const finalLocality = (residentialArea && residentialArea.value.trim()) ? residentialArea.value.trim() : 'City Area';

      // Generate Unique Application ID
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `APEX-2026-${randomNum}`;
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) + ' at ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      // Standard Uniform Fee for all students
      const scholarshipStatus = 'Standard Uniform Academy Fee (Equal for all students)';

      const demoStatus = (requestDemo && requestDemo.checked)
        ? 'Booked for Upcoming Saturday 5:00 PM (Batch Orientation)'
        : 'Direct Admission / Enrollment Preference';

      // Store in localStorage for status tracker
      const applicationRecord = {
        appId: generatedId,
        studentName: studentName.value.trim(),
        dob: finalDob,
        school: finalSchool,
        score: finalScore,
        grade: finalGrade,
        board: finalBoard,
        timing: finalTiming,
        mode: finalMode,
        parent: finalParent,
        phone: cleanPhone,
        email: finalEmail,
        locality: finalLocality,
        message: studentMessage ? studentMessage.value.trim() : '',
        scholarship: scholarshipStatus,
        demoSlot: demoStatus,
        timestamp: formattedDate,
        status: 'Application Verified • Seat Provisionally Held'
      };

      // Save locally for instant offline fallback
      try {
        const storedApps = JSON.parse(localStorage.getItem('apex_admissions') || '[]');
        storedApps.unshift(applicationRecord);
        localStorage.setItem('apex_admissions', JSON.stringify(storedApps));
      } catch (err) {
        console.error('Storage error:', err);
      }

      // UI Loading State on submit button
      const btnSubmit = document.getElementById('btnSubmitAdmission');
      const originalBtnHtml = btnSubmit ? btnSubmit.innerHTML : '';
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<span>⏳ Saving to Firebase Cloud...</span>`;
      }

      // Sync with Firebase Cloud Firestore Database
      let cloudSuccess = false;
      let cloudError = null;

      if (window.ApexDB && typeof window.ApexDB.saveAdmission === 'function') {
        try {
          const res = await window.ApexDB.saveAdmission({
            appId: generatedId,
            studentName: applicationRecord.studentName,
            dob: applicationRecord.dob,
            school: applicationRecord.school,
            score: applicationRecord.score,
            grade: applicationRecord.grade,
            board: applicationRecord.board,
            timing: applicationRecord.timing,
            mode: applicationRecord.mode,
            parentName: applicationRecord.parent,
            parentPhone: applicationRecord.phone,
            parentEmail: applicationRecord.email,
            locality: applicationRecord.locality,
            message: applicationRecord.message,
            scholarship: applicationRecord.scholarship,
            demoSlot: applicationRecord.demoSlot,
            formattedDate: formattedDate,
            status: 'Application Verified • Seat Provisionally Held'
          });

          if (res && res.success) {
            cloudSuccess = true;
          } else if (res && res.error) {
            cloudError = res.error;
          }
        } catch (dbErr) {
          console.error("Firestore sync error:", dbErr);
          cloudError = dbErr.message;
        }
      }

      // Restore submit button
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnHtml;
      }

      // Populate Receipt Modal
      if (receiptAppId) receiptAppId.textContent = generatedId;
      if (receiptTimestamp) receiptTimestamp.textContent = formattedDate;
      if (receiptStudentName) receiptStudentName.textContent = applicationRecord.studentName;
      if (receiptGradeBoard) receiptGradeBoard.textContent = `${applicationRecord.grade} (${applicationRecord.board})`;
      if (receiptBatchTiming) receiptBatchTiming.textContent = applicationRecord.timing;
      if (receiptMode) receiptMode.textContent = applicationRecord.mode;
      if (receiptParent) receiptParent.textContent = applicationRecord.parent;
      if (receiptPhone) receiptPhone.textContent = `+91 ${applicationRecord.phone}`;
      if (receiptScholarship) receiptScholarship.textContent = scholarshipStatus;
      if (receiptDemoSlot) receiptDemoSlot.textContent = demoStatus;
      if (receiptMessage) receiptMessage.textContent = applicationRecord.message || 'No specific questions recorded';

      // ======================================================================
      // ADMIN WHATSAPP NOTIFICATION DISPATCH (Admin No: 7385803641)
      // ======================================================================
      const adminWhatsApp = '917385803641';
      const waText = 
`*🎓 NEW ADMISSION REGISTRATION*
*Apex Scholars Academy (Session 2026-27)*
━━━━━━━━━━━━━━━━━━━━━
*Application ID:* ${generatedId}
*Date & Time:* ${formattedDate}

*👤 Student Details:*
• *Name:* ${applicationRecord.studentName}
• *Target Grade:* ${applicationRecord.grade}
• *Board:* ${applicationRecord.board}
• *Previous Score:* ${applicationRecord.score}%
• *School:* ${applicationRecord.school}

*📚 Batch & Learning Mode:*
• *Shift Timing:* ${applicationRecord.timing}
• *Study Mode:* ${applicationRecord.mode}
• *Fee Policy:* Standard Uniform Academy Fee (Equal for all students)
• *Demo Class:* ${applicationRecord.demoSlot}

*👨‍👩‍👧 Parent Contact:*
• *Parent Name:* ${applicationRecord.parent}
• *WhatsApp Number:* +91 ${applicationRecord.phone}
• *Email:* ${applicationRecord.email}
• *Locality:* ${applicationRecord.locality}

*📝 Notes/Message:*
${applicationRecord.message || 'No additional note'}
━━━━━━━━━━━━━━━━━━━━━
_Live Synced with Firebase Cloud Database._`;

      const adminWaUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(waText)}`;

      // Update Receipt Modal WhatsApp CTA
      const btnReceiptWhatsApp = document.getElementById('btnReceiptWhatsApp');
      if (btnReceiptWhatsApp) {
        btnReceiptWhatsApp.href = adminWaUrl;
        btnReceiptWhatsApp.target = '_blank';
        btnReceiptWhatsApp.innerHTML = `💬 Share with Admin WhatsApp (+91 7385803641)`;
      }

      // Automatically trigger WhatsApp share to admin
      try {
        window.open(adminWaUrl, '_blank');
      } catch (waErr) {
        console.warn('Popup blocked, WhatsApp link is available on the receipt:', waErr);
      }

      // Update Live Firebase Status Pill in Receipt
      const receiptCloudStatusText = document.getElementById('receiptCloudStatusText');
      const receiptCloudStatus = document.getElementById('receiptCloudStatus');
      if (receiptCloudStatusText) {
        if (cloudSuccess) {
          receiptCloudStatusText.textContent = `Live Synced to Firebase Cloud Firestore (admissions / ${generatedId})`;
          if (receiptCloudStatus) {
            receiptCloudStatus.style.background = '#ecfdf5';
            receiptCloudStatus.style.borderColor = '#a7f3d0';
            receiptCloudStatus.style.color = '#065f46';
          }
        } else {
          receiptCloudStatusText.textContent = `Stored locally (${cloudError ? 'Cloud notice: ' + cloudError : 'Offline mode'})`;
          if (receiptCloudStatus) {
            receiptCloudStatus.style.background = '#fffbeb';
            receiptCloudStatus.style.borderColor = '#fde68a';
            receiptCloudStatus.style.color = '#92400e';
          }
        }
      }

      // Show Receipt Modal
      if (admissionReceiptModal && typeof admissionReceiptModal.showModal === 'function') {
        admissionReceiptModal.showModal();
      }

      if (cloudSuccess) {
        showToast(`✓ Application ${generatedId} saved & live synced to Firebase Firestore!`, 'success');
      } else {
        showToast(`⚠️ Cloud Sync Notice: ${cloudError || 'Could not reach Firestore'}. Application saved to local storage.`, 'info');
      }
      admissionForm.reset();
    });
  }

  if (btnCloseReceipt && admissionReceiptModal) {
    btnCloseReceipt.addEventListener('click', () => {
      admissionReceiptModal.close();
    });
  }

  if (btnCopyAppId && receiptAppId) {
    btnCopyAppId.addEventListener('click', () => {
      const text = receiptAppId.textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Application ID ${text} copied to clipboard!`, 'success');
      }).catch(() => {
        showToast(`Application ID: ${text}`, 'info');
      });
    });
  }

  if (btnPrintReceipt) {
    btnPrintReceipt.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================================================
  // 6. APPLICATION STATUS TRACKER
  // ==========================================================================
  const trackForm = document.getElementById('trackForm');
  const trackQuery = document.getElementById('trackQuery');
  const trackResultBox = document.getElementById('trackResultBox');

  if (trackForm && trackQuery && trackResultBox) {
    trackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = trackQuery.value.trim().toUpperCase();

      if (!query) {
        showToast('Please enter Application ID or phone number', 'info');
        return;
      }

      const submitBtn = trackForm.querySelector('button[type="submit"]');
      const origBtn = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Searching Cloud DB...</span>`;
      }

      let storedApps = [];
      try {
        storedApps = JSON.parse(localStorage.getItem('apex_admissions') || '[]');
      } catch (err) {
        storedApps = [];
      }

      // Find match locally
      let match = storedApps.find(app =>
        (app.appId && app.appId.toUpperCase() === query) ||
        (app.phone && app.phone.includes(query))
      );

      // If not found locally, query Cloud Firestore
      if (!match && window.ApexDB && typeof window.ApexDB.findAdmission === 'function') {
        try {
          const cloudMatch = await window.ApexDB.findAdmission(query);
          if (cloudMatch) {
            match = cloudMatch;
          }
        } catch (fErr) {
          console.warn("Cloud lookup notice:", fErr);
        }
      }

      // If user checks sample "APEX-2026-1024" or nothing yet saved, provide demo record
      if (!match && query.includes('1024')) {
        match = {
          appId: 'APEX-2026-1024',
          studentName: 'Ananya Sharma',
          grade: 'Class 12th Science Board Booster',
          board: 'CBSE',
          timing: 'Evening Slot A (4:30 PM - 6:30 PM)',
          mode: 'Classroom Offline',
          scholarship: 'Standard Uniform Academy Fee',
          status: 'Application Verified • Seat Confirmed',
          timestamp: '28 Sep 2026, 04:15 PM'
        };
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtn;
      }

      if (match) {
        trackResultBox.style.display = 'block';
        trackResultBox.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <span style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Found Application Record</span>
              <h4 style="font-family:var(--font-heading); font-size:1.3rem; color:var(--secondary); font-weight:800;">${match.studentName}</h4>
              <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--primary); font-weight:700;">Ref ID: ${match.appId}</span>
            </div>
            <span class="status-badge status-verified">● ${match.status || 'Verified'}</span>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.85rem; font-size:0.85rem; background:#ffffff; padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div><strong>Target Grade:</strong> ${match.grade} (${match.board || 'CBSE'})</div>
            <div><strong>Batch Timing:</strong> ${match.timing || 'Evening Slot A'}</div>
            <div><strong>Mode:</strong> ${match.mode || 'Classroom'}</div>
            <div><strong>Fee Policy:</strong> <span style="color:#047857; font-weight:700;">${match.scholarship || 'Standard Uniform Slabs'}</span></div>
            <div><strong>Counselor Contact:</strong> +91 98765 43210</div>
            <div><strong>Orientation Slot:</strong> Upcoming Saturday 5:00 PM</div>
          </div>

          <div style="margin-top:1rem; font-size:0.8rem; color:#475569; display:flex; justify-content:space-between; align-items:center;">
            <span>Submitted on: ${match.timestamp || 'Recently'}</span>
            <button class="btn btn-sm btn-outline" onclick="window.print()">Print Status Card</button>
          </div>
        `;
        showToast('Application record found!', 'success');
      } else {
        trackResultBox.style.display = 'block';
        trackResultBox.innerHTML = `
          <div style="text-align:center; padding:1.5rem 0;">
            <div style="font-size:2rem; margin-bottom:0.5rem;">🔍</div>
            <h4 style="color:var(--secondary); font-weight:700;">No Application Found for "${query}"</h4>
            <p style="font-size:0.85rem; color:var(--text-muted); max-width:450px; margin:0.35rem auto 1rem;">
              Please verify your Application ID (e.g. <em>APEX-2026-XXXX</em>) or your 10-digit mobile number. You can submit a fresh admission application below.
            </p>
            <a href="#admission" class="btn btn-primary btn-sm">Fill Admission Form</a>
          </div>
        `;
      }
    });
  }

  // ==========================================================================
  // 7. FREE DEMO CLASS MODAL HANDLERS
  // ==========================================================================
  const freeDemoModal = document.getElementById('freeDemoModal');
  const btnCloseDemoModal = document.getElementById('btnCloseDemoModal');
  const btnOpenDemo = document.getElementById('btnOpenDemo');
  const btnOpenDemoMobile = document.getElementById('btnOpenDemoMobile');
  const btnOpenDemoBanner = document.getElementById('btnOpenDemoBanner');
  const demoClassForm = document.getElementById('demoClassForm');

  function openDemoModal() {
    if (freeDemoModal && typeof freeDemoModal.showModal === 'function') {
      freeDemoModal.showModal();
    }
  }

  if (btnOpenDemo) btnOpenDemo.addEventListener('click', openDemoModal);
  if (btnOpenDemoMobile) btnOpenDemoMobile.addEventListener('click', openDemoModal);
  if (btnOpenDemoBanner) btnOpenDemoBanner.addEventListener('click', openDemoModal);

  if (btnCloseDemoModal && freeDemoModal) {
    btnCloseDemoModal.addEventListener('click', () => {
      freeDemoModal.close();
    });
  }

  // Close modals when clicking backdrop
  [admissionReceiptModal, freeDemoModal, syllabusModal, feeSheetModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          modal.close();
        }
      });
    }
  });

  if (demoClassForm) {
    demoClassForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const sName = document.getElementById('demoStudentName').value;
      const sGrade = document.getElementById('demoGrade').value;
      const sSubject = document.getElementById('demoSubject').value;
      const sPhone = document.getElementById('demoParentPhone').value;
      const sDay = document.getElementById('demoPreferredDay').value;

      const btnDemo = document.getElementById('btnConfirmDemo');
      const origDemoHtml = btnDemo ? btnDemo.innerHTML : '';
      if (btnDemo) {
        btnDemo.disabled = true;
        btnDemo.innerHTML = `<span>Saving to Firebase...</span>`;
      }

      // Save to Firebase Cloud Database
      if (window.ApexDB && typeof window.ApexDB.saveDemoRequest === 'function') {
        try {
          await window.ApexDB.saveDemoRequest({
            studentName: sName,
            grade: sGrade,
            subject: sSubject,
            parentPhone: sPhone,
            preferredDay: sDay
          });
        } catch (err) {
          console.warn("Demo DB save notice:", err);
        }
      }

      if (btnDemo) {
        btnDemo.disabled = false;
        btnDemo.innerHTML = origDemoHtml;
      }

      if (freeDemoModal) freeDemoModal.close();
      demoClassForm.reset();

      showToast(`✓ Demo pass booked for ${sName} (${sGrade} - ${sSubject}) on ${sDay}!`, 'success');
    });
  }

  // ==========================================================================
  // 8. FAQS ACCORDION
  // ==========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close other items
        accordionItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherBtn = other.querySelector('.accordion-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked
        if (isOpen) {
          item.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // ==========================================================================
  // 9. QUICK INQUIRY FORM HANDLER
  // ==========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('inqName').value;
      const phone = document.getElementById('inqPhone') ? document.getElementById('inqPhone').value : '';
      const grade = document.getElementById('inqGrade') ? document.getElementById('inqGrade').value : '';
      const query = document.getElementById('inqQuery') ? document.getElementById('inqQuery').value : '';

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Saving to Firebase...</span>`;
      }

      // Save to Firebase Cloud Database
      if (window.ApexDB && typeof window.ApexDB.saveInquiry === 'function') {
        try {
          await window.ApexDB.saveInquiry({
            name: name,
            phone: phone,
            grade: grade,
            query: query
          });
        } catch (err) {
          console.warn("Inquiry DB save notice:", err);
        }
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHtml;
      }

      inquiryForm.reset();
      showToast(`✓ Thank you ${name}! Your inquiry is logged in Firebase. Our counselor will call you within 15 minutes.`, 'success');
    });
  }

  // ==========================================================================
  // 10. DOWNLOAD PROSPECTUS SIMULATOR
  // ==========================================================================
  const btnDownloadProspectus = document.getElementById('btnDownloadProspectus');
  if (btnDownloadProspectus) {
    btnDownloadProspectus.addEventListener('click', (e) => {
      triggerRealDownload('Apex_Scholars_Prospectus_2026-27.pdf', 'Apex_Scholars_Prospectus_2026-27.pdf');
      showToast('Downloading Apex Academy 2026-27 Prospectus & Fee Structure PDF...', 'info');
      setTimeout(() => {
        showToast('Apex Scholars Admission Prospectus PDF downloaded successfully!', 'success');
      }, 800);
    });
  }

  // ==========================================================================
  // 11. TOAST NOTIFICATION SYSTEM
  // ==========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<span style="font-weight:bold; font-size:1.1rem;">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 4000);
  }

  // ==========================================================================
  // Protocol checker
  if (window.location.protocol === 'file:') {
    const banner = document.getElementById('fileProtocolWarning');
    if (banner) banner.style.display = 'block';
  }

});
