import { Injectable } from '@angular/core';
import { Product } from '../model/model/product';
import { defaultProducts } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }
  
  getProducts(): Product[] {
    return defaultProducts;
  }

  constructor() { }
}
