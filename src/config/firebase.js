// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-6RzTZXES0d_5yEh0AZCeKd9hcj06fco",
  authDomain: "vite-contactapp.firebaseapp.com",
  projectId: "vite-contactapp",
  storageBucket: "vite-contactapp.appspot.com",
  messagingSenderId: "696235713631",
  appId: "1:696235713631:web:c6b9a9049e8f30ee1467ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);