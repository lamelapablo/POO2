const Papel = function(){
    
    this.resultadoDePiedraContraMi = function (){
        return "Derrota";
    }

    this.resultadoDePapelContraMi = function(){
        return "Empate";
    }

    this.contra = function(contrincante){
        return contrincante.resultadoDePapelContraMi();
    };
};

module.exports = Papel;