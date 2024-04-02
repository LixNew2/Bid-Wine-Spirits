import {db, reference, setter} from "./init_firebase.js";

function set(path, data){
    setter(reference(db, path), data)
    .then(() => {
        console.log("ok")
    })
    .catch((error) => {
        console.log(error)
    });
}

export { set  };