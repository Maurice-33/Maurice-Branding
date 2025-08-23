// Script pour le bouton "remonter en haut"
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

// 2. Gérer l'ouverture et la fermeture du menu hamburger
    // On sélectionne le bouton hamburger et le menu mobile
    const hamburgerBtn = document.querySelector(".hamburger-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    // On ajoute un écouteur d'événement pour le clic sur le bouton
    hamburgerBtn.addEventListener("click", () => {
        // On bascule la classe 'is-open' sur le menu mobile pour l'afficher ou le cacher
        mobileMenu.classList.toggle("is-open");
    });
});

// NOUVEAU: Script pour ajouter la classe 'scrolled' au header lors du défilement
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Détecte un défilement de plus de 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
