const conversor = require("./conversor");

const TarjetaSube = function (identificador) {
    this.saldo = 0;
    this.identificador = identificador;
}

TarjetaSube.SALDO_MINIMO = -600;
TarjetaSube.CONVERSOR = conversor;

TarjetaSube.prototype.obtenerSaldo = function () {
    return this.saldo;
}

TarjetaSube.prototype.cargarSaldoEnPesos = function (montoACargar) {
    this.saldo += montoACargar;
}

TarjetaSube.prototype.cargarSaldoEnLibras = function (montoACargar) {
    montoEnPesos = TarjetaSube.CONVERSOR.convertirLibrasAPesos(montoACargar);
    this.saldo += montoEnPesos;
}

TarjetaSube.prototype.pagarViajeEnPesos = function (precioDeViaje) {
    this.validarViaje(precioDeViaje);
    this.saldo -= precioDeViaje;
}

TarjetaSube.prototype.pagarViajeEnLibras = function (precioDeViaje) {
    precioEnPesos = TarjetaSube.CONVERSOR.convertirLibrasAPesos(precioDeViaje);
    this.validarViaje(precioEnPesos);
    this.saldo -= precioEnPesos;
}

TarjetaSube.prototype.soVo = function (identificadorTarjeta) {
    return this.identificador === identificadorTarjeta;
}

TarjetaSube.prototype.validarViaje = function (precioDeViaje) {
    if (this.saldo - precioDeViaje < TarjetaSube.SALDO_MINIMO) {
        throw new Error("Saldo insuficiente.");
    }
}

module.exports = TarjetaSube;