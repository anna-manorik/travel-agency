// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIs0d-Q45crU1nNxAQGN5oY-njqOaSjjI",
  authDomain: "travel-agency-72839.firebaseapp.com",
  projectId: "travel-agency-72839",
  storageBucket: "travel-agency-72839.firebasestorage.app",
  messagingSenderId: "911016679730",
  appId: "1:911016679730:web:1d96b607478a3582955f2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);