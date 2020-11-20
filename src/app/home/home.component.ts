import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/model/product';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title: string = 'This is my first component';
  total: number;
  sortPropertyName: string = 'title';
  sortPropertyNames: string[] = ['title','price','stock'];
  products$: Observable<Product[]>;
  
  constructor(private productService: ProductService, private customerService: CustomerService){
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
     this.updateTotal();
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
