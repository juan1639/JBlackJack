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

        const nuevaFicha = new Ficha(1, i + 2);
        objeto.scoreBoardJugador[0].appendChild(nuevaFicha.elementoFicha);
    }

    for (let i = 0; i < marcadores.fichasCPU; i ++) {

        const nuevaFicha = new Ficha(1, i + 2);
        objeto.scoreBoardCPU[0].appendChild(nuevaFicha.elementoFicha);
    }
}

// -----------------------------------------------------------------------------
function sePlantaCPU_finMano() {

    console.log('fin mano');
}

// -----------------------------------------------------------------------------
export {
    sortear_carta,
    instanciar_carta,
    instanciar_fichas
};
