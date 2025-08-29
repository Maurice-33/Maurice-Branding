// ===============================
// Script principal Branding
// ===============================

// On attend que le DOM (Document Object Model) soit entièrement chargé
// avant d'exécuter le script pour s'assurer que tous les éléments HTML existent.
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Déclarations des éléments principaux
    const mainHeader = document.querySelector(".main-header"); // Sélecteur par classe plus commun
    const backToTopBtn = document.querySelector(".back-to-top"); // Sélecteur par classe plus commun
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const mobileMenu = document.querySelector(".mobile-nav"); // Utilisation de la classe, car l'ID n'est pas fourni dans le CSS

    // 2. Gestion des événements de scroll
    window.addEventListener("scroll", () => {
        // Ajoute ou retire la classe 'scrolled' en fonction de la position du scroll
        if (mainHeader) {
            mainHeader.classList.toggle("scrolled", window.scrollY > 50);
        }
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

    // Gère le défilement fluide pour les liens de navigation
    document.querySelectorAll('.mobile-nav a, .main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Empêche le comportement de lien par défaut
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // Ferme le menu mobile si un lien est cliqué
            if (mobileMenu && mobileMenu.classList.contains('is-open')) {
                mobileMenu.classList.remove('is-open');
            }
        });
    });

    // ===============================
    // Logique de la page de contact
    // ===============================
    /**
     * Gère la soumission du formulaire de contact en créant un lien mailto:.
     * Note : Cette méthode ne fonctionne que si un client de messagerie est configuré.
     */
    const contactForm = document.getElementById('contact-form'); // Assurez-vous que votre formulaire a cet ID
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Empêche l'envoi du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !service || !message) {
                console.error('Erreur: Veuillez remplir tous les champs du formulaire.');
                return;
            }

            const subject = encodeURIComponent(`Demande de contact - ${service}`);
            const body = encodeURIComponent(`Bonjour,\n\nVoici les informations de contact :\nNom : ${name}\nEmail : ${email}\nDemande : ${service}\n\nMessage :\n${message}`);
            const mailtoLink = `mailto:morgane.berge@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailtoLink;
        });
    }


    // ===============================
    // Carrousel Portfolio
    // ===============================
    const carouselTrack = document.querySelector(".carousel-track");
    const slides = Array.from(document.querySelectorAll(".carousel-slide"));
    const prevBtn = document.querySelector(".carousel-arrow.prev"); // Utilisation des classes CSS
    const nextBtn = document.querySelector(".carousel-arrow.next"); // Utilisation des classes CSS
    const dotsContainer = document.querySelector(".carousel-dots");
    const carouselContainer = document.querySelector('.carousel-container');

    let currentIndex = 0;
    let startX = 0;

    const updateCarousel = () => {
        if (slides.length === 0) return;
        const slideWidth = slides[0].clientWidth;
        const newTransformValue = -currentIndex * slideWidth;
        carouselTrack.style.transform = `translateX(${newTransformValue}px)`;
        updateDots();
    };

    const createDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement("span"); // Utilisation de <span> comme dans le CSS
            dot.classList.add("dot");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        });
    };

    const updateDots = () => {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    };

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
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            } else if (deltaX < -swipeThreshold) {
                currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            }
            updateCarousel();
        });
    }

    // Gestion du redimensionnement de la fenêtre pour un affichage adaptatif
    window.addEventListener('resize', updateCarousel);

    // Initialisation du carrousel au chargement
    if (slides.length > 0) {
        createDots();
        updateCarousel();
    }
});
