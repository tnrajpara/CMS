// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCny77JbtdNIgSPQhvbH54e8Wea1TRi-VM",
  authDomain: "admin-dashboard-3419f.firebaseapp.com",
  projectId: "admin-dashboard-3419f",
  storageBucket: "admin-dashboard-3419f.appspot.com",
  messagingSenderId: "416874995207",
  appId: "1:416874995207:web:627586767fabf0964394a2",
  measurementId: "G-T6HDZPNQGG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {db,storage,auth};


