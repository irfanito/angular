import { Injectable } from '@angular/core';
import { Product } from '../model/model/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  basket: Product[] = [];

  addProduct(product: Product): void {
    this.basket.push(product);
  }

  constructor() { }
}
