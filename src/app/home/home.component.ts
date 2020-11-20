import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../model/model/product';
import {CustomerService} from '../services/customer.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  total$: Observable<number>;
  sortPropertyName = 'title';
  sortPropertyNames: string[] = ['title', 'price', 'stock'];
  products$: Observable<Product[]>;

  constructor(private productService: ProductService, private customerService: CustomerService) {
    this.total$ = of(0);
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.updateTotal();
  }

  public showProduct(product: Product): boolean {
    return this.productService.isAvailable(product);
  }

  public onAddToBasket(product: Product): void {
    this.customerService.addProduct(product).subscribe(() => this.updateTotal());
  }

  public onSortByButtonClick(propertyName: string): void {
    this.sortPropertyName = propertyName;
  }

  private updateTotal(): void {
    this.total$ = this.customerService.getTotal();
  }
}