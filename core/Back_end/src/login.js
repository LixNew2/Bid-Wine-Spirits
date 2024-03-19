import { auth } from "./init_firebase.js";
import { signInWithEmailAndPassword} from "firebase/auth";

//Login
const USER_UID = "";

//Function
function login(){
    //
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Login success
        USER_UID = userCredential.user;
    })
    .catch((error) => {
        // Login error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erreur de connexion:", errorCode, errorMessage);
    });
}
