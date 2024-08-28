const TarjetaSube = require('./tarjeta_sube');

class SistemaCentralizado {
    constructor() {
        this.cargas = {};
    }

    cargarTarjeta(idSube, montoACargar) {
        this.cargas[idSube] ? this.cargas[idSube].push(montoACargar) : this.cargas[idSube] = [montoACargar];
    }

    acreditarSaldo(sube) {
        const idSube = sube.obtenerIdentificador();
        const recPen = this.cargas[idSube]?.reduce((x, y) => x + y) || 0;
        this.cargas[idSube] = [];
        sube.cargarSaldo(recPen);
    }

    cantidadRecargasPendientes() {
        let cantRecPen = 0;
        Object.values(this.cargas).forEach(recargas => cantRecPen += recargas.length);
        return cantRecPen;
    }
}

module.exports = SistemaCentralizado;

// const sistema = new SistemaCentralizado();
// const sube = new TarjetaSube(123);

// sistema.cargarTarjeta(123, 1000);
// sistema.acreditarSaldo(sube);
// console.log(sistema.cargas);

// console.log(sube.obtenerSaldo());

// sistema.acreditarSaldo(sube)

// console.log(sube.obtenerSaldo());

// const juan = {
//     nombre: "Juan",
//     edad: 20
// };

// juan.saludar = function () {
//     console.log(`Hola, mi nombre es ${this.nombre}`);
// }

// console.log(juan.saludar);

// juan.saludar();

// const pedro = Object.create(juan);

// pedro.nombre = "Pedro";
// pedro.saludar();