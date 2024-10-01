const prototypeChain = require("./prototypeChain");

const Persona = (function () {
    let contador = 0;
    const newPersona = function (nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        contador++;
    }

    newPersona.prototype.saludar = function () {
        console.log(`Hola, mi nombre es ${this.nombre}, tengo ${this.edad}`);
    }
    newPersona.prototype.cantidad = () => contador;

    return newPersona;
})();

const juan = new Persona("Juan", 20);
const pablo = new Persona("Pablo", 20);

juan.saludar();
console.log(juan.cantidad());
console.log(pablo.cantidad());
prototypeChain(juan);
