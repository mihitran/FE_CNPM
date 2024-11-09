
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update, remove, onChildAdded, get, child, onChildRemoved } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQpHdzQN20oBIC2Au3Uli4mW3THL54Dh0",
  authDomain: "nmcnpm-c66e0.firebaseapp.com",
  databaseURL: "https://nmcnpm-c66e0-default-rtdb.firebaseio.com/",
  projectId: "nmcnpm-c66e0",
  storageBucket: "nmcnpm-c66e0.firebasestorage.app",
  messagingSenderId: "79096321545",
  appId: "1:79096321545:web:b0bbcb91a5000d1a778ad8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
// const dbRef = ref(getDatabase());
const auth = getAuth(app);
let currentUser = null;
// const wappadsRef = ref(db, 'wappads');

// Kiểm tra trạng thái đăng nhập
const buttonLogin = document.querySelector("[button-login]");
const buttonRegister = document.querySelector("[button-register]");
const buttonLogout = document.querySelector("[button-logout]");
const wappad = document.querySelector("[wappad]");

onAuthStateChanged(auth, (user) => {
  if (user) {
    buttonLogout.style.display = "inline-flex";
    wappad.style.display = "block";
    buttonLogin.style.display = "none";
    buttonRegister.style.display = "none";
    currentUser = user;
  } else {
    buttonLogout.style.display = "none";
    buttonLogin.style.display = "inline-flex";
    buttonRegister.style.display = "inline-flex";
    if(wappad) {
      // wappad.innerHTML = `<i>Vui lòng đăng nhập để sử dụng ứng dụng.</i>`;
    }
  }
});
// Hết Kiểm tra trạng thái đăng nhập

// Trang đăng ký
const formRegister = document.querySelector("#form-register");
if(formRegister) {
  formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = formRegister.fullName.value;
    const email = formRegister.email.value;
    const password = formRegister.password.value;

    if(fullName && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(user) {
            console.log(user);
            set(ref(db, `users/${user.uid}`), {
              fullName: fullName
            }).then(() => {
              window.location.href = "index.html";
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
}
// Hết Trang đăng ký

// Trang đăng nhập
const formLogin = document.querySelector("#form-login");
if(formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = formLogin.email.value;
    const password = formLogin.password.value;

    if(email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          if(user) {
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  })
}
// Hết Trang đăng nhập

// Tính năng đăng xuất
if(buttonLogout) {
  buttonLogout.addEventListener("click", () => {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    }).catch((error) => {
      console.log(error);
    });
  })
}
// Hết Tính năng đăng xuất



























