// ---------------------------------------------------------------------
//  Class Carta
// ---------------------------------------------------------------------
import { objeto, marcadores } from './constants.js';

// -----------------------------------------------------------------------------
export class Carta {
    
    constructor(keyPalo, valor_rnd) {

        this.StringPalo = keyPalo;
        console.log(this.StringPalo);
        console.log(this.StringPalo.toString());

        this.valorInt = valor_rnd + 1;  // Sumamos 1 al rnd (ahora rango: 1-13)
        console.log(this.valorInt);

        this.imgCarta;
        this.StringUrl;

        this.turno = this.averiguaTurno();
        this.dibuja_carta();
    }

    dibuja_carta() { 

        const valorAJQKx = this.check_AJQK();

        this.StringUrl = 'card' + this.StringPalo.toString() + valorAJQKx + '.png';

        objeto.carta = document.createElement('span');
        objeto.carta.setAttribute('class', 'carta');
        objeto.carta.setAttribute('id', 'carta__1');
        
        if (marcadores.contadorGeneral === 1) {
            objeto.carta.style.backgroundImage = `url("./img/Cards/cardBack_blue3.png")`;

        } else {
            objeto.carta.style.backgroundImage = `url("./img/Cards/${this.StringUrl}")`;
        }
        
        let valorGrid = this.situarCarta_gridArea();
        objeto.carta.style.gridArea = valorGrid;

        objeto.board.appendChild(objeto.carta);
        this.imgCarta = objeto.carta;
    }

    check_AJQK() {

        if (this.valorInt === 1) {
            return 'A';

        } else if (this.valorInt === 11) {
            return 'J';

        } else if (this.valorInt === 12) {
            return 'Q';

        } else if (this.valorInt === 13) {
            return 'K';
        }

        return this.valorInt.toString();
    }

    averiguaTurno() {

        marcadores.contadorGeneral ++;

        if (marcadores.contadorGeneral < 3) {
            marcadores.turno = false;
            marcadores.contadorCPU ++;
            return false;

        } else if (marcadores.contadorGeneral < 5) {
            marcadores.turno = true;
            marcadores.contadorJugador ++;
            return true;
        }

        marcadores.turno ? marcadores.contadorJugador ++ : marcadores.contadorCPU ++;
        return marcadores.turno;
    }

    situarCarta_gridArea() {

        let stringNumeradorGrid;
        let stringDenominadorGrid;
        let masUno;

        if (this.turno) {
            stringNumeradorGrid = '1';
            masUno = marcadores.contadorJugador + 1;
            stringDenominadorGrid = masUno.toString();

        } else {
            stringNumeradorGrid = '3';
            masUno = marcadores.contadorCPU + 1;
            stringDenominadorGrid = masUno.toString();
        }

        return stringNumeradorGrid + '/' + stringDenominadorGrid;
    }
}
