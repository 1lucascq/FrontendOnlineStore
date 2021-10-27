if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

const readFavoriteProduct = () => JSON.parse(localStorage.getItem('cartItems'));

const saveFavoriteProduct = (favoriteProduct) => localStorage
  .setItem('cartItems', JSON.stringify(favoriteProduct));

export const addProduct = (product) => {
  const favoriteProduct = readFavoriteProduct();
  if (product) {
    saveFavoriteProduct([...favoriteProduct, product]);
  }
};
// Ajustar trackId
export const removeProduct = (product) => {
  const favoriteProduct = readFavoriteProduct();
  saveFavoriteProduct(favoriteProduct.filter((s) => s.trackId !== product.trackId));
};

export const getFavoriteProduct = () => {
  const favoriteProduct = readFavoriteProduct();
  return favoriteProduct;
};
