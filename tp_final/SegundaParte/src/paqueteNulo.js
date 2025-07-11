"use strict";

const PaqueteNulo = function () {
    this.descontarMinutos = function () { throw new Error("El cliente no tiene un paquete asignado"); }

    this.descontarDatosEnMB = function () { throw new Error("El cliente no tiene un paquete asignado"); }

    this.obtenerTiempoParaLlamadas = () => 0;

    this.obtenerDatosEnMB = () => 0;

    this.sosUnPaqueteNulo = () => true;

    this.estoyVencido = () => false;

    this.validaSiEstasVencido = () => this;
}

module.exports = PaqueteNulo;