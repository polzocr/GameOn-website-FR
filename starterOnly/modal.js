function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
//ajout de l'élément du DOM close btn
const closeBtn = document.querySelector('.close');
//formulaire 
const formu = document.querySelector('form');



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

//close modal event
closeBtn.addEventListener('click', () => {
  modalbg.style.display = 'none';
})

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


//value des inputs
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const radios = document.getElementsByName('location');
const checkbox1 = document.getElementById('checkbox1');


//regex
const regexNames =  /^[a-zA-Z]{2,}$/;
const regexEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexQuantity = /^\d+$/;


//le champ n'est pas vide
function notEmpty(value){
  if (value.value !== ''){
    return true;
  } else{
    return false;
  }
}


//les regex sont bien respectéss
function test(regex, value){
  if (regex.test(value.value)){
    return true
  } else {
    return false
  }
}


//un tournoi est bien saisi
function tournamentChecked(){
  let check = false;
  for(let i = 0; i < radios.length; i++){
    if(radios[i].checked == true){
      check = true;
    }
  }
  return check;
}

//les conditions d'utilisation sont acceptées
function checkbox(){
  if(checkbox1.checked == true){
    return true
  } else {
    return false
  }
}


//on test toutes nos fonctions quand on submit le formulaire
function validate(){
  if(notEmpty(firstName) && notEmpty(lastName) && notEmpty(email) && notEmpty(birthdate) && test(regexEmail, email) && test(regexNames, lastName) && test(regexNames, firstName) && test(regexQuantity, quantity) && checkbox() && tournamentChecked()){
    return true
  } else {
    return false
  }
}





