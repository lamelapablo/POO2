const TarjetaSube = require('./tarjetaSube');

describe("Tarjeta Sube", () => {
  let tarjeta = null;

  beforeEach(() => {
    tarjeta = new TarjetaSube(123);
  });

  test("Saldo inicial igual a cero", () => {
    expect(tarjeta.obtenerSaldo()).toEqual(0);
  });

  test("Cargar saldo en pesos", () => {
    tarjeta.cargarSaldoEnPesos(1000);
    expect(tarjeta.obtenerSaldo()).toEqual(1000);
    tarjeta.cargarSaldoEnPesos(120);
    expect(tarjeta.obtenerSaldo()).toEqual(1120);
  });

  test("Cargar saldo en libras", () => {
    tarjeta.cargarSaldoEnLibras(2);
    expect(tarjeta.obtenerSaldo()).toEqual(2500);
    tarjeta.cargarSaldoEnLibras(3);
    expect(tarjeta.obtenerSaldo()).toEqual(2500 + 1250 * 3);
  });

  test("Pagar viaje en pesos", () => {
    tarjeta.cargarSaldoEnPesos(1000);
    tarjeta.pagarViajeEnPesos(400);
    expect(tarjeta.obtenerSaldo()).toEqual(600);
  });

  test("Pagar viaje en libras", () => {
    tarjeta.cargarSaldoEnLibras(5);
    tarjeta.pagarViajeEnLibras(2.5);
    expect(tarjeta.obtenerSaldo()).toEqual((5 - 2.5) * 1250);
  });

  test("Saldo insuficiente para viajar", () => {

    expect(() => tarjeta.pagarViajeEnPesos(800))
      .toThrow(new Error("Saldo insuficiente."));
    expect(() => tarjeta.pagarViajeEnPesos(1200)).toThrow(new Error("Saldo insuficiente."));
  });

  test("Pagar viaje y alcanzar el saldo minimo", () => {
    tarjeta.pagarViajeEnPesos(600);
    expect(tarjeta.obtenerSaldo()).toEqual(-600);
  });

  test("Saldo insuficiente para viajar por superar los $ -600", () => {
    expect(() => tarjeta.pagarViajeEnPesos(601)).toThrow(new Error("Saldo insuficiente."));
  });

});
