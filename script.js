// ===============================
// Script principal Branding
// ===============================

// On attend que le DOM (Document Object Model) soit entièrement chargé
// avant d'exécuter le script pour s'assurer que tous les éléments HTML existent.
document.addEventListener("DOMContentLoaded", () => {
    // 1. Déclarations des éléments principaux
    const mainHeader = document.getElementById("main-header");
    const backToTopBtn = document.getElementById("backToTop");
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    // 2. Gestion des événements de scroll
    window.addEventListener("scroll", () => {
        // Ajoute ou retire la classe 'scrolled' en fonction de la position du scroll
        mainHeader.classList.toggle("scrolled", window.scrollY > 50);
        // Affiche ou cache le bouton 'retour en haut' si le scroll dépasse 300px
        if (backToTopBtn) {
            backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
        }
    });

    // 3. Gestion du menu mobile (ouverture/fermeture)
    if (hamburgerBtn && mobileMenu) {
        // Au clic sur le bouton hamburger, on bascule la classe 'is-open'
        hamburgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("is-open");
        });
        
        // Ferme le menu mobile si l'utilisateur clique en dehors du menu ou du bouton
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target);
            const isClickOnHamburger = hamburgerBtn.contains(event.target);
            if (!isClickInsideMenu && !isClickOnHamburger) {
                mobileMenu.classList.remove('is-open');
            }
        });
    }

    // ===============================
    // Logique de la page de contact
    // ===============================
    /**
     * Gère la soumission du formulaire de contact en créant un lien mailto:.
     * Note : Cette méthode ne fonctionne que si un client de messagerie est configuré.
     */
    window.sendEmail = function() {
        // Récupération des valeurs des champs du formulaire
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

        // Construction du lien mailto:
        const mailtoLink = `mailto:morgane.berge@gmail.com?subject=${subject}&body=${body}`;

        // Redirection pour ouvrir le client de messagerie
        window.location.href = mailtoLink;
    };


    // ===============================
    // Carrousel Portfolio
    // ===============================
    // Sélection des éléments HTML du carrousel
    const carouselTrack = document.getElementById("carousel-track");
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const dotsContainer = document.getElementById("carousel-dots");
    const carouselContainer = document.getElementById('carousel-container');

    // Variables pour gérer l'état
    let currentIndex = 0;
    let startX = 0;

    // Fonction pour mettre à jour la position du carrousel
    const updateCarousel = () => {
        if (slides.length > 0) {
            const slideWidth = slides[0].clientWidth;
            const newTransformValue = -currentIndex * slideWidth;
            carouselTrack.style.transform = `translateX(${newTransformValue}px)`;
            updateDots();
        }
    };

    // Fonction pour créer les points de navigation (dots)
    const createDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
    };

    // Fonction pour mettre à jour l'état "actif" des points
    const updateDots = () => {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    };

    // Gestion des événements de clic sur les boutons de navigation
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

    // Gestion de la navigation tactile (swipe)
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

    // Gestion du redimensionnement de la fenêtre pour un affichage adaptatif
    window.addEventListener('resize', updateCarousel);

    // Initialisation du carrousel au chargement
    createDots();
    updateCarousel();
});
