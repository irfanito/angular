import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CustomerService} from '../services/customer.service';
import {ProductService} from '../services/product.service';

import {ProductComponent} from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let customerServiceStub;
  let productServiceStub;

  beforeEach(async () => {
    customerServiceStub = jasmine.createSpyObj('customerServiceStub', ['addProduct']);
    productServiceStub = jasmine.createSpyObj('productServiceStub', ['isTheLast', 'decreaseStock']);
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        {provide: CustomerService, useValue: customerServiceStub},
        {provide: ProductService, useValue: productServiceStub}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.data = {
      title: 'title',
      description: 'description',
      photo: 'photo',
      price: 3,
      stock: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use last css class when productService.isTheLast return true', () => {
    // given
    productServiceStub.isTheLast.and.returnValue(true);
    // when
    fixture.detectChanges();
    // then
    const thumbnailLastDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.thumbnail.last'));
    expect(thumbnailLastDebugElements.length).toBeTruthy();
  });

  it('should use last css class when productService.isTheLast return false', () => {
    // given
    productServiceStub.isTheLast.and.returnValue(false);
    // when
    fixture.detectChanges();
    // then
    const thumbnailLastDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.thumbnail.last'));
    expect(thumbnailLastDebugElements.length).toBeFalsy();
  });

  it('should bind photo property to img[src]', () => {
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src.endsWith('photo')).toBeTruthy();
  });

  it('should bind title and price property to h3', () => {
    const h3: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(h3.textContent).toBe('title - €3.00');
  });

  it('should bind description to first p', () => {
    const h3: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(h3.textContent).toBe('description');
  });

  it(`should call productService.decreaseStock with data when click on button`, () => {
    // given
    spyOn(component.addToBasket, 'emit');
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    // when
    button.click();
    // then
    expect(productServiceStub.decreaseStock).toHaveBeenCalledOnceWith(component.data);
  });

  it('should emit addToBasket event when click on button', () => {
    // given
    spyOn(component.addToBasket, 'emit');
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    // when
    button.click();
    // then
    expect(component.addToBasket.emit).toHaveBeenCalledOnceWith(component.data);
  });
});
