import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Customer} from '../model/customer';
import {Product} from '../model/product';

@Injectable()
export class CustomerService {

  private static getTotalFromProducts(products: Product[]): number {
    return products
      .map(product => product.price)
      .reduce((price1, price2) => price1 + price2);
  }

  constructor(private http: HttpClient) {
  }

  public getBasket(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/rest/basket');
  }

  getTotal(): Observable<number> {
    return this.getBasket().pipe(map(CustomerService.getTotalFromProducts));
  }

  addProduct(product: Product): Observable<string> {
    return this.http.post<string>('http://localhost:8080/rest/basket', product);
  }

  checkout(customer: Customer): Observable<string> {
    return this.http.post<string>('http://localhost:8080/rest/basket/confirm', customer);

  }
}
