"use strict";
const Comando = require("./comando");
const Coordenadas = require("./coordenadas");

const ComandoD = function(){
    Comando.call(this);

    this.coordenadasASumar = () => new Coordenadas(1,0);

    this.esquivarPlanA = () => "SDDW";
    this.esquivarPlanB = () => "WDDS";
    this.es = (operacion) => operacion==="D";

    this.moverDadoComandoAnterior = (comandoAnterior, marsRover) => {
        return comandoAnterior.ejecutarCuandoElSiguienteEsD(this, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsD = function(comandoSiguiente, marsRover){
        return this.ejecutarComandosIgualesEntreSi(comandoSiguiente, marsRover);
    }

};

ComandoD.prototype = Object.create(Comando.prototype);
ComandoD.prototype.constructor = ComandoD;

module.exports = ComandoD;