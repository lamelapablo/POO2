class TarjetaSube {
    static saldoMin = -600;
    constructor(identificador) {
        this.identificador = identificador;
        this.saldo = 0;
    }

    obtenerSaldo = () => this.saldo;

    cargarSaldo = (cantSaldo) => {
        this.saldo += cantSaldo;
    }

    pagarViaje = (precioViaje) => {
        let saldoRestante = this.saldo - precioViaje;
        if (saldoRestante < TarjetaSube.saldoMin) {
            throw new Error("Saldo insuficiente.")
        }
        this.saldo = saldoRestante;
    }
}

module.exports = TarjetaSube;