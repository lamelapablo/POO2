const Piedra = function(){

    this.resultadoDePiedraContraMi = function(){
        return "Empate";
    }

    this.contra = function(contrincante){
        return contrincante.resultadoDePiedraContraMi();
    };

}

module.exports = Piedra;