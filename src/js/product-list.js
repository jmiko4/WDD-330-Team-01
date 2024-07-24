// productList.mjs

export default async function productList(containerSelector, category, sortBy) {
  const response = await fetch("../tents.json"); // Adjust path if necessary
  const data = await response.json();

  // Apply sorting
  if (sortBy === "name") {
    data.sort((a, b) => a.Name.localeCompare(b.Name));
  } else if (sortBy === "price") {
    data.sort((a, b) => a.FinalPrice - b.FinalPrice);
  }

  // Render products
  const container = document.querySelector(containerSelector);
  container.innerHTML = data
    .map(
      (tent) => `
    <div class="product">
      <img src="${tent.Image}" alt="${tent.Name}" />
      <h3>${tent.Name}</h3>
      <p>${tent.DescriptionHtmlSimple}</p>
      <p>Brand: ${tent.Brand.Name}</p>
      <p>Price: $${tent.FinalPrice.toFixed(2)}</p>
    </div>
  `
    )
    .join("");
}
