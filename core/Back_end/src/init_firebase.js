//Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, set} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

//Init Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDFx7Zr5_HngM5FuilwtkHMbB2uyYgDcTA",
    authDomain: "bid-wine-spirits.firebaseapp.com",
    databaseURL: "https://bid-wine-spirits-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bid-wine-spirits",
    storageBucket: "bid-wine-spirits.appspot.com",
    messagingSenderId: "860934956760",
    appId: "1:860934956760:web:2bf640930ad4605bda99ad"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const sign_in_with_email_and_password = signInWithEmailAndPassword;
export const create_user_with_email_and_password = createUserWithEmailAndPassword;
export const db = getDatabase();
console.log(db)
export const reference = ref;
export const setter = set;