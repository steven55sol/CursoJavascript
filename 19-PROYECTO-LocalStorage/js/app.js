// variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = []

// EventListener
eventListener();

function eventListener(){
   formulario.addEventListener('submit', agregarTweet)
}


// Funciones

function agregarTweet(e){
   e.preventDefault();
   // Textarea donde el usuario escribe
   const tweet = document.querySelector('#tweet').value;

   if(tweet === ""){
    mostrarAlerta('El campo no puede ir vacio');
    return;
   }

   console.log(tweet)

}

// Mostar Mensaje de Error

function mostrarAlerta(mensaje){
   const mensajeError = document.createElement('p');

   mensajeError.textContent = mensaje;
   mensajeError.classList.add('error');

   //Insertarlo en el copntenido
   const contenido = document.querySelector('.row');

   contenido.prepend(mensajeError);

   //Elimina el mensaje de Error
   
   setTimeout(()=>{
      mensajeError.remove();
   },3000)

}