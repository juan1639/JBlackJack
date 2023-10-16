// ---------------------------------------------------------------------
//  Black Jack ... By Juan Eguia
// 
// ---------------------------------------------------------------------
import {
    constantes,
    marcadores,
    objeto,
    estado,
    sonido,
    varias
} from "./constants.js";

import { 
    sortear_carta,
    instanciar_fichas,
    instanciar_mazo,
    clearReset_board,
    resetMarcadores,
    clearReset_fichas
} from "./functions.js";

let eventoSel;
// ---------------------------------------------------------------------
//  Eventos Raton, Touch, Key
// ---------------------------------------------------------------------
for (let tipoEvento of constantes.eventos) {

    document.addEventListener(tipoEvento, (ev) => {

        if (estado.menu_principal && tipoEvento === eventoSel) {

            if (ev.target.id === 'comenzar') {

                sonido.plantarse.play();
                estado.menu_principal = false;
                estado.enJuego = true;
                marcadores.fichasJugador = constantes.fichasInicialesJugador;
                marcadores.fichasCPU = constantes.fichasInicialesCPU;

                objeto.menuPrincipal.style.display = 'none';

                objeto.board.style.display = 'grid';
                objeto.scoreBoardCPU[0].style.display = 'grid';

                sonido.dieShuffle1.play();
                instanciar_mazo();
                instanciar_fichas();
                bucle_principal();

            } else if (ev.target.id === 'config__controles' && !varias.bandera) {

                console.log('config controles');
                sonido.plantarse.play();
                varias.bandera = true;
                eventoSel === constantes.eventos[0] ? eventoSel = constantes.eventos[1] : eventoSel = constantes.eventos[0];
                objeto.modalCambiaControles[0].style.display = 'grid';

                let txt;
                eventoSel === constantes.eventos[0] ? txt = 'touch (Móvil)' : txt = 'Ratón';
                objeto.modalCambiaControles[0].innerHTML = 'Controles cambiados a ' + txt;
                
                setTimeout(() => {
                    objeto.modalCambiaControles[0].style.display = 'none';
                    varias.bandera = false;
                    console.log(varias.bandera, eventoSel);
                }, 2500);
            }
        }

        if (estado.enJuego && marcadores.turno && !marcadores.plantarse && tipoEvento === eventoSel) {
    
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

        if (estado.finMano && tipoEvento === eventoSel) {
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
                sonido.dieThrow1.play();
                sonido.dieThrow2.play();
                sonido.gameOverVoz.play();

                estado.game_over = true;
                estado.finMano = false;

                clearReset_board();
                resetMarcadores();
                clearReset_fichas();

                objeto.board.style.display = 'none';
                objeto.scoreBoardCPU[0].style.display = 'none';
                objeto.gameOverMenu.style.display = 'grid';

            } else if (ev.target.id === 'boton__otraMano' && marcadores.fichasCPU <= 0) {

                console.log('Ganas!');
                sonido.ganarTodasFichas.play();

                estado.menu_principal = true;
                estado.finMano = false;

                clearReset_board();
                resetMarcadores();
                clearReset_fichas();

                objeto.board.style.display = 'none';
                objeto.scoreBoardCPU[0].style.display = 'none';
                objeto.menuPrincipal.style.display = 'grid';
            }
        }

        if (estado.game_over && ev.target.id === 'rejugar' && tipoEvento === eventoSel) {

            console.log('menu principal');
            sonido.plantarse.play();

            estado.game_over = false;
            estado.menu_principal = true;

            objeto.gameOverMenu.style.display = 'none';
            objeto.menuPrincipal.style.display = 'grid';
        }
    });
}

// ---------------------------------------------------------------------
//  funcion INICIALIZADORA
// ---------------------------------------------------------------------
window.onload = () => {

    eventoSel = constantes.eventos[1];
    console.log(eventoSel);

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
