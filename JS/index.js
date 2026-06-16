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



// SECTION 3 - CARDS CAROUSEL

const track = document.querySelector(".contenedorMakeup-track");
const dots = document.querySelectorAll(".dot");
const card = document.querySelector(".makeupCard");

const cardWidth = card.offsetWidth + 5; 
const cardsPorVista = 5;

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {

        dots.forEach(d => d.classList.remove("activo"));
        dot.classList.add("activo");

        track.style.transform = `translateX(-${index * cardWidth * cardsPorVista}px)`;
    });
});