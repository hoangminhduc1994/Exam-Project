document.addEventListener("DOMContentLoaded", () => {
  const rowJs = document.querySelector(".row-js");
  const searchMessage = document.querySelector("#search-message");
  const apiUrl = "https://vm95y5-3000.csb.app/products";
  let fetchedData = [];

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      fetchedData = response.data;
      renderData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderData = (data) => {
    let htmlContent = "";
    data.forEach((value) => {
      htmlContent += `
        <div class="col-12 col-sm-6 col-md-4">
          <div class="items" id="product-${value.id}">
            <img src="${value.image}" alt="product">
            <p>${value.price}</p>
            <p>${value.name}</p>
            <div class="more-detail">
              <a href="product-detail.html?id=${value.id}">More details</a>
            </div>
          </div>
        </div>
      `;
    });
    rowJs.innerHTML = htmlContent;
  };

  // Lọc sản phẩm theo từ khóa
  const filterBySearchTerm = (data, searchTerm) => {
    return data.filter((item) => {
      const oldTitle = item.name.toLowerCase();
      return oldTitle.includes(searchTerm);
    });
  };

  const filterProducts = () => {
    let textSearch = document.querySelector("#search").value;
    let searchTerm = textSearch.toLowerCase().trim();
    let filteredData = filterBySearchTerm(fetchedData, searchTerm);

    searchMessage.innerHTML = `Search results for "${textSearch}"`;
    renderData(filteredData);
  };

  // Add event listener for the search button
  document.querySelector("#searchButton").addEventListener("click", (event) => {
    event.preventDefault();
    filterProducts();
  });

  let clearTime;
  // Lắng nghe sự kiện nhập liệu trên ô tìm kiếm
  let inputSearch = document.querySelector("#search");
  inputSearch.addEventListener("input", () => {
    clearTimeout(clearTime);

    // Neu sau 1s khong nhap nua thi moi goi vao filterProducts();
    clearTime = setTimeout(() => {
      filterProducts();
    }, 1000); // 1000ms -> 1s
  });

  fetchData(apiUrl);
});




