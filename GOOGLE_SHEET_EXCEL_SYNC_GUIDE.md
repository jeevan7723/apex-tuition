# 📊 सांगली शिक्षण संस्था (Sangli Shikshan Sanstha)
## Live Google Sheets & Excel Synchronization Guide

This guide enables real-time synchronization between the online Admission Application Form and your **Google Sheet / Microsoft Excel**.

When any parent or student fills out and submits the admission form on your website:
1. It immediately adds a new row to your **Google Sheet**.
2. You can view, search, and manage it immediately from your **Mobile Phone** (via the Google Sheets app) and your **Laptop** (via web browser or Microsoft Excel).
3. The parent's phone number is directly clickable to Call or WhatsApp!

---

### 🚀 3-Minute Setup (One-Time Setup)

#### Step 1: Open Google Sheets
1. Open [Google Sheets](https://sheets.new) in your laptop browser (or Google Drive).
2. Name your spreadsheet: **`Sangli Shikshan Sanstha - Admissions 2026-27`**.

#### Step 2: Open Apps Script Editor
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any default code inside the editor (`function myFunction() { ... }`).
3. Open the file **`google-sheet-script.gs`** from your project folder, copy all code, and paste it into the Apps Script editor.
4. Click the **Save** icon (💾 or Ctrl+S).

#### Step 3: Deploy as Web App
1. Click the blue **Deploy** button (top right) > Select **New deployment**.
2. If not already selected, click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description:** `Admission Form Sync`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** **`Anyone`** *(Crucial: This allows the website to send submissions without requiring website visitors to log into Google)*.
4. Click **Deploy**.
5. Click **Authorize access** > Choose your Google account > Click **Advanced** > Click **Go to Untitled project (unsafe)** > Click **Allow**.
6. Google will give you a **Web app URL** that looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`
7. Copy this URL.

#### Step 4: Paste into Website
1. On your website admission page (`admission.html`), click **"⚙️ Google Sheets Sync Setup"** in the Admin Bar (below the admission form).
2. Paste your copied Web App URL and click **"Save & Test Sync"**.
3. That's it! Now every new submission will instantly appear in your Google Sheet!

---

### 📱 How to View Submissions on Mobile & Laptop

#### On your Mobile Phone:
1. Download the free **Google Sheets** app from Google Play Store (Android) or App Store (iPhone).
2. Open the app and log in with your Google account.
3. Open **`Sangli Shikshan Sanstha - Admissions 2026-27`**.
4. Every new student entry appears automatically in real time!
5. You can tap on any parent's phone number to directly **call** or **WhatsApp** them.

#### On your Laptop:
1. Open the Google Sheet in Google Chrome or Microsoft Edge.
2. To download as an offline Excel file anytime:
   - Click **File** > **Download** > **Microsoft Excel (.xlsx)** or **PDF (.pdf)**.

#### Direct Website Export (No setup required!):
- You can also simply click the **"📊 Download Excel Sheet (.xlsx / .csv)"** button directly on the website admission page at any time to instantly download all submitted applications.
