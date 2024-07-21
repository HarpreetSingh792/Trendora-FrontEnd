import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.VITE_FIREBASE_PRODUCT_ID,
  storageBucket: import.meta.VITE_FIREBASE_STORAGE,
  messagingSenderId: import.meta.VITE_FIREBASE_SENDER_ID,
  appId:  import.meta.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);