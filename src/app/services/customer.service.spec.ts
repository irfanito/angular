import { TestBed } from '@angular/core/testing';
import { Product } from '../model/model/product';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an empty basket on initialization', () => {
    expect(service.basket).toEqual([]);
  });

  it('should addProduct add product to basket', () => {
    const product: Product = initProduct();
    service.addProduct(product);
    expect(service.basket).toEqual([product]);
  });

  it('should getTotal return 5€ when 2€ product and 3€ product in basket', () => {
    service.basket = [initProduct(),initProduct()];
    service.basket[0].price = 2;
    service.basket[1].price = 3;
    expect(service.getTotal()).toEqual(5);
  });

  it('should getTotal return 0€ when empty basket', () => {
    expect(service.getTotal()).toEqual(0);
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
