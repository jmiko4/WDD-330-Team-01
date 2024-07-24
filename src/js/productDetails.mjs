import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  try {
    // Get the details for the current product. `findProductById` returns a promise.
    product = await findProductById(productId);

    if (product) {
      // Render product details and set up event listener for the "Add to Cart" button
      renderProductDetails();
      document.getElementById("addToCart").addEventListener("click", () => addProductToCart(product));
    } else {
      // Display error message and hide "Add to Cart" button
      alert("Product not found.");
      document.getElementById("addToCart").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert("An error occurred while fetching product details. Please try again later.");
  }
}

export function addProductToCart(cartProduct) {
  // Check if cart is empty
  const cart = getLocalStorage("so-cart") || [];

  // Find if the product already exists in the cart
  const existingProduct = cart.find(item => item.Id === cartProduct.Id);

  if (existingProduct) {
    // Increment quantity if the product is already in the cart
    existingProduct.quantity += 1;
  } else {
    // Add new product with quantity set to 1
    cartProduct.quantity = 1;
    cart.push(cartProduct);
  }

  // Save the updated cart to local storage
  setLocalStorage("so-cart", cart);
}

export function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;

  const productImage = document.querySelector("#productImage");
  productImage.src = product.Images.PrimaryLarge;
  productImage.srcset = `
    ${product.Images.PrimarySmall} 576w,
    ${product.Images.PrimaryMedium} 768w,
    ${product.Images.PrimaryLarge} 992w,
    ${product.Images.PrimaryExtraLarge} 1200w
  `;
  productImage.alt = product.Name;

  document.querySelector("#productSuggestedPrice").innerText = "$" + product.SuggestedRetailPrice.toFixed(2);
  document.querySelector("#productFinalPrice").innerText = "Now $" + product.FinalPrice.toFixed(2);
  document.querySelector("#productDiscount").innerText = "YOU SAVE $" + (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

export function addComment(comment, productId) {
  // Get the existing comments from local storage
  const comments = getLocalStorage("so-comments") || {};

  // Initialize the comments array for the specific product if undefined
  if (!comments[productId]) {
    comments[productId] = [];
  }

  // Add the comment to the product's comments array
  comments[productId].push(comment);

  // Save the updated comments to local storage
  setLocalStorage("so-comments", comments);
  renderComments(productId);
}

export function renderComments(productId) {
  // Get the comments container element
  const commentsContainer = document.querySelector("#commentsContainer");
  // Clear any existing comments
  commentsContainer.innerHTML = "";

  // Get the comments for the specific product from local storage
  const comments = getLocalStorage("so-comments") || {};
  const productComments = comments[productId] || [];

  // Loop through each comment and create a comment element
  productComments.forEach(comment => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.innerText = comment;
    commentElement.appendChild(commentText);

    commentsContainer.appendChild(commentElement);
  });
}
