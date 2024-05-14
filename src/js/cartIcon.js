document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");

  function animateCartIcon() {
    // Add the class to change the color
    cartIcon.classList.add("adding-item");

    // Remove the class after the transition ends
    setTimeout(() => {
      cartIcon.classList.remove("adding-item");
    }, 500); // 500ms matches the CSS transition duration
  }

  // Example: trigger the animation when an item is added to the cart
  document
    .getElementById("addToCart")
    .addEventListener("click", animateCartIcon);
});
