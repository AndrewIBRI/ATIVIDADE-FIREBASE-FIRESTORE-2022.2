// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDGie5s4g7bQU-0xnRdhCnpj6RDswFpMP0",
  authDomain: "firestore-5a638.firebaseapp.com",
  projectId: "firestore-5a638",
  storageBucket: "firestore-5a638.appspot.com",
  messagingSenderId: "308554808657",
  appId: "1:308554808657:web:35566b7387e15696572770",
  measurementId: "G-D1T2S2P1TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);