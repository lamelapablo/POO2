"use strict";
const comandoFactory = require("./comandoFactory");
const Coordenadas = require("./coordenadas");
const ComandoVacio = require("./comandoVacio");


const MarsRover = function (posicionInicialX, posicionInicialY, mapa, bateria) {

    this.posicionActual = new Coordenadas(posicionInicialX, posicionInicialY);
    this.mapa = mapa;
    this.bateria = bateria;

    this.posicionEstacionDeRecarga = new Coordenadas(posicionInicialX, posicionInicialY);

    this.obtenerPosicionActual = function () {
        return this.posicionActual;
    };

    this.movete = function (comandos) {
        this.validarMaximoDiezComandos(comandos);

        this.puedoVolverAEstacionDeRecarga(comandos) ? this.ejecutarComandos(comandos) : this.volverAEstacionDeRecarga();
    };

    this.ejecutarComandos = function (secuenciaDeComandos) {
        const posicionInicial = this.posicionActual;
        const bateriaInicial = this.bateria;
        let comandoPendiente = new ComandoVacio();

        const comandos = comandoFactory.crearComandos(secuenciaDeComandos);
        comandos.forEach(comando => {
            try {
                comando.moverDadoComandoAnterior(comandoPendiente, this);
                comandoPendiente = new ComandoVacio();
            } catch (error) {
                if (!(error.message === "Hay un obstaculo donde me debo mover.")) {
                    this.posicionActual = posicionInicial;
                    this.bateria = bateriaInicial;
                    throw error;
                }
                comandoPendiente = comando;
            }
        });
    }

    this.validarMaximoDiezComandos = function (comandos) {
        if (comandos.length > 10)
            throw new Error("Las secuencias de comandos deben ser de hasta 10 movimientos.");
    }

    this.validarEstarDentroDelMapa = function (coordenadas) {
        if (this.mapa.superaLimites(coordenadas))
            throw new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa.");

    }

    this.validarQueNoHayaObstaculos = function (coordenadas) {
        if (this.mapa.hayObstaculo(coordenadas)) {
            throw new Error("Hay un obstaculo donde me debo mover.");
        }
    }

    this.aplicarMovimiento = function (coordenadasAMover) {
        const resultadoDelMovimiento = coordenadasAMover.sumar(this.posicionActual);

        this.validarEstarDentroDelMapa(resultadoDelMovimiento);
        this.validarQueNoHayaObstaculos(resultadoDelMovimiento);

        if (!coordenadasAMover.equals(new ComandoVacio().coordenadasASumar())) {
            this.disminuirBateria();
        }

        this.posicionActual = resultadoDelMovimiento
        this.validarEstarEnEstacionDeRecarga();
    }

    this.validarEstarEnEstacionDeRecarga = function () {
        if (this.posicionActual.equals(this.posicionEstacionDeRecarga)) {
            this.bateria = bateria;
        }
    }

    this.puedoVolverAEstacionDeRecarga = function (comandos) {
        return comandos.length <= this.bateria / 2;
    }

    this.obtenerBateriaActual = function () {
        return this.bateria;
    }

    this.volverAEstacionDeRecarga = function () {
        this.posicionActual = this.posicionEstacionDeRecarga;
        this.bateria = bateria;
    }

    this.disminuirBateria = function () {
        this.bateria--;
    }
};


module.exports = MarsRover;