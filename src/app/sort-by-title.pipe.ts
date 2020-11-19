import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './model/model/product';

@Pipe({
  name: 'sortByTitle'
})
export class SortByTitlePipe implements PipeTransform {

  transform(value: Product[]): Product[] {
    return value
      .sort((product1, product2) => product1.title.localeCompare(product2.title));
  }

}
