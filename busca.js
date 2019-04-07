var telaBusca = (function () { //eslint-disable-line
    'use strict';

    var inicio = '', 
        fim = '';

    var proximidade = {
        linha: false,
        coluna: false
    };

    var _verificaLinhaColunarMesmaPosicao = function () {
        if(inicio.substr(0, 1) === fim.substr(0, 1)){
            proximidade.linha = true;
        }
        if(inicio.substr(1, 1) === fim.substr(1, 1)){
            proximidade.coluna = true;
        }
    };

    var _pegarInicioFim = function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if ($('#' + j + '' + i).hasClass('o-azul')) {
                    inicio = j+''+i;
                }
                if ($('#' + j + '' + i).hasClass('o-preta')) {
                    fim = j+''+i;
                }
            }
        }
    };

    /**
     * @global
     * @constructor
     */
    function Busca() {}

    Busca.prototype.buscarCaminhoProximo = function () {
        _pegarInicioFim();
        _verificaLinhaColunarMesmaPosicao();
    };

    return new Busca();

}());