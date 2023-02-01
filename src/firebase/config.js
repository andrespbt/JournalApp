// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2JZYL5HDR3fA7AeiL_oumKLTFNFLHQvI',
  authDomain: 'react-cursofernandoherrera.firebaseapp.com',
  projectId: 'react-cursofernandoherrera',
  storageBucket: 'react-cursofernandoherrera.appspot.com',
  messagingSenderId: '399329763109',
  appId: '1:399329763109:web:7a3cb118dfcee7a4c944cc',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
