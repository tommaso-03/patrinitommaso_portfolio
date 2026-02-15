// Hover Slideshow Effect per Project Covers
document.addEventListener('DOMContentLoaded', function() {
    const slideshowItems = document.querySelectorAll('.project-item.hover-slideshow');
    
    slideshowItems.forEach(item => {
        let intervalId = null;
        let currentIndex = 0;
        
        // Cerca le immagini dentro il wrapper
        const wrapper = item.querySelector('.project-images-wrapper');
        if (!wrapper) return;
        
        const images = wrapper.querySelectorAll('.project-cover');
        if (images.length <= 1) return;
        
        // Setup iniziale: prima immagine è la base, le altre si sovrappongono
        images[0].style.position = 'relative';
        images[0].style.display = 'block';
        
        for (let i = 1; i < images.length; i++) {
            images[i].style.position = 'absolute';
            images[i].style.top = '0';
            images[i].style.left = '0';
            images[i].style.width = '100%';
            images[i].style.height = '100%';
            images[i].style.objectFit = 'cover';
            images[i].style.display = 'none';
        }
        
        function nextImage() {
            if (currentIndex > 0) {
                images[currentIndex].style.display = 'none';
            }
            currentIndex = (currentIndex + 1) % images.length;
            if (currentIndex > 0) {
                images[currentIndex].style.display = 'block';
            }
        }
        
        item.addEventListener('mouseenter', function() {
            currentIndex = 0;
            for (let i = 1; i < images.length; i++) {
                images[i].style.display = 'none';
            }
            // Cambia subito la prima volta
            nextImage();
            // Poi continua ogni 250ms
            intervalId = setInterval(nextImage, 200);
        });
        
        item.addEventListener('mouseleave', function() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            currentIndex = 0;
            for (let i = 1; i < images.length; i++) {
                images[i].style.display = 'none';
            }
        });
    });
});
