import {auth, sign_in_with_email_and_password} from "./init_firebase.js";

//Login
let USER_UID = "";

//Login button
const login_btn = document.getElementById('login_btn');
login_btn.addEventListener('click', login);

//Function
function login(){
    //Get user_values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    sign_in_with_email_and_password(auth, email, password)
    .then((userCredential) => {
        // Login success
        USER_UID = userCredential.user;
        console.log("Connected !");
    })
    .catch((error) => {
        // Login error
        console.log("Bad password or email !");
    });
}