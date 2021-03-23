import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux'; //Provider used for making the redux store available
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/main.scss'; 
import { maintainSession } from './utils/common';

maintainSession();
const rootElement = document.getElementById('root'); //tells where to render and what styling

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  rootElement
);
//render store and main 'app' component AppRouter