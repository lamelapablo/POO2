"use strict";

const Calendario = function () {
    this.francos = [];

    this.agregarFranco = function (franco) {
        this.francos.push(franco);
    }

    this.obtenerFranco = function () {
        return this.francos[0];
    }

    this.obtenerCantidadFrancos = function () {
        return this.francos.length;
    }

    this.esFranco = function (fecha) {
        return this.francos.includes(fecha);
    }
}

module.exports = Calendario;
