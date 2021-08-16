// import { addToCart } from "../../../controller/cart.controller";

var cart = {
  addToCart(productId) {
    const PATH = '/addToCart';

    utilities
      .post(PATH, JSON.stringify({ productId }))
      .then((data) => {
        const { amount } = data;
        utilities.updateView('#cart-amount', amount);
      })
      .catch((error) => {
        console.dir(error);
      });
  },

  removeCartItem(event,id){
    const PATH = '/removeCartItem';

    cart.rowToRemove = event.target.parentElement.parentElement;

    utilities
    .post(PATH, JSON.stringify({ productId:id }))
    .then((data) => {
      debugger;
      const { cartResponde } = data;
      
      const cartData = cart.toCart(cartResponde)

      const grandMoney = cart.grandTotalCount(cartData);

      utilities.updateView('#grandTotal', utilities.vndFormat(grandMoney));

      cart.rowToRemove.remove();

      delete cart['rowToRemove'];
    })
    .catch((error) => {
      console.dir(error);
    });
  },

  clearCart(){
    const PATH = '/clearCart';

    utilities
    .get(PATH)
    .then((data) => {
     
      const { isClear } = data;
      
      if(!isClear) return alert('khong clear');

      utilities.updateView('#tableBody', '');

      utilities.updateView('#cart-amount', 0);
    })
    .catch((error) => {
      console.dir(error);
    });
  },

  cartStringify(cart) {
    return JSON.stringify(Array.from(cart.entries()));
  },

  toCart(cartStringify) {
    return new Map(JSON.parse(cartStringify));
  },

  getCartAmount(cart) {
    return Array.from(cart.values())
      .map((incart) => incart.amount)
      .reduce((count, curVal) => count + curVal);
  },

  grandTotalCount(cart){
   return Array.from(cart.values()).map(item=>item.amount * item.product.price).reduce((count,cur)=>count+cur)
  },


};
