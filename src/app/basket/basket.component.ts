import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Customer} from '../model/customer';
import {Product} from '../model/product';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$: Observable<Product[]> = of();
  customer: Customer = new Customer();

  constructor(private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    this.basket$ = this.customerService.getBasket();
  }

  checkout(): void {
    this.customerService.checkout(this.customer).subscribe(this.goToHome);
  }

  private goToHome(): void {
    this.router.navigate(['/']);
  }
}
