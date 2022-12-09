// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_7J7fJo83QYOM3J-kVHFKmfmPbtfqRIY",
  authDomain: "censo-app-d6bb3.firebaseapp.com",
  projectId: "censo-app-d6bb3",
  storageBucket: "censo-app-d6bb3.appspot.com",
  messagingSenderId: "643398708577",
  appId: "1:643398708577:web:cf6c8c1b21e886e27d6920",
  measurementId: "G-JF83D3ENJJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app)