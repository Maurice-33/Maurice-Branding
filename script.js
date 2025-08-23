// Script pour le bouton "remonter en haut"
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

// Script pour le menu hamburger
const hamburger = document.querySelector('.hamburger-menu');
const navMenu = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
});

navMenu.addEventListener('click', () => {
    hamburger.classList.remove('is-active');
    navMenu.classList.remove('is-open');
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
