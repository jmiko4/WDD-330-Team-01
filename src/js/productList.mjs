import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      srcset="
        ${product.Images.PrimarySmall} 576w,
        ${product.Images.PrimaryMedium} 768w,
        ${product.Images.PrimaryLarge} 992w,
        ${product.Images.PrimaryExtraLarge} 1200w
      "
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    <a href="#" id="product${product.Id}" class="quickLook">Quick Look</a>
    <dialog id="dialog${product.Id}">${product.DescriptionHtmlSimple}<br><br><button id="close${product.Id}">Close</button></dialog>
  </li>`;
}

export default async function productList(selector, category, sortBy) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getProductsByCategory(category);

  if (sortBy == "name") {
    products.sort(function(a, b) {
      return a.Name.localeCompare(b.Name);
    });
  }

  if (sortBy == "price") {
    products.sort(function(a, b) {
    return a.FinalPrice - b.FinalPrice;
    });
  }

  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  products.forEach ((product) => {
    document.getElementById(`close${product.Id}`).addEventListener("click", 
    () => document.getElementById(`dialog${product.Id}`).close());;
    document.getElementById(`product${product.Id}`).addEventListener("click", 
    () => document.getElementById(`dialog${product.Id}`).showModal());
  });
  
  document.querySelector(".title").innerHTML = category.charAt(0).toUpperCase() + category.slice(1);
}

