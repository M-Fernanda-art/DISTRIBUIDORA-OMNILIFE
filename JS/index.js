// SECTION 2 - CARDS CAROUSEL

const track = document.querySelector(".contenedorCards-track");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const cards = document.querySelectorAll(".card");

const cardWidth = 304; 

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

