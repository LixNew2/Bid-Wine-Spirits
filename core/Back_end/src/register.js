import {auth,create_user_with_email_and_password} from "./init_firebase.js";
import {set} from "./database.js";


//Create account button
const create = document.getElementById('btn_valider');
create.addEventListener('click', create_account);

//Function
function create_account(){
    //Get user_values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmerPassword = document.getElementById("confirmer_password").value;
    const nom  = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const rue = document.getElementById("rue").value;
    const ville = document.getElementById("ville").value;
    const codePostal = document.getElementById("code_postal").value;
    const tel = document.getElementById("numero_de_tel").value;
    
    if(password !== confirmerPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    //Create account
    create_user_with_email_and_password(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        console.log("Compte créé !");

        //Create user_values
        var localId = userCredential.user.reloadUserInfo.localId;
        var token = userCredential.user.refreshToken;
        var data = {localId:{
            "nom":nom,
            "prenom":prenom,
            "rue":rue,
            "ville":ville,
            "codePostal":codePostal,
            "tel":tel
        }};
        
        //Set user_values
        set(data, "users/uid", localId);
    })
    .catch((error) => {
        const errorMessage = error.message;
        console.log("Erreur lors de la création du compte:", errorMessage);
    });
};


