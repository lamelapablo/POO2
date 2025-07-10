"use strict";

const ConsumoDatos = function (datos, incio, fin) {

    this.validarFechas = function (inicio, fin) {
        if (!inicio || !fin) return;
        if (fin <= inicio) throw new Error("La fecha de fin debe ser posterior a la de inicio");
    }

    this.validarFechas(incio, fin);

    this.datos = datos;
    this.inicio = incio;
    this.fin = fin;
}

module.exports = ConsumoDatos;