const miModulo = (() => {
    'use strict'

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
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

        let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // Esta función inicializa el juego 
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) { //inicializando puntos de los jugadores
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach( elem => elem.innerText = 0 ); // valor en cero el small del html
        divCartasJugadores.forEach( elem => elem.innerHTML = '' ); // inicializo a vacio el valor de las cartas

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

    }
        

    // Esta función crea una NUEVA BARAJA DE CARTAS
    const crearDeck = () => {

        deck = [];
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
        return  _.shuffle( deck );
    }


    // Esta función permite tomar una carta
    const pedirCarta = () => {

        if ( deck.length === 0 ) {  //si ya no existe carta en el arreglo
            throw 'No hay cartas en el deck';
        }
        return deck.pop(); //escogiendo la ultima carta que existe en el arreglo y deja de existir en el deck(arreglo) y me lo muestra
        
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

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    /**
     * 
     * @param {carta } carta 
     * @param {* turno de la persona que este jugando en ese momento} turno 
     */
    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img'); // se crea la imagen
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD recibimos la carta se crea
        imgCarta.classList.add('carta'); // le añado la clase
        divCartasJugadores[turno].append( imgCarta ); // determina a que div va la carta ej(jugador o computadora) que acabo de crear

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

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


    // turno de la computadora
    /**
     * puntos igual o superior al del jugador
     */
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1 ); // valor acomulado que nos regrese por acumular puntos
            crearCarta(carta, puntosJugadores.length - 1 );

        } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) ); //mientras los puntos de la computadora sea menor a los puntos minimos del jugador y
        // menor igual a 21

        determinarGanador();
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();  // Me trae la carta seleccionada
        const puntosJugador = acumularPuntos( carta, 0 ); // 0 porque es el primer jugador
        
        crearCarta( carta, 0 );

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

        turnoComputadora( puntosJugadores[0] );  // puntosJugadores[0] los puntos del primer jugador
    });

    /**
     * Reseteo de todo el juego
     */

    // btnNuevo.addEventListener('click', () => {
        
    //     inicializarJuego();

    // });

    return {
        nuevoJuego: inicializarJuego
    };

})();

