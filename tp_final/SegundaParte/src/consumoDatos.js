"use strict";

const ConsumoDatos = function (datos, inicio, fin, app) {

    this.validarFechas = function (inicio, fin) {
        if (fin <= inicio) throw new Error("La fecha de fin debe ser posterior a la de inicio");
    }

    this.validarFechas(inicio, fin);

    this.datos = datos;
    this.inicio = inicio;
    this.fin = fin;
    this.app = app;

    this.ocurrioDespuesDe = (unaFechaHora) => this.inicio >= unaFechaHora;

    this.ocurrioAntesDe = (unaFechaHora) => this.fin <= unaFechaHora;

    this.ocurrioEntre = function (fechaHoraInicial, fechaHoraFinal) {
        return this.ocurrioDespuesDe(fechaHoraInicial) && this.ocurrioAntesDe(fechaHoraFinal);
    }

    this.obtenerAppConsumidora = () => this.app;
}

module.exports = ConsumoDatos;