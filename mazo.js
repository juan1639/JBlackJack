// ---------------------------------------------------------------------
//  Class Mazo
// ---------------------------------------------------------------------

import { objeto } from "./constants.js";

// -----------------------------------------------------------------------------
export class Mazo {
    
    constructor(y, x, margenIz) {

        this.numerador = y;
        this.denominador = x;

        this.elementoMazo = document.createElement('span');
        this.elementoMazo.setAttribute('class', 'carta');
        this.elementoMazo.style.backgroundImage = `url("./img/Cards/cardBack_blue3.png")`;
        this.elementoMazo.style.marginLeft = margenIz.toString() + 'px';
        this.elementoMazo.style.gridArea = this.numerador.toString() + '/' + this.denominador.toString();
        objeto.board.appendChild(this.elementoMazo)
    }
}
