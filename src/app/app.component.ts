import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
  
  constructor(private productService: ProductService, private customerService: CustomerService){
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
     this.customerService.getTotal().subscribe(res => {
       this.total = res;
     })
  }

  public showProduct(product: Product): boolean {
    return this.productService.isAvailable(product);
  }

  public updateTotal() {
    this.customerService.getTotal().subscribe(res => {
      this.total = res;
    });
  }

  public onSortByButtonClick(propertyName: string): void {
    this.sortPropertyName = propertyName;
  }
}
