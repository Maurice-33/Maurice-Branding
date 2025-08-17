// Get necessary elements from the DOM
const hamburgerMenu = document.getElementById('hamburger-menu');
const navButtons = document.getElementById('nav-buttons');
const backToTopButton = document.getElementById('back-to-top');
const mainHeader = document.getElementById('main-header');

// Check if the hamburger menu element exists before adding event listeners
if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
        // Toggle the 'is-active' class on the hamburger menu for the "X" animation
        hamburgerMenu.classList.toggle('is-active');
        // Toggle the 'is-open' class on the navigation buttons to show/hide the menu
        navButtons.classList.toggle('is-open');
    });
}

// Function to handle showing/hiding the back-to-top button
window.addEventListener('scroll', () => {
    // Show the button if the user has scrolled down more than 300 pixels
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
    
    // Add a shadow to the header when scrolling
    if (window.scrollY > 50) {
        mainHeader.classList.add('scrolled');
    } else {
        mainHeader.classList.remove('scrolled');
    }
});

// Function to smoothly scroll to the top of the page when the button is clicked
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});