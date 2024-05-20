import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  await loadHeaderFooter();
  productList(".product-list", "tents");
});
