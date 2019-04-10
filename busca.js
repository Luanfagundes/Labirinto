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

    var _contornaBarreiraLinha = function (proximoCaminho) {

        if($('#' + proximoCaminho).hasClass('o-vermelha')){
            if(proximidade.cima){
                //TODO: verificar se tem vermelho;
                return (Number(inicio) - 10).toString().padStart(2, '0');
            }else if(proximidade.baixo){
                //TODO: verificar se tem vermelho;
                return (Number(inicio) + 10).toString().padStart(2, '0');
            }else if(proximidade.mesmaLinha){
                if((Number(inicio) - 10).toString().padStart(2, '0') < '00'){
                    //TODO: verificar se tem vermelho;
                    return (Number(inicio) + 10).toString().padStart(2, '0');
                }
                else if((Number(inicio) + 10).toString().padStart(2, '0') > '99'){
                    //TODO: verificar se tem vermelho;
                    return (Number(inicio) - 10).toString().padStart(2, '0');
                }
                //TODO: verificar se tem vermelho;
                if($('#' + (Number(inicio) - 10).toString().padStart(2, '0')).hasClass('o-amarela')){
                    return (Number(inicio) + 10).toString().padStart(2, '0');
                }
                return (Number(inicio) - 10).toString().padStart(2, '0');
            }
        }
        return proximoCaminho;
    };

    var _contornaBarreiraColuna = function (proximoCaminho) {
        if($('#' + proximoCaminho).hasClass('o-vermelha')){
            if(proximidade.esquerda){
                //TODO: verificar se tem vermelho;
                return (Number(inicio) - 1).toString().padStart(2, '0');
            }else if(proximidade.direita){
                //TODO: verificar se tem vermelho;
                return (Number(inicio) + 1).toString().padStart(2, '0');
            }else if(proximidade.mesmaColuna){
                //TODO: verificar se tem vermelho;
                if((Number(inicio) - 1).toString().padStart(2, '0') < '00'){
                    return (Number(inicio) + 1).toString().padStart(2, '0');
                }
                else if((Number(inicio) + 1).toString().padStart(2, '0') > '99'){
                    return (Number(inicio) - 1).toString().padStart(2, '0');
                }
                //TODO: verificar se tem vermelho;
                if($('#' + (Number(inicio) - 1).toString().padStart(2, '0')).hasClass('o-amarela')){
                    return (Number(inicio) + 1).toString().padStart(2, '0');
                }
                return (Number(inicio) - 1).toString().padStart(2, '0');
            }
        }
        return proximoCaminho;
    };

    var _percorreLinha = function () {
        if(proximidade.direita){
            const proximoCaminho = (Number(inicio) + 1).toString().padStart(2, '0');
            inicio = _contornaBarreiraLinha(proximoCaminho);
            $('#' + inicio).addClass('o-amarela');
        }

        if(proximidade.esquerda){
            const proximoCaminho = (Number(inicio) - 1).toString().padStart(2, '0');
            inicio = _contornaBarreiraLinha(proximoCaminho);
            $('#' + inicio).addClass('o-amarela');
        }
    };

    var _percorreColuna = function () {
        if(proximidade.baixo){
            const proximoCaminho = (Number(inicio) + 10).toString().padStart(2, '0');
            inicio = _contornaBarreiraColuna(proximoCaminho);
            $('#' + inicio).addClass('o-amarela');
        }

        if(proximidade.cima){
            const proximoCaminho = (Number(inicio) - 10).toString().padStart(2, '0');
            inicio = _contornaBarreiraColuna(proximoCaminho);
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
        }else{
            _percorreColuna();
            telaBusca.verificaCaminhoProximo();
        }
    };

    return new Busca();

}());