"use strict";
const Cliente = require("../src/cliente");
const Paquete = require("../src/paquete");
const FiltroRangoFechaHora = require("../src/filtroRangoFechaHora");
const FechaMinima = require("../src/fechaMinima");
const FechaMaxima = require("../src/fechaMaxima");
const PrestamoMbMinutos = require("../src/prestamoMbMinutos");

describe('Cliente de la empresa telefonica', () => {

    let cliente = null;
    let clienteConRenovacionAutomatica = null;
    let otroCliente = null;

    beforeEach(() => {
        cliente = new Cliente("Juan", "Gonzalez", "1123456789");
        clienteConRenovacionAutomatica = new Cliente("Matias", "Fleman", "1123456789", true);
        otroCliente = new Cliente("Milagros", "Soler", "1123456789");
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

        expect(() => cliente.realizarLlamada(1001)).toThrow(new Error("El cliente no tiene suficientes minutos para descontar"));
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

        expect(() => cliente.consumirDatosEnMB(2501)).toThrow(new Error("El cliente no tiene suficientes datos para descontar"));
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

    test("El cliente no puede realizar un consumo de datos con una fecha de inicio posterior a la de fin", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);

        const inicioConsumo = new Date("2025-08-07T10:30:00Z");
        const finConsumo = new Date("2025-07-07T10:40:00Z");

        expect(() => cliente.consumirDatosEnMB(10, inicioConsumo, finConsumo)).toThrow(new Error("La fecha de fin debe ser posterior a la de inicio"));
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

    test("Al cliente se le vence el paquete por lo que no puede consumir datos", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));

        expect(() => cliente.consumirDatosEnMB(10)).toThrow(new Error("El paquete adquirido esta vencido"));
    });


    test("Al cliente se le vence el paquete por lo que puede comprar otro", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(otroPaquete);

        expect(cliente.obtenerPaqueteAsignado()).toEqual(otroPaquete);
    });

    test("El cliente agota los recursos del paquete por lo que no puede realizar una llamada", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);
        cliente.consumirDatosEnMB(2500);
        cliente.realizarLlamada(1000);

        expect(() => cliente.realizarLlamada(1)).toThrow(new Error("El paquete se encuentra agotado"));
    });

    test("El cliente agota los recursos del paquete por lo que no puede consumir datos", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);
        cliente.realizarLlamada(1000);
        cliente.consumirDatosEnMB(2500);

        expect(() => cliente.consumirDatosEnMB(1)).toThrow(new Error("El paquete se encuentra agotado"));
    });

    test("El cliente agota los recursos del paquete por lo que puede comprar otro", () => {
        cliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 30, 400);
        cliente.comprarPaquete(paquete);
        cliente.realizarLlamada(1000);
        cliente.consumirDatosEnMB(2500);

        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(otroPaquete);

        expect(cliente.obtenerPaqueteAsignado()).toEqual(otroPaquete);
    });

    test("Al cliente se le vence el paquete pero como tiene activada la renovacion puede seguir realizando llamadas", () => {
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

    test("Al cliente se le vence el paquete pero como tiene activada la renovacion puede seguir consumiendo datos", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        clienteConRenovacionAutomatica.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        clienteConRenovacionAutomatica.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));

        clienteConRenovacionAutomatica.consumirDatosEnMB(100);
        const paqueteRenovado = clienteConRenovacionAutomatica.obtenerPaqueteAsignado();

        expect(paqueteRenovado.obtenerDatosEnMB()).toBe(2400);
        expect(paquete).not.toEqual(paqueteRenovado);
    });

    test("Al cliente se le agota el paquete pero como tiene activada la renovacion puede seguir consumiendo datos y realizando llamadas", () => {
        clienteConRenovacionAutomatica.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        clienteConRenovacionAutomatica.comprarPaquete(paquete);

        clienteConRenovacionAutomatica.realizarLlamada(1000);
        clienteConRenovacionAutomatica.consumirDatosEnMB(2500);

        clienteConRenovacionAutomatica.realizarLlamada(10);
        clienteConRenovacionAutomatica.consumirDatosEnMB(100);

        const paqueteRenovado = clienteConRenovacionAutomatica.obtenerPaqueteAsignado();

        expect(paqueteRenovado.obtenerTiempoParaLlamadas()).toBe(990);
        expect(paqueteRenovado.obtenerDatosEnMB()).toBe(2400);
        expect(paquete).not.toEqual(paqueteRenovado);
    });

    test("Al cliente no se le vence el paquete por lo que luego de 1 dia y de haber realizado un consumo es el mismo que compro previamente", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        clienteConRenovacionAutomatica.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        clienteConRenovacionAutomatica.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-09T10:00:00Z'));
        clienteConRenovacionAutomatica.consumirDatosEnMB(100);

        expect(paquete.obtenerDatosEnMB()).toBe(2400);
        expect(clienteConRenovacionAutomatica.obtenerPaqueteAsignado()).toBe(paquete);
    });

    test("El cliente puede realizar llamadas, consumir datos y obtener el historial de consumos ordenados por fecha de manera ascendente con un filtro de fecha y hora de incio y fin", () => {
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

        const inicio = new Date("2025-08-07T10:00:00Z");
        const fin = new Date("2025-08-07T20:00:00Z");
        const filtroRangoFechaHora = new FiltroRangoFechaHora(inicio, fin);
        const historial = cliente.obtenerHistorialConsumosOrdenadoPorFechaAscendente(filtroRangoFechaHora);

        expect(historial.length).toBe(2);
        expect(historial[0].inicio.getTime()).toBe(inicio1.getTime());
        expect(historial[1].inicio.getTime()).toBe(inicio4.getTime());
    });

    test("El cliente puede realizar llamadas, consumir datos y obtener el historial de consumos ordenados por fecha de manera ascendente con un filtro de fecha y hora de solo incio", () => {
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

        const inicio = new Date("2025-08-07T09:00:00Z");
        const filtroRangoFechaHora = new FiltroRangoFechaHora(inicio, new FechaMaxima());
        const historial = cliente.obtenerHistorialConsumosOrdenadoPorFechaAscendente(filtroRangoFechaHora);

        expect(historial.length).toBe(3);
        expect(historial[0].inicio.getTime()).toBe(inicio2.getTime());
        expect(historial[1].inicio.getTime()).toBe(inicio1.getTime());
        expect(historial[2].inicio.getTime()).toBe(inicio4.getTime());
    });

    test("El cliente puede realizar llamadas, consumir datos y obtener el historial de consumos ordenados por fecha de manera ascendente con un filtro de fecha y hora de solo fin", () => {
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

        const fin = new Date("2025-08-07T18:00:00Z");
        const filtroRangoFechaHora = new FiltroRangoFechaHora(new FechaMinima(), fin);
        const historial = cliente.obtenerHistorialConsumosOrdenadoPorFechaAscendente(filtroRangoFechaHora);

        expect(historial.length).toBe(3);
        expect(historial[0].inicio.getTime()).toBe(inicio3.getTime());
        expect(historial[1].inicio.getTime()).toBe(inicio2.getTime());
        expect(historial[2].inicio.getTime()).toBe(inicio1.getTime());
    });

    test("El cliente no puede crear un filtro de rango de fecha hora con el orden invertido", () => {
        const fechaHoraInicio = new Date("2025-08-07T10:30:00Z");
        const fechaHoraFin = new Date("2025-07-07T10:40:00Z");

        expect(() => new FiltroRangoFechaHora(fechaHoraInicio, fechaHoraFin)).toThrow(new Error("La fecha de fin debe ser posterior a la de inicio"));
    });

    test("No es posible crear un paquete con alguno de sus valores negativo", () => {
        expect(() => new Paquete(-1, 0, 0, 0)).toThrow(new Error("El paquete no puede tener ninguno de sus valores negativo"));
    });

    test("El cliente hace uso de sus datos a traves de instagram, que tiene uso ilimitado, por lo tanto tiene la misma cantidad de datos que al inicio", () => {
        cliente.cargarDinero(1000);
        const appsConUsoIlimitado = ["instagram"];
        const paquete = new Paquete(2.5, 1000, 30, 400, appsConUsoIlimitado);
        cliente.comprarPaquete(paquete);

        const inicioConsumo = new Date("2025-8-7T10:30:00Z");
        const finConsumo = new Date("2025-8-7T10:40:00Z");

        cliente.consumirDatosEnMB(10, inicioConsumo, finConsumo, "instagram");
        expect(paquete.obtenerDatosEnMB()).toBe(2500);
    });

    test("El cliente puede ver en el historial de consumos que aplicacion lo realizo", () => {
        cliente.cargarDinero(1000);
        const appsConUsoIlimitado = ["instagram"];
        const paquete = new Paquete(2.5, 1000, 30, 400, appsConUsoIlimitado);
        cliente.comprarPaquete(paquete);

        const inicioConsumo = new Date("2025-8-7T10:30:00Z");
        const finConsumo = new Date("2025-8-7T10:40:00Z");

        cliente.consumirDatosEnMB(10, inicioConsumo, finConsumo, "instagram");
        const historialConsumos = cliente.obtenerHistorialConsumosOrdenadoPorFechaAscendente();
        const app = historialConsumos[0].obtenerAppConsumidora();
        expect(app).toBe("instagram");
    });

    test("Un cliente le puede prestar datos a otro cliente al cual se le vencio el paquete", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));
        const prestamo = new PrestamoMbMinutos(cliente, 100, 0);
        otroCliente.comprarPaquete(otroPaquete);
        otroCliente.efectuar(prestamo);

        expect(otroPaquete.obtenerDatosEnMB()).toBe(2400);
        expect(cliente.obtenerPaqueteAsignado().obtenerDatosEnMB()).toBe(100);
    });

    test("Un cliente no le puede prestar datos a otro cliente al cual no se le vencio el paquete", () => {
        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        otroCliente.comprarPaquete(otroPaquete);

        const prestamo = new PrestamoMbMinutos(cliente, 100, 0);
        expect(() => otroCliente.efectuar(prestamo)).toThrow("El cliente ya tiene un paquete asignado");
    });

    test("Un cliente le puede prestar datos a otro cliente al cual se le agoto el paquete", () => {
        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        cliente.realizarLlamada(1000);
        cliente.consumirDatosEnMB(2500);

        otroCliente.comprarPaquete(otroPaquete);
        const prestamo = new PrestamoMbMinutos(cliente, 100, 0);
        otroCliente.efectuar(prestamo);

        expect(otroPaquete.obtenerDatosEnMB()).toBe(2400);
        expect(cliente.obtenerPaqueteAsignado().obtenerDatosEnMB()).toBe(100);
    });

    test("Un cliente no le puede prestar datos a otro cliente al cual no se le agoto el paquete", () => {
        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        cliente.realizarLlamada(999);
        cliente.consumirDatosEnMB(2499);

        otroCliente.comprarPaquete(otroPaquete);
        const prestamo = new PrestamoMbMinutos(cliente, 100, 0);
        expect(() => otroCliente.efectuar(prestamo)).toThrow("El cliente ya tiene un paquete asignado");
    });

    test("Un cliente no puede prestar mas datos de los que tiene", () => {
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);

        otroCliente.comprarPaquete(paquete);
        const prestamo = new PrestamoMbMinutos(cliente, 2501, 0);
        expect(() => otroCliente.efectuar(prestamo)).toThrow("El cliente no tiene suficientes datos para descontar");
    });

    test("Un cliente le puede prestar minutos a otro cliente al cual se le vencio el paquete", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));
        otroCliente.comprarPaquete(otroPaquete);
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        otroCliente.efectuar(prestamo);

        expect(otroPaquete.obtenerTiempoParaLlamadas()).toBe(900);
        expect(cliente.obtenerPaqueteAsignado().obtenerTiempoParaLlamadas()).toBe(100);
    });

    test("Un cliente no le puede prestar minutos a otro cliente al cual no se le vencio el paquete", () => {
        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        otroCliente.comprarPaquete(otroPaquete);
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        expect(() => otroCliente.efectuar(prestamo)).toThrow("El cliente ya tiene un paquete asignado");
    });

    test("Un cliente le puede prestar minutos a otro cliente al cual se le agoto el paquete", () => {
        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        cliente.realizarLlamada(1000);
        cliente.consumirDatosEnMB(2500);

        otroCliente.comprarPaquete(otroPaquete);
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        otroCliente.efectuar(prestamo);

        expect(otroPaquete.obtenerTiempoParaLlamadas()).toBe(900);
        expect(cliente.obtenerPaqueteAsignado().obtenerTiempoParaLlamadas()).toBe(100);
    });

    test("Un cliente no le puede prestar minutos a otro cliente al cual no se le agoto el paquete", () => {
        cliente.cargarDinero(1000);
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);
        const otroPaquete = new Paquete(2.5, 1000, 3, 400);
        cliente.comprarPaquete(paquete);

        cliente.realizarLlamada(999);
        cliente.consumirDatosEnMB(2499);

        otroCliente.comprarPaquete(otroPaquete);
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        expect(() => otroCliente.efectuar(prestamo)).toThrow("El cliente ya tiene un paquete asignado");
    });

    test("Un cliente no puede prestar mas minutos de los que tiene", () => {
        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);

        otroCliente.comprarPaquete(paquete);
        const prestamo = new PrestamoMbMinutos(cliente, 0, 1001);
        expect(() => otroCliente.efectuar(prestamo)).toThrow("El cliente no tiene suficientes minutos para descontar");
    });

    test("Al cliente que hace el prestamo se le vence el paquete por lo cual al receptor tambien se le vence", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);

        otroCliente.comprarPaquete(paquete);
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        otroCliente.efectuar(prestamo);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));

        expect(() => cliente.realizarLlamada(10)).toThrow(new Error("El paquete adquirido esta vencido"));
    });

    test("Al cliente que hace el prestamo se le vence el paquete por lo cual no puede prestar minutos", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        otroCliente.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);

        otroCliente.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        expect(() => otroCliente.efectuar(prestamo)).toThrow(new Error("El paquete adquirido esta vencido"));
    });

    test("Al cliente que hace el prestamo se le vence el paquete pero como tiene renovacion automatica puede prestar minutos", () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2025-07-08T10:00:00Z'));

        clienteConRenovacionAutomatica.cargarDinero(1000);
        const paquete = new Paquete(2.5, 1000, 3, 400);

        clienteConRenovacionAutomatica.comprarPaquete(paquete);

        jest.setSystemTime(new Date('2025-07-11T10:00:00Z'));
        const prestamo = new PrestamoMbMinutos(cliente, 0, 100);
        clienteConRenovacionAutomatica.efectuar(prestamo);

        expect(cliente.obtenerPaqueteAsignado().obtenerTiempoParaLlamadas()).toBe(100);
    });

    test("No puede hacer un prestamo un cliente que no compro previamente un paquete", () => {
        const prestamo = new PrestamoMbMinutos(otroCliente, 0, 100);

        expect(() => cliente.efectuar(prestamo)).toThrow(new Error("El cliente no tiene un paquete asignado"));
    });
});