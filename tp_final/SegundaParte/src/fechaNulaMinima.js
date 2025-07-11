"use strict";
const FechaNulaMinima = function () { };

FechaNulaMinima.prototype.valueOf = function () {
    return new Date(-8640000000000000).valueOf();
};

module.exports = FechaNulaMinima;