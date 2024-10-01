const Papel = function () {

    this.resultadoDePiedraContraMi = function () {
        return "Derrota";
    }

    this.resultadoDePapelContraMi = function () {
        return "Empate";
    }

    this.resultadoDeTijeraContraMi = function () {
        return "Victoria";
    }

    this.resultadoDeSpockContraMi = function () {
        return "Derrota";
    }

    this.resultadoDeLizardContraMi = function () {
        return "Victoria";
    }

    this.contra = function (contrincante) {
        return contrincante.resultadoDePapelContraMi();
    };
};

module.exports = Papel;