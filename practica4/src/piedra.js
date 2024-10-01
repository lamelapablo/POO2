const Piedra = function () {

    this.resultadoDePiedraContraMi = function () {
        return "Empate";
    }

    this.resultadoDePapelContraMi = function () {
        return "Victoria";
    }

    this.resultadoDeTijeraContraMi = function () {
        return "Derrota";
    }

    this.resultadoDeSpockContraMi = function () {
        return "Victoria";
    }

    this.resultadoDeLizardContraMi = function () {
        return "Derrota";
    }

    this.contra = function (contrincante) {
        return contrincante.resultadoDePiedraContraMi();
    };

}

module.exports = Piedra;