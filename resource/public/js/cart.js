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
};
