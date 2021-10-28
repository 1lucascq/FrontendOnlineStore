if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem('commentReview'))) {
  localStorage.setItem('commentReview', JSON.stringify([]));
}

const readCartProduct = (key) => JSON.parse(localStorage.getItem(key));

const saveCartProduct = (cartProduct, key) => localStorage
  .setItem(key, JSON.stringify(cartProduct));

export const removeProduct = (product) => {
  const cartProduct = readCartProduct('cartItems');
  saveCartProduct(cartProduct.filter((item) => item.id !== product.id), 'cartItems');
};

export const addProduct = (product) => {
  const cartProduct = readCartProduct('cartItems');

  const { id, price, thumbnail, title } = product;
  const availableQuantity = product.available_quantity;
  const item = {
    id,
    title,
    price,
    thumbnail,
    availableQuantity,
    quantity: 1,
  };

  const cartProductsIds = cartProduct.map((thisItem) => thisItem.id);

  if (cartProductsIds.filter((cartItem) => cartItem === item.id) < 1) {
    if (product) {
      saveCartProduct([...cartProduct, item], 'cartItems');
    }

    if (!cartProduct) {
      saveCartProduct(item, 'cartItems');
    }
  } else {
    removeProduct(product);
    const qu = product.quantity + 1;
    const quantityValue = { ...product, pro qu}
    console.log(product);
    saveCartProduct([...cartProduct, product], 'cartItems');
  }
};

export const addProductQuantity = (product) => {
  const cardItens = readCartProduct('cardItens');
  if (product) {
    saveCartProduct([...cardItens, product], 'cardItens');
  }
};

export const getCartProduct = (key) => {
  const cartProduct = readCartProduct(key);
  return cartProduct;
};

export const saveReview = (review) => {
  const cartProduct = readCartProduct('commentReview');
  if (review) {
    saveCartProduct([...cartProduct, review], 'commentReview');
  }
};
