import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../model/model/product';
import {CustomerService} from '../services/customer.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() data: Product;
  @Output() addToBasket = new EventEmitter<Product>();

  constructor(private productService: ProductService, private customerService: CustomerService){}

  public isLast(): boolean {
    return this.productService.isTheLast(this.data);
  }

  public onAddToBasket() {
    this.productService.decreaseStock(this.data);
    this.addToBasket.emit(this.data);
  }
}
