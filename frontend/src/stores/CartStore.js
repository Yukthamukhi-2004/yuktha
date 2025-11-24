import { makeAutoObservable } from "mobx";

class CartStore {
  cart = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product) {
    this.cart.push({ ...product, cartId: Date.now() + Math.random() });
  }

  removeFromCart(cartId) {
    this.cart = this.cart.filter((item) => item.cartId !== cartId);
  }

  clearCart() {
    this.cart = [];
  }

  get itemCount() {
    return this.cart.length;
  }
}

export const cartStore = new CartStore();
