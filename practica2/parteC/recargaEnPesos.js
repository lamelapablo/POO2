function RecargaEnPesos(identificadorTarjeta, montoACargar) {
    this.identificadorTarjeta = identificadorTarjeta;
    this.montoACargar = montoACargar;
};

RecargaEnPesos.prototype.acreditateA = function (tarjetaTransporte) {
    if (tarjetaTransporte.soVo(this.identificadorTarjeta)) {
        tarjetaTransporte.cargarSaldoEnPesos(this.montoACargar)
    }
};

RecargaEnPesos.prototype.perteneceA = function (tarjetaTransporte) {
    return tarjetaTransporte.soVo(this.identificadorTarjeta);
};

module.exports = RecargaEnPesos;