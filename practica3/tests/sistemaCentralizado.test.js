const sistemaCentralizado = require("../src/sistemaCentralizado.js");
const TarjetaSube = require("../src/tarjetaSube.js");
const Peso = require("../src/peso");


describe("Sistema Centralizado", () => {
    const cienPesos = new Peso(100);
    const ceroPesos = new Peso(0);
    const doscientosPesos = new Peso(200);


  beforeEach(() => {
    sistemaCentralizado.recargasPendientes = [];
  });

  test("al cargar una tarjeta por primera vez, las recargas pendientes son 1", () => {
    sistemaCentralizado.cargarTarjeta(123, cienPesos);

    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
  });

  test("al cargar una tarjeta sube por segunda vez, las recargas pendientes son 2", () => {
    sistemaCentralizado.cargarTarjeta(123, cienPesos);
    sistemaCentralizado.cargarTarjeta(123, cienPesos);

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

            expect(JSON.stringify(tarjetaSube.obtenerSaldo())).toEqual(JSON.stringify(ceroPesos));
        });

        test("con una sube que fue cargada 1 vez, su saldo aumenta en la cantidad cargada", () => {
            const saldoAcreditado = cienPesos;
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

            sistemaCentralizado.acreditarSaldo(tarjetaSube);

            expect(JSON.stringify(tarjetaSube.obtenerSaldo())).toEqual(JSON.stringify(saldoAcreditado));
        });

        test("con una sube que fue cargada 2 veces, su saldo aumenta en la cantidad cargada", () => {
            const saldoAcreditado = cienPesos;
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

            sistemaCentralizado.acreditarSaldo(tarjetaSube);

            expect(JSON.stringify(tarjetaSube.obtenerSaldo())).toEqual(JSON.stringify(doscientosPesos));
        });

        test("cuando una carga es acreditada, las recargas pendientes disminuyen", () => {
            const saldoAcreditado = cienPesos;
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

            sistemaCentralizado.acreditarSaldo(tarjetaSube);

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0)
        });

        test("cuando se cargan distintas tarjetas, solo se acreditan las cargas de la tarjeta que corresponde", () => {
            const saldoAcreditado = cienPesos;
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);
            sistemaCentralizado.cargarTarjeta(identificador + 1, saldoAcreditado);

            sistemaCentralizado.acreditarSaldo(tarjetaSube);

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
            expect(JSON.stringify(tarjetaSube.obtenerSaldo())).toEqual(JSON.stringify(saldoAcreditado));
        });

        test("cuando se acreditan multiples recargas, la cantidad de recargas pendientes disminuye en igual cantidad", () => {
            const saldoAcreditado = cienPesos;
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);
            sistemaCentralizado.cargarTarjeta(identificador, saldoAcreditado);

            sistemaCentralizado.acreditarSaldo(tarjetaSube);

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0)
        });
    });
});
