const pistas = {

    1: "Vampiro protagonista de una famosa novela de terror escrita por Bram Stoker.",

    2: "Apellido del famoso escritor estadounidense Edgar Allan.",

    3: "Apellido del personaje principal de El extraño caso del Dr. Jekyll y Mr. Hyde.",

    4: "Término relacionado con un estilo de literatura de terror caracterizado por ambientes oscuros y misteriosos.",

    5: "Novela de Stephen King sobre una joven con poderes telequinéticos.",

    6: "Apellido del famoso personaje Hannibal, protagonista de varias novelas de Thomas Harris.",

    7: "Palabra relacionada con una historia o relato de estilo gótico.",

    8: "Apellido del famoso escritor estadounidense autor de la novela Carrie."

};


const palabras = {

    1: "DRACULA",

    2: "POE",

    3: "HYDE",

    4: "GOTHIC",

    5: "CARRIE",

    6: "LECTER",

    7: "RAVEN",

    8: "KING"

};


const ordenLetras = {

    1: ["A", "L", "D", "U", "R", "C", "A"],

    2: ["E", "P", "O"],

    3: ["E", "H", "Y", "D"],

    4: ["T", "G", "C", "H", "I", "O"],

    5: ["R", "A", "I", "C", "E", "R"],

    6: ["T", "L", "E", "R", "C", "E"],

    7: ["V", "E", "R", "N", "A"],

    8: ["G", "I", "K", "N"]

};


const mapa = {

    1: [

        [200,0],
        [200,40],
        [200,80],
        [200,120],
        [200,160],
        [200,200],
        [200,240]

    ],

    2: [

        [40,80],
        [40,120],
        [40,160]

    ],

    3: [

        [120,120],
        [120,160],
        [120,200],
        [120,240]

    ],

    4: [

        [0,120],
        [40,120],
        [80,120],
        [120,120],
        [160,120],
        [200,120]

    ],

    5: [

        [120,40],
        [160,40],
        [200,40],
        [240,40],
        [280,40],
        [320,40]

    ],

    6: [

        [200,200],
        [240,200],
        [280,200],
        [320,200],
        [360,200],
        [400,200]

    ],

    7: [

        [360,80],
        [360,120],
        [360,160],
        [360,200],
        [360,240]

    ],

    8: [

        [280,0],
        [280,40],
        [280,80],
        [280,120]

    ]

};


const casillasPista =
    document.querySelectorAll(
        ".casilla.pista"
    );


const popup =
    document.getElementById(
        "popupPista"
    );


const titulo =
    document.getElementById(
        "tituloPista"
    );


const texto =
    document.getElementById(
        "textoPista"
    );


const cerrar =
    document.getElementById(
        "cerrarPista"
    );


const circulo =
    document.getElementById(
        "circuloLetras"
    );


// =====================================
// MENSAJE FINAL
// =====================================

const mensajeFinal =
    document.getElementById(
        "mensajeFinal"
    );


const btnEncuesta =
    document.getElementById(
        "btnEncuesta"
    );


// =====================================
// PALABRAS COMPLETADAS
// =====================================

const palabrasCompletadas =
    new Set();


let palabraActual = "";

let numeroActual = null;

let posicionActual = 0;


// =====================================
// ABRIR PISTA
// =====================================

casillasPista.forEach(
    casilla => {

        casilla.addEventListener(
            "click",
            () => {

                const numero =
                    casilla.dataset.pista;


                numeroActual =
                    numero;


                titulo.textContent =
                    "Pista " + numero;


                texto.textContent =
                    pistas[numero];


                popup.style.display =
                    "block";


                mostrarLetras(
                    palabras[numero]
                );

            }
        );

    }
);


// =====================================
// CERRAR PISTA
// =====================================

cerrar.addEventListener(
    "click",
    () => {

        popup.style.display =
            "none";

    }
);


// =====================================
// MOSTRAR LETRAS
// =====================================

function mostrarLetras(
    palabra
) {

    circulo.innerHTML = "";


    palabraActual =
        palabra;


    posicionActual =
        0;


    const letrasDesordenadas =
        ordenLetras[numeroActual];


    const cantidad =
        letrasDesordenadas.length;


    letrasDesordenadas.forEach(
        (letra, indice) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.textContent =
                letra;


            boton.addEventListener(
                "click",
                () => {

                    colocarLetra(
                        letra,
                        boton
                    );

                }
            );


            circulo.appendChild(
                boton
            );


            const angulo =
                (360 / cantidad) *
                indice - 90;


            const radio =
                47;


            const x =
                50 +
                Math.cos(
                    angulo *
                    Math.PI /
                    180
                ) *
                radio;


            const y =
                50 +
                Math.sin(
                    angulo *
                    Math.PI /
                    180
                ) *
                radio;


            boton.style.left =
                `${x}%`;


            boton.style.top =
                `${y}%`;


            boton.style.transform =
                "translate(-50%, -50%)";

        }
    );

}


// =====================================
// COLOCAR LETRA
// =====================================

function colocarLetra(
    letra,
    boton
) {

    if (!palabraActual) {

        return;

    }


    if (
        posicionActual >=
        palabraActual.length
    ) {

        return;

    }


    const letraCorrecta =
        palabraActual[
            posicionActual
        ];


    // =================================
    // LETRA INCORRECTA
    // =================================

    if (
        letra !== letraCorrecta
    ) {

        circulo.classList.add(
            "error"
        );

        return;

    }


    // =================================
    // LETRA CORRECTA
    // =================================

    circulo.classList.remove(
        "error"
    );


    const posicion =
        mapa[numeroActual][
            posicionActual
        ];


    if (!posicion) {

        return;

    }


    const top =
        posicion[0];


    const left =
        posicion[1];


    const casillas =
        document.querySelectorAll(
            ".casilla"
        );


    casillas.forEach(
        casilla => {

            if (

                casilla.style.top ===
                `${top}px`

                &&

                casilla.style.left ===
                `${left}px`

            ) {

                casilla.textContent =
                    letra;

                casilla.classList.add(
                    "rellena"
                );

            }

        }
    );


    // =================================
    // ELIMINAR LETRA
    // =================================

    boton.remove();


    posicionActual++;


    // =================================
    // PALABRA COMPLETADA
    // =================================

    if (
        posicionActual ===
        palabraActual.length
    ) {

        console.log(
            "Palabra completada:",
            palabraActual
        );


        // Guardar palabra completada

        palabrasCompletadas.add(
            numeroActual
        );


        // =================================
        // COMPROBAR LAS 8 PALABRAS
        // =================================

        comprobarCrucigrama();

    }

}


// =====================================
// COMPROBAR SI TODO ESTÁ COMPLETO
// =====================================

function comprobarCrucigrama() {

    if (
        palabrasCompletadas.size === 8
    ) {

        popup.style.display =
            "none";


        mensajeFinal.style.display =
            "flex";

    }

}


// =====================================
// BOTÓN DE ENCUESTA
// =====================================

btnEncuesta.addEventListener(
    "click",
    () => {

        window.location.href =
            "https://itesm.co1.qualtrics.com/jfe/form/SV_1MP6ja0wfu9JlnU?IDExp=225";

    }
);


// =====================================
// BLOQUEAR ZOOM Y GESTOS DE ZOOM
// =====================================

// Bloquear pinch zoom

document.addEventListener(
    "touchmove",
    function(event) {

        if (
            event.touches.length > 1
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);


// Bloquear doble toque para hacer zoom

let ultimoToque = 0;


document.addEventListener(
    "touchend",
    function(event) {

        const ahora =
            Date.now();


        if (
            ahora - ultimoToque <= 300
        ) {

            event.preventDefault();

        }


        ultimoToque =
            ahora;

    },
    {
        passive: false
    }
);
