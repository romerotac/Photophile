// JavaScript
// src.firebase.js
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBz-V02ZCu9ysqy5QleHhfA3SlDzlX9gkE",
    authDomain: "photophile-f172d.firebaseapp.com",
    databaseURL: "https://photophile-f172d-default-rtdb.firebaseio.com",
    projectId: "photophile-f172d",
    storageBucket: "photophile-f172d.appspot.com",
    messagingSenderId: "252973454281",
    appId: "1:252973454281:web:76ffd0d63fb6be4fe30e18"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export {db};

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();