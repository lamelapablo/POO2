"use strict";

const PaqueteAgotado = function (paqueteOriginal) {

    this.paqueteOriginal = paqueteOriginal;

    this.descontarMinutos = function () { throw new Error("El paquete se encuentra agotado"); }

    this.descontarDatosEnMB = function () { throw new Error("El paquete se encuentra agotado"); }

    this.validaSiEstasVencido = () => this;

    this.validarSiPuedoComprarOtroPaquete = () => true;

    this.renovate = function () {
        const fechaActual = new Date();
        this.paqueteOriginal.marcarComoCompradoEn(fechaActual);
        return this.paqueteOriginal;
    }
}

module.exports = PaqueteAgotado;