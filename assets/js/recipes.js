document.addEventListener("DOMContentLoaded", () => {
  const getRecipeIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  // Function to populate the recipe data
  const populateRecipe = (recipe) => {
    document.getElementById('recipe-title').textContent = recipe.name;
    document.getElementById('recipe-description').textContent = recipe.description;

    document.getElementById('prep-time').innerHTML = `<i class="fa-solid fa-clock"></i> <p>Prep: ${recipe.prepTime}</p>`;
    document.getElementById('cook-time').innerHTML = `<i class="fa-solid fa-clock"></i> <p>Cook: ${recipe.cookTime}</p>`;
    document.getElementById('total-time').innerHTML = `<i class="fa-regular fa-clock"></i> <p>Total: ${recipe.totalTime}</p>`;
    document.getElementById('servings').innerHTML = `<i class="fa-solid fa-person"></i> <p>Servings: ${recipe.servings}</p>`;

    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });

    const stepsList = document.getElementById('steps-list');
    stepsList.innerHTML = '';
    recipe.steps.forEach((step, index) => {
      const stepDiv = document.createElement('div');
      stepDiv.classList.add('steps');
      stepDiv.innerHTML = `
        <div class="icon">
          <i class="fa-solid fa-square-check"></i>
          <p>Step ${index + 1}</p>
        </div>
        <p>${step.description}</p>
        <img src="${step.image}" alt="steps">
      `;
      stepsList.appendChild(stepDiv);
    });

    const swiperMainWrapper = document.getElementById('swiper-main-wrapper');
    const swiperThumbWrapper = document.getElementById('swiper-thumb-wrapper');
    swiperMainWrapper.innerHTML = '';
    swiperThumbWrapper.innerHTML = '';
    recipe.images.forEach((image, index) => {
      const mainSlide = document.createElement('div');
      mainSlide.classList.add('swiper-slide');
      mainSlide.innerHTML = `<img src="${image}" alt="Recipe Image ${index + 1}"/>`;
      swiperMainWrapper.appendChild(mainSlide);

      const thumbSlide = document.createElement('div');
      thumbSlide.classList.add('swiper-slide');
      thumbSlide.innerHTML = `<img src="${image}" alt="Recipe Thumbnail ${index + 1}"/>`;
      swiperThumbWrapper.appendChild(thumbSlide);
    });

    // Initialize Swiper after the images are added
    const swiperThumb = new Swiper('.swiper-thumb', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
    });

    const swiperMain = new Swiper('.swiper-main', {
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperThumb,
      },
    });
  }

  // Fetch the data from data.json using Axios
  axios.get('https://vm95y5-3000.csb.app/recipes')
    .then(response => {
      const recipes = response.data;
      const recipeId = getRecipeIdFromUrl();
      const recipe = recipes.find(r => r.id === parseInt(recipeId, 10));
      if (recipe) {
        populateRecipe(recipe);
      } else {
        console.error('Recipe not found');
      }
    })
    .catch(error => console.error('Error fetching recipe data:', error));
});










    