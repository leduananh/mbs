var cart = {
  addToCart(event) {
    const PATH = '/addToCart';
    const productContainer = event.target.parentElement.parentElement;
    const { productId } = productContainer.dataset;

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
