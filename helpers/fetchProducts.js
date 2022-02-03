const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;

  if (!item) {
    throw new Error('You must provide an url');
  }
  // Função refatorada e concluída com ajuda da Luá - Turma 19 - Tribo A
  // try {
  const response = await fetch(url);
  const data = await response.json();
  return data;
  /*  } catch (error) {
    return error;
   } */
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
