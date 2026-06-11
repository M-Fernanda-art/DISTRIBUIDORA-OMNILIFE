// SECTION 2 - CARDS CAROUSEL

const track = document.querySelector(".contenedorCards");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const cards = document.querySelectorAll(".card");

const cardWidth = 325; 

const cardsVisibles = 4;

let posicionActual = 0;

// NEXT

nextBtn.addEventListener("click", () => {

    if (posicionActual < cards.length - cardsVisibles) {

        posicionActual++;

        track.style.transform =
            `translateX(-${posicionActual * cardWidth}px)`;
    }
});

// PREV

prevBtn.addEventListener("click", () => {

    if (posicionActual > 0) {

        posicionActual--;

        track.style.transform =
            `translateX(-${posicionActual * cardWidth}px)`;
    }
});

