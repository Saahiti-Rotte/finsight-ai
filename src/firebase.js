import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    "AIzaSyAXh2PfV1Lr-MJgVaxFmxO422fLASc31Ic",

  authDomain:
    "finsight-ai-7f5a7.firebaseapp.com",

  projectId:
    "finsight-ai-7f5a7",

  storageBucket:
    "finsight-ai-7f5a7.firebasestorage.app",

  messagingSenderId:
    "676927053499",

  appId:
    "1:676927053499:web:3ac6e09aff4615c04b939e",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);