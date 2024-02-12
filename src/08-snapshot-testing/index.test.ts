// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const newList = generateLinkedList([1]);
    expect(newList).toStrictEqual({
      value: 1,
      next: {
        value: null,
        next: null,
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const newList = generateLinkedList([1, 2]);
    expect(newList).toMatchSnapshot();
  });
});
