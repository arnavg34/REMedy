// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHI0OC0tAEC5C3AMrVtHKNEt5yFljsDkc",
  authDomain: "remedy-75424.firebaseapp.com",
  projectId: "remedy-75424",
  storageBucket: "remedy-75424.appspot.com",
  messagingSenderId: "248391272452",
  appId: "1:248391272452:web:5a498b3090650bacb0cd51",
  measurementId: "G-3B86Z9F73C"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
