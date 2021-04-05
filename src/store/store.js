import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //middleware, allows action creators to return a function, define async action creators
import authReducer from '../reducers/auth';
import errorsReducer from '../reducers/errors';
import profileReducer from '../reducers/profile';
import transactionsReducer from '../reducers/transactions';
import accountReducer from '../reducers/account';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //allows use of redux dev tools in browser to view state and trees

const store = createStore(
  combineReducers({
    auth: authReducer, //updates auth prop based on SIGN_IN, SIGN_OUT action
    errors: errorsReducer, //updates errors prop based on GET_ERRORS, RESET_ERRORS action
    profile: profileReducer, //updates profile prop based on UPDATE_PROFILE action
    transactions: transactionsReducer, //updates transactions prop based on SET_TRANSACTIONS, ADD_TRANSACTIONS action
    account: accountReducer //updates account prop based on SET_ACCOUNT, UPDATE_ACCOUNT action
  }),
  composeEnhancers(applyMiddleware(thunk))//allows action creators to return a function
);

export default store;