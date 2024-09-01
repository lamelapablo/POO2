const Conversor = {
    convertirLibrasAPesos: function (libras) {
        return libras * 1250;
    },
    convertirPesosALibras: function (pesos) {
        return pesos / 1250;
    }
};

module.exports = Conversor;