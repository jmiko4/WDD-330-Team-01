document.addEventListener("DOMContentLoaded", () => {
  const productData = [
    {
      Id: "880RR",
      NameWithoutBrand: "Ajax Tent - 3-Person, 3-Season",
      Name: "Marmot Ajax Tent - 3-Person, 3-Season",
      Image:
        "../images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
      Colors: [
        {
          ColorCode: "01",
          ColorName: "Pale Pumpkin/Terracotta",
        },
      ],
      DescriptionHtmlSimple:
        "Get out and enjoy nature with Marmot&#39;s Ajax tent, featuring a smart design with durable, waterproof construction and two doors for easy access.",
      SuggestedRetailPrice: 300.0,
      ListPrice: 199.99,
      FinalPrice: 199.99,
    },
    {
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
        '<strong>Closeout</strong>. Enjoy a fun night under stars with your favorite people in The North Face&#39;s Talus four-person tent, featuring durable construction with a roomy interior, an advanced DAC <a class="glossaryTermLink" href="/featherlite~g~1835" title="Featherlite: - Unusually strong aluminum poles used for tents. DAC Featherlite tent poles use a system of three small metal sleeves to give the poles added strength and flex, while keeping them as lightweight as possible. Up to 15% lighter than aluminum poles of comparable strength, Featherlite poles are the strongest joint system built for tents.">Featherlite</a> NSL pole system and an easy to pitch design.',
      SuggestedRetailPrice: 299.0,
      ListPrice: 199.99,
      FinalPrice: 199.99,
    },
    {
      Id: "989CG",
      NameWithoutBrand: "Talus Tent - 3-Person, 3-Season",
      Name: "The North Face Talus Tent - 3-Person, 3-Season",
      Image:
        "../images/tents/the-north-face-talus-tent-3-person-3-season-in-golden-oak-saffron-yellow~p~989cg_01~320.jpg",
      Colors: [
        {
          ColorCode: "01",
          ColorName: "Golden Oak/Saffron Yellow",
        },
      ],
      DescriptionHtmlSimple:
        '<strong>Closeout</strong>. Enjoy a fun night under stars with your favorite people in The North Face&#39;s Talus three-person tent, featuring durable construction with a roomy interior, an advanced DAC <a class="glossaryTermLink" href="/featherlite~g~1835" title="Featherlite: - Unusually strong aluminum poles used for tents. DAC Featherlite tent poles use a system of three small metal sleeves to give the poles added strength and flex, while keeping them as lightweight as possible. Up to 15% lighter than aluminum poles of comparable strength, Featherlite poles are the strongest joint system built for tents.">Featherlite</a> NSL pole system and an easy to pitch design.',
      SuggestedRetailPrice: 270.0,
      ListPrice: 179.99,
      FinalPrice: 179.99,
    },
    {
      Id: "985PR",
      NameWithoutBrand: "Alpine Guide Tent - 3-Person, 4-Season",
      Name: "The North Face Alpine Guide Tent - 3-Person, 4-Season",
      Image:
        "../images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
      Colors: [
        {
          ColorCode: "01",
          ColorName: "Canary Yellow/High Rise Grey",
        },
      ],
      DescriptionHtmlSimple:
        '<strong>Closeout</strong>. Be ready for any outdoor adventure in low elevations and high-alpine environments alike with the hybrid design of The North Face&#39;s Alpine Guide four-season tent. It is made from durable, waterproof <a class="glossaryTermLink" href="/nylon~g~1957" title="Nylon: - First developed by DuPont®, nylon is a synthetic fiber with exceptional strength, abrasion resistance, stain repellency and flexibility. Used in applications from outdoor clothing and apparel to household items, nylon is frequently blended with other synthetic and natural fibers to increase durability.">nylon</a> ripstop with an advanced DAC&#174; <a class="glossaryTermLink" href="/featherlite~g~1835" title="Featherlite: - Unusually strong aluminum poles used for tents. DAC Featherlite tent poles use a system of three small metal sleeves to give the poles added strength and flex, while keeping them as lightweight as possible. Up to 15% lighter than aluminum poles of comparable strength, Featherlite poles are the strongest joint system built for tents.">Featherlite</a> NSL pole system and an easy to pitch design.',
      SuggestedRetailPrice: 489.0,
      ListPrice: 349.99,
      FinalPrice: 349.99,
    },
    {
      Id: "880RT",
      NameWithoutBrand: "Ajax Tent - 2-Person, 3-Season",
      Name: "Marmot Ajax Tent - 2-Person, 3-Season",
      Image:
        "../images/tents/marmot-ajax-tent-2-person-3-season-in-pale-pumpkin-terracotta~p~880rt_01~320.jpg",
      Colors: [
        {
          ColorCode: "01",
          ColorName: "Pale Pumpkin/Terracotta",
        },
      ],
      DescriptionHtmlSimple:
        "<strong>Excess</strong>. Get out and enjoy nature with Marmot&#39;s Ajax tent, featuring a smart design with durable, waterproof construction and two doors for easy access.",
      SuggestedRetailPrice: 275.0,
      ListPrice: 179.99,
      FinalPrice: 179.99,
    },
    {
      Id: "344YJ",
      NameWithoutBrand: "Rimrock Tent - 2-Person, 3-Season",
      Name: "Cedar Ridge Rimrock Tent - 2-Person, 3-Season",
      Image:
        "../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg",
      Colors: [
        {
          ColorCode: "01",
          ColorName: "Rust/Clay",
        },
      ],
      DescriptionHtmlSimple:
        '<strong><a class="glossaryTermLink" href="/closeouts~g~2312" title="Closeouts: - Closeouts are items that may be last year\'s model or color. While closeout items are often offered at discounted prices, the products themselves are always high quality. Closeout items can include anything from shoes, underwear and apparel, to rugs, tents and outdoor equipment. Closeouts are often a high percentage off the retail price.">Closeouts</a></strong>. Lightweight and ready for adventure, this Cedar Ridge Rimrock tent boasts a weather-ready design that includes a tub-style floor and factory-sealed <a class="glossaryTermLink" href="/rain-fly~g~2021" title="Rain Fly: - Rain fly is an additional piece of fabric (attached or unattached) that is placed over the top of the tent to provide weatherproofness. The rain fly is usually made of polyester or nylon and is sometimes coated for additional water repellency.">rain fly</a>.',
      SuggestedRetailPrice: 89.99,
      ListPrice: 69.99,
      FinalPrice: 69.99,
    },
  ];

  // Function to set product details
  function setProductDetails(product) {
    document.getElementById("title").innerText = product.Name;
    document.getElementById("productName").innerText = product.Name;
    document.getElementById("productNameWithoutBrand").innerText =
      product.NameWithoutBrand;
    document.getElementById("productImage").src = product.Image;
    document.getElementById(
      "productSuggestedPrice"
    ).innerText = `$${product.SuggestedRetailPrice.toFixed(2)}`;
    document.getElementById(
      "productFinalPrice"
    ).innerText = `$${product.FinalPrice.toFixed(2)}`;
    document.getElementById("productDescriptionHtmlSimple").innerHTML =
      product.DescriptionHtmlSimple;

    const colorSwatchesContainer = document.getElementById("colorSwatches");
    colorSwatchesContainer.innerHTML = ""; // Clear existing swatches
    product.Colors.forEach((color) => {
      const swatch = document.createElement("div");
      swatch.className = "swatch";
      swatch.style.backgroundColor = getColorCode(color.ColorName); // Use a helper function to get the color code if needed
      swatch.dataset.color = color.ColorName;
      swatch.addEventListener("click", () => {
        document
          .querySelectorAll(".swatch")
          .forEach((s) => s.classList.remove("selected"));
        swatch.classList.add("selected");
        document.getElementById("productColorName").innerText = color.ColorName;
      });
      colorSwatchesContainer.appendChild(swatch);
    });
  }

  // Initialize with the first product
  setProductDetails(productData[0]);

  // Add event listeners for product selection (if any)
  const productSelect = document.getElementById("productSelect");
  if (productSelect) {
    productData.forEach((product, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = product.NameWithoutBrand;
      productSelect.appendChild(option);
    });

    productSelect.addEventListener("change", (event) => {
      const selectedProductIndex = event.target.value;
      setProductDetails(productData[selectedProductIndex]);
    });
  }
});

// Helper function to get the color code if ColorName is not a valid CSS color
function getColorCode(colorName) {
  const colorMap = {
    "Pale Pumpkin/Terracotta": "#F4A460",
    "Golden Oak/Saffron Yellow": "#FFD700",
    "Canary Yellow/High Rise Grey": "#FFFF99",
    "Rust/Clay": "#B7410E",
    // Add more color mappings as needed
  };
  return colorMap[colorName] || colorName; // Return the color name if it's a valid CSS color
}
