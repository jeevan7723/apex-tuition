/**
 * ============================================================================
 * SANGLI SHIKSHAN SANSTHA - GOOGLE SHEETS & EXCEL LIVE CONNECTOR
 * ============================================================================
 * Clean, Executive, Beautifully Formatted Admissions Spreadsheet.
 *
 * FEATURES INCLUDED:
 * 1. Professional Sangli Navy Blue Headers with White Bold Typography.
 * 2. Logical, neatly arranged columns (Sr. No, ID, Student, Course, Parent, Mobile, etc.)
 * 3. One-Click Clickable WhatsApp Link formula for every parent.
 * 4. Alternating soft row colors (#ffffff & #f8fafc) with subtle borders.
 * 5. Perfectly tailored column widths (no clipped names or text).
 * 6. Frozen top row & Filter buttons enabled for easy sorting.
 * 7. Self-healing: Automatically formats new incoming rows neatly.
 *
 * HOW TO APPLY:
 * 1. Open your Google Sheet > Extensions > Apps Script.
 * 2. Replace all code in Code.gs with this code and click Save (💾).
 * 3. Deploy > Manage deployments > Edit (pencil ✏️) > Version: "New version"
 *    > Who has access: "Anyone" > Deploy!
 * 4. (Optional) Run function "formatExistingSheet" in Apps Script to instantly
 *    beautify all existing data in your sheet.
 * ============================================================================
 */

// Define Official Column Headers in neat logical order
var HEADERS = [
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
  "Direct WhatsApp",
  "Parent Email Address",
  "Current School / College",
  "City / Locality",
  "Student Notes / Questions",
  "Trial Demo Slot",
  "Admission Status"
];

// Optimal Column Widths (in pixels) for pristine display
var COLUMN_WIDTHS = [
  65,   // 1: Sr. No.
  145,  // 2: Application ID
  165,  // 3: Date & Time
  190,  // 4: Student Full Name
  240,  // 5: Academic Program
  115,  // 6: Target Board
  105,  // 7: Previous Score
  175,  // 8: Shift Timing
  130,  // 9: Study Mode
  180,  // 10: Parent Name
  140,  // 11: Parent Mobile
  125,  // 12: Direct WhatsApp
  200,  // 13: Parent Email
  190,  // 14: School / College
  150,  // 15: City / Locality
  260,  // 16: Student Notes
  160,  // 17: Demo Slot
  180   // 18: Admission Status
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Admissions') || ss.getActiveSheet();

    if (sheet.getName() === 'Sheet1') {
      sheet.setName('Admissions');
    }

    // Auto-create and format header if sheet is completely new
    if (sheet.getLastRow() === 0) {
      applyHeaderFormatting(sheet);
    }

    // Parse incoming data
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

    var nextRowIdx = sheet.getLastRow() + 1;
    var srNo = nextRowIdx - 1; // 1, 2, 3...

    // Clean Phone number
    var rawPhone = String(data.phone || data.parentPhone || '').replace(/[^0-9]/g, '');
    var displayPhone = rawPhone ? ("'" + rawPhone) : '';

    var submissionDate = data.timestamp || new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    var studentFullName = data.studentName || (data.firstName ? (data.firstName + ' ' + (data.lastName || '')) : 'Student');
    var targetScore = data.score ? (data.score + '%') : '';
    var parentFullName = data.parent || data.parentName || 'Parent';

    // Clickable WhatsApp formula
    var whatsAppFormula = rawPhone 
      ? '=HYPERLINK("https://wa.me/91' + rawPhone + '", "💬 WhatsApp")'
      : '-';

    var newRow = [
      srNo,                                                                 // 1. Sr. No.
      data.appId || ('SSS-' + Math.floor(1000 + Math.random() * 9000)),     // 2. Application ID
      submissionDate,                                                       // 3. Date & Time
      studentFullName,                                                      // 4. Student Name
      data.grade || '',                                                     // 5. Program
      data.board || '',                                                     // 6. Board
      targetScore,                                                          // 7. Score %
      data.timing || '',                                                    // 8. Shift Timing
      data.mode || '',                                                      // 9. Study Mode
      parentFullName,                                                       // 10. Parent Name
      displayPhone,                                                         // 11. Parent Mobile
      whatsAppFormula,                                                      // 12. WhatsApp Link
      data.email || data.parentEmail || '',                                 // 13. Email
      data.school || '',                                                    // 14. School
      data.locality || '',                                                  // 15. Locality
      data.message || '',                                                   // 16. Notes
      data.demoSlot || 'Direct Enrollment',                                 // 17. Demo Slot
      data.status || 'Verified • Seat Provisionally Held'                   // 18. Status
    ];

    sheet.appendRow(newRow);

    // Apply neat formatting to the newly appended row
    formatSingleRow(sheet, nextRowIdx);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Row added and formatted neatly',
        row: nextRowIdx,
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

/**
 * Applies professional executive styling to the Header Row
 */
function applyHeaderFormatting(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold")
             .setBackground("#0f2a66")   // Deep Sangli Blue
             .setFontColor("#ffffff")   // Crisp White
             .setFontFamily("Arial")
             .setFontSize(10.5)
             .setVerticalAlignment("middle")
             .setWrap(false);

  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  // Set tailored column widths
  for (var i = 0; i < COLUMN_WIDTHS.length; i++) {
    sheet.setColumnWidth(i + 1, COLUMN_WIDTHS[i]);
  }
}

/**
 * Neatly formats an individual data row
 */
function formatSingleRow(sheet, rowIdx) {
  var range = sheet.getRange(rowIdx, 1, 1, HEADERS.length);
  
  range.setFontFamily("Arial")
       .setFontSize(10)
       .setVerticalAlignment("middle");

  sheet.setRowHeight(rowIdx, 32);

  // Subtle alternating background
  var isEven = (rowIdx % 2 === 0);
  range.setBackground(isEven ? "#f8fafc" : "#ffffff");

  // Subtle border around cells
  range.setBorder(true, true, true, true, true, true, "#e2e8f0", SpreadsheetApp.BorderStyle.SOLID);

  // Specific cell styling:
  // Col 1: Sr. No (Centered, muted bold)
  sheet.getRange(rowIdx, 1).setHorizontalAlignment("center").setFontWeight("bold").setFontColor("#475569");
  
  // Col 2: Application ID (Centered, navy blue monospace badge)
  sheet.getRange(rowIdx, 2).setHorizontalAlignment("center").setFontWeight("bold").setFontColor("#1e3a8a").setFontFamily("Courier New");

  // Col 3: Date & Time (Centered)
  sheet.getRange(rowIdx, 3).setHorizontalAlignment("center").setFontColor("#475569");

  // Col 4: Student Full Name (Bold)
  sheet.getRange(rowIdx, 4).setHorizontalAlignment("left").setFontWeight("bold").setFontColor("#0f172a");

  // Col 6: Target Board (Centered)
  sheet.getRange(rowIdx, 6).setHorizontalAlignment("center");

  // Col 7: Previous Score (Centered, Emerald Bold)
  sheet.getRange(rowIdx, 7).setHorizontalAlignment("center").setFontWeight("bold").setFontColor("#047857");

  // Col 9: Study Mode (Centered)
  sheet.getRange(rowIdx, 9).setHorizontalAlignment("center");

  // Col 11: Parent Phone (Centered, monospace)
  sheet.getRange(rowIdx, 11).setHorizontalAlignment("center").setFontFamily("Courier New").setFontWeight("bold");

  // Col 12: WhatsApp Link (Centered, green text)
  sheet.getRange(rowIdx, 12).setHorizontalAlignment("center").setFontColor("#059669").setFontWeight("bold");

  // Col 16: Student Notes (Text wrap enabled)
  sheet.getRange(rowIdx, 16).setWrap(true).setFontColor("#475569");

  // Col 18: Status badge (Soft green background with dark green bold text)
  sheet.getRange(rowIdx, 18)
       .setHorizontalAlignment("center")
       .setFontWeight("bold")
       .setFontColor("#065f46")
       .setBackground("#d1fae5");
}

/**
 * UTILITY: Run this function in Apps Script anytime to reformat
 * all existing rows in your spreadsheet into this neat, beautiful layout!
 */
function formatExistingSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Admissions') || ss.getActiveSheet();
  
  if (sheet.getName() === 'Sheet1') {
    sheet.setName('Admissions');
  }

  // 1. Format Header
  applyHeaderFormatting(sheet);

  var totalRows = sheet.getLastRow();
  if (totalRows <= 1) {
    SpreadsheetApp.getUi().alert("Header formatted successfully! Your sheet is ready for new submissions.");
    return;
  }

  // 2. Format every existing data row
  for (var r = 2; r <= totalRows; r++) {
    formatSingleRow(sheet, r);
  }

  SpreadsheetApp.getUi().alert("Success! All " + (totalRows - 1) + " rows have been neatly arranged and formatted.");
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'active',
      sanstha: 'Sangli Shikshan Sanstha',
      system: 'Google Sheets & Excel Live Connector API',
      message: 'Service is active 24/7! Submissions to this endpoint will append neatly formatted rows.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
