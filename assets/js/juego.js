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