
/* global telaBusca */
var telaLabirinto = (function () { //eslint-disable-line
    'use strict';

    const casaMaxima = 99;

    /*
     * Função randomica para colocar os pontos inicial e final no mapa.
     */
    var getRandom = function () {
        return Math.floor(Math.random() * casaMaxima + 1).toString().padStart(2, '0');
    };

    var _verificaSeTemInicioFim = function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                if($('#' + i+''+j).hasClass('o-azul') ||
                   $('#' + i+''+j).hasClass('o-preta')){
                    return true;
                }
            }
        }
        alert('Coloque os pontos inicial e final primeiro!');
        return false;
    };

    var _limpacores = function (valor) {

        $('#' + valor.id).removeClass('o-preta');
        $('#' + valor.id).removeClass('o-azul');
        $('#' + valor.id).removeClass('o-vermelha');
        $('#' + valor.id).removeClass('o-amarela');
    };

    /*
     * Vincula os eventos nos elementos da tela.
     */
    var _vincularEventos = function () {
        $('#btn-iniciar').click(function(){
            if(_verificaSeTemInicioFim()){
                telaBusca.buscarCaminhoProximo();
            }
        });
        $('#btn-InicialFinal').click(telaLabirinto.colocarPontoInicialFinal);
        $('#btn-limpar').click(telaLabirinto.limparTudo);
        $('#campo-tabela .o-quebra-coluna div[id]').click(function () {
            telaLabirinto.clicarQuadrado(this);
        });
    };

    /**
     * @global
     * @constructor
     */
    function Labirinto() {}

    /*
     * Inicia este método ao entrar na tela.
     */
    Labirinto.prototype.carregar = function () {
        telaLabirinto.renderizarLabirinto();
        _vincularEventos();
    };

    /*
     * Renderiza o labirinto no HTML.
     */
    Labirinto.prototype.renderizarLabirinto = function () {
        var campo = $('#campo-tabela');

        for (var i = 0; i < 10; i++) {
            campo.append('<div id=linha-' + i + ' class="o-quebra-coluna">');

            for (var j = 0; j < 10; j++) {
                $('#linha-' + i).append('<div id=' + i + '' + j + ' class="s-grade-labirinto"></div>');
            }
        }
    };

    Labirinto.prototype.colocarPontoInicialFinal = function () {
        
        //Variaveis com os valores randomicos;
        var valor = document.createElement('div'),
            valorAzul = getRandom(),
            valorPreta = getRandom();

        //Limpa as cores anteriores
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                valor.id = i+''+j;
                $('#' + valor.id).removeClass('o-amarela');
                if($('#' + valor.id).hasClass('o-azul') ||
                   $('#' + valor.id).hasClass('o-preta')){
                    _limpacores(valor);
                }
            }
        }

        //Verifica para as cores nunca cairem no mesmo lugar
        while(valorAzul === valorPreta){
            valorAzul = getRandom();
        }

        //Adiciona as cores Inicio e Fim aleatoriamente e remove a cor vermelha dela.
        $('#' + valorAzul).removeClass('o-vermelha');
        $('#' + valorPreta).removeClass('o-vermelha');
        $('#' + valorAzul).addClass('o-azul');
        $('#' + valorPreta).addClass('o-preta');
    };

    /*
     * Manipula as cores selecionadas no Labirinto.
     */
    Labirinto.prototype.clicarQuadrado = function (valor) {
        if (!($('#' + valor.id).hasClass('o-azul') || 
            $('#' + valor.id).hasClass('o-preta'))) {
            $('#' + valor.id).toggleClass('o-vermelha'); 
        }  
    };
    
    /*
     * Limpa o labirinto.
     */
    Labirinto.prototype.limparTudo = function () {
        var valor = document.createElement('div');
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                valor.id = i+''+j;
                _limpacores(valor);
            }
        }
    };

    return new Labirinto();

}());