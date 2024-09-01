class TarjetaSube {
    static SALDO_MINIMO = -600;
    constructor(numeroDeIdentificador) {
        this.saldo = 0;
        this.numeroDeIdentificador = numeroDeIdentificador
    }

    obtenerSaldo() {
        return this.saldo;
    }

    acreditarSaldo(montoACargar) {
        this.saldo += montoACargar;
    }

    pagarViaje(precioDeViaje) {
        this.validarViaje(precioDeViaje);

        this.saldo -= precioDeViaje;
    }

    soVo(identificadorTarjeta) {
        return this.numeroDeIdentificador === identificadorTarjeta;
    }

    validarViaje(precioDeViaje) {
        if (this.saldo - precioDeViaje < TarjetaSube.SALDO_MINIMO) {
            throw new Error("Saldo insuficiente.");
        }
    }
}

module.exports = TarjetaSube;