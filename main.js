// ---------------------------------------------------------------------
//  Black Jack ... By Juan Eguia
// 
// ---------------------------------------------------------------------
import {
    constantes,
    marcadores,
    objeto,
    estado,
    sonido
} from "./constants.js";

import { 
    sortear_carta,
    instanciar_fichas,
    instanciar_mazo,
    clearReset_board,
    resetMarcadores,
    clearReset_fichas
} from "./functions.js";

// ---------------------------------------------------------------------
//  Eventos Raton, Touch, Key
// ---------------------------------------------------------------------
for (let tipoEvento of constantes.eventos) {

    document.addEventListener(tipoEvento, (ev) => {

        if (estado.menu_principal && tipoEvento === 'click') {

            if (ev.target.id === 'comenzar') {

                sonido.plantarse.play();
                estado.menu_principal = false;
                estado.enJuego = true;

                objeto.menuPrincipal.style.display = 'none';

                objeto.board.style.display = 'grid';
                objeto.scoreBoardCPU[0].style.display = 'grid';

                sonido.dieShuffle1.play();
                instanciar_mazo();
                instanciar_fichas();
                bucle_principal();
            }
        }

        if (estado.enJuego && marcadores.turno && !marcadores.plantarse && tipoEvento === 'click') {
    
            if (ev.target.id === 'boton__pedirCarta') {

                sortear_carta();
                console.log('pidiendo carta...');

            } else if (ev.target.id === 'boton__plantarse') {

                marcadores.plantarse = true;
                marcadores.turno = false;
                console.log('Jugador se Planta!');
                objeto.botonesEnjuego[0].style.display = 'none';
                objeto.botonesEnjuego[1].style.display = 'none';
                objeto.cpuPensando[0].style.display = 'flex';
                objeto.cpuPensando[0].innerHTML = 'CPU Pensando...';
                sonido.plantarse.play();

                sortear_carta();
            }
        }

        if (estado.finMano && tipoEvento === 'click') {
            if (ev.target.id === 'boton__otraMano' && marcadores.fichasJugador > 0 && marcadores.fichasCPU > 0) {

                console.log('borrando...');
                sonido.dieShuffle1.play();

                estado.enJuego = true;
                estado.finMano = false;

                clearReset_board();
                resetMarcadores();
                //clearReset_fichas();
                //instanciar_fichas();
                bucle_principal();

            } else if (ev.target.id === 'boton__otraMano' && marcadores.fichasJugador <= 0) {

                //clearReset_fichas();
                console.log('Pierdes!');

                estado.game_over = true;

                objeto.board.style.display = 'none';
                objeto.scoreBoardCPU[0].style.display = 'none';
                objeto.gameOverMenu.style.display = 'grid';

            } else if (ev.target.id === 'boton__otraMano' && marcadores.fichasCPU <= 0) {

                console.log('Ganas!');

                estado.game_over = true;

                objeto.board.style.display = 'none';
                objeto.scoreBoardCPU[0].style.display = 'none';
                objeto.menuPrincipal.style.display = 'grid';

            }
        }

        if (estado.game_over && ev.target.id === 'rejugar' && tipoEvento === 'click') {

            console.log('menu principal');
        }
    });
}

// ---------------------------------------------------------------------
//  funcion INICIALIZADORA
// ---------------------------------------------------------------------
window.onload = () => {

    objeto.board.style.display = 'none';
    objeto.scoreBoardCPU[0].style.display = 'none';
    objeto.botonOtraMano.style.display = 'none';
}

// ---------------------------------------------------------------------
//  Bucle PRINCIPAL Inicial ... (repartir 2 cartas Banca y 2 al Jugador)
// ---------------------------------------------------------------------
function bucle_principal() {

    do {
        sortear_carta();
        console.log(objeto.carta);
        console.log(objeto.arrayCartasDibujadas);

    } while (marcadores.contadorGeneral < constantes.primeras4);
}
