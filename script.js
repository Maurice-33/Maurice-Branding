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
    const mailtoLink = `mailto:morgane.berge@gmail.com?subject=${subject}&body=${body}`;

    // Ouverture de la fenêtre de messagerie
    window.location.href = mailtoLink;
}


// ===============================
// Carrousel Portfolio
// ===============================
// On attend que le DOM (Document Object Model) soit entièrement chargé
// avant d'exécuter le script pour s'assurer que tous les éléments HTML existent.
document.addEventListener("DOMContentLoaded", () => {
    // 1. Sélection des éléments HTML nécessaires
    const carouselTrack = document.getElementById("carousel-track");
    // Utilisation de Array.from pour s'assurer que 'slides' est un tableau
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const dotsContainer = document.getElementById("carousel-dots");

    // Variables pour gérer l'état du carrousel
    let currentIndex = 0; // Index de la diapositive actuellement affichée
    let startX = 0; // Position de départ pour la navigation tactile

    // 2. Fonction pour mettre à jour la position du carrousel
    // en fonction de l'index actuel.
    const updateCarousel = () => {
        // Vérifie si le carrousel a des diapositives
        if (slides.length > 0) {
            const slideWidth = slides[0].clientWidth; // Largeur d'une diapositive
            // Calcule le décalage horizontal (en pixels)
            // pour positionner la bonne diapositive.
            const newTransformValue = -currentIndex * slideWidth;
            // Applique la transformation CSS pour déplacer le carrousel.
            carouselTrack.style.transform = `translateX(${newTransformValue}px)`;

            // Met à jour les points de navigation pour indiquer la diapositive active.
            updateDots();
        }
    };

    // 3. Fonction pour créer les points de navigation
    const createDots = () => {
        dotsContainer.innerHTML = ''; // Nettoie les points existants pour éviter les doublons
        slides.forEach((_, index) => {
            // Crée un élément bouton pour chaque diapositive.
            const dot = document.createElement("button");
            dot.classList.add("dot");
            // Ajoute un écouteur d'événement pour naviguer vers la diapositive correspondante.
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
            // Ajoute le point au conteneur des points.
            dotsContainer.appendChild(dot);
        });
    };

    // 4. Fonction pour mettre à jour l'état "actif" des points de navigation
    const updateDots = () => {
        // Sélectionne tous les points.
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            // Retire la classe 'active' de tous les points.
            dot.classList.remove("active");
            // Ajoute la classe 'active' au point correspondant à l'index actuel.
            if (index === currentIndex) {
                dot.classList.add("active");
            }
        });
    };

    // 5. Gestion des événements de clic sur les boutons de navigation
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateCarousel();
        });
    }

    // 6. Gestion de la navigation tactile
    const carouselContainer = document.getElementById('carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;
            const swipeThreshold = 50;

            if (deltaX > swipeThreshold) {
                // Balayage vers la droite (précédent)
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            } else if (deltaX < -swipeThreshold) {
                // Balayage vers la gauche (suivant)
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            }
            updateCarousel();
        });
    }

    // 7. Gestion du redimensionnement de la fenêtre
    // Recalcule la largeur de la diapositive pour s'adapter à la nouvelle taille de l'écran.
    window.addEventListener('resize', updateCarousel);

    // Initialisation du carrousel au chargement
    createDots(); // Crée les points au démarrage
    updateCarousel(); // Affiche la première diapositive
});
