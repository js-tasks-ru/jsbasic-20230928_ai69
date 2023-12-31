import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (document.body.offsetWidth <= 767 || !this.elem.offsetWidth) { return; }

    let cartBoundedBox = this.elem.getBoundingClientRect();
    let iniYCoordinate = cartBoundedBox.y;
    let containerRight = document.querySelector('.container').
                                  getBoundingClientRect().right;

    if (iniYCoordinate < window.scrollY) {
      this.elem.style.position = 'fixed';
      this.elem.style.left = document.body.offsetWidth - containerRight - cartBoundedBox.width < 30 ?
        document.documentElement.clientWidth - this.elem.offsetWidth - 10 + 'px' :
        containerRight + 20 + 'px';

    } else {
      this.elem.style.position = 'absolute';
      this.elem.style.left = '';
    }
  }
}
