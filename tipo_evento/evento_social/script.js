let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-images img');
    slideIndex += step;

    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    const newTransformValue = -slideIndex * 100 + '%';
    document.querySelector('.carousel-images').style.transform = `translateX(${newTransformValue})`;
}

// Optional: Automate the carousel
setInterval(() => moveSlide(1), 3000); // Cambia cada 3 segundos
