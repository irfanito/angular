import { Injectable } from '@angular/core';
import { Product } from '../model/model/product';

@Injectable()
export class CustomerService {
  basket: Product[] = [];

  getTotal(): number {
    if(!this.basket.length){
      return 0;
    }
    return this.basket
    .map(product => product.price)
    .reduce((price1, price2) => price1 + price2)
  }

  addProduct(product: Product): void {
    this.basket.push(product);
  }

  constructor() { }
}
