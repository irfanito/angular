import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './model/model/product';
import { defaultProducts } from './products';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title: string = 'This is my first component';
  total: number;
  sortPropertyName: string = 'title';
  sortPropertyNames: string[] = ['title','price','stock'];
  products$: Observable<Product[]>;
  total$: Observable<number>;
  
  constructor(private productService: ProductService, private customerService: CustomerService){
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.total$ = this.customerService.getTotal();
  }

  public showProduct(product: Product): boolean {
    return this.productService.isAvailable(product);
  }

  public onSortByButtonClick(propertyName: string): void {
    this.sortPropertyName = propertyName;
  }
}
