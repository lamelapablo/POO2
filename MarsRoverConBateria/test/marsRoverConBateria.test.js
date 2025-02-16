"use strict";
const {crearMapa, crearMarsRover, crearObstaculo, crearCoordenadas} = require("./factories");


describe("Al aterrizar con una bateria", ()=>{
    test("Al enviar un mars rover con 100 de bateria, aterriza con 100", () => {
        const mapa = crearMapa(5, 6, [])
        const marsRover = crearMarsRover(0, 0, mapa, 100);


        expect(marsRover.obtenerBateriaRestante()).toBe(100)
    });

    
    test("Al enviar un mars rover con 100 de bateria, aterriza con 50", () => {
        const mapa = crearMapa(5, 6, [])
        const marsRover = crearMarsRover(0, 0, mapa, 50);


        expect(marsRover.obtenerBateriaRestante()).toBe(50)
    });
})


describe("Al moverse utilizando bateria", ()=>{
    test("Al moverme una unidad hacia adelante, gasto una unidad de bateria", ()=>{
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("W")


        expect(marsRover.obtenerBateriaRestante()).toBe(99)
    })

    test("Al moverme dos unidades hacia adelante, gasto dos unidades de bateria", ()=>{
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("WW")


        expect(marsRover.obtenerBateriaRestante()).toBe(98)
    })

    test("Al enviar una secuencia que sale del mapa, no se gasta bateria", ()=>{
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(97, 97, mapa, 100);

        expect(() => marsRover.movete("WWWW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));


        expect(marsRover.obtenerBateriaRestante()).toBe(100)
    })

    test("Al enviar dos secuencias donde la segunda sale del mapa, queda con la bateria previa a iniciar el movimiento que lo saco", ()=>{
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(97, 97, mapa, 100);

        marsRover.movete("W")
        expect(() => marsRover.movete("WWWW")).toThrow(new Error("La secuencia de comandos indicados represetan una trayectoria fuera del mapa."));


        expect(marsRover.obtenerBateriaRestante()).toBe(99)
    })

    test("Al recibir un comando incorrecto, no se gasta bateria", ()=>{
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("W")
        expect(() => marsRover.movete("WQWW")).toThrow(new Error("Comando incorrecto."));


        expect(marsRover.obtenerBateriaRestante()).toBe(99)
    })

    test("Al encontrar un obstaculo en el ultimo comando, no se gasta bateria.", ()=>{
        const obstaculos = [crearObstaculo(51, 50)]
        const mapa = crearMapa(100, 100, obstaculos)
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("D")


        expect(marsRover.obtenerBateriaRestante()).toBe(100)
    })

    test("Al ejecutar DD y encontrarme con un obstaculo, se consumen 4 de bateria dado que esquivo el obstaculo", ()=>{
        const obstaculos = [crearObstaculo(51, 50)]
        const mapa = crearMapa(100, 100, obstaculos)
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("DD")


        expect(marsRover.obtenerBateriaRestante()).toBe(96)
    })

    test("Al aplicar 4Ds y encontrarme un obstaculo en el primer movimiento, se consumen 6 de bateria", ()=>{
        const obstaculos = [crearObstaculo(51, 50)]
        const mapa = crearMapa(100, 100, obstaculos)
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("DDDD")


        expect(marsRover.obtenerBateriaRestante()).toBe(94);
    })

    test("Al aplicar 4Ds y encontrarme un obstaculo en el segundo movimiento, se consumen 6 de bateria", ()=>{
        const obstaculos = [crearObstaculo(52, 50)]
        const mapa = crearMapa(100, 100, obstaculos)
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("DDDD")


        expect(marsRover.obtenerBateriaRestante()).toBe(94);
    })

    test("Al aplicar DA y encontrarme un obstaculo en el primer movimiento, se consumen 0 de bateria", ()=>{
        const obstaculos = [crearObstaculo(51, 50)]
        const mapa = crearMapa(100, 100, obstaculos)
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("DA")


        expect(marsRover.obtenerBateriaRestante()).toBe(100);
    })

})

describe("Al tener una estacion de recarga", ()=>{
    test("Al finalizar en una estacion de recarga, mi bateria se recarga",()=>{
        
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("WS")


        expect(marsRover.obtenerBateriaRestante()).toBe(100)
    })
    test("Al pasar por una estacion de recarga, mi bateria se recarga",()=>{
        
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 100);

        marsRover.movete("WSS")


        expect(marsRover.obtenerBateriaRestante()).toBe(99)
    })

    test("Cuando no tengo bateria suficiente para regresar a la estacion, entonces falla.",() => {
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 2);

        expect(()=>marsRover.movete("WW")).toThrow(new Error("No hay bateria suficiente para realizar el movimiento"))
    });

    test("Cuando no tengo bateria suficiente para moverse a la estacion, entonces regreso a la estacion y recargo la bateria.",() => {
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 2);

        marsRover.movete("W");
        expect(()=>marsRover.movete("WW")).toThrow(new Error("No hay bateria suficiente para realizar el movimiento"));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50))
        expect(marsRover.obtenerBateriaRestante()).toBe(2);
    });

    test("Cuando la bateria no alcanza para regresar a la base, entonces vuelve a la base",() => {
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 5);

        marsRover.movete("W");
        expect(()=>marsRover.movete("WW")).toThrow(new Error("No hay bateria suficiente para realizar el movimiento"));
        expect(marsRover.obtenerPosicionActual()).toEqualObject(crearCoordenadas(50, 50))
        expect(marsRover.obtenerBateriaRestante()).toBe(5);
    });

    test("Cuando no me queda bateria suficiente para alejarme de la base, pero me acerco, entonces me muevo", ()=>{
        const mapa = crearMapa(100, 100, [])
        const marsRover = crearMarsRover(50, 50, mapa, 4);

        marsRover.movete("WW");
        marsRover.movete("S");

        expect(marsRover.obtenerBateriaRestante()).toBe(1);
    })

    test("Al encontrar un obstaculo en el calculo de la vuelta, entonces este se ignora y la bateria es suficiente para ejecutar un comando", ()=>{
        const obstaculos = [crearObstaculo(51, 50)]
        const mapa = crearMapa(100, 100, obstaculos)
        const marsRover = crearMarsRover(50, 50, mapa, 6);

        marsRover.movete("DD")


        expect(marsRover.obtenerBateriaRestante()).toBe(2);
    })
})