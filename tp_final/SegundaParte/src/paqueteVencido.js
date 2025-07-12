"use strict";

const PaqueteVencido = function () {
    this.descontarMinutos = function () { throw new Error("El paquete adquirido esta vencido"); }

    this.descontarDatosEnMB = function () { throw new Error("El paquete adquirido esta vencido"); }
}

module.exports = PaqueteVencido;