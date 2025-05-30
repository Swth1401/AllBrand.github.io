import { app } from './firebase.js';              //  exporta app en firebase.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const auth = getAuth(app);
const db   = getFirestore(app);

// Muestra email y revela enlace admin si corresponde
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Mostrar email si existe elemento
  const emailDisplay = document.getElementById('user-email');
  if (emailDisplay) emailDisplay.textContent = 'Usuario: ' + user.email;

  // verificar rol
  const snap = await getDoc(doc(db, 'usuarios', user.uid));
  if (snap.exists() && snap.data().rol === 'admin') {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) adminLink.style.display = 'inline';
  }
});

// Cerrar sesión
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = 'login.html');
  });
}
