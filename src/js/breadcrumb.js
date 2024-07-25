document.addEventListener("DOMContentLoaded", () => {
  const breadcrumb = document.getElementById("breadcrumb");
  const categoryElement = document.getElementById("breadcrumb-category");
  const itemElement = document.getElementById("breadcrumb-item");

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const product = urlParams.get("product");

  if (category) {
    breadcrumb.style.display = "block";
    categoryElement.textContent =
      category.charAt(0).toUpperCase() + category.slice(1) + " →";

    if (product) {
      itemElement.textContent = "Product";
      // You might want to add additional logic to display specific product information here
    } else {
      // Assuming you have a way to get the number of items
      const numberOfItems = 24; // Replace with actual count
      itemElement.textContent = `(${numberOfItems} items)`;
    }
  } else if (product) {
    breadcrumb.style.display = "block";
    categoryElement.textContent = "Product Category →";
    itemElement.textContent = "Product Name"; // Replace with actual product name if available
  }
});
// product-list

document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbCategory = document.getElementById("breadcrumb-category");
  const breadcrumbItem = document.getElementById("breadcrumb-item");
  const titleSpan = document.querySelector(".title");

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  // Update breadcrumb based on the category
  if (category) {
    breadcrumbCategory.textContent =
      category.charAt(0).toUpperCase() + category.slice(1); // Capitalize first letter
    breadcrumbItem.textContent = `(${urlParams.get("count") || 0} items)`; // Optional count parameter
    titleSpan.textContent = breadcrumbCategory.textContent;
  } else {
    // Hide breadcrumb if no category is specified
    document.getElementById("breadcrumb").style.display = "none";
  }
});
