const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

  if (!item) {
    throw new Error('You must provide an url');
  }
  try {
  const response = await fetch(url);
  const data = await response.json();
  return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
