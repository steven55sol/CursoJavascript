// Object Literals
const student = {
    nombre: "Lucas",
    edad: 15,
    sexo: "Masculino"
}

// Object constructor o function constructor
const Students = function(nombre,edad,sexo){
  this.nombre=nombre;
  this.edad=edad;
  this.sexo=sexo;
}

 // Creando funciones al prototype

Students.prototype.edades = function (){
    if(this.edad >= 18){
        return "Eres mayor de edad";
    }else{
        return "Eres menor de edad"
    }
}

// Function que hace referencia a otra fucntion prototype
Students.prototype.datosStudent = function(){
    return `Nombre:${this.nombre}, edad:${this.edad}-${this.edades()}, Sexo:${this.sexo}`;
}
//Creamos una instancia del objeto

const Student1 = new Students("Maria",16,"Femenino");
const Student2 = new Students("Juan",18,"Masculino");

