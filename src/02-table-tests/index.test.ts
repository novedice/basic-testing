// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 1, action: Action.Divide, expected: 2 },
  { a: 16, b: 2, action: Action.Divide, expected: 8 },
  { a: 36, b: 12, action: Action.Divide, expected: 3 },
];

const testCasesWithInvalidArguments = [
  {
    a: 'df',
    b: 12,
    action: Action.Divide,
    invalid: 'argument',
    expected: null,
  },
  {
    a: 36,
    b: undefined,
    action: Action.Divide,
    invalid: 'argument',
    expected: null,
  },
  { a: 36, b: 24, action: 'action', invalid: 'action', expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should $action two numbers',
    ({ a: a, b: b, action: action, expected: expected }) => {
      const expectedNumber = simpleCalculator({ a: a, b: b, action: action });
      expect(expectedNumber).toEqual(expected);
    },
  );
  it.each(testCasesWithInvalidArguments)(
    'should return null for invalid $invalid',
    ({ a: a, b: b, action: action, expected: expected }) => {
      const expectedNumber = simpleCalculator({ a: a, b: b, action: action });
      expect(expectedNumber).toEqual(expected);
    },
  );
});
