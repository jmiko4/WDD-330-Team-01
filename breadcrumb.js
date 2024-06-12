document.addEventListener("DOMContentLoaded", function () {
  const breadcrumb = document.getElementById("breadcrumb");

  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  const category = "Tents"; // Example category, you may need to adjust based on your URL structure

  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    breadcrumb.style.display = "none";
  } else if (window.location.pathname.includes("product_pages/index.html")) {
    breadcrumb.innerHTML = `<a href="index.html">${category}</a>`;
  } else if (window.location.pathname.includes("product_list.html")) {
    const productCount = document.querySelectorAll(".product-card").length;
    breadcrumb.innerHTML = `<a href="index.html">${category}</a> -> (${productCount} items)`;
  }
});
