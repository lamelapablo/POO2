"use strict";

const FiltroRangoFechaHora = function (inicio, fin) {

    this.validarFechas = function (inicio, fin) {
        if (fin <= inicio) throw new Error("La fecha de fin debe ser posterior a la de inicio");
    }

    this.validarFechas(inicio, fin);

    this.inicio = inicio;
    this.fin = fin;

    this.pasa = (consumo) => consumo.ocurrioEntre(inicio, fin);
}

module.exports = FiltroRangoFechaHora;