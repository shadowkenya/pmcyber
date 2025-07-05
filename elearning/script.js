document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    let slideInterval; // Variable to hold the interval ID

    // Ensure we have slides before proceeding
    if (slides.length === 0 || dots.length === 0) {
        console.warn("Slider elements not found. Check HTML structure and class names.");
        return; // Exit if no slides/dots are found
    }

    // Function to show a specific slide
    function showSlides(n) {
        // Hide all slides and deactivate all dots
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            slides[i].style.display = 'none'; // Explicitly hide all slides
            dots[i].classList.remove('active');
        }

        // Adjust index for looping (if n is out of bounds)
        if (n >= slides.length) {
            slideIndex = 0; // Loop back to the first slide
        } else if (n < 0) {
            slideIndex = slides.length - 1; // Loop to the last slide
        } else {
            slideIndex = n; // Set to the requested slide index
        }

        // Show the current slide and activate its corresponding dot
        slides[slideIndex].classList.add('active');
        slides[slideIndex].style.display = 'block'; // Make the active slide visible
        dots[slideIndex].classList.add('active');
    }

    // Function to advance to the next slide
    function nextSlide() {
        showSlides(slideIndex + 1);
    }

    // Function for manual dot navigation (accessible globally)
    window.currentSlide = function(n) {
        // Clear the auto-slide interval when a dot is clicked
        clearInterval(slideInterval);
        showSlides(n - 1); // n is 1-based from HTML, slideIndex is 0-based
        // Restart the auto-slide interval after a short delay
        slideInterval = setInterval(nextSlide, 5000); // Resume auto-slide after 5 seconds
    }

    // Initial display of the first slide when the page loads
    showSlides(slideIndex);

    // Start automatic slide show
    slideInterval = setInterval(nextSlide, 5000); // Change image every 5 seconds (5000ms)

    // Optional: Pause slideshow on hover for better user experience
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval); // Stop auto-slide on mouse enter
        });
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000); // Resume auto-slide on mouse leave
        });
    }
});