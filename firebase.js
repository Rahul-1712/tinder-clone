// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlFRKnv4OIqM3P0xJDWOj9ScHyBdjtJdA",
  authDomain: "minder-16bc5.firebaseapp.com",
  projectId: "minder-16bc5",
  storageBucket: "minder-16bc5.appspot.com",
  messagingSenderId: "125354511562",
  appId: "1:125354511562:web:ef5cb75fa63fa0e9467833"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export {auth, db, storage}