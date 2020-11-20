import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {defaultProducts} from '../products';
import {CustomerService} from '../services/customer.service';

import {BasketComponent} from './basket.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let customerServiceStub;

  beforeEach(async () => {
    customerServiceStub = jasmine.createSpyObj('customerServiceStub', ['getBasket']);
    customerServiceStub.getBasket.and.returnValue(of(defaultProducts));
    await TestBed.configureTestingModule({
      declarations: [BasketComponent],
      providers: [
        {provide: CustomerService, useValue: customerServiceStub}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should basket component display basket`, waitForAsync(() => {
    // then
    const divDebugElement: HTMLElement = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(JSON.parse(divDebugElement.textContent)).toEqual(defaultProducts);
  }));
});
