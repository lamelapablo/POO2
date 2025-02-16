"use strict";
const comandoFactory = require("./comandoFactory");
const Coordenadas = require("./coordenadas");
const ComandoVacio = require("./comandoVacio");
const Bateria = require("./bateria");


const MarsRover = function (posicionInicialX, posicionInicialY, mapa, bateria){

    this.posicionActual = new Coordenadas(posicionInicialX, posicionInicialY);
    this.mapa = mapa;
    this.bateria = new Bateria(bateria);
    this.estacionDeRecarga = this.posicionActual;

    this.obtenerPosicionActual = function(){
        return this.posicionActual;
    };

    this.movete = function (comandos){
        this.validarMaximoDiezComandos(comandos);

        this.ejecutarComandos(comandos);
    };

    this.ejecutarComandos = function (secuenciaDeComandos){
        let comandoPendiente = new ComandoVacio();
        this.bateria.guardarValorActual();
        const posicionInicial = this.posicionActual;

        const comandos = comandoFactory.crearComandos(secuenciaDeComandos);
        comandos.forEach(comando => {
            try {
                comando.moverDadoComandoAnterior(comandoPendiente, this);
                comandoPendiente = new ComandoVacio();
            }catch (error){
                if(error.message==="No hay bateria suficiente para realizar el movimiento"){
                    this.posicionActual = this.estacionDeRecarga;
                    this.bateria.recargar();
                    throw error;
                }
                if(!(error.message==="Hay un obstaculo donde me debo mover.")){
                    this.posicionActual = posicionInicial;
                    this.bateria.restaurarValorGuardado();
                    throw error;
                }

                comandoPendiente = comando;
            }
        });
    }

    this.validarMaximoDiezComandos = function(comandos){
        if(comandos.length > 10)
            throw new Error ("Las secuencias de comandos deben ser de hasta 10 movimientos.");
    }

    this.validarEstarDentroDelMapa = function(coordenadas){
        if (this.mapa.superaLimites(coordenadas))
            throw new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa.");

    };

    this.validarQueNoHayaObstaculos = function(coordenadas){
        if(this.mapa.hayObstaculo(coordenadas)){
            throw new Error ("Hay un obstaculo donde me debo mover.");
        }
    }

    this.aplicarMovimiento  = function(coordenadasAMover){
        const resultadoDelMovimiento = coordenadasAMover.sumar(this.posicionActual);

        this.validarEstarDentroDelMapa(resultadoDelMovimiento);
        this.validarQueNoHayaObstaculos(resultadoDelMovimiento);

        this.bateria.menos(coordenadasAMover.enUnidades());
        this.posicionActual = resultadoDelMovimiento;

        const distanciaEstacionDeRecarga = this.estacionDeRecarga.menos(this.posicionActual).enUnidades();
        this.bateria.validarQueLaCargaAlcanzaPara(distanciaEstacionDeRecarga);
        this.recargarSiEstoyEnEstacionDeRecarga();
    }

    this.obtenerBateriaRestante = function(){
        return this.bateria.obtenerValorActual();
    }

    this.recargarSiEstoyEnEstacionDeRecarga = function(){
        if(this.posicionActual.en(this.estacionDeRecarga)){
            this.bateria.recargar();
        }
    }
};



module.exports = MarsRover;