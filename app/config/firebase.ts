
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {getFirestore, initializeFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyAl9MolFP2SLQcWJ41wfMurznWM4PukHqs",
  authDomain: "clothes-f682b.firebaseapp.com",
  projectId: "clothes-f682b",
  storageBucket: "clothes-f682b.appspot.com",
  messagingSenderId: "556943891369",
  appId: "1:556943891369:web:fa1302208eaf6de91f42b8",
  measurementId: "G-ME2YQQ92MP"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider= new GoogleAuthProvider();
// export const db=getFirestore(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
})


export const storage=getStorage(app)
