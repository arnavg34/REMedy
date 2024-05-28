import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



export const firebaseConfig = {
  apiKey: "AIzaSyDHI0OC0tAEC5C3AMrVtHKNEt5yFljsDkc",
  authDomain: "remedy-75424.firebaseapp.com",
  projectId: "remedy-75424",
  storageBucket: "remedy-75424.appspot.com",
  messagingSenderId: "248391272452",
  appId: "1:248391272452:web:5a498b3090650bacb0cd51",
  measurementId: "G-3B86Z9F73C"
};
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);




export { auth as FIREBASE_AUTH, db as FIREBASE_DB };
