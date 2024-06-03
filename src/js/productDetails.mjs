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
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productSuggestedPrice").innerText = "$"+product.SuggestedRetailPrice;
  document.querySelector("#productFinalPrice").innerText = "Now $" + product.FinalPrice;
  document.querySelector("#productDiscount").innerText = "YOU SAVE $" + Math.floor(product.SuggestedRetailPrice - product.FinalPrice);
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}