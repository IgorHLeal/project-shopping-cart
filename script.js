// const { fetchProducts } = require("./helpers/fetchProducts");
const sectionItems = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Requisito 1
function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const rendersProduct = async () => {
  const products = await fetchProducts('computador');
  const { results } = products;
  // Fazer um map no results pra mudar o valor das chaves da função createProductItemElement
  // colocar esse map em uma const
  // Fazer um forEach nessa const com o map
  results.forEach((item) => { sectionItems.appendChild(createProductItemElement(item)); });
  return results;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2 concluído durante a Monitoria Summer com o Roberval na explicação para a Tamiris Shigaki
function addButtonsEvent() {
  const items = document.querySelectorAll('.item');
  items.forEach((item) => {
    const sku = getSkuFromProductItem(item);
    const button = item.querySelector('button');
    button.addEventListener('click', async () => {
      const object = await fetchItem(sku);
      const createObject = {
        sku: object.id,
        name: object.title,
        salePrice: object.price,
      };
      
      const cartItems = document.querySelector('.cart__items');
      cartItems.appendChild(createCartItemElement(createObject));
    });
    // console.log(sku);
  });
}  

window.onload = async () => { 
  await rendersProduct();
  addButtonsEvent();
};
