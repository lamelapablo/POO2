"use strict";

const Calendario = require('../src/calendario');

test('Puedo agregar un franco al calendario', () => {
    const calendario = new Calendario();
    const franco = new Date();

    calendario.agregarFranco(franco);
    expect(calendario.obtenerFranco()).toEqual(franco);
});

test("Puedo agregar 2 francos al calendario", () => {
    const calendario = new Calendario();
    const primerFranco = new Date("2024-05-25");
    const segundoFranco = new Date("2024-03-05");

    calendario.agregarFranco(primerFranco);
    calendario.agregarFranco(segundoFranco);

    expect(calendario.obtenerCantidadFrancos()).toBe(2);
});

test("El calendario me indica que una fecha es franco", () => {
    const calendario = new Calendario();
    const franco = new Date("2024-05-25");

    calendario.agregarFranco(franco);

    expect(calendario.esFranco(franco)).toBe(true);
});

test("El calendario me indica que una fecha no es franco", () => {
    const calendario = new Calendario();
    const franco = new Date("2024-05-25");

    calendario.agregarFranco(franco);

    expect(calendario.esFranco(new Date("2024-05-20"))).toBe(false);
});