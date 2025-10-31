import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  console.log('load page')

  await loadProductsFetch();

  await new Promise((resolve) => {
      loadCart(() => {
      resolve('value 2');
})
})
  renderOrderSummary();
  renderPaymentSummary();
};

loadPage();
/*
Promise.all([
  loadProductsFetch(),
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
*/

/*
loadProducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/  