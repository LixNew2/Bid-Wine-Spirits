// Imports
import {set, update} from "./database.js";
import {set as setImg} from "./storage.js";

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon",
    "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia",
    "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga",
    "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

const title = document.getElementById('titre-annonce');
const type = document.getElementById('type-select');
const condition = document.getElementById('etat-select');
const price = document.getElementById('prix-input');

var file_path_value = null;
const file_path = document.getElementById('file');
file_path.addEventListener('change', (event) => {
    file_path_value = event.target.files[0]; 
  });

const country = document.getElementById('country');
const place = document.getElementById('ville');
const cp = document.getElementById('cp');
const end_date = document.getElementById('end-date');
const hand_delivered = document.getElementById('main-propre');
const delivery = document.getElementById('livraison');
const description = document.getElementById('description-produit');
const contact = document.getElementById('contact-input');
const year = document.getElementById('year');
const brand = document.getElementById('brand');

const submit = document.getElementById('submit');

hand_delivered.addEventListener('click', function(){
    delivery.checked = false;
});

delivery.addEventListener('click', function(){
    hand_delivered.checked = false;
});

for(var i = 0; i < countries.length; i++){
    var option = document.createElement('option');
    option.value = countries[i];
    option.innerHTML = countries[i];
    country.appendChild(option);
}

submit.addEventListener('click', create_bid);

function create_bid(){
    const title_value = title.value;
    const type_value = type.value;
    const condition_value = condition.value;
    const price_value = price.value;
    const country_value = country.value;
    const place_value = place.value;
    const cp_value = cp.value;
    const hand_delivered_value = hand_delivered.checked;
    const delivery_value = delivery.checked
    const description_value = description.value;
    const contact_value = contact.value;
    const year_value = year.value;
    const brand_value = brand.value;
    const uuid4 = generate_uuid_v4();

    setImg(file_path_value, "/imgs/"+uuid4+"/img.png")
    .then((downloadURL) => {
        //Get username success
        //Set username in local storage
        const data = {
            "title": title_value,
            "type": type_value,
            "condition": condition_value,
            "price": parseFloat(price_value),
            "img_URL": downloadURL,
            "country": country_value,
            "place": place_value,
            "cp": parseInt(cp_value),
            "end_date": end_date.value,
            "hand_delivered": hand_delivered_value,
            "delivery": delivery_value,
            "description": description_value,
            "contact": contact_value,
            "creator": localStorage.getItem('uid'),
            "timestamp_creation": String(new Date().getTime()),
            "timestamp_end_date": String(new Date(end_date.value).getTime()),
            "bidder": "null",
            "bid_price": parseFloat(price_value),
            "status": "open",
            "winner": "null",
            "year": parseInt(year_value),
            "brand": brand_value
        };
    
        set('/bids/'+uuid4, data); 
        update('/users/'+localStorage.getItem('uid')+"/created_bids/", {[uuid4]:"owner"}); 
        //Redirect to acceuil page
        document.location.href = "./accueil.html";
    }) .catch((error) => {
        //Get username error
        console.log(error);
    });
}

function generate_uuid_v4() {
    var uuid = "";
    var characters = "0123456789abcdef";
    
    for (var i = 0; i < 32; i++) {
        var random_int = Math.floor(Math.random() * characters.length);
        var random_string = characters.charAt(random_int);

        if (i === 12) {
            random_string = "4";
        }
        uuid += random_string;
    }
    
    uuid = uuid.substring(0, 8) + "-" + uuid.substring(8, 12) + "-" + uuid.substring(12, 16) + "-" + uuid.substring(16, 20) + "-" + uuid.substring(20);
    
    return uuid;
}
