"use strict";

const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteVencido = require("./paqueteVencido");

/**
 * @prototype Paquete
 * @description Representa un paquete de telefonía con datos, llamadas y duración
 * 
 * @constructor
 * @param {number} cantidadDatos - Cantidad de datos en GB
 * @param {number} minutosParaLlamadas - Minutos disponibles para llamadas
 * @param {number} duracion - Duración del paquete en dias
 * @param {number} costo - Costo del paquete en la moneda local
 */
const Paquete = function (cantidadDatos, minutosParaLlamadas, duracion, costo) {
    this.cantidadDatos = cantidadDatos;
    this.minutosParaLlamadas = minutosParaLlamadas;
    this.duracion = duracion;
    this.costo = costo;
    this.fechaDeCompra = null;

    const cantidadDatosOriginal = cantidadDatos;
    const minutosParaLlamadasOriginal = minutosParaLlamadas;

    this.obtenerTiempoParaLlamadas = function () {
        return this.minutosParaLlamadas;
    }

    this.obtenerDatosEnMB = function () {
        return this.cantidadDatos * 1000;
    }

    this.descontarMinutos = function (cantidadMinutos) {
        this.validarTengoSuficientesMinutos(cantidadMinutos);
        this.minutosParaLlamadas -= cantidadMinutos;
    }

    this.descontarDatosEnMB = function (cantidadDatos) {
        const cantidadDatosEnGB = cantidadDatos / 1000;
        this.validarSiTengoSuficientesDatos(cantidadDatosEnGB);
        this.cantidadDatos -= cantidadDatosEnGB;
    }

    this.estoyVencido = function () {
        const msPorDia = 24 * 60 * 60 * 1000;
        const fechaActual = new Date();
        const diasTranscurridos = Math.floor((fechaActual - this.fechaDeCompra) / msPorDia);
        return diasTranscurridos >= this.duracion;
    }

    this.marcarComoCompradoEn = function (fechaDeCompra) {
        this.fechaDeCompra = fechaDeCompra;
        if (this.estoyVencido()) return new PaqueteVencido();
        return this;
    }

    this.sosUnPaqueteNulo = function () {
        return false;
    }

    this.puedoComprarteCon = function (saldo) {
        return saldo >= this.costo;
    }

    this.validarTengoSuficientesMinutos = function (minutosADescontar) {
        if (this.minutosParaLlamadas < minutosADescontar) throw new Error("El cliente no tiene suficientes minutos para realizar la llamada");
    }

    this.validarSiTengoSuficientesDatos = function (datosADescontar) {
        if (this.cantidadDatos < datosADescontar) throw new Error("El cliente no tiene suficientes datos para realizar el consumo");
    }

    this.validaSiEstasVencido = function () {
        if (this.estoyVencido()) return new PaqueteVencido();
        return this;
    }

    this.validaSiEstasAgotado = function () {
        if (!this.minutosParaLlamadas && !this.cantidadDatos) return new PaqueteAgotado();
        return this;
    }

    this.renovate = function () {
        if (!this.estoyVencido()) return this;

        const nuevoPaquete = new Paquete(
            cantidadDatosOriginal,
            minutosParaLlamadasOriginal,
            this.duracion,
            this.costo
        );
        const fechaActual = new Date();
        nuevoPaquete.marcarComoCompradoEn(fechaActual);
        return nuevoPaquete;
    }
}

module.exports = Paquete;