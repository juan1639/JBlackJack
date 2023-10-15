// ---------------------------------------------------------------------
//  CONSTANTES & VARIABLES
// ---------------------------------------------------------------------
const constantes = {
    primeras4: 4,
    eventos: ['touchstart', 'click'],
    fichasInicialesJugador: 3,
    fichasInicialesCPU: 3,
}

const objeto = {
    board: document.getElementById('game__board'),
    scoreBoardJugador: document.getElementsByClassName('score__board'),
    scoreBoardCPU: document.getElementsByClassName('score__board cpu'),
    modalGanadorMano: document.getElementsByClassName('modalGanadorMano'),
    botonesEnjuego: document.getElementsByClassName('botones__enJuego'),
    cpuPensando: document.getElementsByClassName('cpu__pensando'),
    botonOtraMano: document.getElementById('boton__otraMano'),
    carta: null,
    arrayCartasDibujadas: [],
    sumaJugador: document.getElementById('suma__jugador'),
    sumaCPU: document.getElementById('suma__cpu'),
    fichasJugador: [],
    fichasCPU: [],
}

const palos = {
    Clubs: new Array(13).fill(false),
    Diamonds: new Array(13).fill(false),
    Hearts: new Array(13).fill(false),
    Spades: new Array(13).fill(false)
}

const marcadores = {
    turno: false,
    plantarse: false,
    contadorGeneral: 0,
    contadorJugador: 0,
    contadorCPU: 0,
    contadorOcultas: 0,
    sumaJugador: 0,
    sumaCPU: 0,
    fichasJugador: constantes.fichasInicialesJugador,
    fichasCPU: constantes.fichasInicialesCPU,
}

const estado = {
    menu_principal: false,
    enJuego: true,
    finMano: false,
    game_over: false
}

// -----------------------------------------------------------------------------
export {
    constantes,
    objeto,
    palos,
    marcadores,
    estado
};
