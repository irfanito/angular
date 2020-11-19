import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../model/model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() data: Product;
  @Output() addToBasket = new EventEmitter<Product>();
  
  constructor() { }

  public isLast(): boolean {
    return this.data.stock === 1;
  }

  public onAddToBasket() {
    this.data.stock = this.data.stock - 1;
    this.addToBasket.emit(this.data);
  }
}
