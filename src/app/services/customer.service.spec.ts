import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed, waitForAsync} from '@angular/core/testing';
import {Customer} from '../model/customer';
import {Product} from '../model/product';
import {defaultProducts} from '../products';

import {CustomerService} from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CustomerService
      ]
    });
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient with product when addProduct', waitForAsync(() => {
    // given
    const http = TestBed.inject(HttpTestingController);
    const product: Product = initProduct();
    // when
    service.addProduct(product).subscribe((res: string) => {
      expect(res).toEqual(product.title);
    });
    // then
    http.expectOne('http://localhost:8080/rest/basket').flush('title');
  }));

  it('should call httpClient with customer when checkout', waitForAsync(() => {
    // given
    const http = TestBed.inject(HttpTestingController);
    const customer: Customer = {
      name: 'name',
      address: 'address',
      creditCard: 'creditCard'
    };
    // when
    service.checkout(customer).subscribe((res: string) => {
      expect(res).toEqual(customer.name);
    });
    // then
    http.expectOne('http://localhost:8080/rest/basket/confirm').flush('name');
  }));

  it('should return http products price sum when getTotal', () => {
    // given
    const http = TestBed.inject(HttpTestingController);
    const products: Product[] = [initProduct(), initProduct()];
    products[0].price = 2;
    products[1].price = 3;
    // when
    service.getTotal().subscribe(total => expect(total).toBe(5));
    http.expectOne('http://localhost:8080/rest/basket').flush(products);
  });

  it('should return httpClient result when getProducts', waitForAsync(() => {
    // given
    const http = TestBed.inject(HttpTestingController);
    // when
    service.getBasket().subscribe((products: Product[]) => {
      expect(products).toEqual(defaultProducts);
    });
    // then
    http.expectOne('http://localhost:8080/rest/basket').flush(defaultProducts);
  }));
});

function initProduct(): Product {
  return {
    title: 'title',
    description: 'description',
    photo: 'photo',
    price: 3,
    stock: 2
  };
}
