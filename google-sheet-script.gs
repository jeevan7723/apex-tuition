/**
 * ============================================================================
 * SANGLI SHIKSHAN SANSTHA - GOOGLE SHEETS / EXCEL LIVE CONNECTOR
 * ============================================================================
 * When someone submits the Admission Application on your website,
 * this script automatically receives the data and saves it as a new row
 * in this Google Sheet in real-time.
 *
 * HOW TO VIEW ON LAPTOP & MOBILE:
 * 1. Laptop: Open this Google Sheet directly in any browser (Chrome/Edge).
 *    Click File > Download > Microsoft Excel (.xlsx) anytime to save locally.
 * 2. Mobile: Install the free "Google Sheets" app from Play Store or App Store.
 *    Log into your Google account to view, search, and call parents on the go!
 *
 * 3-MINUTE SETUP INSTRUCTIONS:
 * 1. In your Google Sheet, go to menu: Extensions > Apps Script
 * 2. Delete any existing code, and paste ALL of this code into Code.gs
 * 3. Click the blue "Deploy" button at top right > "New deployment"
 * 4. Select type: "Web app" (click the gear icon ⚙️ if not visible)
 * 5. Configuration:
 *    - Description: "Admission Form Webhook"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (REQUIRED so website visitors can submit)
 * 6. Click "Deploy", then "Authorize access" (log in with your Google account)
 * 7. Copy the "Web app URL" (it looks like: https://script.google.com/macros/s/.../exec)
 * 8. Paste this URL into the Admission Page Admin Settings or in app.js!
 * ============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other submissions to finish writing
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Admissions') || ss.getActiveSheet();

    // Set sheet name to 'Admissions' if default
    if (sheet.getName() === 'Sheet1') {
      sheet.setName('Admissions');
    }

    // Auto-create and style header row if sheet is brand new
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Submission Date & Time",
        "Application ID",
        "Student Full Name",
        "Date of Birth",
        "School / College",
        "Previous Score (%)",
        "Academic Course / Program",
        "Target Board / Exam",
        "Preferred Shift Timing",
        "Study Mode",
        "Parent / Guardian Name",
        "Parent Phone Number",
        "Parent Email Address",
        "Residential Area / City",
        "Special Concerns / Notes",
        "Free Demo Slot",
        "Admission Status"
      ];

      sheet.appendRow(headers);

      // Professional styling: Sangli Navy Blue background, white bold text
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold")
                 .setBackground("#1e3a8a")
                 .setFontColor("#ffffff")
                 .setFontFamily("Arial")
                 .setFontSize(11)
                 .setHorizontalAlignment("center")
                 .setVerticalAlignment("middle");
      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1);
    }

    // Parse incoming JSON data
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Clean Indian formatted phone number (prepends single quote ' so Excel preserves leading 0)
    var rawPhone = String(data.phone || data.parentPhone || '').replace(/[^0-9]/g, '');
    var displayPhone = rawPhone ? ("'" + rawPhone) : '';

    var submissionDate = data.timestamp || new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    var newRow = [
      submissionDate,
      data.appId || ('SSS-' + Math.floor(1000 + Math.random() * 9000)),
      data.studentName || (data.firstName ? (data.firstName + ' ' + (data.lastName || '')) : 'Student'),
      data.dob || '',
      data.school || '',
      data.score ? (data.score + '%') : '',
      data.grade || '',
      data.board || '',
      data.timing || '',
      data.mode || '',
      data.parent || data.parentName || '',
      displayPhone,
      data.email || data.parentEmail || '',
      data.locality || '',
      data.message || '',
      data.demoSlot || 'Direct Enrollment',
      data.status || 'Application Received • Seat Provisionally Held'
    ];

    sheet.appendRow(newRow);

    var lastRowIdx = sheet.getLastRow();

    // Alternating row styling & alignment
    var rowRange = sheet.getRange(lastRowIdx, 1, 1, newRow.length);
    rowRange.setFontFamily("Arial")
            .setFontSize(10)
            .setVerticalAlignment("middle");
    sheet.setRowHeight(lastRowIdx, 26);

    if (lastRowIdx % 2 === 0) {
      rowRange.setBackground("#f8fafc");
    }

    // Auto-fit columns to prevent text clipping
    for (var col = 1; col <= newRow.length; col++) {
      sheet.autoResizeColumn(col);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Row added successfully',
        row: lastRowIdx,
        appId: data.appId
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      sanstha: 'Sangli Shikshan Sanstha',
      system: 'Google Sheets & Excel Cloud Sync API',
      message: 'Service is running 24/7! Submissions to this endpoint will append rows into your Google Sheet.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
