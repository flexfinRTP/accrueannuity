import jwt_decode from 'jwt-decode'; //decodes api token to string
import axios from 'axios'; //GET, requests to an API end point, server
import store from '../store/store'; //current state of all reducers/all states
import { initiateGetProfile } from '../actions/profile';
import { signIn } from '../actions/auth';
import { history } from '../router/AppRouter';

export const validateFields = (fieldsToValidate) => { //makes sure form fields across entire app are not empty
  return fieldsToValidate.every((field) => Object.values(field)[0] !== '');
};

export const maintainSession = () => {
  const user_token = localStorage.getItem('user_token'); //gets json token
  if (user_token) {
    const currentPath = window.location.pathname; //if current window is..
    if (currentPath === '/' || currentPath === '/register') { //is the landing the page or register page
      history.push('/profile'); //display profile info 
    }
    // if (currentPath === 'locked') { //added 4.6
    //   history.push('/locked');

    // }
    const decoded = jwt_decode(user_token); //decode token
    updateStore(decoded); //update store with decoded password
  } else {
    history.push('/'); //else push landing page
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
