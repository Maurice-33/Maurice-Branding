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
<!-- JS pour le carrousel, le back-to-top et le menu hamburger -->
        <script>
            // Références aux éléments du DOM
            const mainHeader = document.getElementById("main-header");
            const backToTopButton = document.getElementById("backToTop");
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

            // Fonction pour créer et mettre à jour les points de navigation
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

            // Fonction pour mettre à jour l'état des points
            function updateDots() {
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    if (index === currentSlideIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            // Fonctions pour la navigation avec les flèches
            function prevSlide() {
                currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : slides.length - 1;
                updateCarouselPosition();
            }

            function nextSlide() {
                currentSlideIndex = (currentSlideIndex < slides.length - 1) ? currentSlideIndex + 1 : 0;
                updateCarouselPosition();
            }

            // Gestion des événements tactiles pour le glissement
            carouselContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            carouselContainer.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const deltaX = endX - startX;
                // Définir un seuil de détection du glissement
                const swipeThreshold = 50;

                if (deltaX > swipeThreshold) {
                    // Glissement vers la droite -> image précédente
                    prevSlide();
                } else if (deltaX < -swipeThreshold) {
                    // Glissement vers la gauche -> image suivante
                    nextSlide();
                }

                updateCarouselPosition();
            });

            // Gérer le redimensionnement de la fenêtre pour le carrousel
            window.addEventListener('resize', () => {
                updateCarouselPosition();
            });

            // Ajout des écouteurs d'événements pour les boutons de navigation
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);

            // Script pour le header qui change de couleur et le bouton "back to top" au défilement
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    mainHeader.classList.add("scrolled");
                    backToTopButton.style.display = "block";
                } else {
                    mainHeader.classList.remove("scrolled");
                    backToTopButton.style.display = "none";
                }
            });

            // Initialisation au chargement de la page
            window.onload = function() {
                createDots();
                updateCarouselPosition();
            };

            // Écouteur pour le menu mobile
            const hamburgerMenu = document.querySelector('.hamburger-menu');
            const mobileMenu = document.getElementById('mobile-menu');

            hamburgerMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
            
        </script>
</body>
</html>
