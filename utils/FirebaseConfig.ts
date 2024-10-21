import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCT4T23B1z4xSAZZ0taXy0VYd8NMafyh_8',
  authDomain: 'voicenotes-92e87.firebaseapp.com',
  projectId: 'voicenotes-92e87',
  storageBucket: 'voicenotes-92e87.appspot.com',
  messagingSenderId: '540762055459',
  appId: '1:540762055459:web:29a0910d79b4f6f8c0e296',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);

export const NOTE_COLLECTION = 'notes';
