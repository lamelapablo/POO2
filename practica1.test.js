const cuadrado_de = num => num**2;
const creaResta = (x) =>(y) => y-x;
const repeat = (functionToRepeat, n)=>{
  const arr = [];
  for(let i=1; i<=n; i++){
    arr.push(functionToRepeat(i));
  }

  return arr;
};
const printString = (n)=>"Execution Number: " + n;
const howManyTimesAppear = null;

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
    const ejercicioA = (piloto)=>pilotos.indexOf("Russell")+1;
    expect(ejercicioA("Russel")).toEqual(3);
  });

  test("inciso b", () => {
    const ejercicioB = (n)=>{pilotos.findIndex(n-1)};
    expect(ejercicioB(6)).toEqual("Leclerc");
  });

  test("inciso c", () => {
    const ejercicioC = null;

    expect(ejercicioC("a")).toEqual([
      "Verstappen",
      "Hamilton",
      "Sainz",
      "Alonso",
    ]);
  });

  test("inciso d", () => {
    const ejercicioD = null;
    expect(ejercicioD(["Russell", "Bottas", "Perez"])).toEqual([
      true,
      false,
      true,
    ]);
  });
  test("inciso e", () => {
    const corregirPilotos = null;

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
  const ejercicio6 = null;

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
    const ejercicioB = null;
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