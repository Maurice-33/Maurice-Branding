/* Minimal JavaScript for interactions */

// Helper function to get elements
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => el.querySelectorAll(s);

// Selectors for the navigation and toggle button
const nav = $('.btn-group');
const toggle = $('.hamburger-menu');

// Selectors for the header and back-to-top button
const header = $('.main-header');
const backToTopBtn = $('#backToTop');


// Show custom message box
const showMessage = (text) => {
    $('#message-text').textContent = text;
    $('#message-box').style.display = 'flex';
};

// Hide custom message box
const hideMessage = () => {
    $('#message-box').style.display = 'none';
};

// Add listener to close button
$('#close-message').addEventListener('click', hideMessage);

// Toggle mobile navigation menu
toggle.addEventListener('click', () => {
  const open = nav.classList.contains('is-open');
  nav.classList.toggle('is-open');
  toggle.classList.toggle('is-active');
  toggle.setAttribute('aria-expanded', String(!open));
});

// Smooth scroll for anchor links
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if(section){
      e.preventDefault();
      section.scrollIntoView({behavior:'smooth', block:'start'});
      // Close mobile menu on click
      if (window.innerWidth < 768) {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Update year in footer (if you add an element with id="year")
const yearElement = $('#year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Contact form handling
// Option A (recommandé): utiliser un endpoint de formulaire (ex: Formspree) – mettez l'URL ci-dessous.
// Option B (fallback): ouverture d’un mailto si pas d'endpoint.
const FORM_ENDPOINT = ""; // ex: "https://formspree.io/f/xxxxxxx"

$('#contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  if (FORM_ENDPOINT){
    try{
      const res = await fetch(FORM_ENDPOINT, {
        method:'POST',
        headers:{'Accept':'application/json'},
        body: new FormData(e.target)
      });
      if(res.ok){
        showMessage('Merci ! Votre message a bien été envoyé.');
        e.target.reset();
      }else{
        showMessage('Oups, échec de l’envoi. Vous pouvez m’écrire à contact@example.com');
      }
    }catch(err){
      showMessage('Erreur réseau. Contactez-moi à contact@example.com');
    }
  } else {
    const subject = encodeURIComponent('Projet branding');
    const body = encodeURIComponent(
      `Nom: ${data.name || ''}
Email: ${data.email || ''}
Type de demande: ${data.service || ''}

Message:
${data.message || ''}`
    );
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
  }
});

// Fonction pour gérer le comportement au défilement de la page.
window.addEventListener('scroll', () => {
    // Si la position de défilement verticale est supérieure à 50 pixels
    if (window.scrollY > 50) {
      // Ajoute la classe 'scrolled' au header pour changer son style
      header.classList.add('scrolled');
      // Affiche le bouton "remonter en haut"
      backToTopBtn.style.display = 'block';
    } else {
      // Retire la classe 'scrolled' si on est en haut de la page
      header.classList.remove('scrolled');
      // Cache le bouton "remonter en haut"
      backToTopBtn.style.display = 'none';
    }
});
