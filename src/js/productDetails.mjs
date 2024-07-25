import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let productData = {}; // Renamed to avoid shadowing

export default async function productDetails(productId) { 
  try {
    productData = await findProductById(productId);
    if (productData) {
      renderProductDetails();
      document.getElementById("addToCart").addEventListener("click", addToCart);
    } else {
      alert("Product not found.");
      document.getElementById("addToCart").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    alert("An error occurred while fetching product details.");
    document.getElementById("addToCart").style.display = "none";
  }
}

export function addToCart() {
  addProductToCart(productData);
}

export function addProductToCart(product) {
  const cart = getLocalStorage("so-cart");
  if (cart == null) {
    product.quantity = 1;
    setLocalStorage("so-cart", [product]);
  } else {
    const sameItem = cart.find((item) => item.Id === product.Id);
    if (sameItem != null) {
      sameItem.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    setLocalStorage("so-cart", cart);
  }
}

export function renderProductDetails() {
  document.querySelector("#productName").innerText = productData.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText = productData.NameWithoutBrand;
  
  const productImage = document.querySelector("#productImage");
  productImage.src = productData.Images.PrimaryLarge;
  productImage.srcset = `
    ${productData.Images.PrimarySmall} 576w,
    ${productData.Images.PrimaryMedium} 768w,
    ${productData.Images.PrimaryLarge} 992w,
    ${productData.Images.PrimaryExtraLarge} 1200w
  `;
  productImage.alt = productData.Name;
  
  document.querySelector("#productSuggestedPrice").innerText = "$" + productData.SuggestedRetailPrice;
  document.querySelector("#productFinalPrice").innerText = "Now $" + productData.FinalPrice;
  document.querySelector("#productDiscount").innerText = "YOU SAVE $" + Math.floor(productData.SuggestedRetailPrice - productData.FinalPrice);
  document.querySelector("#productColorName").innerText = productData.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = productData.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = productData.Id;
}

export function addComment(comment, productId) {
  if (!comment || typeof comment !== "string" || comment.trim() === "") {
    alert("Comment cannot be empty.");
    return;
  }

  const comments = getLocalStorage("so-comments") || {};
  if (!comments[productId]) {
    comments[productId] = [];
  }
  comments[productId].push(comment);
  setLocalStorage("so-comments", comments);
  renderComments(productId);
}

export function renderComments(productId) {
  const commentsContainer = document.querySelector("#commentsContainer");
  commentsContainer.innerHTML = "";

  const comments = getLocalStorage("so-comments") || {};
  const productComments = comments[productId] || [];

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
