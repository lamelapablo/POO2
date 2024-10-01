const TarjetaSube = require('../src/tarjetaSube');
const Moneda = require("../src/moneda");
const Peso = require("../src/peso");
const Libra = require("../src/libra");


describe("Tarjeta Sube", () => {
  let tarjeta = null;
  const ceroPesos = new Peso(0);
  const cincoMilPesos = new Peso(5000);
  const seisMilDoscientosCincuentaPesos = new Peso(6250);
  const cuatroLibras = new Libra(4);
  const unaLibra = new Libra(1);
  const seisMilPesos = new Peso(6000);
  const milPesos = new Peso(1000);
  const sieteMilQuinientosPesos = new Peso(7500);
  const dosMilQuinientosPesos = new Peso(2500);
  const ochocientosPesos = new Peso(800);
  const milDoscientosPesos = new Peso(1200);
  const diezLibras =new Libra(10);
  const seisLibras = new Libra(6);
  const seiscientosPesos = new Peso(600);
  const menosSeiscientosPesos = new Peso(-600);
  const milDoscientosCincuentaPesos = new Peso(1250);
  const seiscientosCincuentaPesos = new Peso(650);

  beforeEach(() => {
    tarjeta = new TarjetaSube(123);
  });

  test("Saldo inicial igual a cero", () => {
    expect((tarjeta.obtenerSaldo())).toEqualObject(ceroPesos);
  });

  test("Cargar saldo en Pesos", () => {
    tarjeta.acreditarSaldo(cincoMilPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(cincoMilPesos);
    tarjeta.acreditarSaldo(milDoscientosCincuentaPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(seisMilDoscientosCincuentaPesos);
  });

  test("Cargar saldo en Libras", () => {
    tarjeta.acreditarSaldo(cuatroLibras);
    expect((tarjeta.obtenerSaldo())).toEqualObject(cincoMilPesos);
    tarjeta.acreditarSaldo(unaLibra);
    expect((tarjeta.obtenerSaldo())).toEqualObject(seisMilDoscientosCincuentaPesos);
  });

  test("Cargar saldo en Libras y en Pesos", () => {
    tarjeta.acreditarSaldo(cincoMilPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(cincoMilPesos);
    tarjeta.acreditarSaldo(new Libra(2));
    expect((tarjeta.obtenerSaldo())).toEqualObject(sieteMilQuinientosPesos);
  });

  test("Pagar viaje en Pesos", () => {
    tarjeta.acreditarSaldo(seisMilPesos);
    tarjeta.pagarViaje(cincoMilPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(milPesos);
  });

  test("Pagar viaje en Libras", () => {
    tarjeta.acreditarSaldo(sieteMilQuinientosPesos);
    tarjeta.pagarViaje(cuatroLibras);
    expect((tarjeta.obtenerSaldo())).toEqualObject(dosMilQuinientosPesos);
  });

  test("Saldo insuficiente para viajar en Pesos", () => {
    
    expect(()=>tarjeta.pagarViaje(ochocientosPesos))
      .toThrow(new Error("Saldo insuficiente."));
    expect(()=>tarjeta.pagarViaje(milDoscientosPesos)).toThrow(new Error("Saldo insuficiente."));
  });

  test("Saldo insuficiente para viajar en Libras", () => {
    
    expect(()=>tarjeta.pagarViaje(diezLibras))
      .toThrow(new Error("Saldo insuficiente."));
    expect(()=>tarjeta.pagarViaje(seisLibras)).toThrow(new Error("Saldo insuficiente."));
  });

  test("Pagar viaje y alcanzar el saldo minimo en Pesos", () => {
    tarjeta.pagarViaje(seiscientosPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(menosSeiscientosPesos);
  });

  test("Pagar viaje y alcanzar el saldo minimo en Libras", () => {
    tarjeta.acreditarSaldo(seiscientosCincuentaPesos);
    tarjeta.pagarViaje(unaLibra);
    expect((tarjeta.obtenerSaldo())).toEqualObject(menosSeiscientosPesos);
  });

  test("Saldo insuficiente para viajar por superar los $ -600", () => {
    expect(()=>tarjeta.pagarViaje(seisMilPesos)).toThrow(new Error("Saldo insuficiente."));
  });

});
