"use strict";

const PaqueteAgotado = require("./paqueteAgotado");
const PaqueteVencido = require("./paqueteVencido");

const Paquete = function (cantidadDatos, minutosParaLlamadas, duracion, costo, appsConUsoIlimitado = []) {

    this.validarValoresNoNegativos = function (cantidadDatos, minutosParaLlamadas, duracion, costo) {
        const algunoEsNegativo = cantidadDatos < 0 || minutosParaLlamadas < 0 || duracion < 0 || costo < 0;
        if (algunoEsNegativo) throw new Error("El paquete no puede tener ninguno de sus valores negativo");
    }

    this.validarValoresNoNegativos(cantidadDatos, minutosParaLlamadas, duracion, costo);

    const MB_POR_GB = 1000;

    this.cantidadDatos = cantidadDatos;
    this.minutosParaLlamadas = minutosParaLlamadas;
    this.duracion = duracion;
    this.costo = costo;
    this.fechaDeCompra = null;
    this.appsConUsoIlimitado = appsConUsoIlimitado.map(app => app.toLowerCase());

    const cantidadDatosOriginal = cantidadDatos;
    const minutosParaLlamadasOriginal = minutosParaLlamadas;

    this.obtenerTiempoParaLlamadas = () => this.minutosParaLlamadas;

    this.obtenerDatosEnMB = () => this.cantidadDatos * MB_POR_GB;

    this.descontarMinutos = function (cantidadMinutos) {
        this.validarTengoSuficientesMinutos(cantidadMinutos);
        this.minutosParaLlamadas -= cantidadMinutos;
        if (this.estoyAgotado()) return this.crearPaqueteAgotado();
        return this;
    }

    this.descontarDatosEnMB = function (cantidadDatos, appConsumidora = "") {
        if (this.appsConUsoIlimitado.includes(appConsumidora.toLowerCase())) return this;
        const cantidadDatosEnGB = cantidadDatos / MB_POR_GB;
        this.validarSiTengoSuficientesDatos(cantidadDatosEnGB);
        this.cantidadDatos -= cantidadDatosEnGB;
        if (this.estoyAgotado()) return this.crearPaqueteAgotado();
        return this;
    }

    this.estoyVencido = function () {
        const msPorDia = 24 * 60 * 60 * 1000;
        const fechaActual = new Date();
        const diasTranscurridosDesdeCompra = Math.floor((fechaActual - this.fechaDeCompra) / msPorDia);
        return diasTranscurridosDesdeCompra >= this.duracion;
    }

    this.marcarComoCompradoEn = function (fechaDeCompra) {
        this.fechaDeCompra = fechaDeCompra;
    }

    this.puedoComprarteCon = (saldo) => saldo >= this.costo;

    this.validarTengoSuficientesMinutos = function (minutosADescontar) {
        if (this.minutosParaLlamadas < minutosADescontar) throw new Error("El cliente no tiene suficientes minutos para descontar");
    }

    this.validarSiTengoSuficientesDatos = function (datosADescontar) {
        if (this.cantidadDatos < datosADescontar) throw new Error("El cliente no tiene suficientes datos para descontar");
    }

    this.validaSiEstasVencido = function () {
        if (this.estoyVencido()) return new PaqueteVencido();
        return this;
    }

    this.estoyAgotado = () => !this.minutosParaLlamadas && !this.cantidadDatos;

    this.renovate = function () {
        if (!this.estoyVencido()) return this;

        const nuevoPaquete = new Paquete(cantidadDatosOriginal, minutosParaLlamadasOriginal, this.duracion, this.costo);
        const fechaActual = new Date();
        nuevoPaquete.marcarComoCompradoEn(fechaActual);
        return nuevoPaquete;
    }

    this.validarSiPuedoAdquirirOtroPaquete = function () {
        if (!this.estoyAgotado() && !this.estoyVencido()) throw new Error("El cliente ya tiene un paquete asignado");
    }

    this.crearPaqueteAgotado = function () {
        const paqueteOriginal = new Paquete(cantidadDatosOriginal, minutosParaLlamadasOriginal, this.duracion, this.costo);
        return new PaqueteAgotado(paqueteOriginal);
    }

    this.generaPaqueteParaPrestar = function (mb, minutos) {
        const gb = mb / MB_POR_GB;
        const paquete = new Paquete(gb, minutos, this.duracion, this.costo);
        paquete.marcarComoCompradoEn(this.fechaDeCompra);
        return paquete;
    }
}

module.exports = Paquete;