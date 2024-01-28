import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCymOx8RbDeLsVIWFlMA3Bt5Quoxz-0ZXc",
  authDomain: "test101-7cdd5.firebaseapp.com",
  projectId: "test101-7cdd5",
  storageBucket: "test101-7cdd5.appspot.com",
  messagingSenderId: "131461121814",
  appId: "1:131461121814:web:594b353b672347d8e3f237"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
