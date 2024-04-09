//Get username in document
const username = document.getElementById('username');

//Get username in cookie
const username_local_storage = localStorage.getItem('username')

//Set username in document
username.innerHTML = username_local_storage;