const Tijera = function () {

    this.resultadoDePiedraContraMi = function () {
        return "Victoria";
    }

    this.resultadoDePapelContraMi = function () {
        return "Derrota";
    }

    this.resultadoDeTijeraContraMi = function () {
        return "Empate";
    }

    this.resultadoDeSpockContraMi = function () {
        return "Victoria";
    }

    this.resultadoDeLizardContraMi = function () {
        return "Derrota";
    }

    this.contra = function (contrincante) {
        return contrincante.resultadoDeTijeraContraMi();
    };
};

module.exports = Tijera;