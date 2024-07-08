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
let cartBtn = document.querySelector(".cart-icon i");
let cartModalOverlay = document.querySelector(".cart-modal-overlay");
let closeBtn = document.querySelector("#close-btn");
// console.log(closeBtn);

cartBtn.addEventListener("click", () => {
  cartModalOverlay.style.transform = "translateX(0)";
});

closeBtn.addEventListener("click", () => {
  // alert("123");
  cartModalOverlay.style.transform = "translateX(200%)";
})

// event.target.classList.contain("cart-modal-overlay") 
// -> check bam dung class cart-modal-overlay 
// -> true, Khong phai -> false

cartModalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-modal-overlay") == true) {
    cartModalOverlay.style.transform = "translateX(200%)";
  }
});