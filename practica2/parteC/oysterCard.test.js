const OysterCard = require('./oysterCard');

describe("Oyster card", () => {
    let tarjeta = null;

    beforeEach(() => {
        tarjeta = new OysterCard(123);
    });

    test("Saldo inicial igual a cero", () => {
        expect(tarjeta.obtenerSaldo()).toEqual(0);
    });

    test("Cargar saldo en pesos", () => {
        tarjeta.cargarSaldoEnPesos(1000);
        expect(tarjeta.obtenerSaldo()).toEqual(1000 / 1250);
        tarjeta.cargarSaldoEnPesos(120);
        expect(tarjeta.obtenerSaldo()).toEqual(1120 / 1250);
    });

    test("Cargar saldo en libras", () => {
        tarjeta.cargarSaldoEnLibras(2);
        expect(tarjeta.obtenerSaldo()).toEqual(2);
        tarjeta.cargarSaldoEnLibras(3);
        expect(tarjeta.obtenerSaldo()).toEqual(5);
    });

    test("Pagar viaje en pesos", () => {
        tarjeta.cargarSaldoEnPesos(1000);
        tarjeta.pagarViajeEnPesos(400);
        expect(tarjeta.obtenerSaldo()).toBeCloseTo((1000 - 400) / 1250); // si uso toEqual() el test falla por redondeo
    });

    test("Pagar viaje en libras", () => {
        tarjeta.cargarSaldoEnLibras(5);
        tarjeta.pagarViajeEnLibras(2.5);
        expect(tarjeta.obtenerSaldo()).toEqual(2.5);
    });
});
