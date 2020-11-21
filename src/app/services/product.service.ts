import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  decreaseStock(product: Product): void {
    product.stock = product.stock - 1;
  }

  isAvailable(product: Product): boolean {
    return product.stock > 0;
  }

  isTheLast(product: Product): boolean {
    return product.stock === 1;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/rest/products');
  }
}
