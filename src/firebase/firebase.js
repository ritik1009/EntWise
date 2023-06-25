// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:process.env.REACT_APP_apiKey ,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const  db = getFirestore(app);
export const movieRef = collection(db,'movie');
export const reviewRef = collection(db,'reviews');
export const userRef = collection(db,'user');
export default app;
