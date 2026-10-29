
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fresher-ai-691f4.firebaseapp.com",
  projectId: "fresher-ai-691f4",
  storageBucket: "fresher-ai-691f4.firebasestorage.app",
  messagingSenderId: "69362328381",
  appId: "1:69362328381:web:42f426b91bdf66171adb54",
  measurementId: "G-L4EVGSLNQQ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}