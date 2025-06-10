import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDoUXBUZrvPRDX5gosBB5_2pZvgS7qjgew",
  authDomain:import.meta.env.VITE_FIREBASE_PROJECT_ID || "checkmate-d3e07.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "checkmate-d3e07",
  storageBucket:import.meta.env.VITE_FIREBASE_PROJECT_ID || "checkmate-d3e07.firebasestorage.app",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:514595900180:web:ab437e4b5a6b97020f5001",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
