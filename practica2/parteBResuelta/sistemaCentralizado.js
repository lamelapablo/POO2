class SistemaCentralizado {
    constructor() {
        this.recargasPendientes = [];
    }

    cantidadRecargasPendientes() {
        return this.recargasPendientes.length;
    }

    cargarTarjeta(identificador, montoACargar) {
        this.recargasPendientes.push(new Recarga(identificador, montoACargar));
    }

    acreditarSaldo(tarjetaSube) {
        this.recargasPendientes.map((recarga) => {
            recarga.acreditateA(tarjetaSube);
        })
        this.recargasPendientes = this.recargasPendientes.filter(
            recarga => !recarga.perteneceA(tarjetaSube));
    }
}

class Recarga {
    constructor(identificadorTarjeta, montoACargar) {
        this.identificadorTarjeta = identificadorTarjeta;
        this.montoACargar = montoACargar;
    }

    perteneceA(tarjetaSube) {
        return tarjetaSube.soVo(this.identificadorTarjeta);
    }

    acreditateA(tarjetaSube) {
        if (tarjetaSube.soVo(this.identificadorTarjeta)) {
            tarjetaSube.acreditarSaldo(this.montoACargar);
        }
    }
}

module.exports = SistemaCentralizado;