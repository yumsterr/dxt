import { QuantityStringPipe } from './quantity-string.pipe';

describe('QuantityStringPipe', () => {
  it('create an instance', () => {
    const pipe = new QuantityStringPipe();
    expect(pipe).toBeTruthy();
  });
});
