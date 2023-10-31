import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #ribbon;


  constructor(categories) {
    this.categories = categories;
    this.render();
  }
  get elem() {
    return this.#ribbon;
  }
  render() {
    this.#ribbon = createElement(`<div class="ribbon">`);
    this.#ribbon.append(createElement(`<button class=
      "ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`));
    let nav = createElement(`<nav class="ribbon__inner">`);

    this.categories.map(r => nav.append(createElement(
      `<a href="#" class="ribbon__item" data-id="${r.id}">${r.name}</a>`)));
    nav.children[0].classList.add("ribbon__item_active");
    this.#ribbon.append(nav);
    this.#ribbon.append(createElement(
      `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`));

    this.#ribbon.addEventListener("click", this.onClickArrow);
    nav.addEventListener("click", this.onClickNav);
    nav.addEventListener("product-add", (event) => {});
  }

  onClickNav = (event) => {
    event.preventDefault();

    let button = event.target.closest("a");
    if (button) {
      this.#ribbon.querySelector('.ribbon__item_active').classList.remove("ribbon__item_active");
      button.classList.add("ribbon__item_active");
      let selectEvent = new CustomEvent('ribbon-select', {
        detail: button.dataset.id,
        bubbles: true,
      });

      this.elem.dispatchEvent(selectEvent);
    }
  }

  onClickArrow = (event) => {

    const btnLeftRight = event.target.closest(".ribbon__arrow");
    let ribbonInner = this.#ribbon.children[1];
    if (!btnLeftRight) {
      return;
    }

    switch (btnLeftRight.classList[1]) {
    case "ribbon__arrow_left":

      ribbonInner.scrollBy(-350, 0);

      ribbonInner.scrollLeft < 1 && this.changeArrowVisibility();

      break;
    case "ribbon__arrow_right":


      let scrollRight = ribbonInner.scrollWidth -
                                 ribbonInner.scrollLeft -
                                 ribbonInner.clientWidth;

      ribbonInner.scrollBy(350, 0);
      scrollRight < 1 && this.changeArrowVisibility();


      break;
    }
  }
  changeArrowVisibility() {
    this.#ribbon.children[0].classList.toggle("ribbon__arrow_visible");
    this.#ribbon.children[2].classList.toggle("ribbon__arrow_visible");
  }



}

