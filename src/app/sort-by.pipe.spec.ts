import {Product} from './model/product';
import {SortByPipe} from './sort-by.pipe';

describe('SortByPipe', () => {
  let pipe: SortByPipe;

  beforeEach(() => {
    pipe = new SortByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort products by title', () => {
    // given
    const param = [initProductWithTitle('c'), initProductWithTitle('a'), initProductWithTitle('b')];
    const expected = [initProductWithTitle('a'), initProductWithTitle('b'), initProductWithTitle('c')];
    // when
    const actual = pipe.transform(param, 'title');
    // then
    expect(actual).toEqual(expected);
  });

  it('should sort products by price', () => {
    // given
    const param = [initProductWithPrice(3), initProductWithPrice(1), initProductWithPrice(2)];
    const expected = [initProductWithPrice(1), initProductWithPrice(2), initProductWithPrice(3)];
    // when
    const actual = pipe.transform(param, 'price');
    // then
    expect(actual).toEqual(expected);
  });
});

function initProductWithTitle(title: string): Product {
  return {
    title,
    description: 'description',
    photo: 'photo',
    price: 3,
    stock: 2
  };
}

function initProductWithPrice(price: number): Product {
  return {
    title: 'title',
    description: 'description',
    photo: 'photo',
    price,
    stock: 2
  };
}
