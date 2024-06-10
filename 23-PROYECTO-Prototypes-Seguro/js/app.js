// constructores

function seguros(marca,year,tipo){
   this.marca = marca;
   this.year = year;
   this.tipo = tipo;
}

// Realiza la cotizacion con los datos

seguros.prototype.cotizarSeguro = function(){

    let cantidad;
    const base = 2000;

   switch(this.marca){
    case "1":
        cantidad = base * 1.15;
        break;
    case "2":
        cantidad = base * 1.05;
        break;
    case "3": 
        cantidad = base * 1.35;
        break;
    default:{
        break;
    }
   }

    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;
   // cada año que la diferencia es mayor , el costo reducira 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

   if(this.tipo === "basico"){
     cantidad *= 1.30;
   }else{
     cantidad *= 1.50;
   }

   return Math.floor(cantidad);

}

function InterfaceUser(){}

//LLena las opciones de los años
InterfaceUser.prototype.llenarOpciones = function(){
     const max = new Date().getFullYear(),
           min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Mostrar alertas de error
InterfaceUser.prototype.mensajeError= function(mensaje,tipo){
   const div = document.createElement('div');

   if(tipo === "error"){
     div.classList.add('mensaje',"error");
   }else{
    div.classList.add('mensaje','correcto');
   }

   div.classList.add('mensaje', 'mt-10');
   div.textContent = mensaje;

   //Insertar en el Html
   const formulario = document.querySelector('#cotizar-seguro');
   formulario.insertBefore(div, document.querySelector('#resultado'));

   // Tiempo de la alerta
   setTimeout(()=>{
      formulario.removeChild(div);
   },3000)
}

InterfaceUser.prototype.mostrarResultado = function(total,seguro){
    
   const {marca, year, tipo} = seguro;

   let textoMarca;

   switch(marca){
     case "1":
        textoMarca = "Americano";
        break;
     case "2":
        textoMarca = "Asiatico";
        break;
     case "3":
        textoMarca = "Europeo";
        break; 
     default:
        break;
   }
   
    // Crear Resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
       <p class="header">Tu Resumen</p>
       <p class="font-bold">Marca: <span class="font-normal">${textoMarca} </span> </p>
       <p class="font-bold">Año: <span class="font-normal">${year} </span> </p>
       <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo} </span> </p>
       <p class="font-bold">Total: <span class="font-normal">$ ${total} </span> </p>
    
    `;

    const resultado  = document.querySelector('#resultado');
    
    //Eliminando la cotizacion anterior
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    //Mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = "block";

    setTimeout(()=>{
       spinner.style.display = "none";
       resultado.appendChild(div); // mostrando el resultado en el Html
    },3000)
}

// Instancear  InterfaceUser
const Interface = new InterfaceUser();


document.addEventListener('DOMContentLoaded', ()=>{
      Interface.llenarOpciones(); //LLena el select con los años
})

eventListener()

function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    //Evento al Formulario
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    
    // Leer la marca seleccionada
     const marca = document.querySelector('#marca').value;
    // Leer el año señeccionado
     const year = document.querySelector('#year').value;
    // Leer el tipo selecconado
     const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === "" || year === "" || tipo === ""){
        Interface.mensajeError("Todos los campos son obligatorios","error");
        return;
    }
    
    Interface.mensajeError("Cotizando..", "correcto");

    // Instanciar el seguro
     const seguro = new seguros(marca, year, tipo)
     const total = seguro.cotizarSeguro();

    // Utilizar el prototype que va a utilizar
    Interface.mostrarResultado(total,seguro)
}