const conversor = require("./conversor");

function OysterCard(identificador) {
    this.saldo = 0;
    this.identificador = identificador;
}

OysterCard.CONVERSOR = conversor;

OysterCard.prototype.obtenerSaldo = function () {
    return this.saldo;
}

OysterCard.prototype.cargarSaldoEnLibras = function (montoACargar) {
    this.saldo += montoACargar;
}

OysterCard.prototype.cargarSaldoEnPesos = function (montoACargar) {
    montoEnLibras = OysterCard.CONVERSOR.convertirPesosALibras(montoACargar);
    this.saldo += montoEnLibras;
}

OysterCard.prototype.pagarViajeEnPesos = function (precioDeViaje) {
    precioEnLibras = OysterCard.CONVERSOR.convertirPesosALibras(precioDeViaje);
    this.saldo -= precioEnLibras;
}

OysterCard.prototype.pagarViajeEnLibras = function (precioDeViaje) {
    this.saldo -= precioDeViaje;
}

OysterCard.prototype.soVo = function (identificadorTarjeta) {
    return this.identificador === identificadorTarjeta;
}

module.exports = OysterCard;