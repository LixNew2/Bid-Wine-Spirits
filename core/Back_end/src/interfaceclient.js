import {read} from "./database.js";

//Get username in document
const username = document.getElementById('username');

//Get username in cookie
const username_local_storage = localStorage.getItem('username')

//Set username in document
username.innerHTML = username_local_storage;

//Get account uid
const uid = localStorage.getItem('uid');


//Get participate bid section
var bids_section = document.getElementById('participate_gallery');
//Get my bids
var my_gallery = document.getElementById('my_gallery');
//Get my bids
var history = document.getElementById('history');

function get_bid(path, type){
    var price = 0 
    read(path)
    .then((data) => {
        
        for(var key in data){
            if(key != "null"){
                if(type == 0){
                    price = data[key];
                }
                read('bids/'+key)
                .then((data) => {
                    var article = document.createElement('article');
                    article.classList.add('auction_item');
                    var img = document.createElement('img');
                    img.src = data.img_URL;
                    article.appendChild(img);
        
                    var div = document.createElement('div');
                    div.classList.add('auction_info');
                    var h3 = document.createElement('h3');
                    h3.innerHTML = data.title;
                    div.appendChild(h3);
                    if(type != 0){
                        var p = document.createElement('p');
                        var create_date = new Date(parseInt(data.timestamp_creation))
                        var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                        var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
                        p.innerHTML = "Crée le : " + (days[create_date.getDay()] + " " + create_date.getDate() + " " + months[create_date.getMonth()] + " " + create_date.getFullYear());
                        div.appendChild(p);
                    }
                    var p = document.createElement('p');
                    if(type == 0){
                        p.innerHTML = "Enchérit à : " + price + "€";
                    }else{
                        p.innerHTML = "Prix initial : " + data.price + "€";
                    }
                    div.appendChild(p);
                    var p = document.createElement('p');
                    if(type != 0){
                        p.innerHTML = "Prix actuel : " + data.bid_price + "€";
                    }
                    div.appendChild(p);
                    var button = document.createElement('button');
                    button.classList.add('view_auction');
                    button.innerHTML = "Voir l'enchère";
                    div.appendChild(button);
                    article.appendChild(div);
                    
                    if(Date.now() >= data.timestamp_end_date){
                        console.log("1")
                        history.appendChild(article);
                    } else if(type == 0){
                        console.log("2")
                        bids_section.appendChild(article);
                    }else{
                        console.log("3")
                        my_gallery.appendChild(article);
                    } 

            }).catch((error) => {
                //Get bid error
                console.log(error);
            });
            }
        }
    }) .catch((error) => {
        //Get bids error
        console.log(error);
    });
}

//Get participate bid
get_bid('users/'+uid+'/bidding/', 0);
//Get my bids
get_bid('users/'+uid+'/created_bids/', 1);
