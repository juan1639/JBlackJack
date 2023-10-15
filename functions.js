// ---------------------------------------------------------------------
//  Funciones varias
// ---------------------------------------------------------------------
import { 
    palos, 
    objeto,
    marcadores,
    estado,
    sonido
} from './constants.js';

import { Carta } from './carta.js';
import { Ficha } from './ficha.js';
import { Mazo } from './mazo.js';

// -----------------------------------------------------------------------------
function sortear_carta() {

    if (!marcadores.turno && marcadores.plantarse) {

        if (marcadores.sumaCPU > 15) {
            estado.finMano = true;
            estado.enJuego = false;

            setTimeout(() => {
                objeto.cpuPensando[0].style.display = 'none';
                objeto.botonOtraMano.style.display = 'flex';
                sePlantaCPU_finMano();
            }, 2000);

            return;

        } else if (marcadores.sumaCPU < 16 && (marcadores.sumaJugador <= marcadores.sumaCPU)) {

            estado.finMano = true;
            estado.enJuego = false;

            setTimeout(() => {
                objeto.cpuPensando[0].style.display = 'none';
                objeto.botonOtraMano.style.display = 'flex';
                sePlantaCPU_finMano();
            }, 2000);

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

    if (!marcadores.turno && marcadores.plantarse) {

        setTimeout(() => {
            instanciar_carta(keyPalo, valor_rnd);
            mostrar_marcadores(valor_rnd);
        }, 1500);

    } else {
        instanciar_carta(keyPalo, valor_rnd);
        mostrar_marcadores(valor_rnd);

        const jugador_sePasa = check_siJugadorSePasa();

        if (jugador_sePasa) {

            setTimeout(() => {
                objeto.cpuPensando[0].style.display = 'none';
                objeto.botonOtraMano.style.display = 'flex';
                sePlantaCPU_finMano();
            }, 2000);
        }
    }
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
        objeto.sumaJugador.innerHTML = `Jug. suma: ${marcadores.sumaJugador}`;
        
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
function check_siJugadorSePasa() {

    if (marcadores.turno && marcadores.sumaJugador > 21) {
        estado.finMano = true;
        estado.enJuego = false;
        objeto.botonesEnjuego[0].style.display = 'none';
        objeto.botonesEnjuego[1].style.display = 'none';
        objeto.cpuPensando[0].style.display = 'flex';
        objeto.cpuPensando[0].innerHTML = 'Te Pasaste...';

        return true;
    }

    return false;
}

// -----------------------------------------------------------------------------
function calcula_valorCarta(valor_rnd) {

    if (valor_rnd > 9) return 10;

    return valor_rnd + 1;
}

// -----------------------------------------------------------------------------
function instanciar_fichas() {

    for (let i = 0; i < marcadores.fichasJugador; i ++) {

        const nuevaFicha = new Ficha(1, i + 2, 'normal', 0);
        objeto.scoreBoardJugador[0].appendChild(nuevaFicha.elementoFicha);
    }

    for (let i = 0; i < marcadores.fichasCPU; i ++) {

        const nuevaFicha = new Ficha(1, i + 2, 'normal', 0);
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

    const StringUrl = objeto.arrayCartasDibujadas[0].StringUrl;

    objeto.arrayCartasDibujadas[0].imgCarta.style.backgroundImage = `url("./img/Cards/${StringUrl}")`;

    let animaDuracion = 0.6;
    let animaFicha;
    let posInicial;

    if (marcadores.sumaJugador > 21) {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana la CPU!';
        objeto.modalGanadorMano[0].style.gridArea = '3/12';
        animaFicha = 'moveUpDo';
        marcadores.fichasJugador --;
        marcadores.fichasCPU ++;

        setTimeout(() => {
            sonido.dieThrow1.play();
            sonido.dieThrow2.play();
        }, 500);

    } else if (marcadores.sumaCPU > 21) {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana Jugador!';
        objeto.modalGanadorMano[0].style.gridArea = '1/12';
        animaFicha = 'moveDoUp';
        marcadores.fichasJugador ++;
        marcadores.fichasCPU --;

        setTimeout(() => {
            sonido.ganarMano.play();
            sonido.ganarMano.volume = 0.2;
        }, 500);


    } else if (marcadores.sumaJugador > marcadores.sumaCPU) {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana Jugador!';
        objeto.modalGanadorMano[0].style.gridArea = '1/12';
        animaFicha = 'moveDoUp';
        marcadores.fichasJugador ++;
        marcadores.fichasCPU --;

        setTimeout(() => {
            sonido.ganarMano.play();
            sonido.ganarMano.volume = 0.2;
        }, 500);

    } else {
        objeto.modalGanadorMano[0].style.display = 'flex';
        objeto.modalGanadorMano[0].innerHTML = 'Gana la CPU!';
        objeto.modalGanadorMano[0].style.gridArea = '3/12';
        animaFicha = 'moveUpDo';
        marcadores.fichasJugador --;
        marcadores.fichasCPU ++;

        setTimeout(() => {
            sonido.dieThrow1.play();
            sonido.dieThrow2.play();
        }, 500);
    }

    sonido.fichas1.play();
    sonido.fichas3.play();

    clearReset_fichas();
    instanciar_fichas();

    animaFicha === 'moveDoUp' ? posInicial = 3 : posInicial = 1;

    const nuevaFicha = new Ficha(posInicial, 5, animaFicha, animaDuracion);
    objeto.board.appendChild(nuevaFicha.elementoFicha);
    setTimeout(() => {
        objeto.board.removeChild(nuevaFicha.elementoFicha);
    }, animaDuracion * 1000);

    console.log('fin mano');
}

// -----------------------------------------------------------------------------
function clearReset_board() {

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
}

// -----------------------------------------------------------------------------
function resetMarcadores() {

    marcadores.turno = false;
    marcadores.plantarse = false;
    marcadores.contadorGeneral = 0;
    marcadores.contadorJugador = 0;
    marcadores.contadorCPU = 0;
    marcadores.sumaJugador = 0;
    marcadores.sumaCPU = 0; 
}

// -----------------------------------------------------------------------------
function clearReset_fichas() {

    while (objeto.scoreBoardJugador[0].firstChild) {
        objeto.scoreBoardJugador[0].removeChild(objeto.scoreBoardJugador[0].firstChild);
    }

    while (objeto.scoreBoardCPU[0].firstChild) {
        objeto.scoreBoardCPU[0].removeChild(objeto.scoreBoardCPU[0].firstChild);
    }

    objeto.scoreBoardJugador[0].appendChild(objeto.sumaJugador);
    objeto.scoreBoardCPU[0].appendChild(objeto.sumaCPU);
    objeto.sumaCPU.innerHTML = 'CPU suma:';
}

// -----------------------------------------------------------------------------
export {
    sortear_carta,
    instanciar_carta,
    instanciar_fichas,
    instanciar_mazo,
    clearReset_board,
    resetMarcadores,
    clearReset_fichas
};
