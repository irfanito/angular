import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Product } from './model/model/product';
import { ProductComponent } from './product/product.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProductComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have total 0`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.total).toEqual(0);
  });

  it(`updatePrice should return 10 when total 0 and produc price 39`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = fixture.componentInstance;

    // given
    const product: Product = {
      title: 'Men Sweatshirt',
      description: 'C0D1NG_TH3_W0RLD BIO HOODIE - MEN',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5acf344514006a7fe670e2eb/Mockups/front.png',
      price: 39
    };
    // when
    appComponent.updatePrice(product);
    // then
    expect(appComponent.total).toEqual(39);
  });

  it(`should pass first product to first ProductComponent`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = fixture.componentInstance;
    fixture.detectChanges();
    const productComponent: ProductComponent = fixture.debugElement.query(By.directive(ProductComponent)).componentInstance;
    const product: Product = {
      title: 'Men Sweatshirt',
      description: 'C0D1NG_TH3_W0RLD BIO HOODIE - MEN',
      photo: 'https://s3.eu-central-1.amazonaws.com/balibart-s3/Products/5acf344514006a7fe670e2eb/Mockups/front.png',
      price: 39
    };
    expect(productComponent.data).toEqual(product);
  });
});
