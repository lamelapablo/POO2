const Moneda = require('../src/moneda');
const Libra = require("./libra");

const Peso = function (monto) {
    Moneda.call(this, monto);

    this.divisa = "Pesos";

    this.aLibras = function (){
        return new Libra(this.monto / 1250);
    }

    this.aPesos = function (){
        return this;
    }

    this.mas = function (monto) {
        const nuevoMonto = monto.aPesos().agregarMonto(this.monto);
        return new Peso(nuevoMonto);
    }

    this.menos = function (monto) {
        const nuevoMonto = monto.aPesos().restarMonto(this.monto);
        return new Peso(nuevoMonto);
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


Peso.prototype = Object.create(Moneda.prototype);
Peso.prototype.constructor = Peso;

module.exports = Peso;