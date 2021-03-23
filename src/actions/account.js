import { BASE_API_URL } from '../utils/constants';
import { getErrors } from './errors';
import { SET_ACCOUNT, UPDATE_ACCOUNT, RESET_ACCOUNT } from '../utils/constants';
import { get, patch, post } from '../utils/api';

export const setAccount = (accountDetails) => ({
  type: SET_ACCOUNT,
  accountDetails
});

export const resetAccount = () => ({ //clears account when logging out
  type: RESET_ACCOUNT
});

export const updateAccountBalance = (amountToChange, operation) => ({
  type: UPDATE_ACCOUNT,
  amountToChange,
  operation
});

export const initiateGetAccntDetails = () => {
  return async (dispatch) => {
    try {
      const account = await get(`${BASE_API_URL}/account`);
      return dispatch(setAccount(account.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const initiateAddAccntDetails = (payout_freq, contract_name, payout_amt) => {
  return async (dispatch) => {
    try {
      return await post(`${BASE_API_URL}/account`, {
        payout_freq,
        contract_name,
        payout_amt
      });
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const initiateUpdateAccntDetails = (payout_amt) => {
  return async (dispatch) => {
    try {
      const account = await patch(`${BASE_API_URL}/account`, {
        payout_amt
      });
      dispatch(setAccount(account.data));
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};