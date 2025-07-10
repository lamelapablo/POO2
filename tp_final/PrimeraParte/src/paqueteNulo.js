"use strict";

const PaqueteNulo = function () {
    this.descontarMinutos = function () {
        throw new Error("El cliente no tiene un paquete asignado");
    }

    this.descontarDatosEnMB = function () {
        throw new Error("El cliente no tiene un paquete asignado");
    }

    this.obtenerTiempoParaLlamadas = function () {
        return 0;
    }

    this.obtenerDatosEnMB = function () {
        return 0;
    }

    this.sosUnPaqueteNulo = function () {
        return true;
    }

    this.estoyVencido = function () {
        return false;
    }

    this.validaSiEstasVencido = function () {
        return this;
    }
}

module.exports = PaqueteNulo;