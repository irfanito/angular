import { Component, OnInit } from '@angular/core';
import { Product } from './model/model/product';
import { defaultProducts } from './products';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'This is my first component';
  total: number;
  
  constructor(private productService: ProductService, private customerService: CustomerService){
    this.total = 0;
  }

  public get products(): Product[] {
    return this.productService.getProducts();
  }

  public showProduct(product: Product): boolean {
    return this.productService.isAvailable(product);
  }

  public updatePrice(product: Product): void {
    this.total = this.customerService.getTotal();
  }
}
