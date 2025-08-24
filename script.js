// ===============================
// Script principal Branding
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

/**
 * @fileoverview Ce script gère la logique de la page de contact.
 * La fonction sendEmail() récupère les données du formulaire et crée un lien mailto: pour ouvrir le client de messagerie de l'utilisateur.
 * Note : Cette méthode ne fonctionne que si le client de messagerie est configuré.
 */

function sendEmail() {
    // Récupération des éléments du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // Validation simple pour s'assurer que les champs requis ne sont pas vides
    if (!name || !email || !service || !message) {
        // CORRECTION : Remplacement de alert() par console.error() pour éviter de bloquer l'interface
        console.error('Erreur: Veuillez remplir tous les champs du formulaire.');
        return;
    }

    // Encodage des données pour les inclure dans l'URL mailto:
    const subject = encodeURIComponent(`Demande de contact - ${service}`);
    const body = encodeURIComponent(`Bonjour,

Voici les informations de contact :
Nom : ${name}
Email : ${email}
Demande : ${service}

Message :
${message}`);

    // Construction du lien mailto: avec les données encodées
    // REMPLACEZ 'votre.adresse@email.com' par votre adresse email de destination
    const mailtoLink = `mailto:morgane.berge@gmail.com?subject=${subject}&body=${body}`;

    // Ouverture de la fenêtre de messagerie
    window.location.href = mailtoLink;
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
