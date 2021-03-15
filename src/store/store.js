import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//createStore creates Redux store that holds complete state tree, only one per app
//calls all child reducer functions and makes a single state object to be passed to createStore
//applyMiddleware allows dispatch of async actions
//compose allows functions to be written without rightward drift of the code
import thunk from 'redux-thunk';
//thunk, dispatch functions. Recieves dispatch as arguments and can call it asynchronously
import authReducer from '../reducers/auth';

//redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//creating the redux store with single auth reducer, added config for redux dev tools(thunk)
const store = createStore(
  combineReducers({
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;