import {auth,create_user_with_email_and_password} from "./init_firebase.js";
import {set_user_uid, USER_UID} from "./global.js";

const create = document.getElementById('btn_valider');
create.addEventListener('click', create_account);

function create_account(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmerPassword = document.getElementById("confirmer_password").value;

    if(password !== confirmerPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }
    console.log(email)
    console.log(password)

    create_user_with_email_and_password(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        set_user_uid(userCredential.user.reloadUserInfo.localId);
        console.log(USER_UID);
        console.log("Compte créé !");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Erreur lors de la création du compte:", errorMessage);
    });
};
