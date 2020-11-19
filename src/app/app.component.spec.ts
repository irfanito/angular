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

  it(`should updatePrice set product stock to 4 when stock is 5`, () => {
    // given
    const product: Product = {
      title: 'title',
      description: 'description',
      photo: 'photo',
      price: 3,
      stock: 5
    };
    // when
    app.updatePrice(product);
    // then
    expect(product.stock).toEqual(4);
  });

  it(`should pass products to ProductComponent childs`, () => {
    const products: Product[] = fixture.debugElement
    .queryAll(By.directive(ProductComponent))
    .map(debugElement => debugElement.componentInstance.data);
    expect(app.products).toEqual(products);
  });
});
