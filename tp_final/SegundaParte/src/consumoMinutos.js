"use strict";

const ConsumoMinutos = function (minutos, inicio, fin) {

    this.validarFechas = function (inicio, fin) {
        if (fin <= inicio) throw new Error("La fecha de fin debe ser posterior a la de inicio");
    }

    this.validarFechas(inicio, fin);

    this.minutos = minutos;
    this.inicio = inicio;
    this.fin = fin;

    this.ocurrioDespuesDe = function (unaFechaHora) {
        return this.inicio >= unaFechaHora;
    }

    this.ocurrioAntesDe = function (unaFechaHora) {
        return this.fin <= unaFechaHora;
    }

    this.ocurrioEntre = function (fechaHoraInicial, fechaHoraFinal) {
        return this.ocurrioDespuesDe(fechaHoraInicial) && this.ocurrioAntesDe(fechaHoraFinal);
    }
}

module.exports = ConsumoMinutos;