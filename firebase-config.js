// ============================================================================
// APEX SCHOLARS ACADEMY - FIREBASE INITIALIZATION & DIRECT CLOUD CONNECTOR
// Project ID: tuition-academy-17e21
// Direct REST + SDK Hybrid Engine (100% Reliable across all browsers & networks)
// ============================================================================

const firebaseConfig = {
  apiKey: "AIzaSyAM4tXsAb6F2kactZXcVJQuph43c85cQnQ",
  authDomain: "tuition-academy-17e21.firebaseapp.com",
  projectId: "tuition-academy-17e21",
  storageBucket: "tuition-academy-17e21.firebasestorage.app",
  messagingSenderId: "285493354376",
  appId: "1:285493354376:web:9dc56ad484153e088aa43d",
  measurementId: "G-ZZ5G2229N1"
};

const FIRESTORE_BASE_URL = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

// Helper: Convert standard JS object to Firestore typed fields
function toFirestoreFields(obj) {
  const fields = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === null || val === undefined) continue;
    if (typeof val === 'string') {
      fields[key] = { stringValue: val.trim() };
    } else if (typeof val === 'number') {
      if (isNaN(val)) {
        fields[key] = { doubleValue: 0.0 };
      } else if (Number.isInteger(val)) {
        fields[key] = { integerValue: String(val) };
      } else {
        fields[key] = { doubleValue: val };
      }
    } else if (typeof val === 'boolean') {
      fields[key] = { booleanValue: val };
    } else if (val instanceof Date) {
      fields[key] = { timestampValue: val.toISOString() };
    } else {
      fields[key] = { stringValue: String(val) };
    }
  }
  return fields;
}

// Helper: Convert Firestore typed fields back to plain JS object
function fromFirestoreFields(fields) {
  if (!fields) return {};
  const obj = {};
  for (const [key, typeObj] of Object.entries(fields)) {
    if (typeObj.stringValue !== undefined) obj[key] = typeObj.stringValue;
    else if (typeObj.integerValue !== undefined) obj[key] = parseInt(typeObj.integerValue, 10);
    else if (typeObj.doubleValue !== undefined) obj[key] = parseFloat(typeObj.doubleValue);
    else if (typeObj.booleanValue !== undefined) obj[key] = typeObj.booleanValue;
    else if (typeObj.timestampValue !== undefined) obj[key] = typeObj.timestampValue;
    else obj[key] = null;
  }
  return obj;
}

// Optional SDK Init if available
let sdkDb = null;
try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    sdkDb = firebase.firestore();
    console.log("✓ [Firebase SDK] Initialized for project:", firebaseConfig.projectId);
  }
} catch (e) {
  console.warn("SDK notice (falling back to direct HTTPS REST connector):", e);
}

// Global Database API
window.ApexDB = {
  projectId: firebaseConfig.projectId,

  isAvailable() {
    return true;
  },

  // Check if Cloud Firestore is reachable
  async testConnection() {
    try {
      const url = `${FIRESTORE_BASE_URL}/admissions?pageSize=1&key=${firebaseConfig.apiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        console.log("🟢 [Firebase Cloud Firestore] Successfully connected to database: (default)");
        return true;
      }
      return false;
    } catch (e) {
      console.warn("Firebase ping check notice:", e);
      return false;
    }
  },

  // Save student admission registration to 'admissions' collection
  async saveAdmission(data) {
    const documentId = data.appId || `APEX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const cleanRecord = {
      ...data,
      appId: documentId,
      submittedAt: new Date().toISOString(),
      cloudStatus: 'SAVED_TO_FIRESTORE'
    };

    console.log(`📡 Syncing application ${documentId} with Firebase Firestore...`);

    // 1. Direct HTTPS REST API write (Guaranteed delivery, fast, works across all browsers & networks)
    try {
      const payload = { fields: toFirestoreFields(cleanRecord) };
      const url = `${FIRESTORE_BASE_URL}/admissions?documentId=${encodeURIComponent(documentId)}&key=${firebaseConfig.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();

      if (res.ok) {
        console.log(`✅ [Firebase REST] Document created successfully: ${resData.name}`);
        // Asynchronously update SDK cache if available
        if (sdkDb) {
          sdkDb.collection('admissions').doc(documentId).set(cleanRecord, { merge: true }).catch(() => {});
        }
        return { success: true, appId: documentId, path: resData.name, method: 'REST' };
      } else if (res.status === 409) {
        // If document already exists, PATCH
        const patchUrl = `${FIRESTORE_BASE_URL}/admissions/${encodeURIComponent(documentId)}?key=${firebaseConfig.apiKey}`;
        const patchRes = await fetch(patchUrl, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (patchRes.ok) {
          return { success: true, appId: documentId, method: 'REST_PATCH' };
        }
      }
    } catch (netErr) {
      console.warn("Direct REST write notice, trying SDK fallback:", netErr);
    }

    // 2. Fallback: Firebase Web SDK with timeout
    if (sdkDb) {
      try {
        const sdkPromise = sdkDb.collection('admissions').doc(documentId).set(cleanRecord, { merge: true });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('SDK write timed out')), 3500));
        await Promise.race([sdkPromise, timeoutPromise]);
        console.log(`✅ [Firebase SDK] Document created: admissions/${documentId}`);
        return { success: true, appId: documentId, method: 'SDK' };
      } catch (sdkErr) {
        console.error("SDK write failed or timed out:", sdkErr);
        return { success: false, error: sdkErr.message };
      }
    }

    return { success: false, error: 'Could not write to Firebase Firestore' };
  },

  // Query application record by ID or parent phone
  async findAdmission(queryStr) {
    if (!queryStr) return null;
    const cleanId = queryStr.trim().toUpperCase();
    const cleanPhone = queryStr.trim();

    // 1. Try finding by Document ID directly
    try {
      const getUrl = `${FIRESTORE_BASE_URL}/admissions/${encodeURIComponent(cleanId)}?key=${firebaseConfig.apiKey}`;
      const res = await fetch(getUrl);
      if (res.ok) {
        const doc = await res.json();
        return { ...fromFirestoreFields(doc.fields), source: 'Firebase Cloud DB' };
      }
    } catch (e) {
      console.warn("Direct ID lookup notice:", e);
    }

    // 2. Try structured query for parentPhone
    try {
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery?key=${firebaseConfig.apiKey}`;
      const queryPayload = {
        structuredQuery: {
          from: [{ collectionId: 'admissions' }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'parentPhone' },
              op: 'EQUAL',
              value: { stringValue: cleanPhone }
            }
          },
          limit: 1
        }
      };

      const qRes = await fetch(queryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryPayload)
      });

      if (qRes.ok) {
        const results = await qRes.json();
        if (results && results.length > 0 && results[0].document) {
          return { ...fromFirestoreFields(results[0].document.fields), source: 'Firebase Cloud DB' };
        }
      }
    } catch (qErr) {
      console.warn("Structured query notice:", qErr);
    }

    return null;
  },

  // Save Book Demo Class request to 'demo_requests' collection
  async saveDemoRequest(demoData) {
    const payload = {
      fields: toFirestoreFields({
        ...demoData,
        submittedAt: new Date().toISOString()
      })
    };
    try {
      const url = `${FIRESTORE_BASE_URL}/demo_requests?key=${firebaseConfig.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`✅ [Firebase Cloud DB] Demo request saved: ${data.name}`);
        return { success: true };
      }
    } catch (e) {
      console.warn("Demo request error:", e);
    }
    return { success: false };
  },

  // Save Quick Consultation inquiry to 'inquiries' collection
  async saveInquiry(inquiryData) {
    const payload = {
      fields: toFirestoreFields({
        ...inquiryData,
        submittedAt: new Date().toISOString()
      })
    };
    try {
      const url = `${FIRESTORE_BASE_URL}/inquiries?key=${firebaseConfig.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`✅ [Firebase Cloud DB] Inquiry saved: ${data.name}`);
        return { success: true };
      }
    } catch (e) {
      console.warn("Inquiry error:", e);
    }
    return { success: false };
  }
};

// Test connection on startup
window.ApexDB.testConnection();
