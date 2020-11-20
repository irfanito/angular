import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/model/product';
import {CustomerService} from '../services/customer.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basket$: Observable<Product[]>;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.basket$ = this.customerService.getBasket();
  }

}
