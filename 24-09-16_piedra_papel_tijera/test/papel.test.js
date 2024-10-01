const Papel = require("../src/papel");

test("El resultado de papel contra papel es Empate", () => {
    //set up
    const papel1 = new Papel();
    const papel2 = new Papel();

    //Act
    const resultado = papel1.contra(papel2);

    //Assert
    expect(resultado).toBe("Empate")
});