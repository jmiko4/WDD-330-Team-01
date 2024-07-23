import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
document.addEventListener("DOMContentLoaded", async function () {
  productList(".product-list", getParam("category"));
  loadHeaderFooter();
});

document.getElementById("sortByName").addEventListener("click", sortByName);

document.getElementById("sortByPrice").addEventListener("click", sortByPrice);

// Function to sort by brand name
function sortByName() {
  productList(".product-list", getParam("category"), "name");
}

// Function to sort by price
function sortByPrice() {
  productList(".product-list", getParam("category"), "price");
}
