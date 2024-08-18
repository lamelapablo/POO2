// console.log("Hello world!");

// setTimeout(() => {
//     console.log("Saludo en 3 segundos...");
// }, 3000);

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


const ejercicioA = (piloto) => pilotos.indexOf(piloto) + 1;
const ejercicioB = (n) => pilotos[n - 1];
const ejercicioC = (letra) => pilotos.filter(piloto => piloto.toLowerCase().includes(letra));

const corregirPilotos = (pilotos) => {
    pilotosCorregido = pilotos.filter(pilot => pilot != "Perez");
    pilotosCorregido.splice(1, 0, "Perez");
    return pilotosCorregido;
};

console.log(corregirPilotos(pilotos));

console.log(ejercicioA("Russell")); //3

console.log(ejercicioB(6)); // Leclerc

console.log(ejercicioC("a"));

const array = [3, 6, 9, 3, 1, 5, 2, 10];
const howManyTimesAppear = (arr, num) => arr.reduce(
    (accumulator, currentValue) => currentValue === num ? accumulator + 1 : accumulator, 0
);
console.log(howManyTimesAppear(array, 3))

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

const array1 = [4, 8, 2, 13, 20]; //[6, 10, 4, 15, 22]
console.log(ejercicio6(array1));

const nombre = "Pablo Lamela"

let palabras = nombre.split(" ");
console.log(palabras.reverse());

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
personas.forEach((persona, index, arr) => {
    console.log(persona);
    arr[index] = persona.split(" ").reverse().join(" ");
})

console.log(personas);
