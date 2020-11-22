import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../model/product';
import {CustomerService} from '../services/customer.service';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() data: Product;
  @Output() addToBasket = new EventEmitter<void>();

  constructor(private productService: ProductService, private customerService: CustomerService) {
  }

  isLast(): boolean {
    return this.productService.isTheLast(this.data);
  }

  onAddToBasket(): void {
    this.customerService.addProduct(this.data).subscribe(() => {
      this.productService.decreaseStock(this.data);
      this.addToBasket.emit();
    });
  }
}
