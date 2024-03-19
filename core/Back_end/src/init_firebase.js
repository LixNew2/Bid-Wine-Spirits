//Import
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

//Init Firebase
const firebaseConfig = "./config/admin_sdk.json"
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);