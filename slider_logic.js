
// Hero Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const intervalTime = 3000; // 3 seconds
    let slideInterval;

    const nextSlide = () => {
        // Remove active class from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to new current
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    // Auto slide
    slideInterval = setInterval(nextSlide, intervalTime);

    // Manual navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); // Stop auto slide on interaction

            // Remove active class from current
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;

            // Add active class to clicked
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            // Restart auto slide
            slideInterval = setInterval(nextSlide, intervalTime);
        });
    });
});
