import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Product} from '../model/product';
import {CustomerService} from '../services/customer.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  total$: Observable<number> = of(0);
  sortPropertyName = 'title';
  sortPropertyNames: string[] = ['title', 'price', 'stock'];
  products$: Observable<Product[]> = of();

  constructor(private productService: ProductService, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.updateTotal();
  }

  showProduct(product: Product): boolean {
    return this.productService.isAvailable(product);
  }

  onAddToBasket(product: Product): void {
    // unsubscribe?
    this.customerService.addProduct(product).subscribe(() => this.updateTotal());
  }

  onSortByButtonClick(propertyName: string): void {
    this.sortPropertyName = propertyName;
  }

  private updateTotal(): void {
    this.total$ = this.customerService.getTotal();
  }
}
