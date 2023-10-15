// ---------------------------------------------------------------------
//  Black Jack ... By Juan Eguia
// 
// ---------------------------------------------------------------------
import {
    constantes,
    marcadores,
    objeto,
    estado
} from "./constants.js";

import { 
    sortear_carta,
    instanciar_fichas,
    instanciar_mazo
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
                objeto.cpuPensando[0].innerHTML = 'CPU Pensando...'

                sortear_carta();
            }
        }

        if (estado.finMano && tipoEvento === 'click') {
            if (ev.target.id === 'boton__otraMano') {
                estado.enJuego = true;
                estado.finMano = false;
                objeto.botonOtraMano.style.display = 'none';

                for (let i = 0; i < marcadores.contadorGeneral; i ++) {
                    objeto.board.removeChild(objeto.board.lastChild);
                }

                while (objeto.arrayCartasDibujadas.length > 0) {
                    objeto.arrayCartasDibujadas.shift();
                }

                if (objeto.modalGanadorMano[0]) {
                    objeto.modalGanadorMano[0].style.display = 'none';
                }

                objeto.botonOtraMano.style.display = 'none';
                objeto.botonesEnjuego[0].style.display = 'flex';
                objeto.botonesEnjuego[1].style.display = 'flex';

                marcadores.turno = false;
                marcadores.plantarse = false;
                marcadores.contadorGeneral = 0;
                marcadores.contadorJugador = 0;
                marcadores.contadorCPU = 0;
                marcadores.sumaJugador = 0;
                marcadores.sumaCPU = 0;
                console.log('borrando...');

                while (objeto.scoreBoardJugador[0].firstChild) {
                    objeto.scoreBoardJugador[0].removeChild(objeto.scoreBoardJugador[0].firstChild);
                }
            
                while (objeto.scoreBoardCPU[0].firstChild) {
                    objeto.scoreBoardCPU[0].removeChild(objeto.scoreBoardCPU[0].firstChild);
                }

                objeto.scoreBoardJugador[0].appendChild(objeto.sumaJugador);
                objeto.scoreBoardCPU[0].appendChild(objeto.sumaCPU);
                objeto.sumaCPU.innerHTML = 'CPU suma:';

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
