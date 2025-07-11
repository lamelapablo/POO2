"use strict";

const HistorialConsumos = function () {
    this.consumos = [];

    this.registrar = function (consumo) {
        this.consumos.push(consumo);
    }

    this.obtenerConsumosOrdenadoPorFechaHoraAscendente = function (filtroRangoFechaHora) {
        this.ordenarConsumosAscendentemente();
        return this.consumos.filter(consumo => filtroRangoFechaHora.pasa(consumo));
    }

    this.ordenarConsumosAscendentemente = function () {
        this.consumos.sort((unConsumo, siguienteConsumo) => unConsumo.inicio - siguienteConsumo.inicio);
    }

    this.obtenerConsumos = () => this.consumos;
}

module.exports = HistorialConsumos;