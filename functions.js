// ---------------------------------------------------------------------
//  Funciones varias
// ---------------------------------------------------------------------
import { 
    palos, 
    objeto,
    marcadores,
    estado
} from './constants.js';

import { Carta } from './carta.js';
import { Ficha } from './ficha.js';
import { Mazo } from './mazo.js';

// -----------------------------------------------------------------------------
function sortear_carta() {

    if (!marcadores.turno && marcadores.plantarse) {

        if (marcadores.sumaCPU > 15) {
            estado.finMano = true;
            sePlantaCPU_finMano();
            return;
        }
    }

    let palo_rnd;
    let valor_rnd;
    let keyPalo;

    do {
        palo_rnd = Math.floor(Math.random() * 4);

        valor_rnd = Math.floor(Math.random() * 13);

        console.log(palos);
        console.log(Object.keys(palos)[palo_rnd]);

        keyPalo = Object.keys(palos)[palo_rnd];
        //console.log(palos[keyPalo][valor_rnd]);

    } while (palos[keyPalo][valor_rnd]);

    palos[keyPalo][valor_rnd] = true;   // Marca la carta para que No vuelva a salir

    console.log(palos);

    instanciar_carta(keyPalo, valor_rnd);
    mostrar_marcadores(valor_rnd);
}

// -----------------------------------------------------------------------------
function instanciar_carta(keyPalo, valor_rnd) {

    objeto.carta = new Carta(keyPalo, valor_rnd);
    objeto.arrayCartasDibujadas.push(objeto.carta);
}

// -----------------------------------------------------------------------------
function mostrar_marcadores(valor_rnd) {

    const valor_carta = calcula_valorCarta(valor_rnd);
    
    if (marcadores.turno) {
        marcadores.sumaJugador += valor_carta;
        objeto.sumaJugador.innerHTML = `Jugador suma: ${marcadores.sumaJugador}`;
        
    } else {
        marcadores.sumaCPU += valor_carta;

        if (marcadores.plantarse) {
            objeto.sumaCPU.innerHTML = `CPU suma: ${marcadores.sumaCPU}`;
        }
    }

    // determinar SI es el turno de la CPU, para sortear otra carta o plantarse
    if (!marcadores.turno && marcadores.plantarse) sortear_carta();
}

// -----------------------------------------------------------------------------
function calcula_valorCarta(valor_rnd) {

    if (valor_rnd > 9) return 10;

    return valor_rnd + 1;
}

// -----------------------------------------------------------------------------
function instanciar_fichas() {

    for (let i = 0; i < marcadores.fichasJugador; i ++) {

        const nuevaFicha = new Ficha(1, i + 2, 'normal');
        objeto.scoreBoardJugador[0].appendChild(nuevaFicha.elementoFicha);
    }

    for (let i = 0; i < marcadores.fichasCPU; i ++) {

        const nuevaFicha = new Ficha(1, i + 2, 'normal');
        objeto.scoreBoardCPU[0].appendChild(nuevaFicha.elementoFicha);
    }
}

// -----------------------------------------------------------------------------
function instanciar_mazo() {

    const nro_cartas = 9;

    for (let i = 0; i < nro_cartas; i ++) {

        const nuevaCartaMazo = new Mazo(2, 2, i * 2);
    }
}

// -----------------------------------------------------------------------------
function sePlantaCPU_finMano() {

    let StringUrl = objeto.arrayCartasDibujadas[0].StringUrl;

    objeto.arrayCartasDibujadas[0].imgCarta.style.backgroundImage = `url("./img/Cards/${StringUrl}")`;

    let animaFicha;

    if (marcadores.sumaJugador > 21) {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana la CPU!';
        objeto.modalGanadorMano[0].style.gridArea = '3/12';
        animaFicha = 'moveUpDo';

    } else if (marcadores.sumaCPU > 21) {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana Jugador!';
        objeto.modalGanadorMano[0].style.gridArea = '1/12';
        animaFicha = 'moveDoUp';

    } else if (marcadores.sumaJugador > marcadores.sumaCPU) {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana Jugador!';
        objeto.modalGanadorMano[0].style.gridArea = '1/12';
        animaFicha = 'moveDoUp';

    } else {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana la CPU!';
        objeto.modalGanadorMano[0].style.gridArea = '3/12';
        animaFicha = 'moveUpDo';
    }

    const nuevaFicha = new Ficha(1, 5, animaFicha);
    objeto.board.appendChild(nuevaFicha.elementoFicha);
    setTimeout(() => {
        objeto.board.removeChild(nuevaFicha.elementoFicha);
    },900);

    console.log('fin mano');
}

// -----------------------------------------------------------------------------
export {
    sortear_carta,
    instanciar_carta,
    instanciar_fichas,
    instanciar_mazo
};
