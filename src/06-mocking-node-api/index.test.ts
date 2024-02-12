// Uncomment the code below and write your tests

import {
  doStuffByInterval,
  doStuffByTimeout,
  readFileAsynchronously,
} from '06-mocking-node-api';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  let callback: jest.Mock;
  const timeout: number = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    callback = jest.fn();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  let callback: jest.Mock;
  const interval = 800;

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
    callback = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callback, interval);

    expect(setInterval).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, interval);
    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(callback).toBeCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'newFile.txt';
  let spyOn: jest.SpyInstance;

  beforeEach(() => {
    spyOn = jest.spyOn(fs, 'existsSync');
  });

  test('should call join with pathToFile', async () => {
    const spyOn = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(spyOn).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    // const spyOn = jest.spyOn(fs, 'existsSync');
    spyOn.mockReturnValue(false);

    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'this string is a content in a file';

    spyOn.mockReturnValue(true);

    const spyOnPromise = jest.spyOn(fsPromises, 'readFile');
    spyOnPromise.mockResolvedValue(fileContent);

    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent);
  });
});
