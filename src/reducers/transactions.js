import { SET_TRANSACTIONS, ADD_TRANSACTION } from '../utils/constants';

const transactionsReducer = (state = [], action) => { //updates state based on action
  switch (action.type) {
    case SET_TRANSACTIONS: //feteches state of transactions based on action selected
      return [...action.transactions];
    case ADD_TRANSACTION: //updates state of transactions based on action selected
      return [...state, action.transaction];
    default:
      return state;
  }
};

export default transactionsReducer;