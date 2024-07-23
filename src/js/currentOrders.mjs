import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    const parent = document.querySelector(`${selector} tbody`);
    parent.innerHTML = orders.map(createOrderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}
function createOrderTemplate(order) {
    const orderTemplate = `
        <div class="order">
            <h3>Order ID: ${order.id}</h3>
            <p>Customer: ${new Date(order.orderDate).toLocaleDateString("en-US")}</p>
            <p>Product: ${order.items.length}</p>
            <p>Quantity: $${order.orderTotal}</p>
        </div>
    `;
    return orderTemplate;
}