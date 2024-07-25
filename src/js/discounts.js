// Select the container where product listings are rendered.
const productContainer = document.querySelector(".product-listing-container");

// Fetch the JSON data from the provided URL.
const fetchProducts = async () => {
  try {
    const response = await fetch("./json/tents.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const products = await response.json();
    displayDiscounts(products);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

// Function to calculate and display discounts.
const displayDiscounts = (products) => {
  products.forEach((product) => {
    // Calculate the discounted price.
    const discountPercentage = 25; // Example discount percentage.
    const discountedPrice = product.ListPrice * (1 - discountPercentage / 100);

    // Create elements to display product information and discount.
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productName = document.createElement("h2");
    productName.textContent = product.NameWithoutBrand;

    const productImage = document.createElement("img");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    const originalPrice = document.createElement("p");
    originalPrice.classList.add("original-price");
    originalPrice.textContent = `Original Price: $${product.ListPrice.toFixed(
      2
    )}`;

    const discountElement = document.createElement("p");
    discountElement.classList.add("discount");
    discountElement.textContent = `Discounted Price: $${discountedPrice.toFixed(
      2
    )}`;

    // Create a new element for the discount percentage.
    const discountBadge = document.createElement("div");
    discountBadge.classList.add("discount-badge");
    discountBadge.textContent = `${discountPercentage}% OFF`;

    // Append elements to the product card.
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(originalPrice);
    productCard.appendChild(discountElement);
    productCard.appendChild(discountBadge); // Append the discount badge

    // Append the product card to the product container.
    productContainer.appendChild(productCard);
  });
};

// Call the function to fetch products and display discounts.
fetchProducts();
