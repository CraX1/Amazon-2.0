// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCaVdM2LBGhXp_EpHaXAaQEDbcGCPn_ntE",
  authDomain: "amzn-2-clone-48587.firebaseapp.com",
  projectId: "amzn-2-clone-48587",
  storageBucket: "amzn-2-clone-48587.appspot.com",
  messagingSenderId: "616940739802",
  appId: "1:616940739802:web:ca78dc97420880943619e3",
  measurementId: "G-F2NHBTQ43P",
};

// for frontend
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
export default db;
