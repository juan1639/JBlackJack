// ---------------------------------------------------------------------
//  CONSTANTES & VARIABLES
// ---------------------------------------------------------------------
const constantes = {
    primeras4: 4,
    eventos: ['touchstart', 'click'],
    fichasInicialesJugador: 10,
    fichasInicialesCPU: 10,
    endPoint: './mejoresResultados.json',
    listaRecords: null,
}

const objeto = {
    board: document.getElementById('game__board'),
    scoreBoardJugador: document.getElementsByClassName('score__board'),
    scoreBoardCPU: document.getElementsByClassName('score__board cpu'),
    modalGanadorMano: document.getElementsByClassName('modalGanadorMano'),
    modalCambiaControles: document.getElementsByClassName('modal__cambiaControles'),
    botonesEnjuego: document.getElementsByClassName('botones__enJuego'),
    cpuPensando: document.getElementsByClassName('cpu__pensando'),
    botonOtraMano: document.getElementById('boton__otraMano'),
    gameOverMenu: document.getElementById('game_over'),
    menuPrincipal: document.getElementById('menu__principal'),
    contenedorRecords: document.getElementsByClassName('contenedor__records'),
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
    cuantosAsesJugador: 0,
    cuantosAsesCPU: 0,
    fichasJugador: constantes.fichasInicialesJugador,
    fichasCPU: constantes.fichasInicialesCPU,
}

const estado = {
    menu_principal: true,
    enJuego: false,
    finMano: false,
    game_over: false
}

const varias = {
    bandera: false,
}

const sonido = {
    saleCarta1: new Audio('./sonidos/cardPlace1.ogg'),
    saleCarta2: new Audio('./sonidos/cardPlace2.ogg'),
    saleCarta3: new Audio('./sonidos/cardPlace3.ogg'),
    slideCarta1: new Audio('./sonidos/cardSlide1.ogg'),
    slideCarta2: new Audio('./sonidos/cardSlide2.ogg'),
    slideCarta3: new Audio('./sonidos/cardSlide3.ogg'),
    fichas1: new Audio('./sonidos/chipsCollide1.ogg'),
    fichas2: new Audio('./sonidos/chipsCollide2.ogg'),
    fichas3: new Audio('./sonidos/chipsCollide3.ogg'),
    dieShuffle1: new Audio('./sonidos/dieShuffle1.ogg'),
    dieThrow1: new Audio('./sonidos/dieThrow1.ogg'),
    dieThrow2: new Audio('./sonidos/dieThrow2.ogg'),
    plantarse: new Audio('./sonidos/puttergolf.mp3'),
    ganarMano: new Audio('./sonidos/extralive.mp3'),
    ganarTodasFichas: new Audio('./sonidos/aplausoseagle.mp3'),
    gameOverVoz: new Audio('./sonidos/gameover.mp3'),
}

// -----------------------------------------------------------------------------
export {
    constantes,
    objeto,
    palos,
    marcadores,
    estado,
    sonido,
    varias
};
