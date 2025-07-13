"use strict";

const PrestamoMbMinutos = function (clienteReceptor, mb, minutos) {
    this.clienteReceptor = clienteReceptor;
    this.mb = mb;
    this.minutos = minutos;

    this.ejecutarDesde = function (paqueteDelClienteEmisor) {
        paqueteDelClienteEmisor.descontarDatosEnMB(this.mb);
        paqueteDelClienteEmisor.descontarMinutos(this.minutos);
        const paqueteGenerado = paqueteDelClienteEmisor.generaPaqueteParaPrestar(this.mb, this.minutos);
        this.clienteReceptor.asignar(paqueteGenerado);
    }
}

module.exports = PrestamoMbMinutos;