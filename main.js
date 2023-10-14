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
                sortear_carta();
            }
        }
    });
}

// ---------------------------------------------------------------------
//  funcion INICIALIZADORA
// ---------------------------------------------------------------------
window.onload = () => {

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
