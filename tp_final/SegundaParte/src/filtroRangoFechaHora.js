"use strict";

const FiltroRangoFechaHora = function (inicio, fin) {
    this.inicio = inicio;
    this.fin = fin;

    this.pasa = (consumo) => consumo.ocurrioEntre(inicio, fin);
}

module.exports = FiltroRangoFechaHora;