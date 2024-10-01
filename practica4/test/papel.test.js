const Piedra = require("../src/piedra");
const Papel = require("../src/papel");
const Tijera = require("../src/tijera");
const Spock = require("../src/spock");
const Lizard = require("../src/lizard");


test("El resultado de papel contra piedra es Victoria", () => {
    //set up
    const papel = new Papel();
    const piedra = new Piedra();

    //Act
    const resultado = papel.contra(piedra);

    //Assert
    expect(resultado).toBe("Victoria")
});

test("El resultado de papel contra papel es Empate", () => {
    const papel1 = new Papel();
    const papel2 = new Papel();

    const resultado = papel1.contra(papel2);

    expect(resultado).toBe("Empate");
});

test("El resultado de papel contra tijera es Derrota", () => {
    const papel = new Papel();
    const tijera = new Tijera();

    const resultado = papel.contra(tijera);

    expect(resultado).toBe("Derrota")
});

test("El resultado de papel contra spock es Victoria", () => {
    const papel = new Papel();
    const spock = new Spock();

    const resultado = papel.contra(spock);

    expect(resultado).toBe("Victoria");
});

test("El resultado de papel contra lizard es Derrota", () => {
    const papel = new Papel();
    const lizard = new Lizard();

    const resultado = papel.contra(lizard);

    expect(resultado).toBe("Derrota");
});
