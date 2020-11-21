import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() data: Product;
  @Output() addToBasket = new EventEmitter<Product>();

  constructor(private productService: ProductService) {
  }

  isLast(): boolean {
    return this.productService.isTheLast(this.data);
  }

  onAddToBasket(): void {
    this.productService.decreaseStock(this.data);
    this.addToBasket.emit(this.data);
  }
}
