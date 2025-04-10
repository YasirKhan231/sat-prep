// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDlP3KxKtt9OYd-n80tdPJXnDVDHXIdDfY",
  authDomain: "sat-prep-ebe33.firebaseapp.com",
  projectId: "sat-prep-ebe33",
  storageBucket: "sat-prep-ebe33.appspot.com",
  messagingSenderId: "372388569757",
  appId: "1:372388569757:web:9e27939ac816dcad86ea74",
  measurementId: "G-ECZYX7SDDL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { 
  // Core instances
  app,
  auth,
  db,
  storage,
  googleProvider,
  
  // Firestore functions
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  
  // Storage functions
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
};