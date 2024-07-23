import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (Array.isArray(cartItems)) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    cartItems.forEach((item) => {
      const removeLink = document.getElementById(`remove${item.Id}`);
      removeLink.addEventListener("click", (e) => {
        const newCart = cartItems.filter(
          (c) => c.Id != e.target.getAttribute("data-id")
        );

        setLocalStorage("so-cart", newCart);
        renderCartContents();
      });

      const quantityBox = document.getElementById(`quantity${item.Id}`);
      quantityBox.addEventListener("change", (e) => {
        const newQuantity = cartItems.find(
          (c) => c.Id == e.target.getAttribute("data-id")
        );

        newQuantity.quantity = e.target.value;
        setLocalStorage("so-cart", cartItems);
        updateCartTotal(cartItems);
      });

      // Add event listener for "Add to Wishlist" button
      const wishlistButton = document.querySelector(`.add-to-wishlist[data-id="${item.Id}"]`);
      wishlistButton.addEventListener("click", (e) => {
        moveItemToWishlist(item.Id);
      });
    });
    renderWishlistContents();
  }

  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      // src="${item.Image ?? item.Images?.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: <input type="number" min="0" size="2" id="quantity${item.Id}" 
  data-id="${item.Id}" value="${item.quantity}"> 
  <a id= "remove${item.Id}" href=# title="Remove From Cart" data-id="${item.Id}">❌</a></p> 
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="add-to-wishlist" data-id="${item.Id}">Move to Wishlist</button>
</li>`;

  return newItem;
}

function updateCartTotal(items) {
  const cartFooter = document.querySelector(".cart-footer");
  cartFooter.classList.remove("hide");

  let total = 0;
  items.forEach((item) => {
    total += item.FinalPrice * item.quantity;
  });

  // display total
  var totalHTML = document.createElement("p");
  totalHTML.textContent = `Total: $${total.toFixed(2)}`;
  totalHTML.classList.add("cart-total");

  const existingTotal = cartFooter.querySelector(".cart-total");
  if (existingTotal) {
    cartFooter.removeChild(existingTotal);
  }

  cartFooter.appendChild(totalHTML);
}

const moveItemToWishlist = (itemId) => {
  const cartItems = getLocalStorage("so-cart");
  const wishlistItems = getLocalStorage("so-wishlist") || [];

  const itemToMove = cartItems.find((item) => item.Id == itemId);

  if (itemToMove) {
    const updatedCart = cartItems.filter((item) => item.Id != itemId);
    setLocalStorage("so-cart", updatedCart);

    wishlistItems.push(itemToMove);
    setLocalStorage("so-wishlist", wishlistItems);

    renderCartContents();
    renderWishlistContents();
  }
};

const moveItemToCart = (itemId) => {
  const cartItems = getLocalStorage("so-cart") || [];
  const wishlistItems = getLocalStorage("so-wishlist");

  const itemToMove = wishlistItems.find((item) => item.Id == itemId);

  if (itemToMove) {
    const updatedWishlist = wishlistItems.filter((item) => item.Id != itemId);
    setLocalStorage("so-wishlist", updatedWishlist);

    cartItems.push(itemToMove);
    setLocalStorage("so-cart", cartItems);

    renderCartContents();
    renderWishlistContents();
  }
};

function renderWishlistContents() {
  const wishlistItems = getLocalStorage("so-wishlist");

  if (Array.isArray(wishlistItems)) {
    const htmlItems = wishlistItems.map((item) => wishlistItemTemplate(item));
    document.querySelector(".wishlist").innerHTML = htmlItems.join("");

    wishlistItems.forEach((item) => {
      const moveButton = document.getElementById(`move${item.Id}`);
      moveButton.addEventListener("click", (e) => {
        moveItemToCart(e.target.getAttribute("data-id"));
      });
    });
  }
}

function wishlistItemTemplate(item) {
  return `
  <li class="wishlist-card divider">
    <a href="#" class="wishlist-card__image">
      <img src="${item.Image ?? item.Images?.PrimarySmall}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="wishlist-card__color">${item.Colors[0].ColorName}</p>
    <p class="wishlist-card__price">$${item.FinalPrice}</p>
    <p class="wishlist-card__move"><button id="move${item.Id}" data-id="${item.Id}" title="Move to Cart">Move to Cart</button></p>
  </li>`;
}


