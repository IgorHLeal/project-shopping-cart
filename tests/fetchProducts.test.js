require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const { results } = require('../mocks/search');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se a função fetchProducts é uma função', () => {
    expect.assertions(1);

    expect(typeof fetchProducts).toBe('function');
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento \'computador\' a função fetch é chamada', async() => {
    expect.assertions(1);

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Verifica se ao chamar a função fetchProducts com o argumento \'computador\', a função fetch utiliza o endpoint \'https://api.mercadolibre.com/sites/MLB/search?q=computadorq\'', async () => {
  expect.assertions(1);

  const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Verifica se o retorno da função fetchProducts com o argumento \'computador\' é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    expect.assertions(1);

    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });

  it('Verifica se  ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);

    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
