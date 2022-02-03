/* const { id } = require("../mocks/item"); */

const fetchItem = async (id) => {
  try {
    const url = (`https://api.mercadolibre.com/items/${id}`);
  /* if (!id) {
    throw new Error('You must provide an url');
  } */
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
