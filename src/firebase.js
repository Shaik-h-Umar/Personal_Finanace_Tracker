// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq2bNQGADs0AiCJZ9gvnuPhyMphBR73F8",
  authDomain: "personal-finance-tracker-cd198.firebaseapp.com",
  projectId: "personal-finance-tracker-cd198",
  storageBucket: "personal-finance-tracker-cd198.appspot.com",
  messagingSenderId: "356178048871",
  appId: "1:356178048871:web:5e8a0ddc628a77b82de1c2",
  measurementId: "G-L418VYXPJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };