import { getErrors } from './errors';
import {
  BASE_API_URL,
  ADD_TRANSACTION,
  SET_TRANSACTIONS,
  // TIMED_PAYMENT
} from '../utils/constants';
import { timedPayment, updateAccountBalance } from './account';
import { get, post } from '../utils/api';

export const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction
});

export const initiateDepositAmount = (account_id, amount) => {
  return async (dispatch) => {
    try {
      const transaction = {
        transaction_date: new Date(),
        deposit_amount: amount,
        c_withdraw_amount: amount //doesn't have db column
      };
      await post(`${BASE_API_URL}/deposit/${account_id}`, transaction);
      dispatch(
        addTransaction({
          ...transaction, //is pushed to database, check routes/transactions
          withdraw_amount: null, //withdraw to total_balance is null
          c_withdraw_amount: amount //contract withdraw amount is amount , doesnt have db column
        })
      );
      dispatch(updateAccountBalance(amount, 'deposit'));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const initiateWithdrawAmount = (account_id, amount) => {
  return async (dispatch) => {
    try {
      const transaction = { //is pushed to database, check routes/transactions
        transaction_date: new Date(),
        withdraw_amount: amount, //withdraw from total_balance
        c_deposit_amount: amount //doesn't have db column
      };
      await post(`${BASE_API_URL}/withdraw/${account_id}`, transaction);
      dispatch(
        addTransaction({
          ...transaction,
          deposit_amount: null, //deposit to total_balance is null
          c_deposit_amount: amount //deposit to contract_balance //doesn't have db column
        })
      );
      dispatch(updateAccountBalance(amount, 'withdraw'));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const initiateTimedPayment = (account_id, payout_amt) => { //auto/timed payment action, takes in payout_freq and user defined payout_amount
  return async (dispatch) => {
    try {
      const transaction = { //is pushed to database, check routes/transactions
        transaction_date: new Date(),
        deposit_amount: payout_amt, //payouts from contract_balance into total_balance at user defined frequency
        c_withdraw_amount: payout_amt //deposit to total_balance depending on user defined amount
      };
      await post(`${BASE_API_URL}/deposit/${account_id}`, transaction);
      dispatch(
        addTransaction({
          ...transaction,
          withdraw_amount: null, //withdraw from total_balance is null
          c_withdraw_amount: payout_amt, //timed withdraw from contract_balance is user defined payout_amt
        })
      );
      dispatch(timedPayment(payout_amt, 'auto'));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const setTransactions = (transactions) => ({ //use setTransactions to dispatch to Report
  type: SET_TRANSACTIONS,
  transactions
});

export const initiateGetTransactions = (account_id) => {
  return async (dispatch) => {
    try {
      let query;
        query = `${BASE_API_URL}/transactions/${account_id}`;

      const profile = await get(query);
      dispatch(setTransactions(profile.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};