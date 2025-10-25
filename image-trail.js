// file: image-trail.js

document.addEventListener('DOMContentLoaded', (event) => {
    
    // ===========================================
    // LOGICA IMAGE TRAIL (Sulle coordinate del mouse)
    // ===========================================
    
    const images = [
    // Immagini che avevi fornito e confermate
    '/assets/images/cover/cover-ageusia.jpg',
    '/assets/images/projects/ageusia/ageusia-01.jpg',
    '/assets/images/cover/cover-beazley.jpg',
    '/assets/images/projects/beazley/beazley-02.jpg',
    '/assets/images/projects/beazley/beazley-04.jpg',
    '/assets/images/projects/mtp/mtp-00.jpg',
    '/assets/images/projects/mtp/mtp-09.jpg',
    '/assets/images/cover/cover-brutalism.jpg',
    '/assets/images/cover/cover-cometa.jpg',
    '/assets/images/cover/cover-designweek.jpg',
    '/assets/images/projects/designweek/designweek-00.jpg',
    '/assets/images/projects/designweek/designweek-08.jpg',
    '/assets/images/projects/designweek/designweek-23.jpg',
    '/assets/images/cover/cover-lanzarote.jpg',
    '/assets/images/projects/lanzarote/lanzarote-00.jpg',
    '/assets/images/projects/lanzarote/lanzarote-13.jpg',
    '/assets/images/projects/lanzarote/lanzarote-29.jpg',
    '/assets/images/projects/pagani/pagani-04.jpg',
    '/assets/images/cover/cover-exnova.jpg',
    '/assets/images/projects/exnova/exnova-13.jpg',
    '/assets/images/cover/cover-sexting.jpg',
    '/assets/images/projects/sextingcoercion/sexting-00.jpg',
    '/assets/images/cover/cover-urban.jpg',
    '/assets/images/cover/cover-views.jpg',
    '/assets/images/projects/views/views-02.jpg',
    '/assets/images/projects/views/views-19.jpg',
    '/assets/images/cover/cover-oppureno.jpg',
    '/assets/images/projects/oppureno/oppureno-07.png',
    '/assets/images/cover/cover-letmein.jpg',
    '/assets/images/projects/letmein/letmein-04.jpg',         
    '/assets/images/cover/cover-rewind.jpg',
    '/assets/images/projects/rewind/rewind-02.jpg',          
    '/assets/images/projects/streetframes/streetframes-00.jpg',
    '/assets/images/projects/streetframes/streetframes-14.jpg',

];

    const trailContainer = document.getElementById('image-trail-container');
    if (!trailContainer) {
        return; 
    } 

    let imageIndex = 0;
    let lastX = 0;
    let lastY = 0;
    const threshold = 100; // Distanza minima per attivare la prossima immagine
    const durationVisible = 800; // Durata di visibilità prima di scomparire (in ms)
    const navbarHeightThreshold = 140; // SOGLIA: L'effetto si attiva solo sotto i 140px dall'alto

    // 1. Crea le immagini e le aggiunge al DOM
    const trailImages = images.map(url => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('trail-image');
        img.style.opacity = 0; 
        trailContainer.appendChild(img);
        return img;
    });

    // 2. Listener per il movimento del mouse
    document.addEventListener('mousemove', (e) => {
        
        // CONTROLLO DI SOGLIA CRUCIALE: se il mouse è sopra la navbar, non fare nulla.
        if (e.clientY < navbarHeightThreshold) {
            lastX = e.clientX;
            lastY = e.clientY;
            return; 
        }
        
        // Calcola la distanza solo se il mouse è sotto la navbar
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > threshold) {
            
            lastX = e.clientX;
            lastY = e.clientY;

            const currentImage = trailImages[imageIndex];
            
            if (!currentImage) return;

            currentImage.style.left = `${e.clientX - currentImage.offsetWidth / 2}px`;
            currentImage.style.top = `${e.clientY - currentImage.offsetHeight / 2}px`;
            
            currentImage.style.opacity = 1;
            currentImage.style.transform = 'scale(1)';

            setTimeout(() => {
                currentImage.style.opacity = 0;
                currentImage.style.transform = 'scale(0.8)'; 
            }, durationVisible);

            imageIndex = (imageIndex + 1) % trailImages.length;
        }
    });
});