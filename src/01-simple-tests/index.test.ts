import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 9, action: Action.Add })).toBe(17);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 17, b: 9, action: Action.Subtract })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 9, action: Action.Multiply })).toBe(72);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 72, b: 9, action: Action.Divide })).toBe(8);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 2,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(8);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 8, b: 9, action: 'Wrong action' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'wrongArg1', b: 9, action: Action.Subtract }),
    ).toBe(null);
    expect(
      simpleCalculator({ a: 9, b: 'wrongArg2', action: Action.Subtract }),
    ).toBe(null);
    expect(
      simpleCalculator({
        a: 'wrongArg1',
        b: 'wrongArg2',
        action: Action.Subtract,
      }),
    ).toBe(null);
  });
});
