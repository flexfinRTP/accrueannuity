import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
//Provider used for making the redux store available
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
      <AppRouter />
  </Provider>,
  rootElement
);