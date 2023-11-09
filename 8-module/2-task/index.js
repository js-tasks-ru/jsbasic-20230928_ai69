import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  _productGrid;

  constructor(products) {
    this.products = products;
    this.filters = {
      category: '', maxSpiciness: 4, vegeterianOnly: false, noNuts: false
    };
    this._productGrid = this.createProductElement();
    this.render(products);
  }

  get elem() {
    return this._productGrid;
  }

  createProductElement() {
    return createElement(`<div class="products-grid">
                                       <div class="products-grid__inner"></div>
                                      </div>`);
  }

  render(products) {
    for (let x of products) {
      let card = new ProductCard(x);
      this._productGrid.firstElementChild.append(card.elem);

    }
  }

  filterIt() {
    let category = this.filters.category;
    let maxSpici = this.filters.maxSpiciness;

    return this.products
          .filter(x => (this.filters.category !== '' ? x.category === category : true)
            && x.spiciness < (maxSpici + 1)
            && (this.filters.vegeterianOnly ? x.vegeterian : true)
            && (this.filters.noNuts ? !x.nuts : true));

    /*return this.products
      .filter(x => this.filters.category !== '' ? x.category === category : x)
      .filter(x => x.spiciness < (maxSpici + 1))
      .filter(x => this.filters.noNuts ? !x.nuts : x)
      .filter(x => this.filters.vegeterianOnly ? x.vegeterian : x);*/
  }

  updateFilter(filters) {
    let productFilter = [];
    Object.assign(this.filters, filters);
    this._productGrid.firstElementChild.innerHTML = '';
    productFilter = this.filterIt();

    this.render(productFilter);

  }
}
