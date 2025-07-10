"use strict";

const PaqueteAgotado = function () {
    this.descontarMinutos = function () {
        throw new Error("El paquete se encuentra agotado");
    }

    this.descontarDatosEnMB = function () {
        throw new Error("El paquete se encuentra agotado");
    }

    this.obtenerTiempoParaLlamadas = function () {
        return 0;
    }

    this.obtenerDatosEnMB = function () {
        return 0;
    }

    this.sosUnPaqueteNulo = function () {
        return false;
    }

    this.estoyVencido = function () {
        return false;
    }

    this.validaSiEstasVencido = function () {
        return this;
    }
}

module.exports = PaqueteAgotado;