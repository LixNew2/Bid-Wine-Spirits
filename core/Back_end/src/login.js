import {auth, sign_in_with_email_and_password} from "./init_firebase.js";
import {set_user_uid, USER_UID, set_username} from "./global.js";

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
        set_user_uid(userCredential.user.reloadUserInfo.localId);
        console.log("Connected !");
        console.log(USER_UID); 
    })
    .catch((error) => {
        // Login error
        console.log(error);
        console.log("Bad password or email !");
    });
}