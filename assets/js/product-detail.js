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


const addToCart = document.querySelectorAll(".add-to-cart");

addToCart.forEach((button)=>{
  button.addEventListener("click", ()=>{
    cartModalOverlay.style.transform = "translateX(0)";

    addToCartClicked(button);
  });
});
//  price, imageSrc
const addToCartClicked = (button) => {
  let parentCart = button.parentElement;
  let productName = parentCart.querySelector(".product-name").innerHTML
  let price = parentCart.querySelector(".product-price").innerHTML;
  

  addToCartItem(productName, price);
}
// popup
const addToCartItem = (productName, price) => {
  let productRows = document.querySelector(".product-rows");

  // Create a new div element for the product row
  let divEl = document.createElement("div");
  divEl.classList.add("product-row");

  // Construct the HTML for the product row
  let cartHTML = `
    <p class="cart-name">${productName}</p>
    <span class="cart-price">${price}</span>
    <input class="product-quantity" type="number" value="1">
    <button class="remove-btn">Remove</button>
  `;
  divEl.innerHTML = cartHTML;

  // Check if the product already exists in the cart
  let cartNames = document.querySelectorAll(".cart-name");
  let isDuplicate = false;

  cartNames.forEach((name) => {
    if (name.textContent === productName) {
      alert("Sản phẩm đã tồn tại trong giỏ hàng");
      isDuplicate = true;
    }
  });

  if (isDuplicate) {
    return; // Exit if product is already in the cart
  }

  // Append the new product row to the product rows container
  productRows.appendChild(divEl);

  // Update the cart price and quantity
  updateCartPrice();

  // Add event listeners for remove button and quantity change
  let removeBtn = divEl.querySelector(".remove-btn");
  removeBtn.addEventListener("click", () => {
    removeItem(divEl);
    updateCartPrice();
  });

  let productQuantityEl = divEl.querySelector(".product-quantity");
  productQuantityEl.addEventListener("change", () => {
    changeQuantity(productQuantityEl);
  });
};

const updateCartPrice = () => {
  let productRows = document.querySelectorAll(".product-row");
  let total = 0;
  let totalQuantity = 0;

  productRows.forEach((cartItem) => {
    // Get quantity and price from each product row
    let quantityEl = cartItem.querySelector(".product-quantity");
    if (quantityEl) {
      const quantity = parseFloat(quantityEl.value);
      const price = parseFloat(cartItem.querySelector(".cart-price").textContent.replace("$", "").trim());

      if (!isNaN(quantity) && !isNaN(price)) {
        // Calculate total price and quantity
        total += quantity * price;
        totalQuantity += quantity;
      } else {
        console.error("Invalid quantity or price:", quantity, price);
      }
    } else {
      console.error("Quantity element not found in product row:", cartItem);
    }
  });

  // Update the total price and quantity displayed in the cart
  let totalPriceEl = document.querySelector(".total-price");
  if (totalPriceEl) {
    totalPriceEl.innerHTML = "$" + total.toFixed(2); // Display total price with 2 decimal places
  }

  let cartQuantityEl = document.querySelector(".cart-quantity");
  if (cartQuantityEl) {
    cartQuantityEl.innerHTML = totalQuantity;

    if (totalQuantity > 100) {
      cartQuantityEl.innerHTML = "100+";
    }
  }
};

const removeItem = (productRow) => {
  productRow.remove(); // Remove the parent element of the remove button (product row)
};

const changeQuantity = (inputEl) => {
  if (inputEl.value < 1) {
    alert("Sản phẩm phải có ít nhất số lượng là 1!");
    inputEl.value = 1;
  }

  updateCartPrice(); // Update cart total when quantity changes
};

