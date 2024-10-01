//2 Instance of
//3 If
//1 Tijera y Papel no tienen comportamiento
//4 Retornar strings



const Piedra = require("../src/piedra");
const Tijera = require("../src/tijera");
const Papel = require("../src/papel");

test("El resultado de piedra contra piedra es Empate", () => {
    //set up
    const piedra1 = new Piedra();
    const piedra2 = new Piedra();

    //Act
    const resultado = piedra1.contra(piedra2);

    //Assert
    expect(resultado).toBe("Empate")
});

test("El resultado de piedra contra tijera es Victoria", ()=>{
    const piedra = new Piedra();
    const tijera = new Tijera();

    const resultado = piedra.contra(tijera);

    expect(resultado).toBe("Victoria")
});

test("El resultado de piedra contra papel es Derrota", ()=> {
    const piedra = new Piedra();
    const papel = new Papel();

    const resultado = piedra.contra(papel);

    expect(resultado).toBe("Derrota");
});














