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

  link.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    closeAllSubmenus();
    dropdown.classList.add("active");
  });

  dropdown.addEventListener("mouseleave", () => {
    dropdown.classList.remove("active");
  });
});

// Close all submenus
function closeAllSubmenus() {
  submenus.forEach((submenu) => {
    submenu.classList.remove("active");
  });
}
// Close submenus and navbar when clicking outside
document.addEventListener("click", (e) => {
  const isClickInside =
    navbarLinks.contains(e.target) || toggleButton.contains(e.target);
  if (!isClickInside) {
    closeAllSubmenus();
    navbarLinks.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const setActiveMenu = (selector) => {
    // B1: Truy cap vao PT menu li
    const menuItems = document.querySelectorAll(selector);

    // Remove active old
    const removeActiveClasses = (menuItems) => {
      menuItems.forEach((value) => {
        value.classList.remove("active");
      });
    };

    // Kiem tra xem Menu da co PT nao active trong locaStorage ?
    let activeIndex = localStorage.getItem("ACTIVE_MENU");

    if (activeIndex !== null) {
      // Xoa cac "active" cu di
      removeActiveClasses(menuItems);
      // Them "active" dang co trong localStorage
      menuItems[activeIndex].classList.add("active");
    } else {
      menuItems[0].classList.add("active");
    }

    // B2: Lap qua menuTems -> Gan 1 su kien doi user click "active"
    menuItems.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        // Xoa cac "active" cu di
        removeActiveClasses(menuItems);
        // Them "active" moi
        item.classList.add("active");
        // Set lai gia "active" vao trong localStorage
        localStorage.setItem("ACTIVE_MENU", index);

        // C1: Reset thuoc tinh the a sau khi  event.preventDefault();
        const href = item.querySelector("a").getAttribute("href");
        window.location.href = href;

        // c2: Su dung chi index
      });
    });
  };
  setActiveMenu(".menu-main li");
});