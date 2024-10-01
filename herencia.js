const prototypeChain = require("./prototypeChain");

const Persona = function (nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
}

Persona.prototype.saludar = function () {
    console.log(`Hola, mi nombre es ${this.nombre}, tengo ${this.edad}`);
}

const Musico = function (nombre, edad, instrumento) {
    Persona.call(this, nombre, edad);
    this.instrumento = instrumento;
}

Musico.prototype = Object.create(Persona.prototype);
Musico.prototype.constructor = Musico;

const juan = new Musico("Juan", 20, "piano");

juan.saludar();
console.log(juan);
prototypeChain(juan)