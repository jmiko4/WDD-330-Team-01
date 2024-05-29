import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
document.addEventListener("DOMContentLoaded", async function () {
  productList(".product-list", getParam("category"));
  loadHeaderFooter();
});
