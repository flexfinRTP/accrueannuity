import { SET_ACCOUNT, UPDATE_ACCOUNT, RESET_ACCOUNT } from '../utils/constants';
//import moment from 'moment';

const accountReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      return {
        ...action.accountDetails.account
      };
    case UPDATE_ACCOUNT: //withdraw func timer goes here
      if (action.operation === 'withdraw') {
        return {
          ...state,
          total_balance: +state.total_balance - +action.amountToChange
        };
      } else if (action.operation === 'deposit') {
        return {
          ...state,
          total_balance: +state.total_balance + +action.amountToChange
        };
      } else if (action.operation === 'locked') {
        return {
          ...state,
          total_balance: +state.total_balance - +action.amountToChange//need moment, luxon or other time based dependency
        };
      }
      break;
    case RESET_ACCOUNT:
      return {};
    default:
      return state;
  }
};

export default accountReducer;