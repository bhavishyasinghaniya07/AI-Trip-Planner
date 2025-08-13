import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQ4xKiOmGH3nYwrXg6943OxKpsE5x4_7U",
  authDomain: "aitripplanner-b9114.firebaseapp.com",
  projectId: "aitripplanner-b9114",
  storageBucket: "aitripplanner-b9114.firebasestorage.app",
  messagingSenderId: "375796419554",
  appId: "1:375796419554:web:b7ea62a2e8a46be315c7bb",
  measurementId: "G-12SWP0NW0R",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
