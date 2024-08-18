const cuadrado_de = num => num ** 2;
const creaResta = (x) => (y) => y - x;
const repeat = (functionToRepeat, n) => {
  const arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(functionToRepeat(i));
  }

  return arr;
};
const printString = (n) => "Execution Number: " + n;
const howManyTimesAppear = (arr, num) => arr.reduce(
  (accumulator, currentValue) => currentValue === num ? accumulator + 1 : accumulator, 0
);

test("ejercicio 1", () => {
  expect(cuadrado_de(2)).toBe(4);
  expect(cuadrado_de(3)).toBe(9);
  expect(cuadrado_de(4)).toBe(16);
});

test("ejercicio 2", () => {
  const resta2 = creaResta(2);

  expect(resta2(2)).toBe(0);
  expect(resta2(3)).toBe(1);
  expect(resta2(10)).toBe(8);
});

test("ejercicio 3", () => {
  const lista = repeat(printString, 4);

  expect(lista).toEqual([
    "Execution Number: 1",
    "Execution Number: 2",
    "Execution Number: 3",
    "Execution Number: 4",
  ]);
});

describe("ejercicio 4", () => {
  const pilotos = [
    "Verstappen",
    "Hamilton",
    "Russell",
    "Sainz",
    "Perez",
    "Leclerc",
    "Norris",
    "Alonso",
    "Ocon",
    "Vettel",
  ];
  test("inciso a", () => {
    const ejercicioA = (piloto) => pilotos.indexOf(piloto) + 1;
    expect(ejercicioA("Russell")).toEqual(3);
  });

  test("inciso b", () => {
    const ejercicioB = (n) => pilotos[n - 1];
    expect(ejercicioB(6)).toEqual("Leclerc");
  });

  test("inciso c", () => {
    const ejercicioC = (letra) => pilotos.filter(piloto => piloto.toLowerCase().includes(letra));

    expect(ejercicioC("a")).toEqual([
      "Verstappen",
      "Hamilton",
      "Sainz",
      "Alonso",
    ]);
  });

  test("inciso d", () => {
    const ejercicioD = (arr) => arr.map((piloto) => pilotos.includes(piloto));
    expect(ejercicioD(["Russell", "Bottas", "Perez"])).toEqual([
      true,
      false,
      true,
    ]);
  });
  test("inciso e", () => {
    const corregirPilotos = (pilotos) => {
      let temp = pilotos[1];
      pilotos[1] = pilotos[4];
      pilotos[4] = temp;
      return pilotos;
    };

    expect(corregirPilotos(pilotos)).toEqual([
      "Verstappen",
      "Perez",
      "Russell",
      "Sainz",
      "Hamilton",
      "Leclerc",
      "Norris",
      "Alonso",
      "Ocon",
      "Vettel",
    ]);
  });
});

test("ejercicio 5", () => {
  const array = [3, 6, 9, 3, 1, 5, 2, 10];

  expect(howManyTimesAppear(array, 3)).toEqual(2);
  expect(howManyTimesAppear(array, 5)).toEqual(1);
  expect(howManyTimesAppear(array, 7)).toEqual(0);
});

test("ejercicio 6", () => {
  const array1 = [4, 8, 2, 13, 20];
  const array2 = [4, 8, 2, -5, 20];
  const ejercicio6 = (arr) => {
    let min = arr[0];
    arr.forEach(num => {
      if (num < min) {
        min = num;
      }
    })
    newArr = arr.map(num => num += min);
    return newArr;
  };

  expect(ejercicio6(array1)).toEqual([6, 10, 4, 15, 22]);
  expect(ejercicio6(array2)).toEqual([-1, 3, -3, -10, 15]);
});

describe("ejercicio 7", () => {
  test("inciso a", () => {
    const personas = [
      "Lionel Messi",
      "Rodrigo Depaul",
      "Emiliano Martinez",
      "Angel Dimaria",
      "Soledad Jaimes",
      "Yamila Rodriguez",
      "Florencia Bonsegundo",
    ];

    //resolucion

    personas.sort()

    //fin resolucion

    expect(personas).toEqual([
      "Angel Dimaria",
      "Emiliano Martinez",
      "Florencia Bonsegundo",
      "Lionel Messi",
      "Rodrigo Depaul",
      "Soledad Jaimes",
      "Yamila Rodriguez",
    ]);
  });

  test("inciso b", () => {
    const personas = [
      "Lionel Messi",
      "Rodrigo Depaul",
      "Emiliano Martinez",
      "Angel Dimaria",
      "Soledad Jaimes",
      "Yamila Rodriguez",
      "Florencia Bonsegundo",
    ];
    const ejercicioB = (personas) => {
      // newPersonas = [];
      // personas.forEach(persona => {
      //   nombre = persona.split(" ").reverse().join(" ");
      //   newPersonas.push(nombre);
      // })
      personas.forEach((persona, index, arr) => {
        arr[index] = persona.split(" ").reverse().join(" ");
      })

      return personas;

    };
    expect(ejercicioB(personas)).toEqual([
      "Messi Lionel",
      "Depaul Rodrigo",
      "Martinez Emiliano",
      "Dimaria Angel",
      "Jaimes Soledad",
      "Rodriguez Yamila",
      "Bonsegundo Florencia",
    ]);
  });

  test("inciso c", () => {
    const personas = [
      "Messi Lionel",
      "Depaul Rodrigo",
      "Martinez Emiliano",
      "Dimaria Angel",
      "Jaimes Soledad",
      "Rodriguez Yamila",
      "Bonsegundo Florencia",
    ];

    //resolucion
    personas.sort();
    //fin resolucion

    expect(personas).toEqual([
      "Bonsegundo Florencia",
      "Depaul Rodrigo",
      "Dimaria Angel",
      "Jaimes Soledad",
      "Martinez Emiliano",
      "Messi Lionel",
      "Rodriguez Yamila",
    ]);
  });
});
