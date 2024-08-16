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


const ejercicioA = (piloto)=>pilotos.indexOf(piloto)+1;
const ejercicioB = (n)=>pilotos[n-1];
const ejercicioC = (letra)=>pilotos.filter(piloto=>piloto.toLowerCase().includes(letra));

console.log(ejercicioA("Russell")); //3

console.log(ejercicioB(6)); // Leclerc

console.log(ejercicioC("a"));
