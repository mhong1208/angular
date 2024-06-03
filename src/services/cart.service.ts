// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'shoppingCart';

  constructor() { }

  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: any) {
    const cart = this.getCart();
    const index = cart.findIndex((item: any) => item._id === product._id);
    if (index === -1) {
      cart.push({ ...product, quantity: 1 });
    } else {
      cart[index].quantity += 1;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  updateQuantity(productId: string, quantity: number) {
    const cart = this.getCart();
    const index = cart.findIndex((item: any) => item._id === productId);
    if (index !== -1) {
      cart[index].quantity = quantity;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  removeFromCart(productId: string) {
    let cart = this.getCart();
    cart = cart.filter((item: any) => item._id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.storageKey);
  }
}
