document.querySelectorAll('.contenu-a div').forEach((element) => {
    element.addEventListener('click', function() {
        this.classList.toggle('active'); // Activer ou désactiver la classe active au tap
    });
});

document.getElementById("star").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    const target = document.getElementById("cont");
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Position de la section cible
    const startPosition = window.pageYOffset; // Position actuelle
    const distance = targetPosition - startPosition; // Distance à parcourir
    const duration = 1000; // Durée du défilement en millisecondes
    let startTime = null;
    
    // Afficher les éléments au début
    document.getElementById("contenu").style.display = 'flex';
    document.getElementById("contenu2").style.display = 'flex';

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Progrès de l'animation (0 à 1)
        const ease = easeInOutQuad(progress); // Fonction d'accélération
        window.scrollTo(0, startPosition + (distance * ease)); // Défilement

        // Continue l'animation si elle n'est pas encore terminée
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            // Changer la position de défilement à la fin
            window.scrollTo(0, 0); // Se déplacer vers le haut de la page

            // Masquer l'élément 'hero' une fois le défilement terminé
            document.getElementById("hero").style.display = 'none';
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Fonction d'accélération
    }

    requestAnimationFrame(animation); // Démarre l'animation
});




let clickCount = 0; // Variable pour compter les clics

document.getElementById("btn").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton

    clickCount++; // Incrémenter le compteur de clics à chaque clic

    if (clickCount === 1) {
        const currentScrollPosition = window.pageYOffset;

        // 2. Rendre les sections 'contenu' et 'contenu2' invisibles (si elles existent)
        
        // 3. Rendre 'contenu3' visible
        
        const contenu3 = document.getElementById("contenu3");
        const contenu2 = document.getElementById("contenu2");
        contenu3.style.display = 'block';
        const contenu4 = document.getElementById("contenu4");
        contenu4.style.display = 'block';
        const footer = document.getElementById("footer");
        footer.style.display = 'block';
    
        // 4. Obtenir la position de la section 'contenu3'
        const targetPosition = contenu2.getBoundingClientRect().top + window.pageYOffset;
    
        // 5. Animation de défilement en douceur vers 'contenu3'
        const duration = 1000; // Durée de l'animation en millisecondes
        const startPosition = currentScrollPosition;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        function animationScroll(currentTime) {
            
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Progrès de l'animation de 0 à 1
            const ease = easeInOutQuad(progress); // Fonction d'accélération
            window.scrollTo(0, startPosition + (distance * ease)); // Défilement en douceur
            if (progress < 1) {
                requestAnimationFrame(animationScroll); // Continue l'animation
            } else {
                 // Changer la position de défilement à la fin
            window.scrollTo(0, 0); // Se déplacer vers le haut de la page
                // Masquer l'élément 'hero' une fois le défilement terminé
                document.getElementById("contenu").style.display = 'none';
                document.getElementById("h3").textContent = "Perder pas plus de temps !!!"; // Changer le texte de h3o
                document.getElementById("btn").textContent = "Créez votre compte"; // Changer le texte du bouton
    
        }}
    
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Fonction pour adoucir le défilement
        }
    
        requestAnimationFrame(animationScroll);

        // CHANGER LE TEXTE DE L'ID H3O ET LE TEXTE DU BOUTON

    } else if (clickCount === 2) {
        // DEUXIÈME CLIC: Rediriger vers une nouvelle page

        // Ouvrir une nouvelle page (login1.html) dans un nouvel onglet
        window.open('/V1/main/login.html', '_self');
    }
});


