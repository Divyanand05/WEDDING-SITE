import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE902QojJwKzHqDQbvTeRlxhEcIA-ilQQ",
  authDomain: "wedding-d0188.firebaseapp.com",
  projectId: "wedding-d0188",
  storageBucket: "wedding-d0188.firebasestorage.app",
  messagingSenderId: "10438356061",
  appId: "1:10438356061:web:1d47cedb4fab6fa83631b4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
