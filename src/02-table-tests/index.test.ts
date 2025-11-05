// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 17, b: 9, action: Action.Subtract, expected: 8 },
  { a: 25, b: 8, action: Action.Subtract, expected: 17 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 8, b: 9, action: Action.Multiply, expected: 72 },
  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 72, b: 9, action: Action.Divide, expected: 8 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
  { a: 1, b: 10, action: Action.Exponentiate, expected: 1 },
];

const testCasesWithWrongArguments = [
  { a: 'wrongArg1', b: 'wrongArg2', action: Action.Add, expected: null },
  { a: 4, b: 'wrongArg2', action: Action.Subtract, expected: null },
  { a: 'wrongArg1', b: 8, action: Action.Divide, expected: null },
  { a: undefined, b: 5, action: Action.Multiply, expected: null },
  { a: 1, b: null, action: Action.Exponentiate, expected: null },
];

const testCasesWithWrongAction = [
  { a: 5, b: 8, action: 'wrongAction', expected: null },
  { a: 3, b: 1, action: null, expected: null },
  { a: 3, b: 17, action: undefined, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should $action two numbers',
    ({ a: a, b: b, action: action, expected: expected }) => {
      const expectedRes = simpleCalculator({ a: a, b: b, action: action });
      expect(expectedRes).toEqual(expected);
    },
  );
  it.each(testCasesWithWrongArguments)(
    'should return null for invalid arguments',
    ({ a: a, b: b, action: action, expected: expected }) => {
      const expectedRes = simpleCalculator({ a: a, b: b, action: action });
      expect(expectedRes).toEqual(expected);
    },
  );
  it.each(testCasesWithWrongAction)(
    'should return null for invalid arguments',
    ({ a: a, b: b, action: action, expected: expected }) => {
      const expectedRes = simpleCalculator({ a: a, b: b, action: action });
      expect(expectedRes).toEqual(expected);
    },
  );
});
