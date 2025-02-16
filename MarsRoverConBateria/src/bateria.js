"use strict";

const Bateria = function (valorMaximo) {
    this.valorMaximo = valorMaximo;
    this.valorActual = valorMaximo;
    this.ultimoValorGuardado = valorMaximo;

    this.guardarValorActual = function () {
        this.ultimoValorGuardado = this.valorActual;
    };

    this.recargar = function () {
        this.valorActual = this.valorMaximo;
    };

    this.menos = function (valorARestar) {
        this.valorActual -= valorARestar;
    };

    this.restaurarValorGuardado = function () {
        this.valorActual = this.ultimoValorGuardado;
    };

    this.obtenerValorActual = function () {
        return this.valorActual;
    };
    this.validarQueLaCargaAlcanzaPara = function (unidadesAGastar) {
        if (unidadesAGastar > this.valorActual) {
            throw new Error("No hay bateria suficiente para realizar el movimiento");
        }
    };
};

module.exports = Bateria;