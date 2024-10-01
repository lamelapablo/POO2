const sistemaCentralizado = {
    
    recargasPendientes : [],

    cantidadRecargasPendientes: function() {
        return this.recargasPendientes.length;
    },

    cargarTarjeta: function(identificador, montoACargar){
        this.recargasPendientes.push(new Recarga(identificador, montoACargar));
    },

    acreditarSaldo: function(tarjetaSube){
        this.recargasPendientes.map((recarga) => {
            recarga.acreditateA(tarjetaSube);
        })
        this.recargasPendientes = this.recargasPendientes.filter(
            recarga => !recarga.perteneceA(tarjetaSube));
    }

}

const Recarga = function (identificadorTarjeta, montoACargar){

    this.identificadorTarjeta = identificadorTarjeta;
    this.montoACargar = montoACargar;


    this.perteneceA = function(tarjetaSube){
        return tarjetaSube.soVo(this.identificadorTarjeta);
    }

    this.acreditateA = function(tarjetaSube){
        if(tarjetaSube.soVo(this.identificadorTarjeta)){
            tarjetaSube.acreditarSaldo(this.montoACargar);
        }

    }
}

module.exports = sistemaCentralizado;