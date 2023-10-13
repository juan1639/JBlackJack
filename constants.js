// ---------------------------------------------------------------------
//  CONSTANTES & VARIABLES
// ---------------------------------------------------------------------
const constantes = {
    primeras4: 4,
    eventos: ['touchstart', 'click'],
    fichasInicialesJugador: 5,
    fichasInicialesCPU: 6,
}

const objeto = {
    board: document.getElementById('game__board'),
    scoreBoardJugador: document.getElementsByClassName('score__board'),
    scoreBoardCPU: document.getElementsByClassName('score__board cpu'),
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
