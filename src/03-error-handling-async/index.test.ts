// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const val = 'tested value';
    expect.assertions(1);
    await expect(resolveValue(val)).resolves.toBe(val);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'custom message error';
    expect.assertions(1);
    try {
      throwError(message);
    } catch (error) {
      expect(error).toEqual(new Error(message));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    try {
      throwError();
    } catch (error) {
      expect(error).toEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    await expect(rejectCustomError()).rejects.toEqual(new MyAwesomeError());
  });
});
