import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function renderCartContents() {
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
    });
  }
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
  <p class="cart-card__quantity">qty: 1 <a id= "remove${item.Id}" href=# title="Remove From Cart" data-id="${item.Id}">X</a></p> 
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
