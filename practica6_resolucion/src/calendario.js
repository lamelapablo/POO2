const Calendario = function (){

    this.francos = [];

    this.esFranco = function (fechaAValidar) {

        // const resultado = this.francos.filter(franco => {
        //     return franco.esFranco(fechaAValidar);
        // });
        // return resultado.length > 0;

        const reducer = (resultado, franco) => (resultado || franco.esFranco(fechaAValidar));
        return this.francos.reduce(reducer, false);

    };

    this.agregarFrancoPuntual = function(nuevoFranco) {
        this.francos.push(new FrancoPuntual(nuevoFranco));  
    };

    this.agregarFrancoAnual = function(mes, dia){
        this.francos.push(new FrancoAnual(mes, dia));
    };

    this.agregarFrancoSemanal = function(diaDeLaSemana){
        this.francos.push(new FrancoSemanal(diaDeLaSemana));
    }
};

const FrancoPuntual = function(date){
    this.fecha = date;

    this.esFranco = function(fechaAValidar){
        return fechaAValidar.toString() === this.fecha.toString();
    }
};

const FrancoAnual = function (mes, dia){
    this.mes = mes;
    this.dia = dia;

    this.esFranco = function(fechaAValidar){
        return (fechaAValidar.getDate() === this.dia 
                && fechaAValidar.getMonth()=== this.mes);
    }
};

const FrancoSemanal = function(diaDeLaSemana){
    this.diaDeLaSemana = diaDeLaSemana;

    this.esFranco = function(fechaAValidar){
        return fechaAValidar.getDay() === this.diaDeLaSemana;
    }
};


module.exports = Calendario;