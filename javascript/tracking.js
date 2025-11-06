/* Em scripts/tracking.js */

// Importa os 'models' e 'utils'
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { loadCartFetch, calculatecartQuantity } from "../data/cart.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function loadTrackingPage() {
  try {
    // 1. Carrega dados essenciais em paralelo
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

  } catch (error) {
    console.error('Falha crítica ao carregar a página de rastreio.', error);
  }

  // 2. Atualiza o ícone do carrinho no cabeçalho
  updateCartIconQuantity();
  
  // 3. Lê os parâmetros da URL (como você fez!)
  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const orderId = urlParams.get('orderId');
  const productId = urlParams.get('productId');

  // 4. Encontra os dados correspondentes
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  if (!matchingOrder) {
    console.error('Pedido não encontrado.');
    return;
  }

  let matchingOrderProduct;
  matchingOrder.products.forEach((product) => {
    if (product.productId === productId) {
      matchingOrderProduct = product;
    }
  });

  if (!matchingOrderProduct) {
    console.error('Produto no pedido não encontrado.');
    return;
  }

  const productDetails = getProduct(productId);
  if (!productDetails) {
    console.error('Detalhes do produto não encontrados.');
    return;
  }

  // 5. Gera o HTML dinâmico
  const deliveryDate = dayjs(matchingOrderProduct.estimatedDeliveryTime).format('dddd, MMMM D');
  const orderDate = dayjs(matchingOrder.orderTime);
  const deliveryTime = dayjs(matchingOrderProduct.estimatedDeliveryTime);
  const currentTime = dayjs();

  // --- LÓGICA DA BARRA DE PROGRESSO (Lição 18o) ---
  const totalTime = deliveryTime.diff(orderDate, 'millisecond');
  const timeFromOrder = currentTime.diff(orderDate, 'millisecond');
  let percentProgress = (timeFromOrder / totalTime) * 100;

  // Garante que a barra não passe de 100%
  if (percentProgress > 100) {
    percentProgress = 100;
  }

  let status = 'Preparing';
  let statusClass = 'progress-label-preparing';
  
  if (percentProgress >= 50 && percentProgress < 100) {
    status = 'Shipped';
    statusClass = 'progress-label-shipped';
  } else if (percentProgress >= 100) {
    status = 'Delivered';
    statusClass = 'progress-label-delivered';
  }
  // --- FIM DA LÓGICA DA BARRA ---

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${deliveryDate}
    </div>

    <div class="product-info">
      ${productDetails.name}
    </div>

    <div class="product-info">
      Quantity: ${matchingOrderProduct.quantity}
    </div>

    <img class="product-image" src="${productDetails.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${status === 'Preparing' ? 'current-status' : ''}">
        Preparing
      </div>
      <div class="progress-label ${status === 'Shipped' ? 'current-status' : ''}">
        Shipped
      </div>
      <div class="progress-label ${status === 'Delivered' ? 'current-status' : ''}">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  // 6. Injeta o HTML na página
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  // 7. Adiciona listeners de cabeçalho
  function updateCartIconQuantity() {
    try {
      const cartQuantity = calculatecartQuantity();
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    } catch (e) {
      document.querySelector('.js-cart-quantity').innerHTML = 0;
    }
  }

  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchText = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${searchText}`;
  });
}

loadTrackingPage();