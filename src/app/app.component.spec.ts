import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {AppComponent} from './app.component';
import {Product} from './model/model/product';
import {ProductComponent} from './product/product.component';
import {defaultProducts} from './products';
import {CustomerService} from './services/customer.service';
import {ProductService} from './services/product.service';
import {SortByPipe} from './sort-by.pipe';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let customerServiceStub;
  let productServiceStub;

  beforeEach(async () => {
    customerServiceStub = jasmine.createSpyObj('customerServiceStub', ['getTotal']);
    productServiceStub = jasmine.createSpyObj('productServiceStub', ['getProducts', 'isAvailable', 'isTheLast']);
    defaultMock(productServiceStub);
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProductComponent,
        SortByPipe
      ],
      providers: [
        {provide: CustomerService, useValue: customerServiceStub},
        {provide: ProductService, useValue: productServiceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should ngOnInit call productService.getProducts`, () => {
    // when
    app.ngOnInit();
    // then
    expect(app.products$).toBe(productServiceStub.getProducts());
  });

  it(`should ngOnInit call customerService.getTotal`, () => {
    // mock
    const total$ = of(10);
    customerServiceStub.getTotal.and.returnValue(total$);
    // when
    app.ngOnInit();
    // then
    expect(app.total$).toBe(total$);
  });

  it(`should updatePrice call customerService.addProduct`, () => {
    // mock
    const total$ = of(10);
    customerServiceStub.getTotal.and.returnValue(total$);
    // when
    app.updatePrice(initProduct());
    // then
    expect(app.total$).toEqual(total$);
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

function initProduct(): Product {
  return {
    title: 'title',
    description: 'description',
    photo: 'photo',
    price: 3,
    stock: 2
  };
}


