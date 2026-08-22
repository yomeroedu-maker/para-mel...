/* =========================================
   PARA MEL - SPOTIFY
========================================= */


/* =========================================
   ELEMENTOS HTML
========================================= */

const pagina1 = document.getElementById("pagina1");
const pagina2 = document.getElementById("pagina2");

const btnSiguiente = document.getElementById("btnSiguiente");

const spotifyPlayer = document.getElementById("spotifyPlayer");

const cancionesHTML = document.querySelectorAll(".cancion");


/* =========================================
   CANCIONES DE SPOTIFY
========================================= */

const canciones = [

    {
        nombre: "Qué Nivel de Mujer",
        id: "4yakD6EKEjeMezENNCSlcc"
    },

    {
        nombre: "Suave",
        id: "4p7XH4NhQ25iGYrrbg93gt"
    },

    {
        nombre: "Tu Mirada",
        id: "3PlhEGoFWvQpPtCycG8xpr"
    },

    {
        nombre: "Eres",
        id: "1yJUzwqF3PRiQ0KEDy4kYc"
    },

    {
        nombre: "Mujer de Fuego",
        id: "4LZK9BGNf7M6N4nBbxYxVd"
    },

    {
        nombre: "Luz de Luna",
        id: "5MALTxghQ66hGWdl1lsGmB"
    },

    {
        nombre: "O Tú o Ninguna",
        id: "7u5wdRqlAC4qeRp47e7hce"
    },

    {
        nombre: "Sol, Arena y Mar",
        id: "3pJlTmnEjkf1u9Bualfo8X"
    },

    {
        nombre: "Amarte es un Placer",
        id: "4lQWZGUrquRfH9se6nlmp3"
    },

    {
        nombre: "Cuestión de Piel",
        id: "1PdgPj8tdE2OAhH40J4f4g"
    }

];


/* =========================================
   VARIABLE ACTUAL
========================================= */

let indiceActual = 0;


/* =========================================
   BOTÓN SIGUIENTE
========================================= */

btnSiguiente.addEventListener("click", () => {

    pagina1.classList.remove("activa");

    setTimeout(() => {

        pagina2.classList.add("activa");

    }, 300);

});


/* =========================================
   CARGAR CANCIÓN DE SPOTIFY
========================================= */

function cargarCancion(indice) {

    const cancion = canciones[indice];

    spotifyPlayer.src =
        "https://open.spotify.com/embed/track/" +
        cancion.id;

    actualizarCancionActiva();

}


/* =========================================
   ACTUALIZAR LISTA
========================================= */

function actualizarCancionActiva() {

    cancionesHTML.forEach((cancion, indice) => {

        if (indice === indiceActual) {

            cancion.classList.add("activa");

        } else {

            cancion.classList.remove("activa");

        }

    });

}


/* =========================================
   SELECCIONAR CANCIÓN
========================================= */

cancionesHTML.forEach((cancion, indice) => {

    cancion.addEventListener("click", () => {

        indiceActual = indice;

        cargarCancion(indiceActual);

    });

});


/* =========================================
   CARGAR PRIMERA CANCIÓN
========================================= */

cargarCancion(indiceActual);
