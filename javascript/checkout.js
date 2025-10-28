import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-pratice.js';


Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
    resolve('value 1');
});
}),
 new Promise((resolve) => {
    loadCart(() => {
    resolve('value 2');
});
})

]).then((values) => {
  console.log(values)
  renderOrderSummary();
  renderPaymentSummary();
})



/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/