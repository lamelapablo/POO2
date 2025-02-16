"use strict";
// /**
//  * @prototype Paquete
//  * @description Representa un paquete de telefonía con datos, llamadas y duración
//  * 
//  * @constructor
//  * @param {number} cantidadDatos - Cantidad de datos en GB
//  * @param {number} tiempoParaLlamadas - Minutos disponibles para llamadas
//  * @param {number} duracion - Duración del paquete en días
//  * @param {number} costo - Costo del paquete en la moneda local
//  */
const Paquete = function (cantidadDatos, tiempoParaLlamadas, duracion, costo) {
    this.cantidadDatos = cantidadDatos;
    this.tiempoParaLlamadas = tiempoParaLlamadas;
    this.duracion = duracion;
    this.costo = costo;

    this.obtenerTiempoParaLlamadas = function () {
        return this.tiempoParaLlamadas;
    }
}

module.exports = Paquete;