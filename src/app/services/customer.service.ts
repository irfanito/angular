import { Injectable } from '@angular/core';
import { Product } from '../model/model/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  basket: Product[] = [];

  getTotal(): number {
    return this.basket
    .map(product => product.price)
    .reduce((price1, price2) => price1 + price2)
  }

  addProduct(product: Product): void {
    this.basket.push(product);
  }

  constructor() { }
}
