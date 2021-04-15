import { SET_ACCOUNT, UPDATE_ACCOUNT, RESET_ACCOUNT, TIMED_PAYMENT } from '../utils/constants'; //import type for reducer action.type
//import moment from 'moment';

const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT: //action of set account, updates account state with current account logged in
      return {
        ...action.accountDetails.account
      };
    case UPDATE_ACCOUNT: //action of udpate account, updates account state with action func updateAccountBalance.
      if (action.operation === 'withdraw') {
        return {
          ...state,
          total_balance: +state.total_balance - +action.amountToChange,
          contract_balance: +state.contract_balance + +action.amountToChange
        };
      } else if (action.operation === 'deposit') { //action of update acct state with action func updateAccountBalance
        return {
          ...state,
          total_balance: +state.total_balance + +action.amountToChange,
          contract_balance: +state.contract_balance - +action.amountToChange
        };
      }
      // } else if (action.operation === 'locked') { //action of update acct statae with action func updateAccountBalance
      //   return {
      //     ...state, //want to not be able to update the state at all
      //     total_balance: +state.total_balance
      //   };
      break;
    case TIMED_PAYMENT: //auto withdraw func based on amountToChange and payout_freq
      if (action.operation === 'locked') {
        return {
          ...state,
          total_balance: +state.total_balance + +action.amountToChange,
          contract_balance: +state.contract_balance - +action.payout_amt && action.payout_freq
        };
      }
      break;
    case RESET_ACCOUNT: //reset_account clears out state
      return {};
    default: //default returns current state
      return state;
  }
};

export default accountReducer;
// ... = pushs new actoin to current state