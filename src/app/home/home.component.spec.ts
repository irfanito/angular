import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';
import { Product } from '../model/model/product';
import { ProductComponent } from '../product/product.component';
import { defaultProducts } from '../products';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { SortByPipe } from '../sort-by.pipe';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let customerServiceStub;
  let productServiceStub;

  beforeEach(async () => {
    customerServiceStub = jasmine.createSpyObj('customerServiceStub', ['getTotal']);
    productServiceStub = jasmine.createSpyObj('productServiceStub', ['getProducts', 'isAvailable', 'isTheLast']);
    customerServiceStub.getTotal.and.returnValue(of(0));
    defaultMock(productServiceStub);
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ProductComponent,
        SortByPipe
      ],
      providers: [
        {provide: CustomerService, useValue:customerServiceStub},
        {provide: ProductService, useValue:productServiceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(homeComponent).toBeTruthy();
  });

  it(`should pass products with stock greather than 0 to ProductComponent childs`, () => {
    // mock
    const productsObservable: Observable<Product[]> = productServiceStub.getProducts();
    productsObservable.subscribe(products => {
      productServiceStub.isAvailable
      .withArgs(products[0])
      .and
      .returnValue(false);
      // expected
      let [firstProduct, ...expected] = products;
      // when
      fixture.detectChanges();
      // then
      const actual: Product[] = fixture.debugElement.queryAll(By.directive(ProductComponent))
        .map(debugElement => debugElement.componentInstance.data);
      expect(actual).toEqual(expected);
    });
  });

  it(`should sort by price when click on price button`, () => {
    // mock
    const [product0, product1, product2, product3]: Product[] = defaultProducts;
    // expected
    let expected: Product[] = [product3, product2, product0, product1];
    // when
    const priceButton: HTMLImageElement = fixture.debugElement.query(By.css('#priceButton')).nativeElement;
    priceButton.click();
    fixture.detectChanges();
      // then
    const actual: Product[] = fixture.debugElement.queryAll(By.directive(ProductComponent))
      .map(debugElement => debugElement.componentInstance.data);
    expect(actual).toEqual(expected);
  });
});

function defaultMock(productServiceStub: any) {
  productServiceStub.getProducts.and.returnValue(of([...defaultProducts]));
  productServiceStub.isAvailable.and.returnValue(true);
  productServiceStub.isTheLast.and.returnValue(true);
}


