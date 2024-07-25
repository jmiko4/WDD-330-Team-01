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
        Id: "985PR",
        NameWithoutBrand: "Alpine Guide Tent - 3-Person, 4-Season",
        Name: "The North Face Alpine Guide Tent - 3-Person, 4-Season",
        Image: "../images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
    
        SizesAvailable: {},
        "Colors": [
          {
            ColorCode: "01",
            ColorName: "Canary Yellow/High Rise Grey"
          }
        ],
        DescriptionHtmlSimple: "<strong>Closeout</strong>. Be ready for any outdoor adventure in low elevations and high-alpine environments alike with the hybrid design of The North Face&#39;s Alpine Guide four-season tent. It is made from durable, waterproof <a class=\"glossaryTermLink\" href=\"/nylon~g~1957\" title=\"Nylon: - First developed by DuPont®, nylon is a synthetic fiber with exceptional strength, abrasion resistance, stain repellency and flexibility. Used in applications from outdoor clothing and apparel to household items, nylon is frequently blended with other synthetic and natural fibers to increase durability.\">nylon</a> ripstop with an advanced DAC&#174; <a class=\"glossaryTermLink\" href=\"/featherlite~g~1835\" title=\"Featherlite: - Unusually strong aluminum poles used for tents. DAC Featherlite tent poles use a system of three small metal sleeves to give the poles added strength and flex, while keeping them as lightweight as possible. Up to 15% lighter than aluminum poles of comparable strength, Featherlite poles are the strongest joint system built for tents.\">Featherlite</a> NSL pole system and an easy to pitch design.",
        SuggestedRetailPrice: 489.0,
        Brand: {
          Id: "1440",
          Name: "The North Face"
        },
        ListPrice: 349.99,
        FinalPrice: 349.99
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
  