export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(query, id) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  if (id && query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}&q=${query}`);
    const products = await response.json();
    return products;
  }

  if (query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const products = await response.json();
    return products;
  }

  if (id) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`);
    const products = await response.json();
    return products;
  }
}
