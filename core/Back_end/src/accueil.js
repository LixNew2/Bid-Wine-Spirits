import {read} from "./database.js";

//Get bids section
var bids_section = document.getElementById('auction_gallery');

//Get username in document
const username = document.getElementById('username');

//Get username in cookie
const username_local_storage = localStorage.getItem('username')

//Set username in document
username.innerHTML = username_local_storage;

function get_bid(){
    read('bids/')
    .then((data) => {
        
        for(var key in data){
            console.log(data[key]);
            article = document.createElement('article');
            article.classList.add('auction_item');
            img = document.createElement('img');
            img.src = data[key].img_URL;
            article.appendChild(img);

            var div = document.createElement('div');
            div.classList.add('auction_info');
            var h3 = document.createElement('h3');
            h3.innerHTML = data[key].title;
            div.appendChild(h3);
            var p = document.createElement('p');
            p.innerHTML = data[key].end_date;
            div.appendChild(p);
            var p = document.createElement('p');
            p.innerHTML = data[key].price;
            div.appendChild(p);
            var button = document.createElement('button');
            button.classList.add('view_auction');
            button.innerHTML = "Voir l'enchère";
            div.appendChild(button);
            article.appendChild(div);

            bids_section.appendChild(article);
            
        }

    }) .catch((error) => {
        //Get bids error
        console.log(error);
    });
}

get_bid();