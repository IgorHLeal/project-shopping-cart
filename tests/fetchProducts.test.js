require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
// const { results } = require('../mocks/search');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('1.1 - Teste se fetchProducts é uma função', () => {
    expect.assertions(1);

    expect(typeof fetchProducts).toBe('function');
  });

  it('1.2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async() => {
    expect.assertions(1);

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  // const { id } = require("../mocks/item");
  it('1.3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
  expect.assertions(1);

  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('1.4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    expect.assertions(1);

    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('1.5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);

    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
