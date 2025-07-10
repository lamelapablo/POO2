"use strict";

const PaqueteVencido = function () {
    this.descontarMinutos = function () {
        throw new Error("El paquete adquirido esta vencido");
    }

    this.descontarDatosEnMB = function () {
        throw new Error("El paquete adquirido esta vencido");
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
        return true;
    }

    this.validaSiEstasVencido = function () {
        return this;
    }
}

module.exports = PaqueteVencido;