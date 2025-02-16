"use strict";
const Cliente = require("../src/cliente");
const Paquete = require("../src/paquete");

describe('Cliente de la empresa telefonica', () => {

    let cliente = null;

    beforeEach(() => {
        cliente = new Cliente("Juan", "Gonzalez", "1123456789");
    });

    test("El saldo inicial de un cliente es 0", () => {
        expect(cliente.obtenerSaldo()).toBe(0);
    });

    test("El cliente puede cargar dinero a su cuenta prepaga", () => {
        cliente.cargarDinero(100);
        expect(cliente.obtenerSaldo()).toBe(100);
    });

    test("El cliente puede comprar un paquete", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        expect(cliente.obtenerPaqueteAsignado()).toEqual(paquete);
    })

    test("El cliente no puede comprar un paquete si no tiene saldo suficiente", () => {
        const paquete = new Paquete(2.5, 1000, 30, 400);

        expect(() => cliente.comprarPaquete(paquete)).toThrow(new Error("Saldo insuficiente para comprar el paquete"));
    });

    test("El cliente no puede comprar un paquete si ya tiene uno asignado", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const otroPaquete = new Paquete(5, 500, 30, 800);

        expect(() => cliente.comprarPaquete(otroPaquete)).toThrow(new Error("El cliente ya tiene un paquete asignado"));
    });

    test("El cliente puede realizar una llamada", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        cliente.realizarLlamada(10);
        expect(paquete.obtenerTiempoParaLlamadas()).toBe(990);
    })

    test("El cliente no puede realizar una llamada si no tiene un paquete asignado", () => {
        expect(() => cliente.realizarLlamada(10)).toThrow(new Error("El cliente no tiene un paquete asignado"));
    });

    test("El cliente no puede realizar una llamada que excede la cantidad de minutos disponibles en el paquete", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        expect(() => cliente.realizarLlamada(1001)).toThrow(new Error("El cliente no tiene suficientes minutos para realizar la llamada"));
    });
});