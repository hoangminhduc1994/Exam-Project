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

document.addEventListener("DOMContentLoaded", () => {
  const cartModalOverlay = document.querySelector(".cart-modal-overlay");
  const closeBtn = document.querySelector("#close-btn");
  const productRows = document.querySelector(".product-rows");
  const totalPriceEl = document.querySelector(".total-price");
  const cartQuantityEl = document.querySelector(".cart-quantity");
  const cartIcon = document.querySelector(".cart-icon");

  // Show cart modal when clicking on cart icon
  cartIcon.addEventListener("click", () => {
    cartModalOverlay.style.display = "flex";
  });

  // Close cart modal
  closeBtn.addEventListener("click", () => {
    cartModalOverlay.style.display = "none";
  });

  cartModalOverlay.addEventListener("click", (event) => {
    if (event.target.classList.contains("cart-modal-overlay")) {
      cartModalOverlay.style.display = "none";
    }
  });

  // Add to cart
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    cartModalOverlay.style.display = "flex";
    const price = parseFloat(
      document.querySelector(".product-price").innerText.replace("$", "")
    );
    const imageSrc = document.querySelector(".swiper-slide-active img").src;
    const quantity = parseInt(
      document.querySelector(".product-details .quantity").innerText
    );
    addToCartItem(price, imageSrc, quantity);
  });

  // Update quantities and remove items in cart
  productRows.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      event.target.closest(".product-row").remove();
      updateCartPrice();
    } else if (event.target.classList.contains("increase-quantity")) {
      const quantityInput = event.target.nextElementSibling;
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updateCartPrice();
    } else if (event.target.classList.contains("decrease-quantity")) {
      const quantityInput = event.target.previousElementSibling;
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateCartPrice();
      }
    }
  });

  productRows.addEventListener("input", (event) => {
    if (
      event.target.classList.contains("product-quantity") &&
      event.target.value < 1
    ) {
      event.target.value = 1;
    }
    updateCartPrice();
  });

  const addToCartItem = (price, imageSrc, quantity) => {
    if (
      [...productRows.children].some(
        (row) => row.querySelector(".cart-image").src === imageSrc
      )
    ) {
      alert("This product is already in the cart");
      return;
    }

    const divEl = document.createElement("div");
    divEl.classList.add("product-row");
    divEl.innerHTML = `
      <img class="cart-image" src="${imageSrc}" alt="">
      <span class="cart-price">$${price.toFixed(2)}</span>
      <div class="quantity-control">
        
        <input class="product-quantity" type="number" value="${quantity}">
        
      </div>
      <button class="remove-btn">Remove</button>
    `;
    productRows.appendChild(divEl);
    updateCartPrice();
  };

  const updateCartPrice = () => {
    const productRows = document.querySelectorAll(".product-row");
    let total = 0;
    let totalQuantity = 0;

    productRows.forEach((cartItem) => {
      const quantity = parseInt(
        cartItem.querySelector(".product-quantity").value
      );
      const price = parseFloat(
        cartItem.querySelector(".cart-price").innerText.replace("$", "")
      );
      total += quantity * price;
      totalQuantity += quantity;
    });

    totalPriceEl.innerText = `$${total.toFixed(2)}`;
    cartQuantityEl.innerText = totalQuantity > 100 ? "100+" : totalQuantity;
  };

  // Update product quantity in product details section
  document.querySelector(".increase-quantity").addEventListener("click", () => {
    const quantityEl = document.querySelector(".product-details .quantity");
    quantityEl.innerText = parseInt(quantityEl.innerText) + 1;
  });

  document.querySelector(".decrease-quantity").addEventListener("click", () => {
    const quantityEl = document.querySelector(".product-details .quantity");
    if (parseInt(quantityEl.innerText) > 1) {
      quantityEl.innerText = parseInt(quantityEl.innerText) - 1;
    }
  });
});
