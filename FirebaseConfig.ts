import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeAuth  } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const apikey = process.env.EXPO_PUBLIC_FIREBASEAPI_KEY;
const authDomain = process.env.EXPO_PUBLIC_UTHDOMAIN_KEY;
const projectId = process.env.EXPO_PUBLIC_PROJECTID_KEY;
const storageBucket = process.env.EXPO_PUBLIC_STORAGEBUCKET_KEY;
const messagingSenderId = process.env.EXPO_PUBLIC_MESSAGINGSENDERID_KEY;
const appId = process.env.EXPO_PUBLIC_APPID_KEY;
const apimeasurementIdUrl = process.env.EXPO_PUBLIC_MEASUREMENTID_KEY;

export const firebaseConfig = {
  apiKey: apikey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: apimeasurementIdUrl
};
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);




export { auth as FIREBASE_AUTH, db as FIREBASE_DB };
