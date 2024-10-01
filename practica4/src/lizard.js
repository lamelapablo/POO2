const Lizard = function () {

    this.resultadoDePiedraContraMi = function () {
        return "Victoria";
    }

    this.resultadoDePapelContraMi = function () {
        return "Derrota";
    }

    this.resultadoDeTijeraContraMi = function () {
        return "Victoria";
    }

    this.resultadoDeSpockContraMi = function () {
        return "Derrota";
    }

    this.resultadoDeLizardContraMi = function () {
        return "Empate";
    }

    this.contra = function (contrincante) {
        return contrincante.resultadoDeLizardContraMi();
    };
}

module.exports = Lizard;