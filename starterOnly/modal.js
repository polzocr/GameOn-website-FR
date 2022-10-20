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


//messages d'erreur

const nameError = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const emailError = "Vous devez choisir un e-mail valide.";
const birthdateError = "Vous devez entrer votre date de naissance.";
const quantityError = "Vous nous donner un nombre de tournoi valable";
const radiosError = "Vous devez choisir une option.";
const checkbox1Error = "Vous devez vérifier que vous acceptez les termes et conditions.";

//regex
const regexNames =  /^[a-zA-Z]{2,}$/;
const regexEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexQuantity = /^\d+$/;







//les regex sont bien respectéss
function test(regex, value){
  if (regex.test(value.value)){
    return true
  } else {
    return false
  }
}

//le champ n'est pas vide
function notEmpty(value){
  if (value.value !== ''){
    return true;
  } else{
    return false;
  }
}

//creation d'un message d'erreur personnalisé dans un paragraphe p
function createError(index, error){
 if(document.getElementsByClassName('formData')[index].lastChild.nodeName == '#text'){ //s'il y a déja un message d'erreur, rien ne se passe
  const p = document.createElement("p");
  document.getElementsByClassName('formData')[index].appendChild(p);
  p.textContent = error;
  p.style.fontSize = "13px";
  p.style.fontWeight = "500";
  p.style.fontFamily = 'sans-serif'; 
 }
}



//validation des champs necessitant une regex
function finalValidation(value, regex, index, error){ 
  if(notEmpty(value) && test(regex, value)){    //si le champ n'est pas vide et que le regex est respecté
  return true                                   //validation ok
 } else {
  createError(index, error)                     //sinon message d'erreur personnalisé
  return false
 }
}


//validation de la date de naissance
function birthdateValidation(){
  if(notEmpty(birthdate)){      //non vide
    return true
  } else {
    createError(3, birthdateError)  //sinon message d'erreur
    return false
  }
}
//validation du choix du tournoi
function radioValidation(){
  let check = false;
  for(let i = 0; i < radios.length; i++){  //on verifie qu'au moins une case est cochée
    if(radios[i].checked == true){
      check = true;
    }
  }
  if(check){
    return true;                      //case cochée, on return true
  } else {
    createError(5, radiosError)     // sinon creation d'une erreur
    return false;
  }
}

//validation des conditions d'utilisation
//si la box est checkée c'est bon, sinon creation d'un message d'erreur
function checkboxValidation(){
  if(checkbox1.checked == true){
    return true
  } else {
    createError(6,checkbox1Error);
    return false
  }
}


//suppression du message d'erreur lors de l'evenement focus
function removeError(element){
  element.addEventListener('focus', function() {
    const p = element.nextElementSibling.nextElementSibling; // paragraphe d'erreur a supprimer
    if(p){
      p.remove()
    }
  })
}
//suppression du message d'erreur lors de l'evenement focus du nombre de tournoi
function removeQuantityError(){
  quantity.addEventListener('focus', function() {
    const p = quantity.nextElementSibling;    //paragraphe d'erreur à supprimer
    if(p){
      p.remove()
    }
  })
}

//suppression du message d'erreur lors de l'evenement click des checkbox
function removeCheckboxError(){
  checkbox1.addEventListener('click', function() {
    const p =checkbox1.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling; //paragraphe d'erreur
    if(p){
      p.remove()
    }
  })
}

//suppression du message d'erreur lors de l'evenement click des radios
function removeRadiosError(){
  const radio = document.getElementsByClassName('formData')[5];
  radio.addEventListener('click', function() {
    if(radio.lastChild.textContent == radiosError){ //si le dernier enfant est le message d'erreur, on le supprimer
      radio.lastChild.remove()
    }
  })
}

//appel des fonctions de suppression des messages d'erreur
removeError(firstName);
removeError(lastName);
removeError(email);
removeError(birthdate);
removeQuantityError();
removeRadiosError();
removeCheckboxError();

//on test toutes nos fonctions quand on submit le formulaire
function validate(){
  let validation = true
  if(!finalValidation(firstName, regexNames, 0, nameError)){
    validation = false;
  } 
  if(!finalValidation(lastName, regexNames, 1, nameError)){
    validation = false;
  }
  if(!finalValidation(email, regexEmail, 2, emailError)){
    validation = false
  }
  if(!birthdateValidation()){
    validation = false
  }
  if(!finalValidation(quantity, regexQuantity, 4, quantityError)){
    validation = false
  }
  if(!radioValidation()){
    validation = false
  }
  if(!checkboxValidation()){
    validation = false
  }
  if(validation == true){
    alert('Merci ! Votre réservation a été reçue.')
    return true
  } else {
    return false
  }
   //si et seulement si toutes les validation sont correctes, on return true

}




