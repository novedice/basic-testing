// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 800;
  let newBankAccount: BankAccount;
  beforeEach(() => {
    newBankAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(newBankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      newBankAccount.withdraw(1000);
    } catch (error) {
      expect(error).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring more than balance', () => {
    const newBankAccountFrom = getBankAccount(initialBalance);
    const newBankAccountTo = getBankAccount(500);
    try {
      newBankAccountFrom.transfer(1000, newBankAccountTo);
    } catch (error) {
      expect(error).toEqual(new InsufficientFundsError(initialBalance));
    }
  });

  test('should throw error when transferring to the same account', () => {
    const newBankAccountFrom = getBankAccount(initialBalance);
    try {
      newBankAccountFrom.transfer(1000, newBankAccountFrom);
    } catch (error) {
      expect(error).toEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    const addedDeposit = 900;
    newBankAccount.deposit(addedDeposit);
    expect(newBankAccount.getBalance()).toBe(initialBalance + addedDeposit);
  });

  test('should withdraw money', () => {
    const withdrawedAmount = 500;
    newBankAccount.withdraw(withdrawedAmount);
    expect(newBankAccount.getBalance()).toBe(initialBalance - withdrawedAmount);
  });

  test('should transfer money', () => {
    const transferredAmmount = 300;
    const newBankAccountFrom = getBankAccount(initialBalance);
    const newBankAccountTo = getBankAccount(initialBalance);
    newBankAccountFrom.transfer(transferredAmmount, newBankAccountTo);
    expect(newBankAccountFrom.getBalance()).toBe(
      initialBalance - transferredAmmount,
    );
    expect(newBankAccountTo.getBalance()).toBe(
      initialBalance + transferredAmmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchBalanceCalling = async () => {
      const res = await newBankAccount.fetchBalance();
      if (res !== null) {
        expect(typeof res).toBe('number');
        return;
      } else {
        fetchBalanceCalling();
      }
    };
    fetchBalanceCalling();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // const syncBalanceCallingFunc = async () => {
    try {
      const result = await newBankAccount.synchronizeBalance();
      expect(newBankAccount.getBalance()).toBe(result);
    } catch {
      // syncBalanceCallingFunc();
    }
    // }
    // syncBalanceCallingFunc();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await newBankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toEqual(new SynchronizationFailedError());
    }
  });
});
