// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVs6lUhdJDG7igK4-scE1s7Lqr-kL8TJA",
  authDomain: "snifterly.firebaseapp.com",
  databaseURL: "https://snifterly-default-rtdb.firebaseio.com",
  projectId: "snifterly",
  storageBucket: "snifterly.appspot.com",
  messagingSenderId: "1094092104173",
  appId: "1:1094092104173:web:f87761365c4018b22a07e4",
  measurementId: "G-JZZDJL42X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);