// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
//import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2kgkhOZ8tVjUE3Wwi5B9NMBLOAaKkKQQ",
  authDomain: "chat-de838.firebaseapp.com",
  projectId: "chat-de838",
  storageBucket: "chat-de838.appspot.com",
  messagingSenderId: "918082947374",
  appId: "1:918082947374:web:1968dfb7ff3fe7bf5f52bf",
  measurementId: "G-0YMX394E81"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(firebase);
export const messaging = getMessaging(firebase);
