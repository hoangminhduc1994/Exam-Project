document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const navbarLinks = document.querySelector(".header-main-menu");
  const submenuLinks = document.querySelectorAll(".submenu > a");
  const submenus = document.querySelectorAll(".submenu .dropdown");

  // Toggle navbar visibility on mobile
  toggleButton.addEventListener("click", () => {
    navbarLinks.classList.toggle("active");
  });

  // Toggle submenu visibility
  submenuLinks.forEach((link) => {
    const dropdown = link.nextElementSibling;

    // Open submenu on mouseenter
    link.addEventListener("mouseenter", (e) => {
      e.preventDefault();
      closeAllSubmenus();
      dropdown.classList.add("active");
    });

    // Keep submenu open on mouseenter of the dropdown
    dropdown.addEventListener("mouseenter", () => {
      dropdown.classList.add("active");
    });

    // Close submenu on mouseleave from link and dropdown
    link.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!dropdown.matches(":hover")) {
          dropdown.classList.remove("active");
        }
      }, 100);
    });

    dropdown.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!link.matches(":hover")) {
          dropdown.classList.remove("active");
        }
      }, 100);
    });
  });

  // Close all submenus
  const closeAllSubmenus = () => {
    submenus.forEach((submenu) => {
      submenu.classList.remove("active");
    });
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const setActiveMenu = (selector) => {
    // Access the menu items
    const menuItems = document.querySelectorAll(selector);

    // Function to remove active classes
    const removeActiveClasses = (menuItems) => {
      menuItems.forEach((value) => {
        value.classList.remove("active");
      });
    };

    // Check if there is an active menu item in localStorage
    let activeIndex = localStorage.getItem("ACTIVE_MENU");

    if (activeIndex !== null) {
      // Remove old active classes
      removeActiveClasses(menuItems);
      // Add the active class from localStorage
      menuItems[activeIndex].classList.add("active");
    }

    // Iterate over the menu items and add click event listeners
    menuItems.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        // Remove old active classes
        removeActiveClasses(menuItems);
        // Add the new active class
        item.classList.add("active");
        // Set the new active index in localStorage
        localStorage.setItem("ACTIVE_MENU", index);

        // Reset the href attribute after preventDefault();
        const href = item.querySelector("a").getAttribute("href");
        window.location.href = href;
      });
    });

    // Add event listener to header-main-logo
    const headerLogo = document.querySelector(".header-main-logo");
    if (headerLogo) {
      headerLogo.addEventListener("click", (event) => {
        event.preventDefault();
        removeActiveClasses(menuItems);
        localStorage.removeItem("ACTIVE_MENU"); // Optionally, remove the active menu from localStorage
        window.location.href = "index.html"; // Redirect to index.html
      });
    }
  };

  setActiveMenu(".menu-main li");
});
