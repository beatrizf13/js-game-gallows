var criaController = function (jogo) {

    var $entrada = $('#entrada');
    var $lacunas = $('.lacunas');

    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    var mudaPlaceHolder = function (texto) {
        $entrada.attr('placeholder', texto);
    };

    var guardaPalavraSecreta = function () {
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chuta');
            exibeLacunas();
        } catch(err) {
            alert(err.message);
        }
    };

    var leChute = function () {
        try {
            jogo.processaChute($entrada.val().trim().substr(0, 1));
            $entrada.val('');
            exibeLacunas();

            if(jogo.ganhouOuPerdeu()) {

                setTimeout(function() {
                    if(jogo.ganhou()) {
                        alert('Ganhou! :D');
                    } else if (jogo.perdeu()) {
                        alert('Perdeu! :P');
                    }
                    reinicia();
                }, 200);
            }
        } catch(err) {
            alert(err.message);
        }
    };

    var reinicia = function () {
        $lacunas.empty();
        mudaPlaceHolder('Palavra secreta');
        jogo.reinicia();
    };

    var inicia = function () {
        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    return { inicia: inicia };
};
