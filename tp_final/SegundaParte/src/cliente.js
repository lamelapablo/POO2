"use strict";

const ConsumoMinutos = require("./consumoMinutos");
const ConsumoDatos = require("./consumoDatos");
const PaqueteNulo = require("./paqueteNulo");
const HistorialConsumos = require("./historialConsumos");
const FiltroRangoFechaHoraNulo = require("./filtroRangoFechaHoraNulo");

const Cliente = function (nombre, apellido, numeroDeLinea, renovarPaquetesAutomaticamente = false) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.numeroDeLinea = numeroDeLinea;
    this.saldo = 0;
    this.paqueteAsignado = new PaqueteNulo();
    this.historialConsumos = new HistorialConsumos();
    this.renuevoPaqueteAutomaticamente = renovarPaquetesAutomaticamente;

    this.obtenerSaldo = () => this.saldo;

    this.obtenerPaqueteAsignado = () => this.paqueteAsignado;

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
        if (this.renuevoPaqueteAutomaticamente) this.paqueteAsignado = this.paqueteAsignado.renovate();
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasVencido();
        this.paqueteAsignado.descontarDatosEnMB(mbAConsumir);
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasAgotado();
        const consumoDatos = new ConsumoDatos(mbAConsumir, inicioConsumo, finConsumo);
        this.registrarConsumo(consumoDatos);
    }

    this.obtenerConsumos = () => this.historialConsumos.obtenerConsumos();

    this.registrarConsumo = function (consumo) {
        this.historialConsumos.registrar(consumo);
    }

    this.obtenerHistorialConsumosOrdenadoPorFechaAscendente = function (filtroRangoFechaHora = new FiltroRangoFechaHoraNulo()) {
        return this.historialConsumos.obtenerConsumosOrdenadoPorFechaHoraAscendente(filtroRangoFechaHora);
    }
}

module.exports = Cliente;