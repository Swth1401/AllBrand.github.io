// js/register.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const registerForm = document.getElementById('register-form');

// Si ya hay sesión, redirigir
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
onAuthStateChanged(auth, user => {
  if (user) window.location.href = 'home.html';
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombres:   registerForm.nombres.value.trim(),
    apellidos: registerForm.apellidos.value.trim(),
    email:     registerForm.email.value.trim(),
    password:  registerForm.password.value,
    direccion: registerForm.direccion.value.trim(),
    celular:   registerForm.celular.value.trim()
  };

  try {
    const cred = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = cred.user;
    await setDoc(doc(db, "usuarios", user.uid), {
      nombres:   data.nombres,
      apellidos: data.apellidos,
      direccion: data.direccion,
      celular:   data.celular,
      email:     data.email,
      rol:       'cliente' // asigna rol por defecto
    });
    await sendEmailVerification(user);
    window.location.href = 'login.html?registered=1';
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      showMessage('El correo ya está en uso', 'error');
    } else {
      showMessage(err.message, 'error');
    }
  }
});

function showMessage(msg, type = 'info') {
  let c = document.getElementById('msg-container');
  if (!c) {
    c = document.createElement('div');
    c.id = 'msg-container';
    document.querySelector('.auth-container').prepend(c);
  }
  c.textContent = msg;
  c.className = type;
}