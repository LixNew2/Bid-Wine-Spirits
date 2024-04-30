// Imports
import {auth, sign_in_with_email_and_password, send_password_reset_email} from "./init_firebase.js";
import {read} from "./database.js";

//Login button
const login_btn = document.getElementById('login_btn');
login_btn.addEventListener('click', login);

//Forgot password button
const forgot_password_btn = document.getElementById('forgot_password_btn');
forgot_password_btn.addEventListener('click', forgot_password);

function forgot_password(){
    const email = document.getElementById('email').value;
    send_password_reset_email(auth, email)
    .then(() => {
        // Email sent
        console.log('Email sent');
        alert('Email sent');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}
//Function
function login(){
    //Get user values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    sign_in_with_email_and_password(auth, email, password)
    .then((userCredential) => {
        
        // Login success
        localStorage.setItem("uid", userCredential.user.reloadUserInfo.localId);
        read('users/'+userCredential.user.reloadUserInfo.localId)
        .then((data) => {

            //Get username success
            //Set username in local storage
            localStorage.setItem('username', data.username);

            //Redirect to acceuil page
            document.location.href = "./accueil.html";
        }) .catch((error) => {
            //Get username error
            console.log(error);
        });
    })
    .catch((error) => {
        // Login error
        console.log(error);
    }); 
}