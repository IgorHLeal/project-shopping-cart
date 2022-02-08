const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

// Requisito 5
// Concluído com ajuda do Pedro Fideles - Turma 19A
const addPrice = (acc, curr) => {
  const itemPrice = curr.innerHTML.split('$')[1];
  return acc + parseFloat(itemPrice);
  /* const subTotal = document.createElement('p');
  subTotal.className = 'total-price';
  subTotal.innerText = 'Valor total: R$';
  cart.appendChild(subTotal); */
};
// addPrice();

// Criar uma função de soma
const sumTotalPrice = () => {
  const cartItem = document.querySelectorAll('.cart__item');
  console.log((Object.values(cartItem)));
  const price = Object.values(cartItem).reduce(addPrice, 0);
  totalPrice.innerHTML = price;
};

// ------------------------------------------------ //

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

// Requisito 7
const loading = () => {
  const message = document.createElement('p');
  message.className = 'loading';
  message.textContent = 'Carregando...';
  cartItems.appendChild(message);
};

const removeLoading = () => {
  const loadingMessage = document.querySelector('.loading');
  loadingMessage.remove();
};

// Adiciona os itens na tela
const rendersProduct = async () => {
  const sectionItems = document.querySelector('.items');
  const products = await fetchProducts('computador');
  removeLoading();
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

// Requisito 3
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  sumTotalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2 concluído durante a Monitoria Summer com o Roberval na explicação para a Tamiris Shigaki
// Adiciona os itens ao carrinho
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
      cartItems.appendChild(createCartItemElement(createObject));
      saveCartItems(cartItems.innerHTML);
      sumTotalPrice();
    });
  });
}

// Requisito 4
// Concluído com ajuda do Rafael Oliveira - Turma 19A
function saveLocalStorage() {
  cartItems.innerHTML = getSavedCartItems();
  Array.from(cartItems.children).forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
}

// Requisito 6
function emptyCart() {
  const button = document.querySelector('.empty-cart');
  button.addEventListener('click', () => {
    cartItems.innerHTML = '';
    saveCartItems(cartItems.innerHTML);
    sumTotalPrice();
  });
}

window.onload = async () => { 
  loading();
  await rendersProduct();
  addButtonsEvent();
  saveLocalStorage();
  emptyCart();
  sumTotalPrice();
};
