import { Injectable } from '@angular/core';
import { Product } from '../model/model/product';
import { defaultProducts } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): Product[] {
    return defaultProducts;
  }

  constructor() { }
}
