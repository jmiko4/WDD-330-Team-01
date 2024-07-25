import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

// Define currentSlide at a higher scope
let currentSlide = 0;

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

function setupCarousel(images) {
  const carouselContainer = document.getElementById("carousel");
  if (images.length > 1) {
    carouselContainer.innerHTML = ""; // Clear previous content
    images.forEach((imgSrc) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      carouselContainer.appendChild(img);
    });

    // Show the first slide
    showSlide(0);
  } else if (images.length === 1) {
    document.getElementById("productImage").src = images[0];
  }
}

function showSlide(index) {
  const slides = document.querySelectorAll("#carousel img");
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;
  const offset = -currentSlide * 100;
  document.querySelector("#carousel").style.transform = `translateX(${offset}%)`;
}

window.prevSlide = function() {
  showSlide(currentSlide - 1);
};

window.nextSlide = function() {
  showSlide(currentSlide + 1);
};

export default async function productList(selector, category, sortBy) {
  // get the element we will insert the list into from the selector
  const el = document.querySelector(selector);
  // get the list of products
  const products = await getProductsByCategory(category);

  if (sortBy === "name") {
    products.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  if (sortBy === "price") {
    products.sort((a, b) => a.FinalPrice - b.FinalPrice);
  }

  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);

  products.forEach ((product) => {

    document.getElementById(`close${product.Id}`).addEventListener("click", 
      () => document.getElementById(`dialog${product.Id}`).close());
    document.getElementById(`product${product.Id}`).addEventListener("click", 
      () => document.getElementById(`dialog${product.Id}`).showModal());

    // Assuming each product has an images array to initialize the carousel
    const images = product.Images ? product.Images.map(img => img.PrimaryMedium) : [];
    setupCarousel(images);
  });
  
  document.querySelector(".title").innerHTML = category.charAt(0).toUpperCase() + category.slice(1);
}
