// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5nHZL8GJHiUmXlgGs3w0DAFUR2yByF0g",
  authDomain: "mystore-a0c0b.firebaseapp.com",
  projectId: "mystore-a0c0b",
  storageBucket: "mystore-a0c0b.appspot.com",
  messagingSenderId: "357950394547",
  appId: "1:357950394547:web:a2e72b640623a2d58660c6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
