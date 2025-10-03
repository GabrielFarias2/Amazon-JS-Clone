import { addToCart, cart, loadfromStorage } from '../../data/cart.js';

describe('test suit: Add to Cart', () => {
  it('Add a existing prodocut to the cart', () => {
    spyOn(localStorage, 'setItem');

     spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    
    loadfromStorage();


  });

  it('Add a new product to the cart', () => {
    spyOn(localStorage, 'setItem');


    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    
    loadfromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});