import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
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
      imports: [FormsModule],
      declarations: [BasketComponent],
      providers: [
        {provide: CustomerService, useValue: customerServiceStub},
        {provide: Router, useValue: jasmine.createSpyObj('router', ['navigate'])}
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

  it(`should call customerService.checkout when clicking on checkout button`, () => {
    // mock
    customerServiceStub.checkout.and.returnValue(of());
    // given
    component.customer = {
      name: 'name',
      address: 'address',
      creditCard: '123-456'
    };
    // when
    const checkoutButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    checkoutButton.click();
    // then
    expect(customerServiceStub.checkout).toHaveBeenCalledOnceWith(component.customer);
  });

  it(`should invalid name display error`, async () => {
    // given
    component.customer = {
      name: '',
      address: 'address',
      creditCard: '123-456'
    };
    // when
    await waitValidation(fixture);
    // then
    const hasErrorDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.has-error'));
    expect(hasErrorDebugElements.length).toBe(1);
  });

  it(`should invalid name disable checkout button`, async () => {
    // given
    component.customer = {
      name: '',
      address: 'address',
      creditCard: '123-456'
    };
    // when
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    // then
    const checkoutButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(checkoutButton.disabled).toBeTruthy();
  });

  it(`should invalid address display error`, async () => {
    // given
    component.customer = {
      name: 'name',
      address: '',
      creditCard: '123-456'
    };
    // when
    await waitValidation(fixture);
    // then
    const hasErrorDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.has-error'));
    expect(hasErrorDebugElements.length).toBe(1);
  });

  it(`should invalid address disable checkout button`, async () => {
    // given
    component.customer = {
      name: 'name',
      address: '',
      creditCard: '123-456'
    };
    // when
    await waitValidation(fixture);
    // then
    const checkoutButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(checkoutButton.disabled).toBeTruthy();
  });

  it(`should invalid credit card display error`, async () => {
    // given
    component.customer = {
      name: 'name',
      address: 'address',
      creditCard: '123456'
    };
    // when
    await waitValidation(fixture);
    // then
    const hasErrorDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.has-error'));
    expect(hasErrorDebugElements.length).toBe(1);
  });

  it(`should invalid credit card disable checkout button`, async () => {
    // given
    component.customer = {
      name: 'name',
      address: 'address',
      creditCard: '123456'
    };
    // when
    await waitValidation(fixture);
    // then
    const checkoutButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(checkoutButton.disabled).toBeTruthy();
  });
});

async function waitValidation(fixture: ComponentFixture<BasketComponent>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}
