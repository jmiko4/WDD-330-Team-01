// product-card_price is where we want the discount to be displayed.
const productPriceElement = document.querySelector('.product-card_price');

// Function to display the disocunt for a product.
const displayDiscount = (product) => 
{
    // Calculate the discounted price.
    const discountedPrice = product.ListedPrice * 0.75;

    // Create a new element to display the discount.
    const discountElement = document.createElement('p');
    discountElement.classList.add('disocunt'); // Add a class to the element.

    // Set the text content of the element.
    discountedElement.textContent = `Discounted Price: $${discountedPrice.toFixed(2)}`;

    // Append the element to the product price element.
    productPriceElement.insertAdjacentElement('afterend', discountElement) 
};

// I guess at how to extract the data from the JSON file.
const product = {
    ListedPrice: src.jsontents.ListPrice
}


// Call the function to display the discount
displayDiscount(product);