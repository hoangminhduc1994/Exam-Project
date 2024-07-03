document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.querySelector('.row-data-js');
    const loadApi1Button = document.querySelector('.recent-recipes');
    const loadApi2Button = document.querySelector('.experiment-recipes');

    const fetchData = async (apiUrl) => {
        try {
            const response = await axios.get(apiUrl);
            const data = response.data;
            renderData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderData = (data) => {
        let htmlContent = '';
        data.forEach(item => {
            htmlContent += `
                <div class="col-12 col-sm-6 col-md-4">
                <div class="post-recipe">
                <img src="${item.thumbnail}" alt="recent-recipes-exps">
                <p>${item.name}</p>
                <div class="more-detail">
              <a href="#">More details</a>
              </div>
                </div>
                </div
>            `;
        });
        dataContainer.innerHTML = htmlContent;
    };

    loadApi1Button.addEventListener('click', () => fetchData('https://vm95y5-3000.csb.app/recipes'));
    loadApi2Button.addEventListener('click', () => fetchData('https://vm95y5-3000.csb.app/exp'));

    // Load initial data from the first API
    fetchData('https://vm95y5-3000.csb.app/recipes');
});



// listing products
document.addEventListener("DOMContentLoaded", () => {
    const rowJs = document.querySelector(".row-js");
  const apiUrl = "https://vm95y5-3000.csb.app/products";
  const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        renderData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchData(apiUrl);
const renderData = (data) => {
    let htmlContent = '';
    data.forEach(value => {
        htmlContent += `
            <div class="col-12 col-sm-6 col-md-4">
            <div class="items">
              <img src="${value.image}" alt="product">
              <p>${value.price}</p>
              <p>${value.name}</p>
              <div class="more-detail">
              <a href="#">More details</a>
              </div>
            </div>
          </div>
        `;
    });
rowJs.innerHTML = htmlContent;
};
});
