import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './model/model/product';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Product[], propertyName: string): Product[] {
    return value
    .sort((product1, product2) => {
      return product1[propertyName].localeCompare(product2[propertyName]);
      });
  }

}
