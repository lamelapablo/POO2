function RecargaEnLibras(identificadorTarjeta, montoACargar) {
    this.identificadorTarjeta = identificadorTarjeta;
    this.montoACargar = montoACargar;
};

RecargaEnLibras.prototype.acreditateA = function (tarjetaTransporte) {
    if (tarjetaTransporte.soVo(this.identificadorTarjeta)) {
        tarjetaTransporte.cargarSaldoEnLibras(this.montoACargar)
    }
};

RecargaEnLibras.prototype.perteneceA = function (tarjetaTransporte) {
    return tarjetaTransporte.soVo(this.identificadorTarjeta);
};

module.exports = RecargaEnLibras;