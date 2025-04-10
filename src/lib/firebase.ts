import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlP3KxKtt9OYd-n80tdPJXnDVDHXIdDfY",
  authDomain: "sat-prep-ebe33.firebaseapp.com",
  projectId: "sat-prep-ebe33",
  storageBucket: "sat-prep-ebe33.firebasestorage.app",
  messagingSenderId: "372388569757",
  appId: "1:372388569757:web:9e27939ac816dcad86ea74",
  measurementId: "G-ECZYX7SDDL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

