"use strict";
const FechaNulaMaxima = function () { };

FechaNulaMaxima.prototype.valueOf = function () {
    return new Date(8640000000000000).valueOf();
};

module.exports = FechaNulaMaxima;