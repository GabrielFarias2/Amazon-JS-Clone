import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

  } catch (error) {
   console.error('Falha crítica ao carregar dados do checkout.', error);
}

console.log('Dados carregados. Renderizando checkout...');
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();