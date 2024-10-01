const Piedra = require("../src/piedra");
const Papel = require("../src/papel");
const Tijera = require("../src/tijera");
const Spock = require("../src/spock");
const Lizard = require("../src/lizard");


test("El resultado de lizard contra piedra es Derrota", () => {
    //set up
    const lizard = new Lizard();
    const piedra = new Piedra();

    //Act
    const resultado = lizard.contra(piedra);

    //Assert
    expect(resultado).toBe("Derrota");
});

test("El resultado de lizard contra papel es Victoria", () => {
    const lizard = new Lizard();
    const papel = new Papel();

    const resultado = lizard.contra(papel);

    expect(resultado).toBe("Victoria");
});

test("El resultado de lizard contra tijera es Derrota", () => {
    const lizard = new Lizard();
    const tijera = new Tijera();

    const resultado = lizard.contra(tijera);

    expect(resultado).toBe("Derrota");
});

test("El resultado de lizard contra spock es Victoria", () => {
    const lizard = new Lizard();
    const spock = new Spock();

    const resultado = lizard.contra(spock);

    expect(resultado).toBe("Victoria");
});

test("El resultado de lizard contra lizard es Empate", () => {
    const lizard1 = new Lizard();
    const lizard2 = new Lizard();

    const resultado = lizard1.contra(lizard2);

    expect(resultado).toBe("Empate");
});
