"use strict";
const Cliente = require("../src/cliente");
const Paquete = require("../src/paquete");

describe('Cliente de la empresa telefonica', () => {

    let cliente = null;
    let clienteConRenovacionAutomatica = null;

    beforeEach(() => {
        cliente = new Cliente("Juan", "Gonzalez", "1123456789");
        clienteConRenovacionAutomatica = new Cliente("Juan", "Gonzalez", "1123456789", true);
        jest.useRealTimers();
    });

    test("El saldo inicial de un cliente es 0", () => {
        expect(cliente.obtenerSaldo()).toBe(0);
    });

    test("El cliente puede cargar dinero a su cuenta prepaga", () => {
        cliente.cargarDinero(100);
        expect(cliente.obtenerSaldo()).toBe(100);
    });

    test("El cliente no puede cargar una cantidad de dinero negativa a su cuenta prepaga", () => {
        expect(() => cliente.cargarDinero(-100)).toThrow(new Error("El cliente no puede cargar un monto negativo"));
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

    test("El cliente puede realizar un consumo de internet", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(1, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        cliente.consumirDatosEnMB(10);
        expect(paquete.obtenerDatosEnMB()).toBe(990);
    });

    test("El cliente no puede consumir datos si no tiene un paquete asignado", () => {
        expect(() => cliente.consumirDatosEnMB(10)).toThrow(new Error("El cliente no tiene un paquete asignado"));
    });

    test("El cliente no puede consumir una cantidad de datos que excede la cantidad de datos disponibles en el paquete", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        expect(() => cliente.consumirDatosEnMB(2501)).toThrow(new Error("El cliente no tiene suficientes datos para realizar el consumo"));
    });

    test("El cliente realiza una llamada por 10 mins y el consumo queda registrado", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const inicioConsumo = new Date("2025-8-7T10:30:00Z");
        const finConsumo = new Date("2025-8-7T10:40:00Z");

        cliente.realizarLlamada(10, inicioConsumo, finConsumo);
        const consumos = cliente.obtenerConsumos();
        expect(consumos.length).toBe(1);
    });

    test("El cliente no puede realizar una llamada con una fecha de inicio posterior a la de fin", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const inicioConsumo = new Date("2025-08-07T10:30:00Z");
        const finConsumo = new Date("2025-07-07T10:40:00Z");

        expect(() => cliente.realizarLlamada(10, inicioConsumo, finConsumo)).toThrow(new Error("La fecha de fin debe ser posterior a la de inicio"));
    });

    test("El cliente realiza consume 10MB y el consumo queda registrado", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const inicioConsumo = new Date("2025-8-7T10:30:00Z");
        const finConsumo = new Date("2025-8-7T10:40:00Z");

        cliente.consumirDatosEnMB(10, inicioConsumo, finConsumo);
        const consumos = cliente.obtenerConsumos();
        expect(consumos.length).toBe(1);
    });

    test("El cliente puede obtener el historial de consumos ordenados por fecha de manera ascendente", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const inicio1 = new Date("2025-08-07T10:30:00Z");
        const fin1 = new Date("2025-08-07T10:40:00Z");
        cliente.realizarLlamada(10, inicio1, fin1);

        const inicio2 = new Date("2025-08-07T09:00:00Z");
        const fin2 = new Date("2025-08-07T09:10:00Z");
        cliente.consumirDatosEnMB(20, inicio2, fin2);

        const historial = cliente.obtenerHistorialConsumosOrdenadoPorFechaAscendente();
        expect(historial.length).toBe(2);
        expect(historial[0].inicio.getTime()).toBe(inicio2.getTime());
        expect(historial[1].inicio.getTime()).toBe(inicio1.getTime());
    });

    test("Al cliente se le vence el paquete por lo que no puede realizar una llamada", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));

        expect(() => cliente.realizarLlamada(10)).toThrow(new Error("El paquete adquirido esta vencido"));
    });

    test("El cliente agota los recursos del paquete por lo que no puede realizar una llamada", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);
        cliente.realizarLlamada(1000);
        cliente.consumirDatosEnMB(2500);

        expect(() => cliente.realizarLlamada(1)).toThrow(new Error("El paquete se encuentra agotado"));
    });

    test("Al cliente se le vence el paquete pero como tiene activada la renovacion puede seguir realizando consumos", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        clienteConRenovacionAutomatica.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        clienteConRenovacionAutomatica.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));

        clienteConRenovacionAutomatica.realizarLlamada(10);
        const paqueteRenovado = clienteConRenovacionAutomatica.obtenerPaqueteAsignado();

        expect(paqueteRenovado.obtenerTiempoParaLlamadas()).toBe(990);
    });

    test("El cliente puede obtener el historial de consumos ordenados por fecha de manera ascendente con un filtro de fecha y hora de incio fin", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const inicio1 = new Date("2025-08-07T10:30:00Z");
        const fin1 = new Date("2025-08-07T10:40:00Z");
        cliente.realizarLlamada(10, inicio1, fin1);

        const inicio2 = new Date("2025-08-07T09:00:00Z");
        const fin2 = new Date("2025-08-07T09:10:00Z");
        cliente.consumirDatosEnMB(20, inicio2, fin2);

        const inicio3 = new Date("2025-08-07T05:30:00Z");
        const fin3 = new Date("2025-08-07T05:40:00Z");
        cliente.realizarLlamada(10, inicio3, fin3);

        const inicio4 = new Date("2025-08-07T19:30:00Z");
        const fin4 = new Date("2025-08-07T19:40:00Z");
        cliente.consumirDatosEnMB(30, inicio4, fin4);

        const filtroInicio = new Date("2025-08-07T10:00:00Z");
        const filtroFin = new Date("2025-08-07T20:00:00Z");
        const historial = cliente.obtenerHistorialConsumosOrdenadoPorFechaAscendente(filtroInicio, filtroFin);

        expect(historial.length).toBe(2);
        expect(historial[0].inicio.getTime()).toBe(inicio1.getTime());
        expect(historial[1].inicio.getTime()).toBe(inicio4.getTime());
    });
});