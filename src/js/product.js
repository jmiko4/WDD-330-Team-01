import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // check to see if cart is empty
  // if empty create a new array and put in cart
  // if not empty add to current array and put in cart
  const cart = getLocalStorage("so-cart")
    if (cart == null) {
      setLocalStorage("so-cart", [product]);
    }
    else {
      cart.push(product)
      setLocalStorage("so-cart", cart);
    }
  
  
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
