import { setLocalStorage, getLocalStorage } from "./utils.mjs";
export default function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  //if cart items has a map method then wrap in if

  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    //when x is clicked need to pull the id of item to be removed
    cartItems.forEach((item) => {
      const removeLink = document.getElementById(`remove${item.Id}`);
      removeLink.addEventListener("click", (e) => {
        //remove appropriate item from cart
        const newCart = cartItems.filter(
          (c) => c.Id != e.target.getAttribute("data-id")
        );

        //restore cart in localStorage
        setLocalStorage("so-cart", newCart);

        //re-render the cart list
        renderCartContents();
      });
      const quantityBox = document.getElementById(`quantity${item.Id}`);
      quantityBox.addEventListener("change", (e) => {
        //update quantity in cart
        const newQuantity = cartItems.find(
          (c) => c.Id == e.target.getAttribute("data-id")
        );

        newQuantity.quantity = e.target.value;
        //restore cart in localStorage
        setLocalStorage("so-cart", cartItems);
        //render total

        //render cart with updated quantity
        updateCartTotal(cartItems);
        
      });
    });
  }

  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <input type="number" min="0" size="2" id="quantity${item.Id}" data-id="${item.Id}" value="${item.quantity}"> <a id= "remove${item.Id}" href=# title="Remove From Cart" data-id="${item.Id}">X</a></p> 
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

// cart update with Total
function updateCartTotal(items) {
  var cartFooter = document.querySelector(".cart-footer");
  cartFooter.classList.remove("hide");

  // calculate the total
  var total = 0;
  items.forEach(function (item) {
    total += item.FinalPrice * item.quantity;
  });

  // display total
  var totalHTML = document.createElement("p");
  totalHTML.textContent = `Total: $${total}`;
  totalHTML.classList.add("cart-total");

  //remove existing total display
  var existingTotal = cartFooter.querySelector(".cart-total");
  if (existingTotal) {
    cartFooter.removeChild(existingTotal);
  }

  // insert total into cart footer
  cartFooter.appendChild(totalHTML);
}