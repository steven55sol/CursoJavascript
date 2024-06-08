// variables

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

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
    // Creando mensaje error
    mostrarAlerta('El campo no puede ir vacio');
    return;
   }

   // Objeto de tweet
   const tweetObj = {
    id: Date.now(),
    tweet
   }

   // Agregando tweet
   tweets = [...tweets, tweetObj];

   // Crear Html
   crearHtml();
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

// Mostrar un listado de los tweets

function crearHtml(){

    if(tweets.length > 0){
        limpiarHtml();
        tweets.forEach( tweet => {

            //crear html
            const li = document.createElement('li');

            //añadir texto
            li.textContent = tweet.tweet

            // insertarlo en el html

            listaTweets.appendChild(li)
        });
    }
}

function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}