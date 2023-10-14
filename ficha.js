// ---------------------------------------------------------------------
//  Class Ficha
// ---------------------------------------------------------------------

// -----------------------------------------------------------------------------
export class Ficha {
    
    constructor(numerador, denominador, normal_move) {

        this.numerador = numerador;
        this.denominador = denominador;
        this.normal_move = normal_move;
        this.x = null;
        this.y = null;

        this.elementoFicha = document.createElement('div');
        this.elementoFicha.setAttribute('class', 'fichas__jugador');
        // this.elementoFicha.style.marginLeft = this.denominador.toString() + '%';
        this.elementoFicha.style.gridArea = this.numerador + '/' + this.denominador.toString();

        this.configurar_normal_move();
    }

    configurar_normal_move() {

        if (this.normal_move === 'moveUpDo' || this.normal_move === 'moveDoUp') {
            this.elementoFicha.style.width = '150%';
            this.elementoFicha.style.height = '30%';
            this.elementoFicha.style.marginLeft = '40%';
        }

        if (this.normal_move === 'moveUpDo') {
            this.elementoFicha.style.animation = 'fichaFrames 0.9s linear 1';
        } else if (this.normal_move === 'moveDoUp') {
            this.elementoFicha.style.animation = 'fichaFramesDoUp 0.9s linear 1';
        }
    }
}
