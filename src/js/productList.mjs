// productList.mjs

import { getData } from './productData.mjs';
import { renderListWithTemplate } from './utils.mjs';

// Function to generate the HTML template for a product card
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

// Function to filter the list of products to include only the required tents
function filterTents(products) {
    const tentIds = ['880RR', '985RF', '344YJ', '985PR'];
    return products.filter(product => tentIds.includes(product.Id));
}

// Function to generate the list of products based on category
export default function productList(selector, category) {
    getData(category)
        .then(products => {
            const filteredProducts = filterTents(products);
            const productListElement = document.querySelector(selector);
            renderListWithTemplate(productCardTemplate, productListElement, filteredProducts);
        })
        .catch(error => console.error('Error fetching product data:', error));
}
