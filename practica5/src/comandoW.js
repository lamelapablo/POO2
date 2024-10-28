"use strict";
const Comando = require("./comando");
const Coordenadas = require("./coordenadas");

const ComandoW = function(){
    Comando.call(this);

    this.coordenadasASumar = () => new Coordenadas(0,1);
    this.esquivarPlanA = () => "DWWA";
    this.esquivarPlanB = () => "AWWD";
    this.es = (operacion) => operacion==="W";

    this.moverDadoComandoAnterior = (comandoAnterior, marsRover) => {
        return comandoAnterior.ejecutarCuandoElSiguienteEsW(this, marsRover);
    };

    this.ejecutarCuandoElSiguienteEsW = function(comandoSiguiente, marsRover){
        return this.ejecutarComandosIgualesEntreSi(comandoSiguiente, marsRover);
    }
};

ComandoW.prototype = Object.create(Comando.prototype);
ComandoW.prototype.constructor = ComandoW;

module.exports = ComandoW;