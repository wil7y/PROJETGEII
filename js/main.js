// main.js

const burger = document.getElementById('burger');
const navMenu = document.querySelector('.nav-menu');

// Fonction pour toggler le menu
function toggleMenu() {
  if (navMenu.style.display === 'flex') {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'flex';
  }
}

// Ouvrir/fermer avec clic sur burger
burger.addEventListener('click', () => {
  toggleMenu();
});

// Fermer le menu si clic en dehors (sur mobile)
document.addEventListener('click', (event) => {
  // Vérifie si le clic est en dehors du burger et du menu
  if (
    window.innerWidth <= 768 && // uniquement en mobile
    navMenu.style.display === 'flex' && // menu ouvert
    !navMenu.contains(event.target) && // clic en dehors du menu
    !burger.contains(event.target) // clic en dehors du burger
  ) {
    navMenu.style.display = 'none'; // fermer le menu
  }
});