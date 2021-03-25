import jwt_decode from 'jwt-decode';
import axios from 'axios';
import store from '../store/store';
import { initiateGetProfile } from '../actions/profile';
import { signIn } from '../actions/auth';
import { history } from '../router/AppRouter';

export const validateFields = (fieldsToValidate) => { //makes sure form fields across entire app are not empty
  return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
};

export const maintainSession = () => { 
  const user_token = localStorage.getItem('user_token'); //gets json token
  if (user_token) {
    const currentPath = window.location.pathname; //sets 
    if (currentPath === '/' || currentPath === '/register') { //push register details inot profile
      history.push('/profile');
    }
    const decoded = jwt_decode(user_token); //decode token
    updateStore(decoded); //update store with decoded password
  } else {
    history.push('/');
  }
};

export const updateStore = (user) => { //update store state with userid, email, token
  const { userid, email } = user;
  store.dispatch(
    signIn({
      userid,
      email,
      token: localStorage.getItem('user_token')
    })
  );
  store.dispatch(initiateGetProfile(email));
};

export const setAuthHeader = () => {
  const token = localStorage.getItem('user_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthHeader = () => {
  delete axios.defaults.headers.common['Authorization'];
};
