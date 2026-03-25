      // Cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  });
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .faq-q, .disco-track').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', ''));
  });

        // countdown
        function countdown() {

            const target = Date.UTC(2026, 3, 4, 17, 0, 0);
            const now = Date.now()
            const diff = target - now;
            const days = document.getElementById('days');
            const hours = document.getElementById('hours');
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');

            if (diff <= 0) {
                [days, hours, minutes, seconds].forEach(el => el.textContent = '00');
                return
            }

            days.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0')
            hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0')
            minutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0')
            seconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0')
        }

        countdown()
        setInterval(countdown, 1000);

        const btn = document.getElementById("menu-btn");
        const menu = document.getElementById("menu");



        // 1. Ouvrir/Fermer avec le bouton et changer l'icône
        btn.addEventListener("click", (event) => {
            menu.classList.toggle("hidden");
            menu.classList.toggle("flex");

            // Alterne entre l'icône "burger" et l'icône "croix"
            if (menu.classList.contains("hidden")) {
                btn.classList.remove("fa-xmark");
                btn.classList.add("fa-bars");
            } else {
                btn.classList.remove("fa-bars");
                btn.classList.add("fa-xmark");
            }

            // Empêche le clic sur le bouton de déclencher la fermeture globale (voir point 2)
            event.stopPropagation();
        });

        // 2. Fermer le menu si on clique n'importe où ailleurs sur la page
        document.addEventListener("click", (event) => {
            // Si le menu est ouvert ET qu'on clique en dehors du menu
            if (!menu.classList.contains("hidden") && !menu.contains(event.target)) {
                menu.classList.add("hidden");
                menu.classList.remove("flex");
                // On remet l'icône burger
                btn.classList.remove("fa-xmark");
                btn.classList.add("fa-bars");
            }
        });

        // 3. Fermer le menu quand on clique sur un lien (ACCUEIL, ARTISTE, etc.)
        const menuLinks = menu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.add("hidden");
                menu.classList.remove("flex");
                btn.classList.remove("fa-xmark");
                btn.classList.add("fa-bars");
            });
        });

        // Fonction pour gérer la lecture manuelle (clic sur les boutons)
        function toggleAudio(audioId, element) {
            const audio = document.getElementById(audioId);
            const icon = element.querySelector('i');

            // Arrêter tous les autres sons et remettre leurs icônes en "Play"
            document.querySelectorAll('audio').forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    const otherIcon = otherAudio.parentElement.querySelector('i');
                    if (otherIcon) {
                        otherIcon.classList.remove('fa-pause');
                        otherIcon.classList.add('fa-play');
                    }
                }
            });

            // Lire ou mettre en pause le son actuel
            if (audio.paused) {
                audio.play();
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            } else {
                audio.pause();
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            }

            // Remettre l'icône Play à la fin du morceau
            audio.onended = () => {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            };
        }

        // Lancement automatique du premier son au chargement ou au premier clic
        window.addEventListener('load', () => {
            const firstTrackContainer = document.querySelector('#first-track .single');
            const firstAudio = document.getElementById('audio1');

            if (!firstTrackContainer || !firstAudio) return;

            const firstIcon = firstTrackContainer.querySelector('i');

            const startAutoPlay = () => {
                firstAudio.play().then(() => {
                    // Si la lecture réussit, on change l'icône
                    if (firstIcon) {
                        firstIcon.classList.remove('fa-play');
                        firstIcon.classList.add('fa-pause');
                    }
                    // On retire l'écouteur pour ne pas relancer le son 1 à chaque clic
                    window.removeEventListener('click', startAutoPlay);
                }).catch(err => {
                    console.log("Lecture automatique bloquée : en attente d'interaction.");
                });
            };

            // Tente de jouer immédiatement (souvent bloqué par le navigateur)
            startAutoPlay();
            // Force la lecture dès que l'utilisateur touche la page
            window.addEventListener('click', startAutoPlay, { once: true });
        });
    

        
        
        // les Animations

// On attend que le DOM soit prêt
document.addEventListener("DOMContentLoaded", () => {

  gsap.from(".hero-element", {
    duration: 1.6,
    scale: 1.8,             // L'effet de "proximité" (Axe Z simulé)
    filter: "blur(12px)",   // Le flou cinétique
    autoAlpha: 0,           // Gère l'opacité ET la visibilité (évite le flash)
    y: -30,                 // Un léger décalage vertical pour le "poids"
    
    ease: "power4.out",     // Transition ultra-lisse (Premium)
    stagger: 0.15,          // Apparition en cascade
    
    force3D: true,          // Force l'utilisation de la carte graphique (GPU)
    
    // NETTOYAGE : Une fois l'animation finie, on retire les filtres 
    // pour libérer la mémoire du navigateur et garder un texte net.
    onComplete: () => {
      gsap.set(".hero-element", { 
        clearProps: "filter,will-change" 
      });
    }
  });

});

gsap.from(".sponsor-logo", {
  y: 40,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".logos-grid",
    start: "top 90%",   // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
});

gsap.from(".Text-event", {
  x: 40,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    // markers:true,
    trigger: ".event",
    start: "top 70%",   // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
});


gsap.from(".para-event", {
  y: 60,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    // markers:true,
    trigger: ".event",
    start: "top 70%",   // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
});

gsap.from(".time", {
  y: 60,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    // markers:true,
    trigger: ".para-event",
    start: "top 70%",   // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
});

gsap.from(".master", {
      y: 60,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 1,
  stagger: 0.5,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    // markers:true,
    trigger: ".section-master",
    start: "top 50%",   // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
})

gsap.from(".image-master", {
      x: 60,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 1,
  stagger: 1,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    // markers:true,
    trigger: ".image-master",
    start: "top 70%",   // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
})

gsap.from("footer p", {
      x: -60,                // Glisse de 40px vers le haut
  opacity: 0,
  duration: 1,
  stagger: 0.5,         // Petit décalage entre chaque logo
  ease: "power2.out",
  scrollTrigger: {
    // markers:true,
    trigger: "footer",
    start: "top 70%", 
    // Commence quand la grille entre dans l'écran
    toggleActions: "play none none none" 
  }
})
