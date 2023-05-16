// we need this disable because const needed for firebase and values in object received from dotenv,
// but eslint and ts find this like error
/* eslint-disable*/
// @ts-nocheck
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
});
