import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Helper function to safely access Environment Variables.
 * This prevents the app from crashing in environments where 'import.meta' 
 * is not immediately available or during specific build steps.
 */
const getEnv = (key, fallback) => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[key] || fallback;
    }
  } catch (e) {
    // Silent fail if env access is restricted
  }
  return fallback;
};

/**
 * Firebase Configuration
 * Pulls keys from your .env file.
 * If keys are missing (e.g. during initial clone), it falls back to empty strings
 * to allow the app to load in "Demo Mode" without crashing.
 */
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API_KEY", "demo-key"),
  authDomain: getEnv("VITE_FIREBASE_AUTH_DOMAIN", "demo.firebaseapp.com"),
  projectId: getEnv("VITE_FIREBASE_PROJECT_ID", "demo-project"),
  storageBucket: getEnv("VITE_FIREBASE_STORAGE_BUCKET", ""),
  messagingSenderId: getEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", ""),
  appId: getEnv("VITE_FIREBASE_APP_ID", "")
};

// Initialize Firebase Instance
let app;
let auth;
let db;

try {
  // Initialize the specific Firebase app
  app = initializeApp(firebaseConfig);
  
  // Initialize Services
  auth = getAuth(app);
  db = getFirestore(app);
  
  console.log("🔥 Firebase Service Initialized Successfully");
} catch (error) {
  console.warn("⚠️ Firebase Initialization Warning: App running in Offline/Demo Mode.");
  console.warn("Check your .env file if you expect database connectivity.");
}

// Export the initialized services to be used in App.jsx and other components
export { app, auth, db };