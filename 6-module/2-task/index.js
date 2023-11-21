import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.product = product;

    this._elem = this.render();

  }

  get elem() {
    return this._elem;
  }

  getSourceHtml() {
    return `<div class="card">
        <div class="card__top">
          <img src="" class="card__image" alt="product">
          <span class="card__price"></span>
        </div>
      <div class="card__body">
        <div class="card__title"></div>
          <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
  }

  insertData(div) {
    div.querySelector(
      "img.card__image"
    ).src = `/assets/images/products/${this.product.image}`;
    div.querySelector(
      "span.card__price"
    ).textContent = `€${this.product.price.toFixed(2)}`;
    div.querySelector("div.card__title").textContent = this.product.name;
  }

  render() {
    let div = createElement(this.getSourceHtml);
    this.insertData(div);

    div.addEventListener("click", this.onClick);
    div.addEventListener("product-add", (event) => {

    });
    return div;
  }

  onClick = (event) => {
    let button = event.target.closest("button.card__button");
    if (button) {

      let addEvent = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true,
      });

      this._elem.dispatchEvent(addEvent);
    }
  };
}
