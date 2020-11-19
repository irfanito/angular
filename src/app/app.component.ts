import { Component } from '@angular/core';
import { Product } from './model/model/product';
import { defaultProducts } from './products';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ProductService,CustomerService]
})
export class AppComponent {
  title: string = 'This is my first component';
  total: number;
  products: Product[];
  
  constructor(private productService: ProductService, private customerService: CustomerService){
    this.total = 0;
    this.products = defaultProducts;
  }

  public updatePrice(product: Product): void {
    this.total = this.total + product.price
  }
}
