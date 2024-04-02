import { db } from "./global.js";

function get_uid(token) {
    var data = "";
    try {
        data = auth.verify_id_token(token)['uid'];
    } catch {
        return "error";
    }
    return data;
}

function read(ref, token) {
    if (token == "") {
        return "error";
    }
    
    var data = "";
    if ("uid" in ref) {
        ref = ref.replace("uid", get_uid(token));
    }

    try {
        data = db.ref(ref).get();
    } catch {
        return "error";
    }

    return data;
}

function set(data, ref, token) {
    if (token == "") {
        return "error";
    }

    if ("uid" in ref) {
        ref = ref.replace("uid", get_uid(token));
    }

    try {
        db.ref(ref).set(data);
    } catch {
        return "error";
    }

    return "success";
}

function update(data, ref, token) {
    if (token == "") {
        return "error";
    }

    if ("uid" in ref) {
        ref = ref.replace("uid", get_uid(token));
    }

    try {
        db.ref(ref).update(data);
    } catch {
        return "error";
    }

    return "success";
}

function delete_att(ref, token) {
    if (token == "") {
        return "error";
    }

    if ("uid" in ref) {
        ref = ref.replace("uid", get_uid(token));
    }

    try {
        db.ref(ref).delete();
    } catch {
        return "error";
    }

    return "success";
}
