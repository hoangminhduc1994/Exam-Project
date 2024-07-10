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
// Define cartModalOverlay
let cartModalOverlay = document.querySelector(".cart-modal-overlay");

// Cart button event listeners
let cartBtn = document.querySelector(".cart-icon i");
let closeBtn = document.querySelector("#close-btn");

cartBtn.addEventListener("click", () => {
  cartModalOverlay.style.transform = "translateX(0)";
});

closeBtn.addEventListener("click", () => {
  cartModalOverlay.style.transform = "translateX(200%)";
});

// Close cart when clicking outside of the cart
cartModalOverlay.addEventListener("click", (event) => {
  if (event.target.classList.contains("cart-modal-overlay")) {
    cartModalOverlay.style.transform = "translateX(200%)";
  }
});

// Handle add to cart
const addToCart = document.querySelectorAll(".add-to-cart");

addToCart.forEach((button) => {
  button.addEventListener("click", () => {
    cartModalOverlay.style.transform = "translateX(0)";
    addToCartClicked(button);
  });
});

// Get price, name, and quantity when adding to cart
const addToCartClicked = (button) => {
  let parentCart = button.closest(".product-details");
  let productName = parentCart.querySelector(".product-name").innerHTML;
  let price = parentCart.querySelector(".product-price").innerHTML.replace("$", "").trim();
  let quantity = parseInt(parentCart.querySelector(".quantity").textContent);

  addToCartItem(productName, price, quantity);
};

const addToCartItem = (productName, price, quantity) => {
  let productRows = document.querySelector(".product-rows");

  // Create a new div element for the product row
  let divEl = document.createElement("div");
  divEl.classList.add("product-row");

  // Construct the HTML for the product row
  let cartHTML = `
    <p class="cart-name">${productName}</p>
    <span class="cart-price">$${price}</span>
    <input class="product-quantity" type="number" value="${quantity}">
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
  // Show or hide the purchase button
  let purchaseBtn = document.querySelector(".purchase-btn");
  if (totalQuantity === 0) {
    purchaseBtn.style.display = "none";
  } else {
    purchaseBtn.style.display = "block";
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

// Handle quantity control
const updateQuantity = (button, action) => {
  let quantityControl = button.closest(".quantity-control");
  let quantitySpan = quantityControl.querySelector(".quantity");
  let currentQuantity = parseInt(quantitySpan.textContent);

  if (action === 'increase') {
    quantitySpan.textContent = currentQuantity + 1;
  } else if (action === 'decrease' && currentQuantity > 1) {
    quantitySpan.textContent = currentQuantity - 1;
  }
};

// Event listeners for increase and decrease buttons
document.querySelectorAll('.increase-quantity').forEach(button => {
  button.addEventListener('click', () => {
    updateQuantity(button, 'increase');
  });
});

document.querySelectorAll('.decrease-quantity').forEach(button => {
  button.addEventListener('click', () => {
    updateQuantity(button, 'decrease');
  });
});






 // Function to get the product ID from the URL
 const getProductIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Function to populate the product data
const populateProduct = (product) => {
  document.getElementById('brand-name').textContent = product.brand;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description; // Update here if 'detail' is used in JSON
  document.getElementById('product-price').textContent = product.price;

  const swiperMainWrapper = document.getElementById('swiper-main-wrapper');
  const swiperThumbWrapper = document.getElementById('swiper-thumb-wrapper');
  swiperMainWrapper.innerHTML = '';
  swiperThumbWrapper.innerHTML = '';
  product.images.forEach((image, index) => {
    const mainSlide = document.createElement('div');
    mainSlide.classList.add('swiper-slide');
    mainSlide.innerHTML = `<img src="${image}" alt="Product Image ${index + 1}"/>`;
    swiperMainWrapper.appendChild(mainSlide);

    const thumbSlide = document.createElement('div');
    thumbSlide.classList.add('swiper-slide');
    thumbSlide.innerHTML = `<img src="${image}" alt="Product Thumbnail ${index + 1}"/>`;
    swiperThumbWrapper.appendChild(thumbSlide);
  });

  
}

// Fetch the data from data.json using Axios
axios.get('https://vm95y5-3000.csb.app/products')
  .then(response => {
    const products = response.data;
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === parseInt(productId, 10));
    if (product) {
      populateProduct(product);
    } else {
      console.error('Product not found');
    }
  })
  .catch(error => console.error('Error fetching product data:', error));


