import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
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

  it('should bind title and price property to h3', () => {
    const h3: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement
    expect(h3.textContent).toBe('title - 3$');
  });

  it('should bind photo property to img.src', () => {
    const img: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement
    expect(img.src.endsWith('photo')).toBeTruthy();
  });

  it('should emit addToBasket event when click on button', () => {
    spyOn (component.addToBasket,'emit');
    const button: HTMLImageElement = fixture.debugElement.query(By.css('button')).nativeElement
    button.click();
    expect(component.addToBasket.emit).toHaveBeenCalledOnceWith(component.data);
  });

  it(`should onAddToBasket set product stock to 4 when stock is 5`, () => {
    // given
    component.data.stock = 5
    // when
    component.onAddToBasket();
    // then
    expect(component.data.stock).toEqual(4);
  });

  it(`should onAddToBasket set product stock to 4 when stock is 5`, () => {
    // given
    component.data.stock = 5
    // when
    component.onAddToBasket();
    // then
    expect(component.data.stock).toEqual(4);
  });

  it('should isLast return false when stock is 0', () => {
    component.data.stock = 0
    expect(component.isLast()).toBeFalsy();
  });

  it('should isLast return false when stock is 1', () => {
    component.data.stock = 1
    expect(component.isLast()).toBeTruthy();
  });

  it('should isLast return false when stock is 2', () => {
    component.data.stock = 2
    expect(component.isLast()).toBeFalsy();
  });

  it('should use last css class when isLast return true', () => {
    spyOn (component,'isLast').and.returnValue(true);
    const thumbnailLastDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.thumbnail.last'))
    expect(thumbnailLastDebugElements).toBeTruthy();
  });

  it('should use last css class when isLast return false', () => {
    spyOn (component,'isLast').and.returnValue(false);
    const thumbnailLastDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.thumbnail.last'))
    expect(thumbnailLastDebugElements.length).toBeFalsy();
  });
});
