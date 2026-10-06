/* =========================================
   READ OR TRICK
   LOGIN + ACCESO AL JUEGO
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const btnLoginElibro =
    document.getElementById("btnLoginElibro");

const btnContinuarLogin =
    document.getElementById("btnContinuarLogin");

const btnIniciarJuego =
    document.getElementById("btnIniciarJuego");


/* =========================================
   LIBROS PARA PRUEBAS
========================================= */

const librosLogin = [

    "https://elibro.net/es/ereader/consorcioitesm/75964",

    "https://elibro.net/es/ereader/consorcioitesm/31439",

    "https://elibro.net/es/ereader/consorcioitesm/21111",

    "https://elibro.net/es/ereader/consorcioitesm/36085",

    "https://elibro.net/es/ereader/consorcioitesm/304725"

];


/* =========================================
   ABRIR LIBRO
========================================= */

btnLoginElibro.addEventListener(
    "click",
    function () {

        const indiceAleatorio =
            Math.floor(
                Math.random() *
                librosLogin.length
            );

        const libroAleatorio =
            librosLogin[indiceAleatorio];


        btnLoginElibro.href =
            libroAleatorio;


        btnLoginElibro.style.display =
            "none";


        btnContinuarLogin.style.display =
            "block";

    }
);


/* =========================================
   REGRESAR DESPUÉS DEL LOGIN
========================================= */

btnContinuarLogin.addEventListener(
    "click",
    function () {

        btnContinuarLogin.style.display =
            "none";


        btnLoginElibro.innerHTML =
            "🟢 Sesión iniciada";


        btnLoginElibro.style.display =
            "block";


        btnLoginElibro.style.opacity =
            "0.7";


        btnLoginElibro.style.pointerEvents =
            "none";


        btnIniciarJuego.disabled =
            false;


        btnIniciarJuego.innerHTML =
            "🎮 JUGAR";

    }
);


/* =========================================
   IR AL CRUCIGRAMA
========================================= */

btnIniciarJuego.addEventListener(
    "click",
    function () {

        sessionStorage.setItem(
            "crucigramaIniciado",
            "true"
        );


        window.location.href =
            "crusigrama.html";

    }
);
