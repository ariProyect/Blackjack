/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

 /**
  * Logica del juego se debe llegar a la puntuación de 21 si te pasas pierdes
  * 
  * Si en el turno del jugador se pasa de 21 en la computadora logica implementada la computadora gana porque basta que saque una carta y siendo superior a cero
  * pues gana la computadora
  * 
  * Si los puntos de la computadora son superior a 21 tratando de superar los puntos del jugador entonces el jugador gana
  * 
  * Si la computadora iguala los puntos del jugador nadie gana
  */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');




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


// turno de la computadora
/**
 * 
 * puntos igual o superior al del jugador
 * 
 */
const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {    // si los puntos minimos es mayor a 21 no hay razon que haga el ciclo, porque si ya el jugador hace 22 ya perdio y con cualquier
           // carta que saque la computadora gana
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) ); //mientras los puntos de la computadora sea menor a los puntos minimos del jugador y
    // menor igual a 21

    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
}



// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();  // Me trae la carta seleccionada
    
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;  // el valor del small cambia dinamicamente por la suma de todas las cartas sacadas
    
    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD 
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta ); 


    /**
     * Evaluando si el jugador tiene mas de 21 puntos, si es que si perdió
     * Si es 21 punto tambien bloqueo los botones
     */
    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true; // Bloqueo el boton
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador ); //el puntaje que envio como argumento son los puntos del jugador

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});    

btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );
});

/**
 * Reseteo de todo el juego
 */

btnNuevo.addEventListener('click', () => {

    console.clear(); // limpio la consola
    deck = []; // limpiar el deck
    deck = crearDeck(); //crear un nuevo deck

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = ''; //borrar las cartas
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false; //habilito los botones
    btnDetener.disabled = false;

});
