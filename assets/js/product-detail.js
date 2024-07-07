// swiper
document.addEventListener("DOMContentLoaded", () => {
  const swiperThumb = new Swiper(".swiper-thumb", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
  });

  const swiperMain = new Swiper(".swiper-main", {
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiperThumb,
    },
  });
});

// cart
let cartBtn = document.querySelector(".cart i");
let cartModalOverlay = document.querySelector(".cart-modal-overlay");
let closeBtn = document.querySelector("#close-btn");


cartBtn.addEventListener("click", () => {
  cartModalOverlay.style.transform = "translateX(0)";
});

closeBtn.addEventListener("click", () => {

  cartModalOverlay.style.transform = "translateX(200%)";
})



cartModalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-modal-overlay") == true) {
    cartModalOverlay.style.transform = "translateX(200%)";
  }
});





