import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';
import createElement from '../../assets/lib/create-element.js';

export default class Main {

  constructor() {
    this.carouselHolderIni = document.body.querySelector('[data-carousel-holder]');
    this.ribbonHolder = document.body.querySelector('[data-ribbon-holder]');
    this.filters = document.body.querySelector('.filters');
    this.productGridHolder = document.body.querySelector('[data-products-grid-holder]');

  }

  carouselHolderIni(carouselHolder) {}
  filters(filters) {}
  productGridHolder(productGridHolder) {}


  async render() {
    //ribbon
    this.ribbonMenu = new RibbonMenu(categories);
    this.ribbonHolder.append(this.ribbonMenu.elem);

    //productGrid
    let response = await fetch('./products.json');
    this.products = await response.json();
    this.productsGrid = new ProductGrid(this.products);
    let containerProdGrid = document.body.querySelector('[data-products-grid-holder]');
    containerProdGrid.innerHTML = '';
    await containerProdGrid.append(this.productsGrid.elem);

    //stepSlider
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    let containerSlider = document.body.querySelector('[data-slider-holder]');
    containerSlider.append(this.stepSlider.elem);


    //carusel
    this.carousel = new Carousel(slides);
    let containerCarusel = document.body.querySelector('[data-carousel-holder]');
    await containerCarusel.append(this.carousel.elem);

    //cartIcon
    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    //cart
    this.cart = new Cart(this.cartIcon);

    //productsGrid
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: ''
    });

    this.eventListeners();

  }

  eventListeners() {
    document.body.addEventListener('product-add', (event) => {
      let productToAdd = this.products.find((product) => product.id === event.detail);
      this.cart.addProduct(productToAdd);

    });

    this.ribbonHolder.addEventListener('ribbon-select', (event) =>
      this.productsGrid.updateFilter({
        category: event.detail // значение остроты из события 'slider-change'
      }));

    let containerSlider = document.body.querySelector('[data-slider-holder]');
    containerSlider.addEventListener('slider-change',
      (event) => this.productsGrid.updateFilter({
        maxSpiciness: event.detail // значение остроты из события 'slider-change'
      }));

    let nutCheckBox = document.getElementById('nuts-checkbox');
    nutCheckBox.addEventListener('change', (event) =>
      this.productsGrid.updateFilter({
        noNuts: event.srcElement.checked // новое значение чекбокса
      }));

    let veganCheckBox = document.getElementById('vegeterian-checkbox');
    veganCheckBox.addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.srcElement.checked // новое значение чекбокса
      });
    });
  }

}
