import { TestBed } from '@angular/core/testing';
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
});
