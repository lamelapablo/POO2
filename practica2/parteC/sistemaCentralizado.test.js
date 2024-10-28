const SistemaCentralizado = require("./sistemaCentralizado.js");
const TarjetaSube = require("./tarjetaSube.js");
const OysterCard = require("./oysterCard.js");


describe("Sistema Centralizado", () => {
  let sistemaCentralizado = SistemaCentralizado;

  beforeEach(() => {
    sistemaCentralizado.reset();
  });

  test("al cargar una tarjeta por primera vez, las recargas pendientes son 1", () => {
    sistemaCentralizado.cargarTarjetaEnPesos(123, 100);

    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
  });

  test("al cargar una tarjeta sube por segunda vez, las recargas pendientes son 2", () => {
    sistemaCentralizado.cargarTarjetaEnPesos(123, 100);
    sistemaCentralizado.cargarTarjetaEnPesos(123, 100);

    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(2);
  });

  describe("al acreditar una recarga", () => {
    let tarjetaSube;
    let oysterCard;
    const identificadorSube = 123;
    const identificadorOyster = 456;

    beforeEach(() => {
      tarjetaSube = new TarjetaSube(identificadorSube);
      oysterCard = new OysterCard(identificadorOyster);
    });

    test("con una sube que no fue cargada, su saldo permanece igual", () => {
      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(0);
    });

    test("con una oyster card que no fue cargada, su saldo permanece igual", () => {
      sistemaCentralizado.acreditarSaldo(oysterCard);

      expect(oysterCard.obtenerSaldo()).toEqual(0);
    });

    test("con una sube que fue cargada 1 vez en pesos, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditado);
    });

    test("con una sube que fue cargada 1 vez en libras, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditado = 3;
      sistemaCentralizado.cargarTarjetaEnLibras(identificadorSube, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditado * 1250);
    });

    test("con una oyster card que fue cargada 1 vez en pesos, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditado = 5000;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorOyster, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(oysterCard);

      expect(oysterCard.obtenerSaldo()).toBeCloseTo(saldoAcreditado / 1250);
    });

    test("con una sube que fue cargada 2 veces, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditadoEnPesos = 100;
      const saldoAcreditadoEnLibras = 3;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube, saldoAcreditadoEnPesos);
      sistemaCentralizado.cargarTarjetaEnLibras(identificadorSube, saldoAcreditadoEnLibras);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditadoEnPesos + saldoAcreditadoEnLibras * 1250);
    });

    test("con una oyster card que fue cargada 2 veces, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditadoEnPesos = 3000;
      const saldoAcreditadoEnLibras = 3;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorOyster, saldoAcreditadoEnPesos);
      sistemaCentralizado.cargarTarjetaEnLibras(identificadorOyster, saldoAcreditadoEnLibras);

      sistemaCentralizado.acreditarSaldo(oysterCard);

      expect(oysterCard.obtenerSaldo()).toBeCloseTo(saldoAcreditadoEnPesos / 1250 + saldoAcreditadoEnLibras);
    });

    test("cuando una carga es acreditada, las recargas pendientes disminuyen", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0);
    });

    test("cuando se cargan distintas tarjetas, solo se acreditan las cargas de la tarjeta que corresponde", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube, saldoAcreditado);
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube + 1, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditado);
    });

    test("cuando se acreditan multiples recargas, la cantidad de recargas pendientes disminuye en igual cantidad", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube, saldoAcreditado);
      sistemaCentralizado.cargarTarjetaEnPesos(identificadorSube, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0)
    });
  });
});