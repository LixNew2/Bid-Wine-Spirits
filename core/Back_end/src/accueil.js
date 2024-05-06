import {read} from "./database.js";

//Get bids section
var bids_section = document.getElementById('auction_gallery');

//Get username in document
const username = document.getElementById('username');

//Get username in cookie
const username_local_storage = localStorage.getItem('username')

//Set username in document
username.innerHTML = "Connecté en tant que : " + "<b>" + username_local_storage + "</b>";

//Search
const search_input = document.getElementById("search_input");

search_input.addEventListener('input', function(){
    var value = search_input.value.toLowerCase();
    bids_section.innerHTML = '';
    get_bid(value);
});

function get_bid(value){
    read('bids/')
    .then((data) => {
        
        for(var key in data){
            if(data[key] != "null"){
                if(data[key].timestamp_end_date >= Date.now()){
                    if((data[key].title.toLowerCase()).startsWith(value) || value == null){
                        let bid_id = key;

                        var article = document.createElement('article');
                        article.classList.add('auction_item');
                        var img = document.createElement('img');
                        img.src = data[key].img_URL;
                        article.appendChild(img);
            
                        var div = document.createElement('div');
                        div.classList.add('auction_info');
                        var h3 = document.createElement('h3');
                        h3.innerHTML = data[key].title;
                        div.appendChild(h3);
                        var p = document.createElement('p');
                        var end_date = new Date(parseInt(data[key].timestamp_end_date));
                        var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                        var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
                        p.innerHTML = "Fin de l'enchère le : " + (days[end_date.getDay()] + " " + end_date.getDate() + " " + months[end_date.getMonth()] + " " + end_date.getFullYear());
                        div.appendChild(p);
                        var p = document.createElement('p');
                        p.innerHTML = "Prix actuel : " + data[key].bid_price + "€";
                        div.appendChild(p);
                        var button = document.createElement('button');
                        button.classList.add('view_auction');
                        button.id = "view_bids";
                        button.innerHTML = "Voir l'enchère";
                        div.appendChild(button);
                        article.appendChild(div);
            
                        bids_section.appendChild(article);
                        
                        button.onclick = function(){
                            localStorage.setItem('bid_id', bid_id);
                            document.location.href = "./viewbids.html";
                        }
                    }
                    
                }
            }
            
        }

    }) .catch((error) => {
        //Get bids error
        console.log(error);
    });
}

get_bid();