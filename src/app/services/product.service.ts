import { Injectable } from '@angular/core';
import { Product } from '../model/model/product';
import { defaultProducts } from '../products';

@Injectable()
export class ProductService {

  decreaseStock(product: Product): void {
    product.stock = product.stock - 1;
  }
  
  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }
  
  getProducts(): Product[] {
    return defaultProducts;
  }

  constructor() { }
}
