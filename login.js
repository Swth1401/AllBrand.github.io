import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const loginForm   = document.getElementById('login-form');
const msgBox      = document.getElementById('msg-container');

// Si ya hay sesión activa, redirige directo a home
onAuthStateChanged(auth, user => {
  if (user) window.location.href = 'home.html';
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email    = loginForm.email.value.trim();
  const password = loginForm.password.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'home.html';
  } catch (error) {
    const code = error.code;
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
      showMessage('Correo o contraseña incorrectos', 'error');
    } else {
      showMessage(error.message, 'error');
    }
  }
});

function showMessage(text, type = 'info') {
  msgBox.textContent = text;
  msgBox.className = type;
  msgBox.classList.remove('hidden');
}