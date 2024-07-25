import { getParam } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import {
  addProductToCart,
  addComment,
  renderComments,
} from "./productDetails.mjs";
import { loadHeaderFooter, animateCartIcon } from "./utils.mjs";

const productId = getParam("product");

async function loadProductDetails(productIdParam) {
  const product = await findProductById(productIdParam);

  // Set product details
  document.getElementById("productName").textContent = product.Name;
  document.getElementById("productNameWithoutBrand").textContent = product.NameWithoutBrand;
  document.getElementById("productSuggestedPrice").textContent = `$${product.SuggestedRetailPrice.toFixed(2)}`;
  document.getElementById("productFinalPrice").textContent = `$${product.FinalPrice.toFixed(2)}`;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;

  // Set up carousel if there are multiple images
  setupCarousel(product.Images);

  renderComments(productIdParam);
  loadHeaderFooter();
}

// Define the changeSlide function at the root level
function changeSlide(direction, images, currentIndex) {
  let newIndex = (currentIndex + direction + images.length) % images.length;
  images.forEach((img, index) => img.style.display = index === newIndex ? "block" : "none");
  return newIndex;
}

// Set up carousel for images
function setupCarousel(images) {
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-container";

  if (images && images.length > 1) {
    // Create carousel elements
    const carousel = document.createElement("div");
    carousel.className = "carousel";

    images.forEach((image, index) => {
      const img = document.createElement("img");
      img.src = image.url;
      img.alt = `Image ${index + 1}`;
      img.className = "carousel-image";
      img.style.display = "none"; // Hide initially
      carousel.appendChild(img);
    });

    // Add carousel controls
    const prevButton = document.createElement("button");
    prevButton.className = "carousel-button prev";
    prevButton.innerHTML = "&#10094;"; // Left arrow
    prevButton.addEventListener("click", () => {
      currentIndex = changeSlide(-1, document.querySelectorAll(".carousel-image"), currentIndex);
    });

    const nextButton = document.createElement("button");
    nextButton.className = "carousel-button next";
    nextButton.innerHTML = "&#10095;"; // Right arrow
    nextButton.addEventListener("click", () => {
      currentIndex = changeSlide(1, document.querySelectorAll(".carousel-image"), currentIndex);
    });

    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(carousel);
    carouselContainer.appendChild(nextButton);

    // Replace product image with carousel
    const productImageElement = document.getElementById("productImage");
    productImageElement.replaceWith(carouselContainer);

    // Initialize carousel state
    let currentIndex = 0;
    currentIndex = changeSlide(0, document.querySelectorAll(".carousel-image"), currentIndex);
  } else {
    // Single image, no carousel needed
    const productImageElement = document.getElementById("productImage");
    productImageElement.src = images[0].url;
    productImageElement.alt = "Product Image";
    productImageElement.style.display = "block";
  }
}

// Call the loadProductDetails function to populate the page
loadProductDetails(productId);

document.getElementById("addComment").addEventListener("click", () => {
  // Create input field and submit button for comments
  const inputField = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("id", "commentInput");

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", () => {
    const comment = document.getElementById("commentInput").value;
    addComment(comment, productId);
    document.getElementById("commentInput").value = "";
    document.getElementById("addComment").classList.remove("hidden");
  });
  submitButton.classList.add("submitComment");

  const commentContainer = document.getElementById("commentsContainer");
  commentContainer.append(inputField);
  commentContainer.append(submitButton);
  document.getElementById("addComment").classList.add("hidden");
});

document.getElementById("addToCart").addEventListener("click", async (e) => {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  animateCartIcon();
});
