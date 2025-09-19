import { cart, removefromCart, calculatecartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./ultility/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                            data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" 
                            data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <!-- Opções de entrega aqui -->
                </div>
            </div>
        </div>`;
});

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removefromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
    });

document.querySelectorAll('.js-update-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            console.log(productId);
        });
    });

const cartQuantity = calculatecartQuantity();

document.querySelector('.js-checkout-quantity')
    .innerHTML = `${cartQuantity} items`;