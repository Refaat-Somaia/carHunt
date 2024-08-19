import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { collection,getFirestore,doc,getDoc,getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9s61XK7DK8EYzzmM5Kb6cwROYoof8Guc",
  authDomain: "carhunt-764b8.firebaseapp.com",
  projectId: "carhunt-764b8",
  storageBucket: "carhunt-764b8.appspot.com",
  messagingSenderId: "415625195559",
  appId: "1:415625195559:web:4fb0e5e987f6d74a40de02"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage();

export {app,db,storage}