// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPaU5FFIOd5coZO-zE98nKFEjyMWwnSSg",
  authDomain: "neurora-41d67.firebaseapp.com",
  projectId: "neurora-41d67",
  storageBucket: "neurora-41d67.firebasestorage.app",
  messagingSenderId: "707356955570",
  appId: "1:707356955570:web:a2668f13a21e61cffa0aab",
  measurementId: "G-4LX0ZKWDEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize firestore
const analytics = getAnalytics(app);

// initialize firestore
export const db = getFirestore(app)
