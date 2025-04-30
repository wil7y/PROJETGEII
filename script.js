
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
     
     

