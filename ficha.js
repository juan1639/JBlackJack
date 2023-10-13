// ---------------------------------------------------------------------
//  Class Ficha
// ---------------------------------------------------------------------

// -----------------------------------------------------------------------------
export class Ficha {
    
    constructor(y, x) {

        this.numerador = y;
        this.denominador = x;

        this.elementoFicha = document.createElement('div');
        this.elementoFicha.setAttribute('class', 'fichas__jugador');
        // this.elementoFicha.style.marginLeft = this.denominador.toString() + '%';
        this.elementoFicha.style.gridArea = '1/' + this.denominador.toString();
    }
}
