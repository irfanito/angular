import {Pipe, PipeTransform} from '@angular/core';
import {Product} from './model/model/product';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Product[], propertyName: string): Product[] {
    if (!value.length) {
      return [];
    }
    let sorted: Product[];
    if (typeof value[0][propertyName] === 'string') {
      sorted = value
        .sort((product1, product2) => product1[propertyName].localeCompare(product2[propertyName]));
    } else {
      sorted = value
        .sort((product1, product2) => product1[propertyName] - product2[propertyName]);
    }
    return sorted;
  }

}
