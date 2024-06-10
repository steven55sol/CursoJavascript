// Object constructor o function constructor
const Students = function(nombre,edad,sexo){
    this.nombre=nombre;
    this.edad=edad;
    this.sexo=sexo;
}

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

const persona = function(nombre, edad, sexo, altura){
    Students.call(this,nombre,edad,sexo);
    this.altura = altura;
}

//Crea y copia el prototype de otra constructor
persona.prototype = Object.create(Students.prototype)
persona.prototype.constructor = Students;

const Juan = new persona("Juan",18,"Masculino",1.74);

console.log(Juan.datosStudent())