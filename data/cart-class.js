class Cart {
  cartItems = undefined;
  #localStorageKey = undefined;

  constructor(localStorageKey) {
  this.#localStorageKey = localStorageKey;
  this.#loadfromStorage();
  }


  #loadfromStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
  if (!this.cartItems) {
    this.cartItems = [{ 
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }}
  

  savetoStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

   addToCart(productId) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  this.savetoStorage();
  }  


   removefromCart(productId) {
  const newCart = [];

  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  this.cartItems = newCart;
  this.savetoStorage();
  }



   updatedeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  this.savetoStorage();
 }



 calculatecartQuantity() {
  let carttQuantity = 0;

  this.cartItems.forEach((cartItem) => {
    carttQuantity += cartItem.quantity;
  });

  return carttQuantity
}


   updateQuantity(productId, newQuantity) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem
    }
  });
  matchingItem.quantity = newQuantity;

  this.savetoStorage();
}
}


const cart = new Cart('cart-opp');
const BussinesCart = new Cart('cart-business');

console.log(cart);
console.log(BussinesCart);







