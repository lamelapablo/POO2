"use strict";

const ConsumoMinutos = require("./consumoMinutos");
const ConsumoDatos = require("./consumoDatos");
const PaqueteNulo = require("./paqueteNulo");

const Cliente = function (nombre, apellido, numeroDeLinea, renovarPaquetesAutomaticamente = false) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.numeroDeLinea = numeroDeLinea;
    this.saldo = 0;
    this.paqueteAsignado = new PaqueteNulo();
    this.consumos = [];
    this.renuevoPaqueteAutomaticamente = renovarPaquetesAutomaticamente;

    this.obtenerSaldo = function () {
        return this.saldo;
    }

    this.obtenerPaqueteAsignado = function () {
        return this.paqueteAsignado;
    }

    this.cargarDinero = function (monto) {
        this.validarMontoNoNegativo(monto);
        this.saldo += monto;
    }

    this.validarMontoNoNegativo = function (monto) {
        if (monto < 0) throw new Error("El cliente no puede cargar un monto negativo");
    }

    this.comprarPaquete = function (paquete) {
        this.validarQuePuedoComprarPaquete(paquete);
        const fechaActual = new Date();
        this.paqueteAsignado = paquete.marcarComoCompradoEn(fechaActual);
    }

    this.obtenerPaqueteAsignado = function () {
        return this.paqueteAsignado;
    }

    this.validarQuePuedoComprarPaquete = function (paquete) {
        this.validarSiYaTengoUnPaqueteAsignado();
        this.validarSiTengoSaldoSuficienteParaComprar(paquete);
    }

    this.validarSiYaTengoUnPaqueteAsignado = function () {
        if (!this.paqueteAsignado.sosUnPaqueteNulo()) throw new Error("El cliente ya tiene un paquete asignado");
    }

    this.validarSiTengoSaldoSuficienteParaComprar = function (unPaquete) {
        if (!unPaquete.puedoComprarteCon(this.saldo)) throw new Error("Saldo insuficiente para comprar el paquete");
    }

    this.realizarLlamada = function (duracion, inicioConsumo, finConsumo) {
        if (this.renuevoPaqueteAutomaticamente) this.paqueteAsignado = this.paqueteAsignado.renovate();
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasVencido();
        this.paqueteAsignado.descontarMinutos(duracion);
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasAgotado();
        const consumoMinutos = new ConsumoMinutos(duracion, inicioConsumo, finConsumo);
        this.registrarConsumo(consumoMinutos);
    }

    this.consumirDatosEnMB = function (mbAConsumir, inicioConsumo, finConsumo) {
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasVencido();
        this.paqueteAsignado.descontarDatosEnMB(mbAConsumir);
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasAgotado();
        const consumoDatos = new ConsumoDatos(mbAConsumir, inicioConsumo, finConsumo);
        this.registrarConsumo(consumoDatos);
    }

    this.obtenerConsumos = function () {
        return this.consumos;
    }

    this.registrarConsumo = function (consumo) {
        this.consumos.push(consumo);
    }

    this.obtenerHistorialConsumosOrdenadoPorFechaAscendente = function (filtroInicio, filtroFin) {
        if (this.algunaFechaEsNula(filtroInicio, filtroFin)) return this.consumos.sort((unConsumo, siguienteConsumo) => unConsumo.inicio - siguienteConsumo.inicio);

        const consumosFiltrados = this.consumos.filter(consumo => consumo.inicio >= filtroInicio && consumo.fin <= filtroFin);
        return consumosFiltrados.sort((unConusmo, siguienteConsumo) => unConusmo.inicio - siguienteConsumo.inicio);
    }

    this.algunaFechaEsNula = function (fecha1, fecha2) {
        return !fecha1 || !fecha2;
    }
}

module.exports = Cliente;