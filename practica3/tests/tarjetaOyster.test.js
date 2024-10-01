const TarjetaOyster = require('../src/tarjetaOyster');
const Libra = require("../src/libra");
const Peso = require("../src/peso");

describe("Tarjeta Oyster", () => {
  let tarjeta = null;
  const ceroLibras = new Libra(0);
  const diezLibras = new Libra(10);
  const tresLibras = new Libra(3);
  const cincoMilPesos = new Peso(5000);
  const dieciseisLibras = new Libra(16);
  const veinteLibras = new Libra(20);
  const sieteLibras = new Libra(7);
  const seisLibras = new Libra(6);
  const diezPesos = new Peso(10);
  const seisPesos = new Peso(6);
  const milDoscientosCincuentaPesos = new Peso(1250);
  const cuatroLibras = new Libra(4);
  const cincoLibras = new Libra(5);


  beforeEach(() => {
    tarjeta = new TarjetaOyster(123);
  });

  test("Saldo inicial igual a cero", () => {
    expect(tarjeta.obtenerSaldo()).toEqualObject(ceroLibras);
  });

  test("Cargar saldo en Libras", () => {
    const treceLibras = new Libra(13);

    tarjeta.acreditarSaldo(diezLibras);
    expect(tarjeta.obtenerSaldo()).toEqualObject(diezLibras);
    tarjeta.acreditarSaldo(tresLibras);
    expect(tarjeta.obtenerSaldo()).toEqualObject(treceLibras);
  });

  test("Cargar saldo en Pesos", () => {
    tarjeta.acreditarSaldo(cincoMilPesos);
    expect(tarjeta.obtenerSaldo()).toEqualObject(cuatroLibras);
    tarjeta.acreditarSaldo(milDoscientosCincuentaPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(cincoLibras);
  });

  test("Cargar saldo en Libras y en Pesos", () => {
    tarjeta.acreditarSaldo(cincoMilPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(cuatroLibras);
    tarjeta.acreditarSaldo(dieciseisLibras);
    expect((tarjeta.obtenerSaldo())).toEqualObject(veinteLibras);
  });

  test("Pagar viaje en Libras", () => {
    tarjeta.acreditarSaldo(diezLibras);
    tarjeta.pagarViaje(tresLibras);
    expect((tarjeta.obtenerSaldo())).toEqualObject(sieteLibras);
  });

  test("Pagar viaje en Pesos", () => {
    tarjeta.acreditarSaldo(diezLibras);
    tarjeta.pagarViaje(cincoMilPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject(seisLibras);
  });


  test("Saldo insuficiente para viajar en Libras", () => {

    expect(()=>tarjeta.pagarViaje(diezLibras))
      .toThrow(new Error("Saldo insuficiente."));
    expect(()=>tarjeta.pagarViaje(seisLibras)).toThrow(new Error("Saldo insuficiente."));
  });

  test("Saldo insuficiente para viajar en Pesos", () => {

    expect(()=>tarjeta.pagarViaje(diezPesos))
      .toThrow(new Error("Saldo insuficiente."));
    expect(()=>tarjeta.pagarViaje(seisPesos)).toThrow(new Error("Saldo insuficiente."));
  });

  test("Pagar viaje y alcanzar el saldo minimo en Libras", () => {
    tarjeta.acreditarSaldo(cuatroLibras);
    tarjeta.pagarViaje(cuatroLibras);
    expect((tarjeta.obtenerSaldo())).toEqualObject((ceroLibras));
  });

  test("Pagar viaje y alcanzar el saldo minimo en Pesos", () => {
    tarjeta.acreditarSaldo(cuatroLibras);
    tarjeta.pagarViaje(cincoMilPesos);
    expect((tarjeta.obtenerSaldo())).toEqualObject((ceroLibras));
  });

});
