const Calendario = require("./calendario");

const Empleado = function (nombre) {
    this.nombre = nombre;
    this.calendario = new Calendario();

    this.obtenerNombre = function () {
        return this.nombre;
    }

    this.fijarFranco = function (franco) {
        this.calendario.agregarFranco(franco);
    }



}

module.exports = Empleado;