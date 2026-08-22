/* =========================================
   PARA MEL - REPRODUCTOR
========================================= */


/* =========================================
   ELEMENTOS HTML
========================================= */

const pagina1 = document.getElementById("pagina1");
const pagina2 = document.getElementById("pagina2");

const btnSiguiente = document.getElementById("btnSiguiente");

const audio = document.getElementById("audio");

const btnPlay = document.getElementById("btnPlay");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguienteCancion = document.getElementById("btnSiguienteCancion");

const nombreCancion = document.getElementById("nombreCancion");

const barraProgreso = document.getElementById("barraProgreso");

const tiempoActual = document.getElementById("tiempoActual");
const duracion = document.getElementById("duracion");

const volumen = document.getElementById("volumen");

const cancionesHTML = document.querySelectorAll(".cancion");


/* =========================================
   LISTA DE CANCIONES
========================================= */

/*
   IMPORTANTE:

   Los nombres de los archivos .mp3 deben coincidir
   EXACTAMENTE con los que tengas dentro de la carpeta
   "music".
*/

const canciones = [

    {
        nombre: "Qué Nivel de Mujer",
        archivo: "music/que-nivel-de-mujer.mp3"
    },

    {
        nombre: "Suave",
        archivo: "music/suave.mp3"
    },

    {
        nombre: "Tu Mirada",
        archivo: "music/tu-mirada.mp3"
    },

    {
        nombre: "Eres",
        archivo: "music/eres.mp3"
    },

    {
        nombre: "Mujer de Fuego",
        archivo: "music/mujer-de-fuego.mp3"
    },

    {
        nombre: "Luz de Luna",
        archivo: "music/luz-de-luna.mp3"
    },

    {
        nombre: "O Tú o Ninguna",
        archivo: "music/o-tu-o-ninguna.mp3"
    },

    {
        nombre: "Sol, Arena y Mar",
        archivo: "music/sol-arena-y-mar.mp3"
    },

    {
        nombre: "Amarte es un Placer",
        archivo: "music/amarte-es-un-placer.mp3"
    },

    {
        nombre: "Cuestión de Piel",
        archivo: "music/cuestion-de-piel.mp3"
    }

];


/* =========================================
   VARIABLES
========================================= */

let indiceActual = 0;

let reproduciendo = false;


/* =========================================
   BOTÓN "SIGUIENTE"
========================================= */

btnSiguiente.addEventListener("click", () => {

    pagina1.classList.remove("activa");

    setTimeout(() => {

        pagina2.classList.add("activa");

    }, 300);

});


/* =========================================
   CARGAR CANCIÓN
========================================= */

function cargarCancion(indice) {

    const cancion = canciones[indice];

    nombreCancion.textContent = cancion.nombre;

    audio.src = cancion.archivo;

    audio.load();

    actualizarCancionActiva();

    barraProgreso.value = 0;

    tiempoActual.textContent = "0:00";

    duracion.textContent = "0:00";

}


/* =========================================
   ACTUALIZAR CANCIÓN SELECCIONADA
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
   PLAY / PAUSA
========================================= */

btnPlay.addEventListener("click", () => {

    if (reproduciendo) {

        pausarCancion();

    } else {

        reproducirCancion();

    }

});


/* =========================================
   REPRODUCIR
========================================= */

function reproducirCancion() {

    audio.play()
        .then(() => {

            reproduciendo = true;

            btnPlay.textContent = "❚❚";

        })
        .catch(() => {

            console.log(
                "No se pudo reproducir la canción."
            );

        });

}


/* =========================================
   PAUSAR
========================================= */

function pausarCancion() {

    audio.pause();

    reproduciendo = false;

    btnPlay.textContent = "▶";

}


/* =========================================
   SIGUIENTE CANCIÓN
========================================= */

function siguienteCancion() {

    indiceActual++;

    if (indiceActual >= canciones.length) {

        indiceActual = 0;

    }

    cargarCancion(indiceActual);

    reproducirCancion();

}


btnSiguienteCancion.addEventListener(
    "click",
    siguienteCancion
);


/* =========================================
   CANCIÓN ANTERIOR
========================================= */

function anteriorCancion() {

    indiceActual--;

    if (indiceActual < 0) {

        indiceActual = canciones.length - 1;

    }

    cargarCancion(indiceActual);

    reproducirCancion();

}


btnAnterior.addEventListener(
    "click",
    anteriorCancion
);


/* =========================================
   SELECCIONAR CANCIÓN DE LA LISTA
========================================= */

cancionesHTML.forEach((cancion, indice) => {

    cancion.addEventListener("click", () => {

        indiceActual = indice;

        cargarCancion(indiceActual);

        reproducirCancion();

    });

});


/* =========================================
   ACTUALIZAR BARRA DE PROGRESO
========================================= */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }

    const porcentaje =
        (audio.currentTime / audio.duration) * 100;

    barraProgreso.value = porcentaje;

    tiempoActual.textContent =
        convertirTiempo(audio.currentTime);

});


/* =========================================
   CUANDO SE CARGA LA DURACIÓN
========================================= */

audio.addEventListener("loadedmetadata", () => {

    duracion.textContent =
        convertirTiempo(audio.duration);

});


/* =========================================
   MOVER LA BARRA MANUALMENTE
========================================= */

barraProgreso.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }

    const nuevoTiempo =
        (barraProgreso.value / 100) * audio.duration;

    audio.currentTime = nuevoTiempo;

});


/* =========================================
   VOLUMEN
========================================= */

volumen.addEventListener("input", () => {

    audio.volume = volumen.value;

});


/* =========================================
   CUANDO TERMINA UNA CANCIÓN
========================================= */

audio.addEventListener("ended", () => {

    siguienteCancion();

});


/* =========================================
   CONVERTIR SEGUNDOS A 0:00
========================================= */

function convertirTiempo(segundos) {

    if (isNaN(segundos)) {

        return "0:00";

    }

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return (
        minutos +
        ":" +
        segundosRestantes
            .toString()
            .padStart(2, "0")
    );

}


/* =========================================
   VOLUMEN INICIAL
========================================= */

audio.volume = 0.8;


/* =========================================
   CARGAR PRIMERA CANCIÓN
========================================= */

cargarCancion(indiceActual);
