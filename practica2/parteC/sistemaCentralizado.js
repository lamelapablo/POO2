const RecargaEnLibras = require("./recargaEnLibras");
const RecargaEnPesos = require("./recargaEnPesos");

const SistemaCentralizado = {
    recargasPendientes: [],
    cantidadRecargasPendientes: function () {
        return this.recargasPendientes.length;
    },
    cargarTarjetaEnPesos: function (identificador, montoACargar) {
        this.recargasPendientes.push(new RecargaEnPesos(identificador, montoACargar));
    },
    cargarTarjetaEnLibras: function (identificador, montoACargar) {
        this.recargasPendientes.push(new RecargaEnLibras(identificador, montoACargar));
    },
    acreditarSaldo: function (tarjetaTransporte) {
        this.recargasPendientes.map(recarga => recarga.acreditateA(tarjetaTransporte));
        this.recargasPendientes = this.recargasPendientes.filter(recarga => !recarga.perteneceA(tarjetaTransporte));
    },

    reset: function () {
        this.recargasPendientes = []
    }

};

module.exports = SistemaCentralizado;