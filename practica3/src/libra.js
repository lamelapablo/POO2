const Moneda = require('../src/moneda');

const Libra = function (monto) {
    Moneda.call(this, monto);

    this.divisa = "Libras";

    this.aLibras = function () {
        return this;
    }

    this.aPesos = function () {
        const Peso = require("./peso"); //Este no me gusta pero no pude sacar la referencia circular de otra forma :(
        return new Peso(this.monto * 1250);
    }

    this.mas = function (monto) {
        const nuevoMonto = monto.aLibras().agregarMonto(this.monto);
        return new Libra(nuevoMonto);
    }

    this.menos = function (monto) {
        const nuevoMonto = monto.aLibras().restarMonto(this.monto);
        return new Libra(nuevoMonto);
    }

    this.agregarMonto = function (monto) {
        return monto + this.monto;
    }

    this.restarMonto = function (monto) {
        return monto - this.monto;
    }

    this.menor= function (monto){
        return this.menos(monto).esNegativo();
    }

    this.esNegativo= function (){
        return this.monto < 0;
    }
}


Libra.prototype = Object.create(Moneda.prototype);
Libra.prototype.constructor = Libra;

module.exports = Libra;