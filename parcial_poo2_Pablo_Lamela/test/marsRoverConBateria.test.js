"use strict";
const { crearMapa, crearMarsRover, crearObstaculo, crearCoordenadas } = require("./factories");

test("Al enviar el comando W el mars rover consume 1 unidad de bateria", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(0, 0, mapa, 100);
    marsRover.movete("W");
    expect(marsRover.obtenerBateriaActual()).toBe(99);
})

test("Al enviar el comando WWWW el mars rover consume 4 unidades de bateria", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(0, 0, mapa, 100);
    marsRover.movete("WWWW");
    expect(marsRover.obtenerBateriaActual()).toBe(96);
})

test("Al enviar el comando DDSAA el mars rover consume 5 unidades de bateria", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(50, 50, mapa, 100);
    marsRover.movete("DDSAA");
    expect(marsRover.obtenerBateriaActual()).toBe(95);
})

test("Se envia comando WW, el rover se encuentra un obstaculo en el primer movimiento, lo esquiva y comsume 4 unidades de bateria", () => {
    const obstaculos = [crearObstaculo(50, 51)];
    const mapa = crearMapa(100, 100, obstaculos);
    const marsRover = crearMarsRover(50, 50, mapa, 100);
    marsRover.movete("WW");
    expect(marsRover.obtenerBateriaActual()).toBe(96);
})

test("Se envia comando WS, el rover se encuentra un obstaculo en el primer movimiento y no comsume bateria porque permanece en el lugar", () => {
    const obstaculos = [crearObstaculo(50, 51)];
    const mapa = crearMapa(100, 100, obstaculos);
    const marsRover = crearMarsRover(50, 50, mapa, 100);
    marsRover.movete("WS");
    expect(marsRover.obtenerBateriaActual()).toBe(100);
})


test("Se envia comando AAAA al rover, como sale del mapa, no comsume bateria porque permanece en el lugar", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(2, 0, mapa, 100);

    expect(() => { marsRover.movete("AAAA") }).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));
    expect(marsRover.obtenerBateriaActual()).toBe(100);
})

test("El rover se aleja 1 unidad de la estacion de recarga, vuelve, pasa por la estacion y recarga su bateria", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(50, 50, mapa, 100);

    marsRover.movete("WSS");

    expect(marsRover.obtenerBateriaActual()).toBe(99);
})


test("El rover se aleja 5 unidades de la estacion de recarga, vuelve, pasa por la estacion y recarga su bateria", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(50, 50, mapa, 100);

    marsRover.movete("DDDDDAAAAA");

    expect(marsRover.obtenerBateriaActual()).toBe(100);
})

test("El rover no podra retornar a la estacion de recarga al moverse entonces vuelve a la estacion, que es donde aterrizo", () => {
    const mapa = crearMapa(100, 100, []);
    const marsRover = crearMarsRover(50, 50, mapa, 10);

    marsRover.movete("WWW");
    marsRover.movete("WWWw");

    expect(marsRover.obtenerBateriaActual()).toBe(10);
    expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50));
})
