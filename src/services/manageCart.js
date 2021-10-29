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

  if (!cartProductsIds.includes(id)) {
    if (product) {
      saveCartProduct([...cartProduct, item], 'cartItems');
    }
    if (!cartProduct) {
      saveCartProduct(item, 'cartItems');
    }
  } else {
    const productLocalStorege = cartProduct.find((it) => it.id === product.id);
    productLocalStorege.quantity += 1;
    saveCartProduct([...cartProduct, productLocalStorege], 'cartItems');
  }
};

export const addProductQuantity = (product) => {
  const cardItens = readCartProduct('cartItems');
  if (product) {
    saveCartProduct([...cardItens, product], 'cartItems');
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
