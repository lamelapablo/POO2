"use strict";

const PaqueteVencido = function () {
    this.descontarMinutos = function () { throw new Error("El paquete adquirido esta vencido"); }

    this.descontarDatosEnMB = function () { throw new Error("El paquete adquirido esta vencido"); }

    this.obtenerTiempoParaLlamadas = () => 0;

    this.obtenerDatosEnMB = () => 0;

    this.sosUnPaqueteNulo = () => false;

    this.estoyVencido = () => true;

    this.validaSiEstasVencido = () => this;
}

module.exports = PaqueteVencido;