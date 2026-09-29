# Apex Scholars Academy - Tuition & Coaching Web Application

A modern, responsive web application for **Apex Scholars Academy**, an academic coaching institute specializing exclusively in Classes 11th & 12th (Science & Commerce Wings) and competitive examination prep (JEE / NEET / CUET).

## 🚀 Key Features

- **End-to-End Online Admission Portal**:
  - Live data synchronization with **Firebase Cloud Firestore** (`admissions` collection).
  - Permissive client-side validation with real-time feedback.
  - Printable official admission acknowledgment receipt with reference ID.
- **Admin WhatsApp Notifications**:
  - Automatic dispatch of complete student admission summaries to the Admin WhatsApp number (`+91 7385803641`).
  - 1-click WhatsApp forward button on the admission receipt modal.
- **Interactive Tuition Fee Calculator**:
  - Configurable by Grade (Class 11/12), Stream (Science/Commerce), Subject package, and Billing cycle (Monthly, Quarterly, Annual).
  - Strict uniform fee policy — equal pricing for all students.
- **Application Status Tracker**:
  - Search application status by Reference ID or registered mobile number with real-time Firestore database queries.
- **Book Free Demo Class & Quick Consultation**:
  - Trial session booking modal integrated with Firestore (`demo_requests` and `inquiries`).
- **Resource Downloads**:
  - Downloadable PDFs for Prospectus 2026-27, Class 11 & 12 Syllabus Guide, and Official Fee Sheet.
- **Mobile-First Responsive Design**:
  - Optimized for desktop, tablet, and mobile devices with a sticky mobile quick-action bar.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+)
- **Cloud Backend**: Firebase Cloud Firestore (v10 compat + direct REST hybrid engine)
- **Messaging**: WhatsApp Click-to-Chat API integration

## 📦 Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/jeevan7723/apex-tuition.git
   cd apex-tuition
   ```
2. Start a local HTTP server:
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
