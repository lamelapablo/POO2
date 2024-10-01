const Libra = require("./libra");
const Peso = require("./peso");

const TarjetaOyster = function (numeroDeIdentificador) {
    this.saldo = new Libra(0);
    this.numeroDeIdentificador = numeroDeIdentificador;

    this.obtenerSaldo = function(){
        return this.saldo;
    }

    this.acreditarSaldo = function(montoACargar){
        this.saldo = this.saldo.mas(montoACargar);
    }

    this.pagarViaje = function(precioDeViaje){
        this.validarViaje(precioDeViaje);
        this.saldo = this.saldo.menos(precioDeViaje);
    }

    this.validarViaje = function(montoAPagar) {
        if (this.saldo.menor(montoAPagar)) {
            throw new Error("Saldo insuficiente.");
        }
    }

}

module.exports = TarjetaOyster;