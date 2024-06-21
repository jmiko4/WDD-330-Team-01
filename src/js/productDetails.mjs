import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
let product = {};

export default async function productDetails(productId){ 
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  
  if (product) {
    // once we have the product details we can render out the HTML
    renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } else {
    // Display error message and hide "Add to Cart" button
    alert("Product not found.");
    document.getElementById("addToCart").style.display = "none";
  }
}
export function addProductToCart(product) {
    // check to see if cart is empty
    // if empty create a new array and put in cart
    // if not empty add to current array and put in cart
    const cart = getLocalStorage("so-cart");
    if (cart == null) {
      // set quantity to one
      product.quantity = 1;
      setLocalStorage("so-cart", [product]);
    } else {
      const sameItem = cart.find((item)=> item.Id == product.Id);

      // debugger;

        if (sameItem != null ) {
          sameItem.quantity = sameItem.quantity + 1;
        }

        else {
         product.quantity = 1
         cart.push(product);
        }
        setLocalStorage("so-cart", cart);
    }
}
  
export function renderProductDetails(){
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
  
  document.querySelector("#productSuggestedPrice").innerText = "$" + product.SuggestedRetailPrice;
  document.querySelector("#productFinalPrice").innerText = "Now $" + product.FinalPrice;
  document.querySelector("#productDiscount").innerText = "YOU SAVE $" + Math.floor(product.SuggestedRetailPrice - product.FinalPrice);
  document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}

export function addComment(comment, productId) {
  // Get the existing comments from local storage
  const comments = getLocalStorage("so-comments") || {};

  // Initialize the comments array for the specific product if it is undefined
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