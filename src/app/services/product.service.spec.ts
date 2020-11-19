import { TestBed } from '@angular/core/testing';
import { Product } from '../model/model/product';
import { defaultProducts } from '../products';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getProducts return products', () => {
    expect(service.getProducts()).toBe(defaultProducts);
  });

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
