import { Product } from './model/model/product';
import { SortByPipe } from './sort-by.pipe';

describe('SortByPipe', () => {
  let pipe: SortByPipe;
  
  beforeEach(()=>{
    pipe =new SortByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort products by title', () => {
    // given
    const param = [initProduct('c'), initProduct('a'), initProduct('b')];
    const expected = [initProduct('a'), initProduct('b'), initProduct('c')];
    // when
    const actual = pipe.transform(param, 'title');
    // then
    expect(actual).toEqual(expected);
  });
});

function initProduct(title: string): Product {
  return {
    title,
    description: 'description',
    photo: 'photo',
    price: 3,
    stock: 2
  };
}
