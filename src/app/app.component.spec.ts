import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Product } from './model/model/product';
import { ProductComponent } from './product/product.component';
import { SortByPipe } from './sort-by.pipe';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ProductComponent,
        SortByPipe
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

  it(`should have 5$ total when 2$ total and updatePrice with a 3$ product`, () => {
    // given
    app.total = 2
    const product: Product = {
      title: 'title',
      description: 'description',
      photo: 'photo',
      price: 3,
      stock: 0
    };
    // when
    app.updatePrice(product);
    // then
    expect(app.total).toEqual(5);
  });

  it(`should pass products with stock greather than 0 to ProductComponent childs`, () => {
    app.products[0].stock = 0;
    fixture.detectChanges();
    const products: Product[] = fixture.debugElement
    .queryAll(By.directive(ProductComponent))
    .map(debugElement => debugElement.componentInstance.data);
    let [firstProduct, ...otherProducts] = app.products;
    expect(otherProducts).toEqual(products);
  });
});
