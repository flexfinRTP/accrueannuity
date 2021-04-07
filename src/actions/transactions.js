import { getErrors } from './errors';
import {
  BASE_API_URL, 
  ADD_TRANSACTION,
  SET_TRANSACTIONS,
  //TIMED_PAYMENT
 } from '../utils/constants';
import { updateAccountBalance } from './account';
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
        deposit_amount: amount
      };
      await post(`${BASE_API_URL}/deposit/${account_id}`, transaction);
      dispatch(
        addTransaction({
          ...transaction,
          withdraw_amount: null //withdraw to contract_balance
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
      const transaction = {
        transaction_date: new Date(),
        withdraw_amount: amount
      };
      await post(`${BASE_API_URL}/withdraw/${account_id}`, transaction);
      dispatch(
        addTransaction({
          ...transaction,
          deposit_amount: null //deposit to total_balance
        })
      );
      dispatch(updateAccountBalance(amount, 'withdraw'));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const setTransactions = (transactions) => ({ //use setTransactions to dispatch to Report
  type: SET_TRANSACTIONS,
  transactions
});

export const initiateGetTransactions = (account_id, start_date, end_date) => {
  return async (dispatch) => {
    try {
      let query;
      if (start_date && end_date) {
        query = `${BASE_API_URL}/transactions/${account_id}?start_date=${start_date}&end_date=${end_date}`;
      } else {
        query = `${BASE_API_URL}/transactions/${account_id}`;
      }
      const profile = await get(query);
      dispatch(setTransactions(profile.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data));
    }
  };
};

export const timeUntilPayment = (payout_freq, amount) => ({ //timed payment action, takes in payout_freq and amount
  //type: TIMED_PAYMENT,
});