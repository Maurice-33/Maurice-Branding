/* Minimal JavaScript for interactions */
const $ = (s, el=document) => el.querySelector(s);

const nav = $('.site-nav');
const toggle = $('.menu-toggle');

toggle.addEventListener('click', () => {
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
  toggle.setAttribute('aria-expanded', String(!open));
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if(section){
      e.preventDefault();
      section.scrollIntoView({behavior:'smooth', block:'start'});
      if (window.innerWidth < 860){ nav.style.display='none'; toggle.setAttribute('aria-expanded','false'); }
    }
  });
});

// Update year
$('#year').textContent = new Date().getFullYear();

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
        alert('Merci ! Votre message a bien été envoyé.');
        e.target.reset();
      }else{
        alert('Oups, échec de l’envoi. Vous pouvez m’écrire à contact@example.com');
      }
    }catch(err){
      alert('Erreur réseau. Contactez-moi à contact@example.com');
    }
  } else {
    const subject = encodeURIComponent('Projet branding');
    const body = encodeURIComponent(
      `Nom: ${data.name || ''}
Email: ${data.email || ''}
Budget: ${data.budget || ''}
Délais: ${data.timeline || ''}

Message:
${data.message || ''}`
    );
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
  }
});
