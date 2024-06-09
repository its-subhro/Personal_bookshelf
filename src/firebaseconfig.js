// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADudjkJCUm3KfXW9dA-h6fqJwrb9kWZLI",
  authDomain: "restaurant-6ee43.firebaseapp.com",
  databaseURL: "https://restaurant-6ee43-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurant-6ee43",
  storageBucket: "restaurant-6ee43.appspot.com",
  messagingSenderId: "405771101527",
  appId: "1:405771101527:web:3e9c5e05aab7699e018a12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // If using Firestore
// const db = getDatabase(app); // If using Realtime Database

export { db };