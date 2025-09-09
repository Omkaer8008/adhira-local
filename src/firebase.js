// src/firebase.js

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7IgYWAWkYwifnOww52KNg6lqHghLLW_RxHw",
  authDomain: "addira-marketplace-ea4a7.firebaseapp.com",
  projectId: "addira-marketplace-ea4a7",
  storageBucket: "addira-marketplace-ea4a7.appspot.com",
  messagingSenderId: "435736866429",
  appId: "1:435736866429:web:a1234567890abcdef", // This is a placeholder value you need to get from the console
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services and export them
export const auth = getAuth(app);
export const db = getFirestore(app);
