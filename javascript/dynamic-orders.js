/* Em scripts/orders.js */

// Importa os 'models' e 'utils'
import { orders } from '../data/orders.js'; // O arquivo que você me mandou!
import { getProduct, loadProductsFetch } from '../data/products.js';
import { loadCartFetch, calculatecartQuantity, addToCart } from '../data/cart.js';
import { formatCurrency } from './ultility/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// Função principal assíncrona
async function loadOrdersPage() {
  try {
    // 1. Carrega dados essenciais em paralelo
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

  } catch (error) {
    console.error('Falha crítica ao carregar a página de pedidos.', error);
  }

  // 2. Atualiza o ícone do carrinho no cabeçalho
  updateCartIconQuantity();

  let ordersHTML = '';

  // 3. Itera sobre cada PEDIDO
  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D, YYYY');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-products-grid">
          ${generateProductsHTML(order)}
        </div>
      </div>
    `;
  });

  // 4. Função auxiliar para gerar o HTML de cada PRODUTO
  function generateProductsHTML(order) {
    let productsHTML = '';

    order.products.forEach((orderProduct) => {
      const product = getProduct(orderProduct.productId);
      
      // Se o produto não for encontrado, pula este item
      if (!product) {
        console.warn(`Produto não encontrado: ${orderProduct.productId}`);
        return;
      }

      const deliveryTimeString = dayjs(orderProduct.estimatedDeliveryTime).format('MMMM D');

      productsHTML += `
        <div class="product-item-container">
          <img class="product-image" src="${product.image}">
          
          <div class="product-details">
            <div class="product-name">${product.name}</div>
            <div class="delivery-date">Arriving on: ${deliveryTimeString}</div>
            <div class="product-quantity">Quantity: ${orderProduct.quantity}</div>
            
            <button class="buy-again-button button-primary js-buy-again"
              data-product-id="${product.id}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
          
          <div class="track-package-container">
            <button class="track-package-button button-secondary js-track-package"
              data-order-id="${order.id}"
              data-product-id="${product.id}">
              Track package
            </button>
          </div>
        </div>
      `;
    });
    return productsHTML;
  }

  // 5. Injeta o HTML gerado na página
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  // 6. Função para atualizar o ícone do carrinho
  function updateCartIconQuantity() {
    try {
      const cartQuantity = calculatecartQuantity();
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    } catch (error) {
      console.warn('Não foi possível calcular o carrinho (carrinho vazio?):', error);
      document.querySelector('.js-cart-quantity').innerHTML = 0;
    }
  }

  // 7. Lição 18m: Adiciona interatividade ao "Buy it again"
  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      
      // Feedback visual (opcional, mas bom)
      button.querySelector('.buy-again-message').innerHTML = 'Added!';
      setTimeout(() => {
        button.querySelector('.buy-again-message').innerHTML = 'Buy it again';
      }, 1000);

      // Atualiza o ícone do carrinho no cabeçalho
      updateCartIconQuantity();
    });
  });

  // 8. Lição 18n: Adiciona interatividade ao "Track package"
  document.querySelectorAll('.js-track-package').forEach((button) => {
    button.addEventListener('click', () => {
      const { orderId, productId } = button.dataset;
      window.location.href = `tracking.html?orderId=${orderId}&productId=${productId}`;
    });
  });

  // 9. Lição 18p: Adiciona interatividade à barra de busca
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchText = document.querySelector('.js-search-bar').value;
    window.location.href = `amazon.html?search=${searchText}`;
  });
}

loadOrdersPage();