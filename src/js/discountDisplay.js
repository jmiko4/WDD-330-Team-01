// discountDisplay.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("../json/tent.json") // Adjust the path as necessary
    .then((response) => response.json())
    .then((products) => {
      const container = document.querySelector(".product-listing-container");

      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");

        // Calculate discount percentage
        const discount = product.SuggestedRetailPrice - product.FinalPrice;
        const discountPercentage =
          discount > 0
            ? ((discount / product.SuggestedRetailPrice) * 100).toFixed(0)
            : 0;

        productElement.innerHTML = `
            <img src="${product.Image}" alt="${product.Name}" />
            <h3>${product.Name}</h3>
            <p class="price">$${product.FinalPrice.toFixed(2)}</p>
            ${
              discountPercentage > 0
                ? `<div class="discount-badge">${discountPercentage}% OFF</div>`
                : ""
            }
          `;

        container.appendChild(productElement);
      });
    })
    .catch((error) => {
      console.error("Error loading products:", error);
    });
});
