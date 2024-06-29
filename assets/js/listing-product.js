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
