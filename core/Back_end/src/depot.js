//Import
import {set} from "./database.js";

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
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const title = document.getElementById('titre-annonce');
const type = document.getElementById('type-select');
const condition = document.getElementById('etat-select');
const price = document.getElementById('prix-input');
const file_path = document.getElementById('file');
const country = document.getElementById('country');
const place = document.getElementById('ville');
const cp = document.getElementById('cp');
const end_date= document.getElementById('end-date');
const hand_delivered = document.getElementById('main-propre');
const delivery = document.getElementById('livraison');
const description = document.getElementById('description-produit');
const contact = document.getElementById('contact-input');
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
    const file_path_value = file_path.value;
    const country_value = country.value;
    const place_value = place.value;
    const cp_value = cp.value;
    const end_date_value = end_date.value;
    const hand_delivered_value = hand_delivered.checked;
    const delivery_value = delivery.checked
    const description_value = description.value;
    const contact_value = contact.value;

    const data = {
        "title": title_value,
        "type": type_value,
        "condition": condition_value,
        "price": price_value,
        "file_path": file_path_value,
        "country": country_value,
        "place": place_value,
        "cp": cp_value,
        "end_date": end_date_value,
        "hand_delivered": hand_delivered_value,
        "delivery": delivery_value,
        "description": description_value,
        "contact": contact_value,
        "creator": localStorage.getItem('uid'),
        "timestamp_creation": new Date().getTime(),
        "timestamp_end_date": new Date(end_date_value).getTime(),
        "bidders": [],
        "status": "open",
        "winner": "null",

    };
    console.log(data);
}