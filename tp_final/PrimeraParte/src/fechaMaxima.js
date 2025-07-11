"use strict";
const FechaMaxima = function () { };

FechaMaxima.prototype.valueOf = function () {
    return new Date(8.64e15).valueOf();
};

module.exports = FechaMaxima;