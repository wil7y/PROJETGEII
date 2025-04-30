document.querySelectorAll('.question h3').forEach(q => {
    q.onclick = () => {
      const p = q.nextElementSibling;
      p.style.display = p.style.display === 'block' ? 'none' : 'block';
    };
  });



    function typeWriter(element, text, speed = 200) {
      let i = 0;
      element.innerHTML = '';
      const interval = setInterval(() => {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }
    
    // Exécuter après que le DOM est chargé
    document.addEventListener('DOMContentLoaded', () => {
      const el = document.querySelector('.typewriter');
      const txt = el.getAttribute('data-text');
      typeWriter(el, txt, 200);
    });
     // Sélectionner éléments
const burger = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burger.onclick = () => {
  navLinks.classList.toggle('open');
  // Animation du burger (optionnel)
  burger.classList.toggle('active');
};

// Fermer le menu si clic en dehors
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !burger.contains(e.target)) {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  }
});

