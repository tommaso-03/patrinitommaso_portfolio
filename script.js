document.addEventListener('DOMContentLoaded', (event) => {
    
    // ===========================================
    // 1. LOGICA MENU MOBILE (Toggle Menu/X)
    // ===========================================
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            // Togglie la classe per mostrare/nascondere il menu
            mobileNav.classList.toggle('mobile-nav-hidden');
            mobileNav.classList.toggle('mobile-nav-visible');

            // Cambia il testo del toggle da "Menu" a "X" (o viceversa)
            if (mobileNav.classList.contains('mobile-nav-visible')) {
                mobileMenuToggle.textContent = 'X'; 
            } else {
                mobileMenuToggle.textContent = 'Menu'; 
            }
        });
    }
});







// =======================================
// 2. LOGICA CREDITS TOGGLE (Show/Hide)
// =======================================
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('credits-toggle');
    const content = document.getElementById('credits-content');

    if (toggleButton && content) {
        toggleButton.addEventListener('click', () => {
            // Toggle della classe 'show' sul contenuto
            content.classList.toggle('show');
            // Toggle della classe 'active' sul titolo (per ruotare la freccia)
            toggleButton.classList.toggle('active');
        });
    }

    // Qui andranno anche le altre logiche (es. menu mobile)

});








// =======================================
// 3. LOGICA CURSORE PERSONALIZZATO
// =======================================
document.addEventListener('DOMContentLoaded', () => {
    
    const customCursor = document.querySelector('.custom-cursor');

    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            // Aggiorna la posizione del cursore personalizzato
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });
    }

    // NUOVA LOGICA: Interazione con elementi cliccabili
    const interactiveElements = document.querySelectorAll('a, .project-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.classList.add('cursor-grow');
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.classList.remove('cursor-grow');
            }
        });
    });


    // ... (Logica Credits Toggle, Menu Mobile, o altre funzioni JS) ...

});









document.addEventListener('DOMContentLoaded', function() {
    
    // ... (eventuali altri script come cursori o menu mobili) ...

    const backToProjectsLink = document.querySelector('.back-to-projects-link');
    const footer = document.querySelector('footer');

    // Margine desiderato tra il link e il bordo superiore del footer
    const MARGIN_TOP_FOOTER = 15; 
    // Il margine fisso che il link ha dal fondo della viewport (dal CSS: bottom: 15px)
    const MARGIN_BOTTOM_FIXED = 15;

    if (backToProjectsLink && footer) {
        window.addEventListener('scroll', checkFooterOverlap);
        window.addEventListener('resize', checkFooterOverlap);
        
        function checkFooterOverlap() {
            // Se non è visualizzato (mobile), resettiamo e usciamo
            if (window.getComputedStyle(backToProjectsLink).display === 'none') {
                backToProjectsLink.style.transform = 'translateY(0)';
                return;
            }

            // 1. Posizione del bordo superiore del footer rispetto alla viewport (top)
            const footerTop = footer.getBoundingClientRect().top;
            
            // 2. Calcola dove si trova il fondo del link quando è fisso (es: 15px da sotto)
            // window.innerHeight è l'altezza della viewport.
            // linkFixedLineY è la coordinata Y del fondo del link nella viewport.
            const linkFixedLineY = window.innerHeight - MARGIN_BOTTOM_FIXED;
            
            // 3. Calcola dove DEVE fermarsi il fondo del link per mantenere 20px dal footer.
            // (Posizione del footer top) - (Margine di 20px)
            const targetLineY = footerTop - MARGIN_TOP_FOOTER;
            
            // 4. Calcola l'invasione/overlap: di quanto la posizione fissa del link (linkFixedLineY) 
            // è scesa sotto la linea target (targetLineY).
            const overlapDistance = linkFixedLineY - targetLineY;
            
            // Se overlapDistance > 0, significa che la posizione fissa è più in basso della linea target
            if (overlapDistance > 0) {
                // Lo spostamento in alto è esattamente la distanza di invasione
                // Usiamo Math.max per evitare valori negativi che farebbero scendere il link
                backToProjectsLink.style.transform = `translateY(-${Math.max(0, overlapDistance)}px)`;
            } else {
                // Non c'è invasione, rimane nella sua posizione fissa (translateY(0))
                backToProjectsLink.style.transform = 'translateY(0)';
            }
        }
        
        // Esegui il check iniziale al caricamento della pagina
        checkFooterOverlap();
    }
});