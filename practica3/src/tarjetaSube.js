const Peso = require("./peso");
const Libra = require("./libra");

const TarjetaSube = function (numeroDeIdentificador) {
    SALDO_MINIMO = new Peso(-600);
    this.saldo = new Peso(0);
    this.numeroDeIdentificador = numeroDeIdentificador


    this.obtenerSaldo = function(){
        return this.saldo;
    }

    this.acreditarSaldo = function(montoACargar){
        this.saldo = this.saldo.mas(montoACargar);
    }

    this.pagarViaje = function(precioDeViaje){
        this.validarViaje(precioDeViaje);
        this.saldo = this.saldo.menos(precioDeViaje)
    }

    this.soVo = function(identificadorTarjeta){
        return this.numeroDeIdentificador === identificadorTarjeta;
    }

    this.validarViaje = function(precioDeViaje) {
        if (this.saldo.menos(precioDeViaje).menor(SALDO_MINIMO)) {
            throw new Error("Saldo insuficiente.");
        }
    }
}

module.exports = TarjetaSube;