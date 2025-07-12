"use strict";

const PaqueteNulo = function () {
    this.descontarMinutos = function () { throw new Error("El cliente no tiene un paquete asignado"); }

    this.descontarDatosEnMB = function () { throw new Error("El cliente no tiene un paquete asignado"); }

    this.validaSiEstasVencido = () => this;

    this.validarSiPuedoComprarOtroPaquete = () => true;
}

module.exports = PaqueteNulo;