// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqAu4eNE3WTRBBJMT0xx6Q0FjSA7iJT7E",
  authDomain: "alcozone-e21b0.firebaseapp.com",
  projectId: "alcozone-e21b0",
  storageBucket: "alcozone-e21b0.appspot.com", 
  messagingSenderId: "903424406013",
  appId: "1:903424406013:web:8479ff3d4bb30b33c56994"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
