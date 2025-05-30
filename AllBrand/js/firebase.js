import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhmCMr7xO5dyTgBCEXMjK7depjrpzXCp8",
  authDomain: "allbasketball-8fa58.firebaseapp.com",
  projectId: "allbasketball-8fa58",
  storageBucket: "allbasketball-8fa58.appspot.com",
  messagingSenderId: "534903387510",
  appId: "1:534903387510:web:172f292ba4a9b70c483657"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
