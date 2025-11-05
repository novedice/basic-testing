import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

describe('doStuffByTimeout', () => {
  let callbackFunction: jest.Mock;
  const timeout: number = 800;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    callbackFunction = jest.fn();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(callbackFunction, timeout);
    expect(setTimeout).toHaveBeenCalledWith(callbackFunction, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callbackFunction, timeout);
    expect(callbackFunction).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callbackFunction).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  let callbackFunction: jest.Mock;
  const interval = 1000;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
    callbackFunction = jest.fn();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(callbackFunction, interval);
    expect(setInterval).toHaveBeenCalledWith(callbackFunction, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callbackFunction, interval);
    expect(callbackFunction).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(callbackFunction).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(callbackFunction).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  jest.mock('fs');
  jest.mock('fs/promises');
  const pathToFile = 'file.txt';
  let spyOn: jest.SpyInstance;

  beforeEach(() => {
    spyOn = jest.spyOn(fs, 'existsSync');
  });

  test('should call join with pathToFile', async () => {
    const pathSpyOn = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(pathSpyOn).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    spyOn.mockReturnValue(false);
    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent: string = 'This is fileContent';
    const promiseSpyOn = jest.spyOn(fsPromises, 'readFile');
    spyOn.mockReturnValue(true);
    promiseSpyOn.mockResolvedValue(fileContent);
    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent);
  });
});
