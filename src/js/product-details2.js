// Function to populate color swatches
function populateColorSwatches(product) {
  const colorSwatchesContainer = document.getElementById("colorSwatches");
  const colorSelector = document.getElementById("colorSelector");

  colorSwatchesContainer.innerHTML = ""; // Clear existing swatches
  colorSelector.innerHTML = ""; // Clear existing options

  product.Colors.forEach((color) => {
    // Create color swatch
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = getColorHex(color.ColorCode); // Use a function to map color code to hex
    swatch.title = color.ColorName; // Tooltip for swatch
    swatch.onclick = () => selectColor(color); // Add click event for selection
    colorSwatchesContainer.appendChild(swatch);

    // Create color option
    const option = document.createElement("option");
    option.value = color.ColorCode;
    option.textContent = color.ColorName;
    colorSelector.appendChild(option);
  });
}

// Function to convert color code to hex (or use a pre-defined mapping)
function getColorHex(colorCode) {
  const colorMap = {
    "01": "#FF9C00", // Example color hex
    // Add other color codes and their hex values
  };
  return colorMap[colorCode] || "#FFFFFF"; // Default to white if color code not found
}

// Function to handle color selection
function selectColor(color) {
  const colorSwatches = document.querySelectorAll(".color-swatch");
  colorSwatches.forEach((swatch) => swatch.classList.remove("selected"));
  document
    .querySelector(`.color-swatch[style*="${getColorHex(color.ColorCode)}"]`)
    .classList.add("selected");
  document.getElementById("productColorName").textContent = color.ColorName;
  // Optionally update product image or other details based on color
}

// Fetch product details from JSON and populate swatches
function fetchProductDetails() {
  // Example product data (replace with actual fetch from your API)
  const product = {
    Id: "985RF",
    NameWithoutBrand: "Talus Tent - 4-Person, 3-Season",
    Name: "The North Face Talus Tent - 4-Person, 3-Season",
    Image:
      "../images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
    Colors: [
      {
        ColorCode: "01",
        ColorName: "Golden Oak/Saffron Yellow",
      },
    ],
    DescriptionHtmlSimple:
      "The North Face Talus four-person tent offers durable construction, a roomy interior, and an advanced Featherlite NSL pole system for easy pitching.",
    SuggestedRetailPrice: 299.0,
    Brand: {
      Id: "1440",
      Name: "The North Face",
    },
    ListPrice: 199.99,
    FinalPrice: 199.99,
  };

  document.getElementById("productName").textContent = product.Name;
  document.getElementById(
    "productSuggestedPrice"
  ).textContent = `$${product.SuggestedRetailPrice}`;
  document.getElementById(
    "productFinalPrice"
  ).textContent = `$${product.FinalPrice}`;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("productColorName").textContent = "Select a color";

  // Populate colors
  populateColorSwatches(product);
}

// Fetch product details on page load
document.addEventListener("DOMContentLoaded", fetchProductDetails);
