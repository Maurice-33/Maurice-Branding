// ===============================
// Script principal Apex Motorsports
// ===============================

// 1. Bouton "remonter en haut"
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

// 2. Menu hamburger (ouverture/fermeture)
const hamburgerBtn = document.querySelector(".hamburger-menu");
const mobileMenu = document.getElementById("mobile-menu");

if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("is-open");
    });
}

// 3. Effet scroll sur le header
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { 
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ===============================
// Carrousel Portfolio
// ===============================
const carouselContainer = document.getElementById('carousel-container');
const carouselTrack = document.getElementById('carousel-track');
const carouselDots = document.getElementById('carousel-dots');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let currentSlideIndex = 0;
let startX = 0;

// Fonction pour mettre à jour la position du carrousel
function updateCarouselPosition() {
    if (slides.length > 0) {
        const slideWidth = slides[0].offsetWidth;
        carouselTrack.style.transform = 'translateX(' + (-slideWidth * currentSlideIndex) + 'px)';
        updateDots();
    }
}

// Fonction pour créer les points de navigation
function createDots() {
    carouselDots.innerHTML = '';
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentSlideIndex = index;
            updateCarouselPosition();
        });
        carouselDots.appendChild(dot);
    });
}

// Fonction pour mettre à jour les points actifs
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Navigation flèches
function prevSlide() {
    currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : slides.length - 1;
    updateCarouselPosition();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex < slides.length - 1) ? currentSlideIndex + 1 : 0;
    updateCarouselPosition();
}

// Navigation tactile
if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;
        const swipeThreshold = 50;

        if (deltaX > swipeThreshold) {
            prevSlide();
        } else if (deltaX < -swipeThreshold) {
            nextSlide();
        }
    });
}

// Resize → recalcul largeur
window.addEventListener('resize', updateCarouselPosition);

// Events sur flèches
if (prevButton) prevButton.addEventListener('click', prevSlide);
if (nextButton) nextButton.addEventListener('click', nextSlide);

// Initialisation
window.addEventListener('load', () => {
    createDots();
    updateCarouselPosition();
});
