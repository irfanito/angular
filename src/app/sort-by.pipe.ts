import {Pipe, PipeTransform} from '@angular/core';
import {Product} from './model/model/product';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Product[], propertyName: string): Product[] {
    return value.sort((a, b) => this.compareTo(a[propertyName], b[propertyName]));
  }

  private compareTo(a: any, b: any): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

}
