import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const testList = generateLinkedList([1]);
    expect(testList).toStrictEqual({
      value: 1,
      next: {
        value: null,
        next: null,
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const testList = generateLinkedList([1, 2]);
    expect(testList).toMatchSnapshot();
  });
});
