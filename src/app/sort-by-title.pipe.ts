import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTitle'
})
export class SortByTitlePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
