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
                sonido.dieThrow1.play();
                sonido.dieThrow2.play();

                sortear_carta();
            }
        }

        if (estado.finMano && tipoEvento === 'click') {
            if (ev.target.id === 'boton__otraMano') {

                console.log('borrando...');
                sonido.dieShuffle1.play();

                estado.enJuego = true;
                estado.finMano = false;

                clearReset_board();
                resetMarcadores();
                clearReset_fichas();
                instanciar_fichas();
                bucle_principal();
            }
        }
    });
}

// ---------------------------------------------------------------------
//  funcion INICIALIZADORA
// ---------------------------------------------------------------------
window.onload = () => {

    objeto.botonOtraMano.style.display = 'none';
    sonido.dieShuffle1.play();

    instanciar_mazo();
    instanciar_fichas();
    bucle_principal();
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
