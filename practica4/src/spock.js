const Spock = function () {

    this.resultadoDePiedraContraMi = function () {
        return "Derrota"
    }

    this.resultadoDePapelContraMi = function () {
        return "Victoria";
    }

    this.resultadoDeTijeraContraMi = function () {
        return "Derrota";
    }

    this.resultadoDeSpockContraMi = function () {
        return "Empate";
    }

    this.resultadoDeLizardContraMi = function () {
        return "Victoria";
    }

    this.contra = function (contrincante) {
        return contrincante.resultadoDeSpockContraMi();
    };
}

module.exports = Spock;