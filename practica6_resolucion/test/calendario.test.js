"use-strict"

const Calendario = require("../src/calendario");

test("La fecha 13 de Noviembre de 2024 no es franco para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const fechaQueNoEsFranco = new Date(2024,10,13);
    expect(calendarioDeMarcos.esFranco(fechaQueNoEsFranco)).toBe(false);
});

test("La fecha 20 de Noviembre de 2024 es franco para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const fechaQueEsFranco = new Date(2024,10,20);
    calendarioDeMarcos.agregarFrancoPuntual(fechaQueEsFranco);
    expect(calendarioDeMarcos.esFranco(fechaQueEsFranco)).toBe(true);
})

test("La fecha 25 de diciembre de 2024 es franco para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const fechaQueEsFranco = new Date(2024,11,25);
    calendarioDeMarcos.agregarFrancoPuntual(fechaQueEsFranco);
    expect(calendarioDeMarcos.esFranco(fechaQueEsFranco)).toBe(true);
})

test("El 20 de noviembre y 25 de diciembre son francos para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const veinteDeNoviembre2024 = new Date(2024,10,20);
    const navidad2024 = new Date(2024,11,25);

    calendarioDeMarcos.agregarFrancoPuntual(veinteDeNoviembre2024);
    calendarioDeMarcos.agregarFrancoPuntual(navidad2024);

    expect(calendarioDeMarcos.esFranco(veinteDeNoviembre2024)).toBe(true);
    expect(calendarioDeMarcos.esFranco(navidad2024)).toBe(true);
})


test("Los 25 de diciembre de 2024, 25 y 26 son francos para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const navidad2024 = new Date(2024,11,25);
    const navidad2025 = new Date(2025,11,25);
    const navidad2026 = new Date(2026,11,25);

    calendarioDeMarcos.agregarFrancoPuntual(navidad2024);
    calendarioDeMarcos.agregarFrancoPuntual(navidad2025);
    calendarioDeMarcos.agregarFrancoPuntual(navidad2026);

    expect(calendarioDeMarcos.esFranco(navidad2024)).toBe(true);
    expect(calendarioDeMarcos.esFranco(navidad2025)).toBe(true);
    expect(calendarioDeMarcos.esFranco(navidad2026)).toBe(true);
})

test("Todos los 25 de diciembre son francos para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const navidad2024 = new Date(2024,11,25);
    const navidad2025 = new Date(2025,11,25);

    const mes = 11;
    const dia = 25;
    calendarioDeMarcos.agregarFrancoAnual(mes, dia);

    expect(calendarioDeMarcos.esFranco(navidad2024)).toBe(true);
    expect(calendarioDeMarcos.esFranco(navidad2025)).toBe(true);
})

test("Todos los lunes son francos para Marcos.", () => {
    const calendarioDeMarcos = new Calendario();
    const noviembre18del2024 = new Date(2024,10,18);
    const noviembre25del2024 = new Date(2024,10,25);

    const diaLunes = 1;
    calendarioDeMarcos.agregarFrancoSemanal(diaLunes);

    expect(calendarioDeMarcos.esFranco(noviembre18del2024)).toBe(true);
    expect(calendarioDeMarcos.esFranco(noviembre25del2024)).toBe(true);
})