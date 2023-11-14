import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let nulProduct = product ?? 'Ничего не добавлено';

    if (nulProduct === 'Ничего не добавлено') {
      alert(nulProduct);
      return;
    }
    let cartItem = {
      product: product,
      count: 1,
    };

    if (this.isEmpty()) {
      this.cartItems.push(cartItem);

    } else if (this.isProductOff(product)) {
      this.cartItems.push(cartItem);

    } else {
      this.updateProductCount(product.id, 1);
      return;
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let indexOfProduct = this.cartItems.findIndex(items => items.product.id === productId);

    if (indexOfProduct === -1) {
      alert("в корзине нет такого блюда");
      return;
    } else {
      this.cartItems[indexOfProduct].count += amount;
    }
    if (this.cartItems[indexOfProduct].count === 0) {
      let productToDel = this.cartItems[indexOfProduct];
      this.cartItems.splice(indexOfProduct, 1);
      this.onProductUpdate(productToDel);
      return;
    }

    this.onProductUpdate(this.cartItems[indexOfProduct]);
  }


  isProductOff(product) {
    return !this.cartItems.find(items => items.product.id === product.id);

  }

  isEmpty() {
    return this.cartItems.length === 0;

  }

  getTotalCount() {
    return this.cartItems
      .reduce((acc, item) => acc + item.count, 0);

  }

  getTotalPrice() {
    return this.cartItems
      .reduce((acc, item) => acc + item.product.price * item.count, 0);

  }
  renderProduct(product, count) {
    let itemTotalPrice = product.price * count;
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${itemTotalPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  successPostText() {
    return createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    let modalProductBody = createElement('<div></div>');
    this.cartItems.forEach(item => modalProductBody
      .append(this.renderProduct(item.product, item.count)));
    modalProductBody.append(this.renderOrderForm());
    this.modal.setBody(modalProductBody);
    this.modal.open();

    modalProductBody.addEventListener('click', this.onClickPlusMinus);

    let postForm = document.body.querySelector('.cart-form');
    postForm.addEventListener('submit', this.onSubmit);

  }
  onClickPlusMinus = (event) => {
    let button = event.target.closest('.cart-counter__button');
    if (button) {

      switch (button.classList[1]) {
      case 'cart-counter__button_plus':
        this.updateProductCount(button.closest('.cart-product').dataset.productId, 1);
        break;
      case 'cart-counter__button_minus':
        this.updateProductCount(button.closest('.cart-product').dataset.productId, -1);
        break;
      }
    }
  };

  onProductUpdate(cartItem) {
    if (document.body.className === 'is-modal-open') {
      if (this.isEmpty()) {
        this.modal.close();
        this.cartIcon.update(this);
        return;
      }

      let productId = cartItem.product.id;
      let modalBody = document.body.querySelector('.modal__body');
      if (cartItem.count === 0) {
        let productToDel = modalBody.querySelector(`[data-product-id="${productId}"]`);
        productToDel.outerHTML = '';
        return;

      }

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2) }`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      this.cartIcon.update(this);
    } else {
      this.cartIcon.update(this);
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    let postForm = document.body.querySelector('.cart-form');
    let buttonSubmit = postForm.querySelector('[type=submit]');
    buttonSubmit.classList.add('is-loading');
    let modalBody = document.querySelector('.modal__body');

    let response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(postForm),
    })
      .then(response => {
        if (response.ok) {
          this.cartItems = [];
          this.cartIcon.update(this);
          modalBody.innerHTML = '';
          this.modal.setTitle('Success!');
          this.modal.setBody(this.successPostText());
          //let json = await response.json();
        } else {
          alert("Ошибка HTTP: " + response.status);
        }
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();

  }

}

