/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];



 // Esta función crea unA NUEVA BARAJA DE CARTAS
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

crearDeck();

// Esta función permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ) {  //si ya no existe carta en el arreglo
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); //escogiendo la ultima carta que existe en el arreglo y deja de existir en el deck(arreglo) y me lo muestra
    return carta;
}

// deck         = [];
// pedirCarta();
/**
 * Saber cuanto vale la carta que estamos generando
 * isNaN( valor ) si no es un numero
 * valor * 1 transformando el valor de la carta a un numero por eso multiplico valor por 1
 * 
 */

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1);  //extraigo el primer valor del string en estos casos es el numero ya sea compuesto o no
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10 //otra operacion ternaria diciendo que si es un as pues vale 11 en caso contrario vale 10
            : valor * 1;
}