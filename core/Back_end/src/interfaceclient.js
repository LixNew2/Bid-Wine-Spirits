//Imports
import {getCookieValue} from "./global.js";

//Get username in document
const username = document.getElementById('username');

//Get username in cookie
const username_cookie = getCookieValue('username')

//Set username in document
username.innerHTML = username_cookie;