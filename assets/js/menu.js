const toggleButton = document.querySelector('.toggle-button');
const navbarLinks = document.querySelector('.header-main-menu');
const submenuLinks = document.querySelectorAll('.submenu > a');
const submenus = document.querySelectorAll('.submenu .dropdown');

// Toggle navbar visibility on mobile
toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

// Toggle submenu visibility
submenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        const isActive = dropdown.classList.contains('active');
        closeAllSubmenus();
        if (!isActive) {
            dropdown.classList.add('active');
        }
    });
});

// Close all submenus
function closeAllSubmenus() {
    submenus.forEach(submenu => {
        submenu.classList.remove('active');
    });
}

// Close submenus and navbar when clicking outside
document.addEventListener('click', (e) => {
    const isClickInside = navbarLinks.contains(e.target) || toggleButton.contains(e.target);
    if (!isClickInside) {
        closeAllSubmenus();
        navbarLinks.classList.remove('active');
    }
});