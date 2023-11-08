export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      this.cartItems.splice(indexOfProduct, 1);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
