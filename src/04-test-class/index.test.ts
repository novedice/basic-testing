import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let newBankAccount: BankAccount;
  beforeEach(() => {
    newBankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(newBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmmount = 1500;
    try {
      newBankAccount.withdraw(withdrawAmmount);
    } catch (e) {
      expect(e).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring more than balance', () => {
    const transferringAmmount = 1500;
    const bancAccountReceipient = new BankAccount(1500);
    try {
      newBankAccount.transfer(transferringAmmount, bancAccountReceipient);
    } catch (e) {
      expect(e).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring to the same account', () => {
    const transferringAmmount = 500;
    try {
      newBankAccount.transfer(transferringAmmount, newBankAccount);
    } catch (e) {
      expect(e).toEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    const depositAmmount = 500;
    expect(newBankAccount.deposit(depositAmmount).getBalance()).toBe(
      initialBalance + depositAmmount,
    );
  });

  test('should withdraw money', () => {
    const withdrawAmmount = 500;
    expect(newBankAccount.withdraw(withdrawAmmount).getBalance()).toBe(
      initialBalance - withdrawAmmount,
    );
  });

  test('should transfer money', () => {
    const transferringAmmount = 500;
    const initialBalanceReceipient = 1500;
    const bancAccountReceipient = new BankAccount(initialBalanceReceipient);
    newBankAccount.transfer(transferringAmmount, bancAccountReceipient);
    expect(newBankAccount.getBalance()).toBe(
      initialBalance - transferringAmmount,
    );
    expect(bancAccountReceipient.getBalance()).toBe(
      initialBalanceReceipient + transferringAmmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const random = jest.spyOn(lodash, 'random');
    random.mockReturnValue(800);
    const fetchBalance = await newBankAccount.fetchBalance();
    expect(typeof fetchBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fethedBalance = 800;
    const spy = jest.spyOn(newBankAccount, 'fetchBalance');
    spy.mockResolvedValue(fethedBalance);
    await newBankAccount.synchronizeBalance();
    expect(newBankAccount.getBalance()).toBe(fethedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest.spyOn(newBankAccount, 'fetchBalance');
    spy.mockResolvedValue(null);
    try {
      await newBankAccount.synchronizeBalance();
    } catch (e) {
      expect(e).toEqual(new SynchronizationFailedError());
    }
  });
});
