// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            "AIzaSyAxISSKhR1Tl5AAF71CDcvdr7OV6Rv6ulk",
  authDomain:        "bragadle.firebaseapp.com",
  projectId:         "bragadle",
  storageBucket:     "bragadle.firebasestorage.app",
  messagingSenderId: "653293499760",
  appId:             "1:653293499760:web:f4188f505a938389138bb5",
  measurementId:     "G-0VV5MQTNFW"
};

// Prevent duplicate initialisation in Next.js hot-reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);