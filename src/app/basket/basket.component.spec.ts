import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {defaultProducts} from '../products';
import {CustomerService} from '../services/customer.service';

import {BasketComponent} from './basket.component';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let customerServiceStub;

  beforeEach(async () => {
    customerServiceStub = jasmine.createSpyObj('customerServiceStub', ['getBasket', 'checkout']);
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

  it(`should checkout call customerService.checkout`, () => {
    // mock
    customerServiceStub.checkout.and.returnValue(of());
    // given
    component.customer = {
      name: 'name',
      address: 'address',
      creditCard: 'creditCard'
    };
    // when
    component.checkout();
    // then
    expect(customerServiceStub.checkout).toHaveBeenCalledOnceWith(component.customer);
  });
});
