"use strict";

const PaqueteAgotado = function () {
    this.descontarMinutos = function () { throw new Error("El paquete se encuentra agotado"); }

    this.descontarDatosEnMB = function () { throw new Error("El paquete se encuentra agotado"); }

    this.obtenerTiempoParaLlamadas = () => 0;

    this.obtenerDatosEnMB = () => 0;

    this.sosUnPaqueteNulo = () => false;

    this.estoyVencido = () => false;

    this.validaSiEstasVencido = () => this;
}

module.exports = PaqueteAgotado;