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
  // add firebaseconfig
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore(firebase);
export const messaging = getMessaging(firebase);
