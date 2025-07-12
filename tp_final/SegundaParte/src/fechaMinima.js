"use strict";
const FechaMinima = function () { };

FechaMinima.prototype.valueOf = function () {
    return new Date(-8.64e15).valueOf();
};

module.exports = FechaMinima;