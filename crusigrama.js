const pistas = {

    1: "Vampiro protagonista de una famosa novela de terror escrita por Bram Stoker.",

    2: "Apellido del famoso escritor estadounidense Edgar Allan.",

    3: "Apellido del personaje principal de El extraño caso del Dr. Jekyll y Mr. Hyde.",

    4: "Término relacionado con un estilo de literatura de terror caracterizado por ambientes oscuros y misteriosos.",

    5: "Novela de Stephen King sobre una joven con poderes telequinéticos.",

    6: "Apellido del famoso personaje Hannibal, protagonista de varias novelas de Thomas Harris.",

    7: "Palabra relacionada con una historia o relato de estilo gótico."

};


const palabras = {

    1: "DRACULA",
    2: "POE",
    3: "HYDE",
    4: "GOTHIC",
    5: "CARRIE",
    6: "LECTER",
    7: "RAVEN"

};


const mapa = {

    1: [
        [160,0],
        [160,32],
        [160,64],
        [160,96],
        [160,128],
        [160,160],
        [160,192]
    ],

    2: [
        [32,64],
        [32,96],
        [32,128]
    ],

    3: [
        [96,96],
        [96,128],
        [96,160],
        [96,192]
    ],

    4: [
        [0,96],
        [32,96],
        [64,96],
        [96,96],
        [128,96],
        [160,96]
    ],

    5: [
        [96,32],
        [128,32],
        [160,32],
        [192,32],
        [224,32],
        [256,32]
    ],

    6: [
        [160,160],
        [192,160],
        [224,160],
        [256,160],
        [288,160],
        [320,160]
    ],

    7: [
        [288,64],
        [288,96],
        [288,128],
        [288,160],
        [288,192]
    ]

};


const casillasPista =
    document.querySelectorAll(".casilla.pista");

const popup =
    document.getElementById("popupPista");

const titulo =
    document.getElementById("tituloPista");

const texto =
    document.getElementById("textoPista");

const cerrar =
    document.getElementById("cerrarPista");

const circulo =
    document.getElementById("circuloLetras");


let palabraActual = "";

let numeroActual = null;

let posicionActual = 0;


// =====================================
// ABRIR PISTA
// =====================================

casillasPista.forEach(casilla => {

    casilla.addEventListener("click", () => {

        const numero =
            casilla.dataset.pista;

        numeroActual = numero;

        titulo.textContent =
            "Pista " + numero;

        texto.textContent =
            pistas[numero];

        popup.style.display =
            "block";

        mostrarLetras(
            palabras[numero]
        );

    });

});


// =====================================
// CERRAR PISTA
// =====================================

cerrar.addEventListener("click", () => {

    popup.style.display = "none";

});


// =====================================
// MOSTRAR LETRAS
// =====================================

function mostrarLetras(palabra) {

    circulo.innerHTML = "";

    palabraActual = palabra;

    posicionActual = 0;

    const cantidad =
        palabra.length;


    palabra.split("").forEach(
        (letra, indice) => {

            const boton =
                document.createElement("button");

            boton.textContent =
                letra;

            boton.addEventListener(
                "click",
                () => {

                    colocarLetra(letra);

                }
            );


            circulo.appendChild(boton);


            const angulo =
                (360 / cantidad) *
                indice - 90;

            const radio = 42;


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

function colocarLetra(letra) {

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


    // Si no corresponde
    if (
        letra !== letraCorrecta
    ) {

        return;

    }


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


    // Buscar la casilla
    // correspondiente
    const casillas =
        document.querySelectorAll(
            ".casilla"
        );


    casillas.forEach(
        casilla => {

            if (
                casilla.style.top ===
                `${top}px` &&

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


    posicionActual++;


    // Palabra completada
    if (
        posicionActual ===
        palabraActual.length
    ) {

        console.log(
            "Palabra completada:",
            palabraActual
        );

    }

}