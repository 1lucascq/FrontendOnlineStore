if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem('commentReview'))) {
  localStorage.setItem('commentReview', JSON.stringify([]));
}

const readFavoriteProduct = (key) => JSON.parse(localStorage.getItem(key));

const saveFavoriteProduct = (favoriteProduct, key) => localStorage
  .setItem(key, JSON.stringify(favoriteProduct));

export const addProduct = (product) => {
  const favoriteProduct = readFavoriteProduct('cartItems');
  if (product) {
    saveFavoriteProduct([...favoriteProduct, product], 'cartItems');
  }
};
// Ajustar trackId
export const removeProduct = (product) => {
  const favoriteProduct = readFavoriteProduct('cartItems');
  saveFavoriteProduct(favoriteProduct.filter((s) => s.trackId !== product.trackId));
};

export const getFavoriteProduct = (key) => {
  const favoriteProduct = readFavoriteProduct(key);
  return favoriteProduct;
};

export const saveReview = (review) => {
  const favoriteProduct = readFavoriteProduct('commentReview');
  if (review) {
    saveFavoriteProduct([...favoriteProduct, review], 'commentReview');
  }
};
