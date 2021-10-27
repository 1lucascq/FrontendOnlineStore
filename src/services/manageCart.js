if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

const readCartProduct = () => JSON.parse(localStorage.getItem('cartItems'));

const saveCartProduct = (cartProduct) => localStorage
  .setItem('cartItems', JSON.stringify(cartProduct));

export const addProduct = (product) => {
  const cartProduct = readCartProduct();
  const { id, price, thumbnail, title } = product;

  const item = {
    id,
    title,
    price,
    thumbnail,
    quantity: 1,
  };

  const cartProductsIds = cartProduct.map((thisItem) => thisItem.id);

  if (cartProductsIds.filter((cartItem) => cartItem === item.id) < 1) {
    if (product) {
      saveCartProduct([...cartProduct, item]);
    }

    if (!cartProduct) {
      saveCartProduct(item);
    }
  }
};

export const removeProduct = (product) => {
  const cartProduct = readCartProduct();
  saveCartProduct(cartProduct.filter((item) => item.id !== product.id));
};

export const getCartProduct = () => {
  const cartProduct = readCartProduct();
  return cartProduct;
};
