"use strict";

const PaqueteAgotado = function (paqueteOriginal) {

    this.paqueteOriginal = paqueteOriginal;

    this.descontarMinutos = function () { throw new Error("El paquete se encuentra agotado"); }

    this.descontarDatosEnMB = function () { throw new Error("El paquete se encuentra agotado"); }

    // this.obtenerTiempoParaLlamadas = () => 0;

    // this.obtenerDatosEnMB = () => 0;

    // this.estoyVencido = () => false;

    this.validaSiEstasVencido = () => this;

    this.validarSiPuedoComprarOtroPaquete = () => true;

    this.renovate = () => this.paqueteOriginal.renovate()
}

module.exports = PaqueteAgotado;