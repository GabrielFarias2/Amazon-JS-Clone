import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  try {
    // throw 'Error 1'
     await loadProductsFetch();

   const value = await new Promise((resolve, reject) => {
    // throw 'Error 2'
      loadCart(() => {
    // reject('Error 3')
      resolve('value 2');
});
});
  } catch (error) {
    console.log('unexpected error. Please try again')
  };

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