import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Product } from './model/model/product';
import { ProductComponent } from './product/product.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProductComponent
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

  it(`should have 0$ total on initialization`, () => {
    expect(app.total).toEqual(0);
  });

  it(`should return 39 when total 0 and updatePrice with a 39$ product price 39`, () => {
    // given
    const product: Product = {
      title: 'Men Sweatshirt',
      description: 'C0D1NG_TH3_W0RLD BIO HOODIE - MEN',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5acf344514006a7fe670e2eb/Mockups/front.png',
      price: 39
    };
    // when
    app.updatePrice(product);
    // then
    expect(app.total).toEqual(39);
  });

  it(`should pass products to ProductComponent childs`, () => {
    const products: Product[] = fixture.debugElement
    .queryAll(By.directive(ProductComponent))
    .map(debugElement => debugElement.componentInstance.data);
    expect(app.products).toEqual(products);
  });
});
