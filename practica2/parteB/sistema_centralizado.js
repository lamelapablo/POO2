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
        const recPen = this.cargas[idSube]?.shift() || 0;
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
// console.log(sistema.cargas);
// // console.log(sistema.cargas);
// // console.log(sistema.cantidadRecargasPendientes());
// sistema.acreditarSaldo(sube);
// console.log(sistema.cargas);



// console.log(sube.obtenerSaldo());


