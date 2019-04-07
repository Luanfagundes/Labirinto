var telaBusca = (function () { //eslint-disable-line
    'use strict';

    var inicio = '', 
        fim = '';

    var proximidade = {
        mesmaLinha: false,
        direita: false,
        esquerda: false,
        mesmaColuna: false,
        cima: false,
        baixo: false
    };

    var _verificaLinha = function () {
        if(inicio.substr(0, 1) === fim.substr(0, 1)){
            proximidade.mesmaLinha = true;
        }else if(inicio.substr(0, 1) > fim.substr(0, 1)){
            proximidade.cima = true;
        }else{
            proximidade.baixo = true;
        }
    };

    var _verificaColuna = function () {
        if(inicio.substr(1, 1) === fim.substr(1, 1)){
            proximidade.mesmaColuna = true;
        }else if(inicio.substr(1, 1) > fim.substr(1, 1)){
            proximidade.esquerda = true;
        }else{
            proximidade.direita = true;
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

    var _percorreLinha = function () {
        if(proximidade.direita){
            inicio++;
            inicio = inicio.toString().padStart(2, '0');
            $('#' + inicio).addClass('o-amarela');
        }

        if(proximidade.esquerda){
            inicio--;
            inicio = inicio.toString().padStart(2, '0');
            $('#' + inicio).addClass('o-amarela');
        }
    };

    /**
     * @global
     * @constructor
     */
    function Busca() {}

    Busca.prototype.buscarCaminhoProximo = function () {
        inicio = '', fim= '';
        _pegarInicioFim();
        telaBusca.verificaCaminhoProximo();
    };

    Busca.prototype.verificaCaminhoProximo = function () {
        proximidade.baixo = false,
        proximidade.cima = false,
        proximidade.direita = false,
        proximidade.esquerda = false,
        proximidade.mesmaColuna = false,
        proximidade.mesmaLinha = false;
        _verificaLinha();
        _verificaColuna();
        telaBusca.percorreCaminhoProximo();
    };

    Busca.prototype.percorreCaminhoProximo = function () {
        if(!proximidade.mesmaColuna){
            _percorreLinha();
            telaBusca.verificaCaminhoProximo();
        }else if($('#'+inicio).hasClass('o-preta')){
            $('#'+inicio).removeClass('o-amarela');
        }
    };

    return new Busca();

}());