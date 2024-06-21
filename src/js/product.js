import { getParam } from "./utils.mjs";
import { findProductById } from "./externalServices.mjs";
import productDetails from "./productDetails.mjs";
import { addProductToCart } from "./productDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { animateCartIcon } from "./utils.mjs";
import { addComment, renderComments } from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);
loadHeaderFooter();
renderComments(productId);

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}
// add comment button event handler
function addCommentHandler() {
  const addCommentButton = document.getElementById("addComment");
  // Create input field
  const inputField = document.createElement("input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("id", "commentInput");

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", submitCommentHandler);
  submitButton.classList.add("submitComment");

  // Append input field and submit button to the document
  const commentContainer = document.getElementById("commentsContainer");
  commentContainer.append(inputField);
  commentContainer.append(submitButton);
  addCommentButton.classList.add("hidden");
}

// submit comment button event handler
function submitCommentHandler() {
  const addCommentButton = document.getElementById("addComment");
  const commentInput = document.getElementById("commentInput");
  const comment = commentInput.value;
  addComment(comment, productId);
  commentInput.value = "";
  addCommentButton.classList.remove("hidden");
}

// add listener to Add Comment button
document
  .getElementById("addComment")
  .addEventListener("click", addCommentHandler);

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

document.getElementById("addToCart").addEventListener("click", animateCartIcon);
