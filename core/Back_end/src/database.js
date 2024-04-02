import { db } from "./global.js";

function read(ref) {
    if (token == "") {
        return "error";
    }

    try {
        data = db.ref(ref).get();
    } catch {
        return "error";
    }

    return data;
}

function set(data, ref) {
    if (token == "") {
        return "error";
    }

    try {
        db.ref(ref).set(data);
    } catch {
        return "error";
    }

    return "success";
}

function update(data, ref) {
    if (token == "") {
        return "error";
    }

    try {
        db.ref(ref).update(data);
    } catch {
        return "error";
    }

    return "success";
}

function delete_att(ref) {
    if (token == "") {
        return "error";
    }

    try {
        db.ref(ref).delete();
    } catch {
        return "error";
    }

    return "success";
}

export { read, set, update, delete_att };