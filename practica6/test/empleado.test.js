"use strict";
const Empleado = require("../src/empleado");

test("Puedo crear un empleado", () => {
    const empleado = new Empleado("Marcos");

    expect(empleado.obtenerNombre()).toEqual("Marcos");
});

test("Marcos tiene como franco el 20/11/2024", () => {
    const empleado = new Empleado("Marcos");

    empleado.fijarFranco(new Date("2024-11-20"));

    expect(empleado.obtenerNombre()).toEqual("Marcos");
});

