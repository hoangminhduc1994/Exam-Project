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



// button
document.addEventListener('DOMContentLoaded', () => {
  const decreaseButton = document.querySelector('.decrease-quantity');
  const increaseButton = document.querySelector('.increase-quantity');
  const quantitySpan = document.querySelector('.quantity');

  let quantity = parseInt(quantitySpan.textContent);

  decreaseButton.addEventListener('click', () => {
      if (quantity > 1) {
          quantity--;
          quantitySpan.textContent = quantity;
      }
  });

  increaseButton.addEventListener('click', () => {
      quantity++;
      quantitySpan.textContent = quantity;
  });
});