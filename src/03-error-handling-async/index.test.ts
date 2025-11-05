import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'test Value';
    expect.assertions(1);
    await expect(resolveValue(testValue)).resolves.toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const customMessage = 'This is custom error message';
    expect.assertions(1);
    try {
      throwError(customMessage);
    } catch (e) {
      expect(e).toEqual(new Error(customMessage));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    try {
      throwError();
    } catch (e) {
      expect(e).toEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError();
    } catch (e) {
      expect(e).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);
    await expect(rejectCustomError()).rejects.toEqual(new MyAwesomeError());
  });
});
