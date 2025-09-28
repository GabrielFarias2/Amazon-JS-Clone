import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js"; 

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let ShippingPriceCents = 0;


  cart.forEach(( cartItem ) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCents
  });

  console.log(productPriceCents);
  console.log(ShippingPriceCents);
} 
