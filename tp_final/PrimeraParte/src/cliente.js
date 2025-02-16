"use strict";

const Cliente = function (nombre, apellido, numeroDeLinea) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.numeroDeLinea = numeroDeLinea;
    this.saldo = 0;
    this.paqueteAsignado = null;

    this.obtenerSaldo = function () {
        return this.saldo;
    }

    this.cargarDinero = function (monto) {
        this.saldo += monto;
    }

    this.comprarPaquete = function (paquete) {
        this.validarQuePuedoComprarPaquete(paquete);
        this.paqueteAsignado = paquete;
    }

    this.obtenerPaqueteAsignado = function () {
        return this.paqueteAsignado;
    }

    this.validarQuePuedoComprarPaquete = function (paquete) {
        if (this.paqueteAsignado) {
            throw new Error("El cliente ya tiene un paquete asignado");
        }

        if (this.saldo < paquete.costo) {
            throw new Error("Saldo insuficiente para comprar el paquete");
        }
    }

    this.realizarLlamada = function (duracion) {
        this.validarQuePuedoRealizarLlamada(duracion);
        this.paqueteAsignado.tiempoParaLlamadas -= duracion;
    }

    this.validarQuePuedoRealizarLlamada = function (duracion) {
        if (!this.paqueteAsignado) throw new Error("El cliente no tiene un paquete asignado");
        if (this.paqueteAsignado.tiempoParaLlamadas < duracion) throw new Error("El cliente no tiene suficientes minutos para realizar la llamada");
    }
}

module.exports = Cliente;