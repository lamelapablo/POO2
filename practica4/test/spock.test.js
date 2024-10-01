const Piedra = require("../src/piedra");
const Papel = require("../src/papel");
const Tijera = require("../src/tijera");
const Spock = require("../src/spock");
const Lizard = require("../src/lizard");


test("El resultado de spock contra piedra es Victoria", () => {
    //set up
    const spock = new Spock();
    const piedra = new Piedra();

    //Act
    const resultado = spock.contra(piedra);

    //Assert
    expect(resultado).toBe("Victoria");
});

test("El resultado de spock contra papel es Derrota", () => {
    const spock = new Spock();
    const papel = new Papel();

    const resultado = spock.contra(papel);

    expect(resultado).toBe("Derrota");
});

test("El resultado de spock contra tijera es Victoria", () => {
    const spock = new Spock();
    const tijera = new Tijera();

    const resultado = spock.contra(tijera);

    expect(resultado).toBe("Victoria");
});

test("El resultado de spock contra spock es Empate", () => {
    const spock1 = new Spock();
    const spock2 = new Spock();

    const resultado = spock1.contra(spock2);

    expect(resultado).toBe("Empate");
});

test("El resultado de spock contra lizard es Derrota", () => {
    const spock = new Spock();
    const lizard = new Lizard();

    const resultado = spock.contra(lizard);

    expect(resultado).toBe("Derrota");
});
