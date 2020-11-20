import { async, TestBed, waitForAsync } from '@angular/core/testing';
import{HttpClientTestingModule, HttpTestingController}from'@angular/common/http/testing';
import { Product } from '../model/model/product';
import { defaultProducts } from '../products';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getProducts return httpClient result', waitForAsync (() => {
  // given
  const http = TestBed.inject(HttpTestingController);
  // when
  service.getProducts().subscribe((products: Product[])=>{
    expect(products).toEqual(defaultProducts);
  });
  // then
  http.expectOne('http://localhost:8080/rest/products').flush(defaultProducts)
  }));

  it('should isTheLast return false when stock is 0', () => {
    const product: Product = initProduct();
    product.stock = 0;
    expect(service.isTheLast(product)).toBeFalsy();
  });

  it('should isTheLast return false when stock is 1', () => {
    const product: Product = initProduct();
    product.stock = 1;
    expect(service.isTheLast(product)).toBeTruthy();
  });

  it('should isTheLast return false when stock is 2', () => {
    const product: Product = initProduct();
    product.stock = 2;
    expect(service.isTheLast(product)).toBeFalsy();
  });

  it('should isAvailable return false when stock is 0', () => {
    const product: Product = initProduct();
    product.stock = 0;
    expect(service.isAvailable(product)).toBeFalsy();
  });

  it('should isAvailable return false when stock is 1', () => {
    const product: Product = initProduct();
    product.stock = 1;
    expect(service.isAvailable(product)).toBeTruthy();
  });

  it('should decreaseStock return 4 when stock is 5', () => {
    // given
    const product: Product = initProduct();
    product.stock = 5;
    // when
    service.decreaseStock(product);
    // then
    expect(product.stock).toBe(4);
  });
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
