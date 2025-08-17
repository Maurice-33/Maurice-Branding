// Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {

  // Récupérer tous les éléments nécessaires du DOM
  const mainHeader = document.getElementById('main-header');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  // Note: j'ai utilisé 'site-nav' pour être cohérent avec le fichier HTML de tarifs
  const navButtons = document.getElementById('site-nav'); 
  const backToTopButton = document.getElementById('back-to-top');

  // Gérer le clic sur l'icône du menu hamburger pour afficher/masquer la navigation
  if (hamburgerMenu && navButtons) {
    hamburgerMenu.addEventListener('click', () => {
      // Basculer la classe 'is-active' pour l'animation en "X"
      hamburgerMenu.classList.toggle('is-active');
      // Basculer la classe 'is-open' pour afficher/masquer le menu de navigation
      navButtons.classList.toggle('is-open');
    });
  }

  // Gérer le défilement de la page pour le header et le bouton "Retour en haut"
  window.addEventListener('scroll', () => {
    // Ajouter/retirer la classe 'scrolled' sur le header pour l'ombre
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
    
    // Afficher le bouton 'Retour en haut' si le défilement est supérieur à 300px
    if (backToTopButton) {
      if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    }
  });

  // Gérer le clic sur le bouton "Retour en haut" pour un défilement fluide
  if (backToTopButton) {
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
