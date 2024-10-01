const Piedra = require("../src/piedra");
const Papel = require("../src/papel");
const Tijera = require("../src/tijera");
const Spock = require("../src/spock");
const Lizard = require("../src/lizard");


test("El resultado de tijera contra piedra es Derrota", () => {
    //set up
    const tijera = new Tijera();
    const piedra = new Piedra();

    //Act
    const resultado = tijera.contra(piedra);

    //Assert
    expect(resultado).toBe("Derrota")
});

test("El resultado de tijera contra papel es Victoria", () => {
    const tijera = new Tijera();
    const papel = new Papel();

    const resultado = tijera.contra(papel);

    expect(resultado).toBe("Victoria");
});

test("El resultado de tijera contra tijera es Empate", () => {
    const tijera1 = new Tijera();
    const tijera2 = new Tijera();

    const resultado = tijera1.contra(tijera2);

    expect(resultado).toBe("Empate");
});

test("El resultado de tijera contra spock es Derrota", () => {
    const tijera = new Tijera();
    const spock = new Spock();

    const resultado = tijera.contra(spock);

    expect(resultado).toBe("Derrota");
});

test("El resultado de tijera contra lizard es Victoria", () => {
    const tijera = new Tijera();
    const lizard = new Lizard();

    const resultado = tijera.contra(lizard);

    expect(resultado).toBe("Victoria");
});
