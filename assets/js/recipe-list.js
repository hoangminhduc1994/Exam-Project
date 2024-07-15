// script.js
document.addEventListener("DOMContentLoaded", () => {
    const rowJs = document.querySelector(".row-js");
    const apiUrl = "https://vm95y5-3000.csb.app/recipes";

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            renderData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const renderData = (data) => {
        let htmlContent = "";
        data.forEach((item) => {
            htmlContent += `
                <div class="col-12 col-sm-6 col-md-4">
                    <div class="post-recipe" id="recipe-${item.id}">
                        <img src="${item.thumbnail}" alt="recent-recipes-exps">
                        <p>${item.name}</p>
                        <div class="more-detail">
                            <a href="recipes.html?id=${item.id}">More details</a>
                        </div>
                    </div>
                </div>`;
        });
        rowJs.innerHTML = htmlContent;
    };

    fetchData(apiUrl);
});






  