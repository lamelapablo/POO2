"use strict";

const ConsumoMinutos = require("./consumoMinutos");
const ConsumoDatos = require("./consumoDatos");
const PaqueteNulo = require("./paqueteNulo");
const HistorialConsumos = require("./historialConsumos");
const FiltroRangoFechaHoraNulo = require("./filtroRangoFechaHoraNulo");
const Paquete = require("./paquete");

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
        this.paqueteAsignado = paquete;
        const fechaActual = new Date();
        this.paqueteAsignado.marcarComoCompradoEn(fechaActual);
    }

    this.validarQuePuedoComprarPaquete = function (paquete) {
        this.validarSiTengoSaldoSuficienteParaComprar(paquete);
        this.paqueteAsignado.validarSiPuedoAdquirirOtroPaquete();
    }

    this.validarSiTengoSaldoSuficienteParaComprar = function (unPaquete) {
        if (!unPaquete.puedoComprarteCon(this.saldo)) throw new Error("Saldo insuficiente para comprar el paquete");
    }

    this.realizarLlamada = function (duracion, inicioConsumo, finConsumo) {
        if (this.renuevoPaqueteAutomaticamente) this.paqueteAsignado = this.paqueteAsignado.renovate();
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasVencido();
        this.paqueteAsignado = this.paqueteAsignado.descontarMinutos(duracion);
        const consumoMinutos = new ConsumoMinutos(duracion, inicioConsumo, finConsumo);
        this.registrarConsumo(consumoMinutos);
    }

    this.consumirDatosEnMB = function (mbAConsumir, inicioConsumo, finConsumo, appConsumidora = "") {
        if (this.renuevoPaqueteAutomaticamente) this.paqueteAsignado = this.paqueteAsignado.renovate();
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasVencido();
        this.paqueteAsignado = this.paqueteAsignado.descontarDatosEnMB(mbAConsumir, appConsumidora);
        const consumoDatos = new ConsumoDatos(mbAConsumir, inicioConsumo, finConsumo, appConsumidora);
        this.registrarConsumo(consumoDatos);
    }

    this.obtenerConsumos = () => this.historialConsumos.obtenerConsumos();

    this.registrarConsumo = function (consumo) {
        this.historialConsumos.registrar(consumo);
    }

    this.obtenerHistorialConsumosOrdenadoPorFechaAscendente = function (filtroRangoFechaHora = new FiltroRangoFechaHoraNulo()) {
        return this.historialConsumos.obtenerConsumosOrdenadoPorFechaHoraAscendente(filtroRangoFechaHora);
    }

    this.asignar = function (unPaquete) {
        this.paqueteAsignado.validarSiPuedoAdquirirOtroPaquete();
        this.paqueteAsignado = unPaquete;
    }

    this.efectuar = function (prestamo) {
        if (this.renuevoPaqueteAutomaticamente) this.paqueteAsignado = this.paqueteAsignado.renovate();
        this.paqueteAsignado = this.paqueteAsignado.validaSiEstasVencido();
        prestamo.ejecutarDesde(this.paqueteAsignado);
    }
}

module.exports = Cliente;