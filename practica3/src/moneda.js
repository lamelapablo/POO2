const Moneda = function (monto, divisa) {
    this.monto = monto;
    this.divisa = divisa;

    this.acreditarSaldo = function(_montoACargar){
        throw new Error("Se debe implementar acreditar saldo en los objetos que hereden de Moneda")
    }

    this.pagarViaje = function(montoAPagar){
        throw new Error("Se debe implementar pagarViaje en los objetos que hereden de Moneda")
    }

    this.validarViaje = function(montoAPagar){
        if(this.divisa==="Libras"){
            return this.monto >= montoAPagar.aLibras();
        }else{
            return this.monto + 600 >= (montoAPagar.aPesos());
        }
        
        
    }

    this.equals = function (otro) {
        return this.monto === otro.monto && this.divisa === otro.divisa;
    };

    this.toString = function() {
        return `Moneda(${this.monto}, ${this.divisa})`;
    };
}

module.exports = Moneda;