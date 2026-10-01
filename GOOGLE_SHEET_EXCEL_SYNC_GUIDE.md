# 📊 सांगली शिक्षण संस्था (Sangli Shikshan Sanstha)
## Live Google Sheets & Excel Synchronization Guide

This guide enables real-time synchronization between the online Admission Application Form and your **Google Sheet / Microsoft Excel**, neatly arranged and formatted for executive review.

---

### 📋 Neatly Arranged Column Layout in Your Sheet

Your spreadsheet is automatically formatted with professional **Sangli Navy Blue headers (`#0f2a66`)**, bold white text, alternating soft rows, and tailored column widths:

| Col | Header Name | Description / Format |
|---|---|---|
| **A** | **Sr. No.** | Auto-numbering (`1, 2, 3...`) centered |
| **B** | **Application ID** | Unique monospace tracking code (e.g. `Aarav-4821`) |
| **C** | **Submission Date & Time** | Date and time (e.g. `01-Oct-2026, 02:45 PM`) |
| **D** | **Student Full Name** | Bold student name |
| **E** | **Academic Program / Course** | Enrolled tuition program (e.g. Class 11 Science) |
| **F** | **Target Board** | CBSE / State Board / ICSE / JEE / NEET |
| **G** | **Previous Score** | Previous academic percentage (e.g. `88%`) |
| **H** | **Shift Timing** | Morning / Evening / Weekend shift |
| **I** | **Study Mode** | Classroom Offline / Hybrid |
| **J** | **Parent / Guardian Name** | Full name of parent or guardian |
| **K** | **Parent Mobile Number** | 10-digit mobile number formatted as text |
| **L** | **Direct WhatsApp** | **Clickable button:** Opens direct WhatsApp chat with parent! |
| **M** | **Parent Email Address** | Email address for communications |
| **N** | **Current School / College** | School / Institution name |
| **O** | **City / Locality** | Residential area or locality |
| **P** | **Student Notes / Questions** | Text wrapped notes or counselor questions |
| **Q** | **Trial Demo Slot** | 2-Day trial class booking status |
| **R** | **Admission Status** | Soft green badge (`Verified • Seat Provisionally Held`) |

---

### 🚀 3-Minute Setup (One-Time Setup)

#### Step 1: Open Google Sheets
1. Open [Google Sheets](https://sheets.new) in your browser.
2. Title your spreadsheet: **`Sangli Shikshan Sanstha - Admissions 2026-27`**.

#### Step 2: Open Apps Script Editor
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any default code inside the editor (`function myFunction() { ... }`).
3. Open the file **[`google-sheet-script.gs`](google-sheet-script.gs)** from your project, copy all the code, and paste it into the Apps Script editor.
4. Click the **Save** icon (💾 or Ctrl+S).

#### Step 3: Deploy as Web App (Crucial Setting)
1. Click the blue **Deploy** button (top right) > Select **New deployment** (or **Manage deployments** > Edit ✏️).
2. Configuration:
   - **Type:** Web app
   - **Description:** `Admission Form Live Sync`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** **`Anyone`** *(⚠️ MUST be set to "Anyone" so website submissions are saved without permission errors)*.
3. Click **Deploy**.
4. Click **Authorize access** > Choose your Google account > Click **Advanced** > Click **Go to Untitled project (unsafe)** > Click **Allow**.
5. Copy your **Web app URL** (e.g. `https://script.google.com/macros/s/.../exec`).

#### Step 4: Beautify Existing Data (Optional)
If you already have rows in your sheet and want to reformat them instantly:
- In the Apps Script toolbar, select the function **`formatExistingSheet`** from the dropdown and click **Run (▷)**.
- All rows and columns will instantly snap into the neat layout!

---

### 📱 How to View & Manage on Mobile & Laptop

#### On your Mobile Phone:
1. Install the free **Google Sheets** app from Google Play Store or App Store.
2. Open your sheet:
   - Every new submission appears in real-time.
   - Tap on the **Direct WhatsApp** column link to immediately message the parent!
   - Tap on the phone number to call directly.

#### On your Laptop:
1. Open the Google Sheet in Google Chrome or Microsoft Edge.
2. To download as an offline Excel file anytime:
   - Click **File** > **Download** > **Microsoft Excel (.xlsx)**.

#### Direct Website Export (No setup required!):
- Click the **"📊 Download Excel Sheet (.xlsx / .csv)"** button directly on the website admission page at any time to instantly download all submitted applications.
