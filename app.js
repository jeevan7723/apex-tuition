/**
 * Sangli Shikshan Sanstha - Tuition & Admission Web Application
 * Handles tuition filtering, dynamic fee & scholarship calculation,
 * admission application submissions, receipt printing, and status tracking.
 */

document.addEventListener('DOMContentLoaded', () => {

  // Default Google Sheets Webhook URL for Sangli Shikshan Sanstha
  const DEFAULT_GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyddYRf45qYdqHieYHN5Hmf7XDHzN77z-XrSQvDvP5yLK-KP4YiUueCfk4_JKoSp9Lu/exec";

  // ==========================================================================
  // URL QUERY PARAMETER PREFILL HANDLER (e.g. admission.html?grade=...&course=...)
  // ==========================================================================
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const paramGrade = searchParams.get('grade');
    const paramCourse = searchParams.get('course');
    const admissionGrade = document.getElementById('admissionGrade');
    if (admissionGrade && paramGrade) {
      const pLower = paramGrade.toLowerCase().trim();
      for (let i = 0; i < admissionGrade.options.length; i++) {
        const optVal = admissionGrade.options[i].value.toLowerCase().trim();
        if (optVal === pLower || optVal.includes(pLower) || pLower.includes(optVal)) {
          admissionGrade.selectedIndex = i;
          break;
        }
      }
      if (paramCourse) {
        setTimeout(() => {
          if (typeof showToast === 'function') {
            showToast(`Selected "${paramCourse}" — Please fill in the student details below!`, 'info');
          }
        }, 350);
      }
    }
  } catch (err) {
    // Ignore URL parse errors
  }


  // ==========================================================================
  // 1B. THEMED CUSTOM SELECT COMPONENT
  // ==========================================================================
  function initCustomSelects() {
    const selects = document.querySelectorAll('select:not(.custom-select-native):not([data-no-custom])');

    selects.forEach(select => {
      if (select.closest('.custom-select-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'custom-select-wrapper';
      if (select.className) {
        select.className.split(' ').forEach(cls => {
          if (cls && cls !== 'custom-select-native') wrapper.classList.add(cls);
        });
      }
      if (select.id) {
        wrapper.setAttribute('data-select-id', select.id);
      }

      // Insert wrapper before select, then place select inside
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);
      select.classList.add('custom-select-native');
      select.style.cssText = "position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;border:0!important;opacity:0!important;pointer-events:none!important;visibility:hidden!important;";

      // Create Trigger Button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger';
      trigger.setAttribute('role', 'combobox');
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      if (select.id) {
        trigger.id = `${select.id}-trigger`;
      }

      const valueSpan = document.createElement('span');
      valueSpan.className = 'custom-select-value';

      const arrowSpan = document.createElement('span');
      arrowSpan.className = 'custom-select-arrow';
      arrowSpan.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

      trigger.appendChild(valueSpan);
      trigger.appendChild(arrowSpan);
      wrapper.appendChild(trigger);

      const dropdown = document.createElement('div');
      dropdown.className = 'custom-select-dropdown';
      dropdown.setAttribute('role', 'listbox');
      dropdown.style.display = 'none';
      wrapper.appendChild(dropdown);

      function buildDropdownOptions() {
        dropdown.innerHTML = '';
        const currentOpt = select.options[select.selectedIndex];
        if (currentOpt) {
          valueSpan.textContent = currentOpt.textContent;
          if (currentOpt.disabled || currentOpt.value === '') {
            valueSpan.classList.add('is-placeholder');
          } else {
            valueSpan.classList.remove('is-placeholder');
          }
        } else {
          valueSpan.textContent = '';
        }

        let optIndex = 0;
        Array.from(select.children).forEach(child => {
          const tag = child.tagName.toLowerCase();
          if (tag === 'optgroup') {
            const groupHeader = document.createElement('div');
            groupHeader.className = 'custom-select-optgroup';
            groupHeader.textContent = child.label;
            dropdown.appendChild(groupHeader);

            Array.from(child.children).forEach(opt => {
              appendOption(opt, optIndex++);
            });
          } else if (tag === 'option') {
            appendOption(child, optIndex++);
          }
        });

        function appendOption(opt, idx) {
          const item = document.createElement('div');
          item.className = 'custom-select-option';
          item.setAttribute('role', 'option');
          item.setAttribute('data-value', opt.value);
          item.setAttribute('data-index', idx);
          item.textContent = opt.textContent;

          if (opt.disabled) {
            item.classList.add('is-disabled');
            item.setAttribute('aria-disabled', 'true');
          }

          if (idx === select.selectedIndex) {
            item.classList.add('is-selected');
            item.setAttribute('aria-selected', 'true');
          } else {
            item.setAttribute('aria-selected', 'false');
          }

          const checkIcon = document.createElement('span');
          checkIcon.className = 'custom-select-check';
          checkIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          item.appendChild(checkIcon);

          item.addEventListener('click', (e) => {
            e.stopPropagation();
            if (opt.disabled) return;
            select.selectedIndex = idx;
            select.value = opt.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            select.dispatchEvent(new Event('input', { bubbles: true }));
            closeDropdown();
            trigger.focus({ preventScroll: true });
            if (window.scrollX > 0) {
              window.scrollTo(0, window.scrollY);
            }
          });

          dropdown.appendChild(item);
        }
      }

      buildDropdownOptions();

      function openDropdown() {
        document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
          if (w !== wrapper) {
            w.classList.remove('is-open');
            const tr = w.querySelector('.custom-select-trigger');
            if (tr) tr.setAttribute('aria-expanded', 'false');
          }
        });

        // Always open in downward direction as requested
        wrapper.classList.remove('is-drop-up');

        wrapper.classList.add('is-open');
        dropdown.style.display = 'block';
        trigger.setAttribute('aria-expanded', 'true');

        const selected = dropdown.querySelector('.custom-select-option.is-selected');
        if (selected) {
          dropdown.scrollTop = selected.offsetTop - dropdown.offsetTop;
        }
        if (window.scrollX > 0) {
          window.scrollTo(0, window.scrollY);
        }
      }

      function closeDropdown() {
        wrapper.classList.remove('is-open');
        dropdown.style.display = 'none';
        trigger.setAttribute('aria-expanded', 'false');
        if (window.scrollX > 0) {
          window.scrollTo(0, window.scrollY);
        }
      }

      function toggleDropdown() {
        if (wrapper.classList.contains('is-open')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      }

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
        if (window.scrollX > 0) {
          window.scrollTo(0, window.scrollY);
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!wrapper.classList.contains('is-open')) {
            openDropdown();
          } else {
            const options = Array.from(dropdown.querySelectorAll('.custom-select-option:not(.is-disabled)'));
            if (!options.length) return;
            let currentFocusIdx = options.findIndex(o => o.classList.contains('is-focused') || o.classList.contains('is-selected'));
            if (e.key === 'ArrowDown') {
              currentFocusIdx = (currentFocusIdx + 1) % options.length;
            } else if (e.key === 'ArrowUp') {
              currentFocusIdx = (currentFocusIdx - 1 + options.length) % options.length;
            } else if (e.key === 'Enter' || e.key === ' ') {
              const focused = dropdown.querySelector('.custom-select-option.is-focused') || options[currentFocusIdx];
              if (focused) {
                focused.click();
                return;
              }
            }
            options.forEach((o, i) => o.classList.toggle('is-focused', i === currentFocusIdx));
            if (options[currentFocusIdx]) {
              dropdown.scrollTop = options[currentFocusIdx].offsetTop - dropdown.offsetTop;
            }
          }
        } else if (e.key === 'Escape') {
          closeDropdown();
        } else if (e.key === 'Tab') {
          closeDropdown();
        }
      });

      select.addEventListener('change', () => {
        buildDropdownOptions();
        const fieldWrap = wrapper.closest('.form-field, .form-group');
        if (fieldWrap && fieldWrap.classList.contains('has-error') && select.value) {
          fieldWrap.classList.remove('has-error');
        }
      });

      select.addEventListener('focus', () => {
        trigger.focus();
      });

      if (select.id) {
        const label = document.querySelector(`label[for="${select.id}"]`);
        if (label) {
          label.addEventListener('click', (e) => {
            e.preventDefault();
            trigger.focus();
            toggleDropdown();
          });
        }
      }

      // Observe DOM updates on select (e.g. from language translator)
      if (window.MutationObserver) {
        const observer = new MutationObserver(() => {
          buildDropdownOptions();
        });
        observer.observe(select, { childList: true, subtree: true, characterData: true });
      }

      wrapper.__rebuildOptions = buildDropdownOptions;
    });

    document.removeEventListener('click', handleOutsideSelectClick);
    document.addEventListener('click', handleOutsideSelectClick);

    window.removeEventListener('languageChanged', handleLanguageSwitchSelects);
    window.addEventListener('languageChanged', handleLanguageSwitchSelects);
  }

  function handleOutsideSelectClick(e) {
    if (!e.target.closest('.custom-select-wrapper')) {
      document.querySelectorAll('.custom-select-wrapper.is-open').forEach(w => {
        w.classList.remove('is-open');
        const tr = w.querySelector('.custom-select-trigger');
        if (tr) tr.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function handleLanguageSwitchSelects() {
    setTimeout(() => {
      document.querySelectorAll('.custom-select-wrapper').forEach(w => {
        if (typeof w.__rebuildOptions === 'function') {
          w.__rebuildOptions();
        }
      });
    }, 50);
  }


  initCustomSelects();

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

    // Close mobile nav when clicking links or action buttons inside it (exclude language switcher)
    mobileNavPanel.querySelectorAll('a, button:not(.lang-btn)').forEach(item => {
      item.addEventListener('click', () => {
        mobileNavPanel.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Book Free Demo button inside mobile drawer
    const btnOpenDemoMobile = document.getElementById('btnOpenDemoMobile');
    if (btnOpenDemoMobile) {
      btnOpenDemoMobile.addEventListener('click', () => {
        const demoModal = document.getElementById('freeDemoModal');
        if (demoModal && typeof demoModal.showModal === 'function') {
          demoModal.showModal();
        }
      });
    }

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

      const gradeValueMap = {
        '11-sci': 'Class 11 Science',
        '11-com': 'Class 11 Commerce',
        '12-sci': 'Class 12 Science',
        '12-com': 'Class 12 Commerce'
      };
      const mappedGrade = gradeValueMap[selectedGrade] || selectedGrade;
      window.location.href = `admission.html?grade=${encodeURIComponent(mappedGrade)}`;
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

      // Smoothly center the clicked tab in the mobile scroll container
      try {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch (err) {
        // Fallback for older browsers
      }

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

  // Prefill enrollment from tuition cards -> navigate to dedicated admission page
  const enrollBtns = document.querySelectorAll('.btn-enroll-prefill');
  enrollBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const grade = btn.dataset.grade;
      const course = btn.dataset.course || '';
      const gradeMapping = {
        '11-sci': 'Class 11 Science Foundation (PCM/PCB)',
        '11-com': 'Class 11 Commerce Excellence & Applied Math',
        '12-sci': 'Class 12 Science Board Booster & CUET Prep',
        '12-com': 'Class 12 Commerce Mastery & CA Foundation',
        'jee': 'Integrated JEE Main & Advanced (11th & 12th)',
        'neet': 'Integrated NEET-UG Medical Super-20 (11th & 12th)',
        'competitive': 'Integrated JEE Main & Advanced (11th & 12th)'
      };
      const targetGrade = (grade && gradeMapping[grade]) ? gradeMapping[grade] : (grade || '');
      window.location.href = `admission.html?grade=${encodeURIComponent(targetGrade)}&course=${encodeURIComponent(course)}`;
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
      badge: 'Welcome to Sangli Shikshan Sanstha',
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

    if (window.SansthaI18n && window.SansthaI18n.getLanguage() === 'mr') {
      window.SansthaI18n.translateElement(stepDetailLeft);
      window.SansthaI18n.translateElement(stepDetailRight);
    }
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

  // Per-course PDF mapping
  const coursePdfMap = {
    '11sci': {
      en: 'Sangli_Shikshan_Sanstha_Class11_Science_Syllabus.pdf',
      mr: 'Sangli_Shikshan_Sanstha_Class11_Science_Syllabus_Marathi.pdf',
      nameEn: 'Class 11th Science',
      nameMr: 'इयत्ता ११ वी सायन्स'
    },
    '12sci': {
      en: 'Sangli_Shikshan_Sanstha_Class12_Science_Syllabus.pdf',
      mr: 'Sangli_Shikshan_Sanstha_Class12_Science_Syllabus_Marathi.pdf',
      nameEn: 'Class 12th Science Board Booster',
      nameMr: 'इयत्ता १२ वी सायन्स बोर्ड बूस्टर'
    },
    'jee': {
      en: 'Sangli_Shikshan_Sanstha_JEE_Integrated_Syllabus.pdf',
      mr: 'Sangli_Shikshan_Sanstha_JEE_Integrated_Syllabus_Marathi.pdf',
      nameEn: 'Integrated JEE (Main + Advanced)',
      nameMr: 'एकात्मिक JEE (मेन + ॲडव्हान्स)'
    },
    'neet': {
      en: 'Sangli_Shikshan_Sanstha_NEET_Medical_Syllabus.pdf',
      mr: 'Sangli_Shikshan_Sanstha_NEET_Medical_Syllabus_Marathi.pdf',
      nameEn: 'Integrated NEET-UG Medical Super-20',
      nameMr: 'एकात्मिक NEET-UG मेडिकल सुपर-२०'
    }
  };

  // Bilingual PDF Download Link Synchronizer
  function updateBilingualDownloadLinks(lang) {
    const isMr = lang === 'mr' || (window.SansthaI18n && window.SansthaI18n.getLanguage() === 'mr');
    const syllabusFile = isMr ? 'Sangli_Shikshan_Sanstha_Syllabus_Guide_Marathi.pdf' : 'Sangli_Shikshan_Sanstha_Class11_12_Syllabus_Guide.pdf';
    const feeFile = isMr ? 'Sangli_Shikshan_Sanstha_Fee_Sheet_Marathi.pdf' : 'Sangli_Shikshan_Sanstha_Official_Fee_Sheet.pdf';
    const prospectusFile = isMr ? 'Sangli_Shikshan_Sanstha_Prospectus_Marathi.pdf' : 'Sangli_Shikshan_Sanstha_Prospectus_2026-27.pdf';

    const btnSyllabus = document.getElementById('btnDownloadSyllabusAction');
    if (btnSyllabus) {
      btnSyllabus.setAttribute('href', syllabusFile);
      btnSyllabus.setAttribute('download', syllabusFile);
    }
    const btnFee = document.getElementById('btnFeeSheetDownload');
    if (btnFee) {
      btnFee.setAttribute('href', feeFile);
      btnFee.setAttribute('download', feeFile);
    }
    const btnPros = document.getElementById('btnDownloadProspectus');
    if (btnPros) {
      btnPros.setAttribute('href', prospectusFile);
      btnPros.setAttribute('download', prospectusFile);
    }

    // Update each individual course download link
    document.querySelectorAll('.btn-download-course').forEach(btn => {
      const code = btn.dataset.coursePdf;
      const c = coursePdfMap[code];
      if (c) {
        const file = isMr ? c.mr : c.en;
        btn.setAttribute('href', file);
        btn.setAttribute('download', file);
      }
    });
  }

  // Handle click on per-course download button
  document.querySelectorAll('.btn-download-course').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const code = btn.dataset.coursePdf;
      const c = coursePdfMap[code];
      if (!c) return;
      const isMr = window.SansthaI18n && window.SansthaI18n.getLanguage() === 'mr';
      const file = isMr ? c.mr : c.en;
      triggerRealDownload(file, file);
      showToast(isMr ? `${c.nameMr} अभ्यासक्रम PDF डाउनलोड होत आहे...` : `Downloading ${c.nameEn} Syllabus PDF...`, 'info');
      setTimeout(() => {
        showToast(isMr ? `${c.nameMr} अभ्यासक्रम PDF यशस्वीरीत्या डाउनलोड झाली!` : `${c.nameEn} Syllabus PDF downloaded successfully!`, 'success');
      }, 700);
    });
  });

  window.addEventListener('languageChanged', (e) => {
    const lang = (e && e.detail && e.detail.lang) || (window.SansthaI18n ? window.SansthaI18n.getLanguage() : 'en');
    updateBilingualDownloadLinks(lang);
  });

  // Initial sync once DOM ready
  setTimeout(() => {
    const initialLang = window.SansthaI18n ? window.SansthaI18n.getLanguage() : 'en';
    updateBilingualDownloadLinks(initialLang);
  }, 100);

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
      e.preventDefault();
      const isMr = window.SansthaI18n && window.SansthaI18n.getLanguage() === 'mr';
      const file = isMr ? 'Sangli_Shikshan_Sanstha_Syllabus_Guide_Marathi.pdf' : 'Sangli_Shikshan_Sanstha_Class11_12_Syllabus_Guide.pdf';
      triggerRealDownload(file, file);
      showToast(isMr ? 'सांगली शिक्षण संस्था अभ्यासक्रम व फी मार्गदर्शक (मराठी) PDF डाउनलोड होत आहे...' : 'Downloading Sangli Shikshan Sanstha Syllabus & Curriculum Guide PDF...', 'info');
      setTimeout(() => {
        if (syllabusModal) syllabusModal.close();
        showToast(isMr ? 'अभ्यासक्रम व फी मार्गदर्शक यशस्वीरीत्या डाउनलोड झाले!' : 'Complete Syllabus & Fee Guide downloaded successfully!', 'success');
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
      e.preventDefault();
      const isMr = window.SansthaI18n && window.SansthaI18n.getLanguage() === 'mr';
      const file = isMr ? 'Sangli_Shikshan_Sanstha_Fee_Sheet_Marathi.pdf' : 'Sangli_Shikshan_Sanstha_Official_Fee_Sheet.pdf';
      triggerRealDownload(file, file);
      showToast(isMr ? 'अधिकृत फी वेळापत्रक (मराठी) PDF डाउनलोड होत आहे...' : `Downloading official fee sheet for ${activeFeeSheetCourse}...`, 'info');
      setTimeout(() => {
        showToast(isMr ? 'अधिकृत फी वेळापत्रक PDF यशस्वीरीत्या डाउनलोड झाले!' : 'Official Fee Sheet PDF downloaded successfully!', 'success');
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

  ['admissionGrade', 'boardType', 'preferredTiming', 'admissionMode', 'studentName', 'parentPhone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        const wrap = el.closest('.form-field');
        if (wrap && el.value && el.value.trim() !== '') {
          wrap.classList.remove('has-error');
        }
      });
      el.addEventListener('input', () => {
        const wrap = el.closest('.form-field');
        if (wrap && el.value && el.value.trim() !== '') {
          wrap.classList.remove('has-error');
        }
      });
    }
  });

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
      const isGradeValid = Boolean(admissionGrade && admissionGrade.value && admissionGrade.value.trim() !== '');
      const isBoardValid = Boolean(boardType && boardType.value && boardType.value.trim() !== '');
      const isTimingValid = Boolean(preferredTiming && preferredTiming.value && preferredTiming.value.trim() !== '');
      const isModeValid = Boolean(admissionMode && admissionMode.value && admissionMode.value.trim() !== '');

      checkField(studentName, 'errStudentName', isNameValid);
      checkField(parentPhone, 'errParentPhone', isPhoneValid);
      checkField(admissionGrade, 'errAdmissionGrade', isGradeValid);
      checkField(boardType, 'errBoardType', isBoardValid);
      checkField(preferredTiming, 'errPreferredTiming', isTimingValid);
      checkField(admissionMode, 'errAdmissionMode', isModeValid);

      if (!isNameValid) {
        showToast('Please enter Student Full Name.', 'info');
        if (studentName) studentName.focus();
        return;
      }

      if (!isGradeValid) {
        showToast('Please select an Academic Tuition Program / Course.', 'info');
        if (admissionGrade) admissionGrade.focus();
        return;
      }

      if (!isBoardValid) {
        showToast('Please select Target Board / Exam.', 'info');
        if (boardType) boardType.focus();
        return;
      }

      if (!isTimingValid) {
        showToast('Please select Preferred Shift Timing Slot.', 'info');
        if (preferredTiming) preferredTiming.focus();
        return;
      }

      if (!isModeValid) {
        showToast('Please select Preferred Study Mode.', 'info');
        if (admissionMode) admissionMode.focus();
        return;
      }

      if (!isPhoneValid) {
        showToast('Please enter a valid 10-digit Mobile Number.', 'info');
        if (parentPhone) parentPhone.focus();
        return;
      }

      // Safe values for submission
      const finalDob = (studentDob && studentDob.value) ? studentDob.value : '2008-01-01';
      const finalSchool = (currentSchool && currentSchool.value.trim()) ? currentSchool.value.trim() : 'Class 11/12 Student';
      const parsedScore = previousScore ? parseFloat(previousScore.value) : 85;
      const finalScore = (!isNaN(parsedScore) && parsedScore >= 35 && parsedScore <= 100) ? parsedScore : 85;
      const finalGrade = admissionGrade.value;
      const finalBoard = boardType.value;
      const finalTiming = preferredTiming.value;
      const finalMode = admissionMode.value;
      const finalParent = (parentName && parentName.value.trim()) ? parentName.value.trim() : `Parent of ${studentName.value.trim()}`;
      const finalEmail = (parentEmail && parentEmail.value.trim()) ? parentEmail.value.trim() : `${cleanPhone}@applicant.local`;
      const finalLocality = (residentialArea && residentialArea.value.trim()) ? residentialArea.value.trim() : 'City Area';

      // Extract student's first name for document ID and alphabetical sorting in Firestore
      const rawName = studentName.value.trim();
      const nameParts = rawName.split(/\s+/);
      const rawFirst = nameParts[0] || 'Student';
      const cleanFirst = rawFirst.replace(/[^a-zA-Z0-9]/g, '');
      const firstName = cleanFirst ? (cleanFirst.charAt(0).toUpperCase() + cleanFirst.slice(1).toLowerCase()) : 'Student';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Generate Unique Application ID prefixed by Student First Name (ensures alphabetical Firestore sorting)
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `${firstName}-${randomNum}`;
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
        firstName: firstName,
        lastName: lastName,
        studentName: rawName,
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
            firstName: applicationRecord.firstName,
            lastName: applicationRecord.lastName,
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

      // Sync with Google Sheets / Excel Webhook if configured
      let sheetSuccess = false;
      const sheetWebhookUrl = localStorage.getItem('sanstha_google_sheet_url') || DEFAULT_GOOGLE_SHEET_URL;
      if (sheetWebhookUrl) {
        try {
          await fetch(sheetWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(applicationRecord)
          });
          sheetSuccess = true;
          console.log('✅ [Google Sheet Sync] Application row appended successfully to Google Sheets');
        } catch (sErr) {
          console.warn('Google Sheet webhook sync notice:', sErr);
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
*Sangli Shikshan Sanstha (Session 2026-27)*
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

      // Update Live Firebase & Excel Status Pill in Receipt
      const receiptCloudStatusText = document.getElementById('receiptCloudStatusText');
      const receiptCloudStatus = document.getElementById('receiptCloudStatus');
      if (receiptCloudStatusText) {
        let msg = cloudSuccess 
          ? `Live Synced to Cloud Firestore (admissions / ${generatedId})` 
          : `Stored locally (${cloudError ? 'Cloud notice: ' + cloudError : 'Offline mode'})`;
        if (sheetSuccess) {
          msg += ` • Auto-Saved to Google Sheet & Excel`;
        }
        receiptCloudStatusText.textContent = msg;
        if (receiptCloudStatus) {
          receiptCloudStatus.style.background = '#ecfdf5';
          receiptCloudStatus.style.borderColor = '#a7f3d0';
          receiptCloudStatus.style.color = '#065f46';
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

      // Find match locally (by App ID, phone, student name, or first name)
      let match = storedApps.find(app =>
        (app.appId && app.appId.toUpperCase() === query) ||
        (app.phone && app.phone.includes(query)) ||
        (app.studentName && app.studentName.toUpperCase().includes(query)) ||
        (app.firstName && app.firstName.toUpperCase() === query) ||
        (app.appId && query.length >= 4 && app.appId.toUpperCase().includes(query))
      );

      // If not found locally, query Cloud Firestore
      if (!match && window.ApexDB && typeof window.ApexDB.findAdmission === 'function') {
        try {
          const rawQ = trackQuery.value.trim();
          const cloudMatch = await window.ApexDB.findAdmission(rawQ);
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
          appId: 'SSS-2026-1024',
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
            <div><strong>Counselor Contact:</strong> +91 73858 03641</div>
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
              Please verify your Application ID (e.g. <em>SSS-2026-XXXX</em>) or your 10-digit mobile number. You can submit a fresh admission application below.
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
      e.preventDefault();
      const isMr = window.SansthaI18n && window.SansthaI18n.getLanguage() === 'mr';
      const file = isMr ? 'Sangli_Shikshan_Sanstha_Prospectus_Marathi.pdf' : 'Sangli_Shikshan_Sanstha_Prospectus_2026-27.pdf';
      triggerRealDownload(file, file);
      showToast(isMr ? 'सांगली शिक्षण संस्था अधिकृत माहितीपुस्तिका (मराठी) PDF डाउनलोड होत आहे...' : 'Downloading Sangli Shikshan Sanstha 2026-27 Prospectus PDF...', 'info');
      setTimeout(() => {
        showToast(isMr ? 'सांगली शिक्षण संस्था माहितीपुस्तिका यशस्वीरीत्या डाउनलोड झाली!' : 'Sangli Shikshan Sanstha Admission Prospectus PDF downloaded successfully!', 'success');
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
  // 12. GOOGLE SHEETS & EXCEL SYNC CONTROLLER
  // ==========================================================================

  // Helper: Export admissions to Excel (.csv with UTF-8 BOM for 100% Excel compatibility)
  async function exportAdmissionsToExcel() {
    showToast('Preparing Excel export from Cloud database...', 'info');

    let records = [];
    if (window.ApexDB && typeof window.ApexDB.getAllAdmissions === 'function') {
      try {
        records = await window.ApexDB.getAllAdmissions();
      } catch (e) {
        console.warn('Could not fetch cloud admissions, falling back:', e);
      }
    }

    if (!records || records.length === 0) {
      try {
        records = JSON.parse(localStorage.getItem('apex_admissions') || '[]');
      } catch (e) {
        records = [];
      }
    }

    if (!records || records.length === 0) {
      showToast('No admission records found to export.', 'info');
      return;
    }

    // CSV Headers matching Google Sheet neat order
    const headers = [
      "Sr. No.",
      "Application ID",
      "Submission Date & Time",
      "Student Full Name",
      "Academic Program / Course",
      "Target Board",
      "Previous Score",
      "Shift Timing",
      "Study Mode",
      "Parent / Guardian Name",
      "Parent Mobile Number",
      "Parent Email Address",
      "Current School / College",
      "City / Locality",
      "Student Notes / Questions",
      "Trial Demo Slot",
      "Admission Status"
    ];

    // CSV row formatter (escapes commas, quotes, and newlines)
    function escapeCsvCell(val) {
      if (val === null || val === undefined) return '""';
      let str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }

    const rows = [headers.map(escapeCsvCell).join(',')];

    records.forEach((r, idx) => {
      const cleanPhone = String(r.phone || r.parentPhone || '').replace(/[^0-9]/g, '');
      const row = [
        idx + 1,
        r.appId || '',
        r.timestamp || r.formattedDate || r.submittedAt || '',
        r.studentName || `${r.firstName || ''} ${r.lastName || ''}`.trim(),
        r.grade || '',
        r.board || '',
        r.score ? `${r.score}%` : '',
        r.timing || '',
        r.mode || '',
        r.parent || r.parentName || '',
        cleanPhone ? `\t${cleanPhone}` : '', // Tab prefix prevents Excel scientific notation
        r.email || r.parentEmail || '',
        r.school || '',
        r.locality || '',
        r.message || '',
        r.demoSlot || '',
        r.status || 'Verified • Provisionally Held'
      ];
      rows.push(row.map(escapeCsvCell).join(','));
    });

    // \uFEFF is UTF-8 Byte Order Mark (BOM) so Microsoft Excel opens UTF-8 characters cleanly
    const csvContent = '\uFEFF' + rows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const nowStr = new Date().toISOString().slice(0, 10);
    link.download = `Sangli_Shikshan_Sanstha_Admissions_${nowStr}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`✓ Successfully exported ${records.length} applications to Excel!`, 'success');
  }

  // Populate interactive admissions table for mobile and laptop
  async function loadAndRenderSubmissionsTable(filterText = '') {
    const tableBody = document.getElementById('adminTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2rem; color:#64748b;">Loading admissions records from Cloud Database...</td></tr>`;

    let records = [];
    if (window.ApexDB && typeof window.ApexDB.getAllAdmissions === 'function') {
      try {
        records = await window.ApexDB.getAllAdmissions();
      } catch (e) {
        console.warn('Error fetching all admissions:', e);
      }
    }

    if (!records || records.length === 0) {
      try {
        records = JSON.parse(localStorage.getItem('apex_admissions') || '[]');
      } catch (e) {
        records = [];
      }
    }

    const counter = document.getElementById('adminSubmissionsCount');
    if (counter) counter.textContent = `${records.length} Registered`;

    const search = filterText.toLowerCase().trim();
    const filtered = records.filter(r => {
      if (!search) return true;
      const name = (r.studentName || `${r.firstName || ''} ${r.lastName || ''}`).toLowerCase();
      const phone = String(r.phone || r.parentPhone || '').toLowerCase();
      const id = String(r.appId || '').toLowerCase();
      const grade = String(r.grade || '').toLowerCase();
      return name.includes(search) || phone.includes(search) || id.includes(search) || grade.includes(search);
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding:2.5rem; color:#64748b;">
            <div style="font-size:1.8rem; margin-bottom:0.5rem;">📂</div>
            <strong>No admission applications found matching "${filterText}".</strong>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map((r, idx) => {
      const sName = r.studentName || `${r.firstName || ''} ${r.lastName || ''}`.trim() || 'Student';
      const cleanPhone = String(r.phone || r.parentPhone || '').replace(/[^0-9]/g, '');
      const waLink = cleanPhone ? `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${r.parent || sName}, Greetings from Sangli Shikshan Sanstha regarding your admission application ${r.appId}.`)}` : '#';
      const callLink = cleanPhone ? `tel:+91${cleanPhone}` : '#';

      return `
        <tr>
          <td style="font-weight:700; color:#64748b;">${idx + 1}</td>
          <td><strong style="color:var(--primary); font-family:monospace;">${r.appId || 'SSS-2026'}</strong></td>
          <td style="white-space:nowrap; font-size:0.8rem; color:#64748b;">${r.timestamp || r.formattedDate || 'Recent'}</td>
          <td>
            <strong>${sName}</strong>
            <div style="font-size:0.775rem; color:#64748b;">${r.school || 'Class 11/12'}</div>
          </td>
          <td>
            <div style="font-weight:600;">${r.grade || 'Science Wing'}</div>
            <div style="font-size:0.75rem; color:#64748b;">${r.board || 'Board'} • ${r.timing || 'Shift'}</div>
          </td>
          <td><span class="admin-badge" style="background:#eff6ff; color:#1d4ed8;">${r.score ? r.score + '%' : '85%'}</span></td>
          <td>${r.parent || r.parentName || 'Parent'}</td>
          <td style="font-family:monospace; white-space:nowrap;">+91 ${cleanPhone || '9876543210'}</td>
          <td>
            <div class="admin-contact-btns">
              ${cleanPhone ? `
                <a href="${callLink}" class="admin-icon-btn phone" title="Call Parent">
                  📞 Call
                </a>
                <a href="${waLink}" target="_blank" rel="noopener" class="admin-icon-btn whatsapp" title="Chat on WhatsApp">
                  💬 WhatsApp
                </a>
              ` : '<span style="color:#94a3b8;">No phone</span>'}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Hook up admin Excel and Submissions viewer buttons
  const btnExportAdmissionsExcel = document.getElementById('btnExportAdmissionsExcel');
  const btnExportFromModal = document.getElementById('btnExportFromModal');
  const btnOpenSubmissionsViewer = document.getElementById('btnOpenSubmissionsViewer');
  const adminSubmissionsModal = document.getElementById('adminSubmissionsModal');
  const btnCloseSubmissionsModal = document.getElementById('btnCloseSubmissionsModal');
  const btnRefreshSubmissions = document.getElementById('btnRefreshSubmissions');
  const adminSearchInput = document.getElementById('adminSearchInput');

  if (btnExportAdmissionsExcel) {
    btnExportAdmissionsExcel.addEventListener('click', exportAdmissionsToExcel);
  }
  if (btnExportFromModal) {
    btnExportFromModal.addEventListener('click', exportAdmissionsToExcel);
  }

  if (btnOpenSubmissionsViewer && adminSubmissionsModal) {
    btnOpenSubmissionsViewer.addEventListener('click', () => {
      adminSubmissionsModal.showModal();
      loadAndRenderSubmissionsTable();
    });
  }

  if (btnCloseSubmissionsModal && adminSubmissionsModal) {
    btnCloseSubmissionsModal.addEventListener('click', () => {
      adminSubmissionsModal.close();
    });
  }

  if (btnRefreshSubmissions) {
    btnRefreshSubmissions.addEventListener('click', () => {
      const q = adminSearchInput ? adminSearchInput.value : '';
      loadAndRenderSubmissionsTable(q);
      showToast('Refreshed admissions list from cloud.', 'info');
    });
  }

  if (adminSearchInput) {
    adminSearchInput.addEventListener('input', (e) => {
      loadAndRenderSubmissionsTable(e.target.value);
    });
  }

  // Google Sheet Webhook Configuration Modal Handlers
  const btnOpenSheetConfigModal = document.getElementById('btnOpenSheetConfigModal');
  const googleSheetConfigModal = document.getElementById('googleSheetConfigModal');
  const btnCloseSheetModal = document.getElementById('btnCloseSheetModal');
  const googleSheetWebhookUrl = document.getElementById('googleSheetWebhookUrl');
  const btnSaveSheetWebhook = document.getElementById('btnSaveSheetWebhook');
  const btnTestSheetWebhook = document.getElementById('btnTestSheetWebhook');

  if (btnOpenSheetConfigModal && googleSheetConfigModal) {
    btnOpenSheetConfigModal.addEventListener('click', () => {
      if (googleSheetWebhookUrl) {
        googleSheetWebhookUrl.value = localStorage.getItem('sanstha_google_sheet_url') || DEFAULT_GOOGLE_SHEET_URL;
      }
      googleSheetConfigModal.showModal();
    });
  }

  if (btnCloseSheetModal && googleSheetConfigModal) {
    btnCloseSheetModal.addEventListener('click', () => {
      googleSheetConfigModal.close();
    });
  }

  if (btnSaveSheetWebhook) {
    btnSaveSheetWebhook.addEventListener('click', () => {
      const url = googleSheetWebhookUrl ? googleSheetWebhookUrl.value.trim() : '';
      if (!url) {
        localStorage.removeItem('sanstha_google_sheet_url');
        showToast('Google Sheet Webhook URL cleared.', 'info');
      } else {
        localStorage.setItem('sanstha_google_sheet_url', url);
        showToast('✓ Google Sheet Webhook URL saved successfully!', 'success');
      }
      if (googleSheetConfigModal) googleSheetConfigModal.close();
    });
  }

  if (btnTestSheetWebhook) {
    btnTestSheetWebhook.addEventListener('click', async () => {
      const url = googleSheetWebhookUrl ? googleSheetWebhookUrl.value.trim() : '';
      if (!url) {
        showToast('Please enter your Google Apps Script Web App URL first.', 'info');
        return;
      }
      btnTestSheetWebhook.disabled = true;
      btnTestSheetWebhook.textContent = '⏳ Testing connection...';
      try {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            appId: 'TEST-VERIFY',
            studentName: 'Test Student (Verification Ping)',
            grade: 'Class 11 Science',
            board: 'CBSE',
            phone: '9876543210',
            timestamp: new Date().toLocaleString('en-IN'),
            status: 'Test Connection'
          })
        });
        showToast('✓ Test ping sent to Google Sheets! Check your sheet for the test row.', 'success');
      } catch (err) {
        showToast('⚠️ Could not connect to Webhook: ' + err.message, 'info');
      } finally {
        btnTestSheetWebhook.disabled = false;
        btnTestSheetWebhook.textContent = '🧪 Test Webhook Ping';
      }
    });
  }

  // Pre-load admission counter on load
  if (document.getElementById('adminSubmissionsCount')) {
    if (window.ApexDB && typeof window.ApexDB.getAllAdmissions === 'function') {
      window.ApexDB.getAllAdmissions().then(records => {
        const el = document.getElementById('adminSubmissionsCount');
        if (el && records) el.textContent = `${records.length} Registered`;
      }).catch(() => {});
    }
  }

  // ==========================================================================
  // Protocol checker
  if (window.location.protocol === 'file:') {
    const banner = document.getElementById('fileProtocolWarning');
    if (banner) banner.style.display = 'block';
  }

});

