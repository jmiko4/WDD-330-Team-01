// Import necessary functions (assuming you have a getLocalStorage function to fetch cart data)
import { getLocalStorage } from './utils.mjs';

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
        this.displayOrderTotals(); // Display initial item total
    },

    calculateItemSummary: function() {
        // Calculate the total amount of the items in the cart and the number of items
        let total = 0;
        this.list.forEach(item => {
            total += item.price * item.quantity;
        });
        this.itemTotal = total;
    },
    
    calculateOrderTotal: function() {
        // Calculate shipping
        const itemCount = this.list.reduce((total, item) => total + item.quantity, 0);
        this.shipping = 10 + (itemCount - 1) * 2;

        // Calculate tax
        this.tax = this.itemTotal * 0.06;

        // Calculate order total
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        // Display the totals
        this.displayOrderTotals();
    },
    
    displayOrderTotals: function() {
        // Display the totals in the order summary section
        const outputElement = document.querySelector(this.outputSelector);
        outputElement.innerHTML = `
            <div class="summary-detail">
                <span class="summary-label">Item Subtotal (${this.list.length}):</span>
                <span>$${this.itemTotal.toFixed(2)}</span>
            </div>
            <div class="summary-detail">
                <span class="summary-label">Shipping Estimate:</span>
                <span>$${this.shipping.toFixed(2)}</span>
            </div>
            <div class="summary-detail">
                <span class="summary-label">Tax:</span>
                <span>$${this.tax.toFixed(2)}</span>
            </div>
            <div class="summary-detail">
                <span class="summary-label">Order Total:</span>
                <span>$${this.orderTotal.toFixed(2)}</span>
            </div>
        `;
    }
}

export default checkoutProcess;
