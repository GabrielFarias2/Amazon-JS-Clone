import { cart, removefromCart, calculatecartQuantity, updateQuantity, updatedeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../ultility/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";



export function renderOrderSummary() {

  let cartSummaryHTML = '';

  function saveQuantity(productId) {
    const container = document.querySelector(
      `.js-product-quantity-${productId}`
    );

    const quantityInput = container.querySelector('.quantity-input');
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('A quantidade deve ser entre 0 a 999.');
      return;
    }

    updateQuantity(productId, newQuantity);

    container.classList.remove('is-editing-quantity');
    container.querySelector('.quantity-label').innerHTML = newQuantity;

    const cartQuantity = calculatecartQuantity();
    document.querySelector('.js-checkout-quantity')
      .innerHTML = `${cartQuantity} items`;
  }

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const selectedDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    let deliveryDateString = '';
    if (selectedDeliveryOption) {
      const today = dayjs();
      const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days');
      deliveryDateString = deliveryDate.format('dddd, MMMM D');
    } else {
      deliveryDateString = 'No delivery option selected';
      console.warn('Delivery option not found for cart item:', cartItem);
}

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">${matchingProduct.getPrice()}</div>

            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link"
                  data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}"
                  data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" 
                  data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    const today = dayjs();

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      // Marcar como checked se for a opção selecionada no carrinho
      const checked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            ${checked}>
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removefromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();

        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(
          `.js-product-quantity-${productId}`
        );
        container.classList.add('is-editing-quantity');
      });
    });

  const cartQuantity = calculatecartQuantity();

  document.querySelector('.js-checkout-quantity')
    .innerHTML = `${cartQuantity} items`;

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        saveQuantity(productId);
      });
    });

  document.querySelectorAll('.quantity-input')
    .forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const productId = input.dataset.productId;
          saveQuantity(productId);
        }
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updatedeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}

