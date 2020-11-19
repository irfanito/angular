import { Component } from '@angular/core';
import { Product } from './model/model/product';
import { defaultProducts } from './products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'This is my first component';
  total: number;
  products: Product[];
  
  constructor(){
    this.total = 0;
    this.products = defaultProducts;
  }

  public updatePrice(product: Product): void {
    this.total = this.total + product.price
  }
}
