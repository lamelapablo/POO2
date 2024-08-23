const SistemaCentralizado = require("./sistema_centralizado");
const TarjetaSube = require("./tarjeta_sube");

describe("Sistema Centralizado", () => {
    let sistemaCentralizado;

    beforeEach(() => {
        sistemaCentralizado = new SistemaCentralizado();
    });

    test("al cargar una tarjeta por primera vez, las recargas pendientes son 1", () => {
        sistemaCentralizado.cargarTarjeta(123, 1000);
        expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(1);
    });

    test("al cargar una tarjeta sube por segunda vez, las recargas pendientes son 2", () => {

    });

    describe("al acreditar una recarga", () => {
        let tarjetaSube;
        const identificador = 123;

        beforeEach(() => {
            tarjetaSube = new TarjetaSube(identificador);
        });

        test("con una sube que no fue cargada, su saldo permanece igual", () => {
            expect(tarjetaSube.obtenerSaldo()).toBe(0);
        });

        test("con una sube que fue cargada 1 vez, su saldo aumenta en la cantidad cargada", () => {
            sistemaCentralizado.cargarTarjeta(identificador, 1000);
            sistemaCentralizado.acreditarSaldo(tarjetaSube);
            expect(tarjetaSube.obtenerSaldo()).toBe(1000);
        });

        test("con una sube que fue cargada 2 veces, su saldo aumenta en la cantidad cargada", () => {
            sistemaCentralizado.cargarTarjeta(identificador, 1000);
            sistemaCentralizado.acreditarSaldo(tarjetaSube);
            sistemaCentralizado.cargarTarjeta(identificador, 500);
            sistemaCentralizado.acreditarSaldo(tarjetaSube);
            expect(tarjetaSube.obtenerSaldo()).toBe(1500);
        });

        test("cuando una carga es acreditada, las recargas pendientes disminuyen", () => {
            sistemaCentralizado.cargarTarjeta(identificador, 1000);
            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(1);
            sistemaCentralizado.cargarTarjeta(identificador, 500);
            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(2);
            sistemaCentralizado.acreditarSaldo(tarjetaSube);
            sistemaCentralizado.acreditarSaldo(tarjetaSube);
            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(0);
        });

        test("cuando se cargan distintas tarjetas, solo se acreditan las cargas de la tarjeta que corresponde", () => {
            const identificador2 = 456;
            const tarjetaSube2 = new TarjetaSube(identificador2);

            sistemaCentralizado.cargarTarjeta(identificador, 1000); //cargo tarjeta 1
            sistemaCentralizado.cargarTarjeta(identificador2, 500); //cargo tarjeta 2

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(2);

            sistemaCentralizado.acreditarSaldo(tarjetaSube2);

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(1);

        });

        test("cuando se acreditan multiples recargas, la cantidad de recargas pendientes disminuye en igual cantidad", () => {
            for (let i = 0; i < 5; i++) {
                sistemaCentralizado.cargarTarjeta(identificador);
            }

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(5);

            for (let i = 0; i < 3; i++) {
                sistemaCentralizado.acreditarSaldo(tarjetaSube);
            }

            expect(sistemaCentralizado.cantidadRecargasPendientes()).toBe(2);
        });
    });
});
