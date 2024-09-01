const SistemaCentralizado = require("./sistemaCentralizado.js");
const TarjetaSube = require("./tarjetaSube.js");


describe("Sistema Centralizado", () => {
  let sistemaCentralizado;

  beforeEach(() => {
    sistemaCentralizado = new SistemaCentralizado();
  });

  test("al cargar una tarjeta por primera vez, las recargas pendientes son 1", () => {
    sistemaCentralizado.cargarTarjeta(123, 100);

    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
  });

  test("al cargar una tarjeta sube por segunda vez, las recargas pendientes son 2", () => {
    sistemaCentralizado.cargarTarjeta(123, 100);
    sistemaCentralizado.cargarTarjeta(123, 100);

    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(2);
  });

  describe("al acreditar una recarga", () => {
    let tarjetaSube;
    const identificador = 123;

    beforeEach(() => {
      tarjetaSube = new TarjetaSube(identificador);
    });

    test("con una sube que no fue cargada, su saldo permanece igual", () => {
      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(0);
    });

    test("con una sube que fue cargada 1 vez, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditado)
    });

    test("con una sube que fue cargada 2 veces, su saldo aumenta en la cantidad cargada", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditado * 2)
    });

    test("cuando una carga es acreditada, las recargas pendientes disminuyen", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0)
    });

    test("cuando se cargan distintas tarjetas, solo se acreditan las cargas de la tarjeta que corresponde", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);
      sistemaCentralizado.cargarTarjeta(identificador + 1, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
      expect(tarjetaSube.obtenerSaldo()).toEqual(saldoAcreditado);
    });

    test("cuando se acreditan multiples recargas, la cantidad de recargas pendientes disminuye en igual cantidad", () => {
      const saldoAcreditado = 100;
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);
      sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0)
    });
  });
});
