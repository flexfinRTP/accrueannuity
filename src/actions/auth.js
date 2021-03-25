import axios from 'axios'; //use to send get request
import { SIGN_IN, SIGN_OUT, BASE_API_URL } from '../utils/constants';
import { initiateGetProfile } from './profile';
import { resetAccount } from './account';
import { history } from '../router/AppRouter';
import { getErrors } from './errors';
import { post } from '../utils/api';

export const signIn = (user) => ({
  type: SIGN_IN,
  user
});

export const initiateLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`${BASE_API_URL}/signin`, {
        email,
        password
      });
      const user = result.data;
      localStorage.setItem('user_token', user.token);
      dispatch(signIn(user));
      dispatch(initiateGetProfile(user.email)); //gets email
      history.push('/profile');
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};

export const registerNewUser = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_API_URL}/signup`, data); //posts to server a new user
      return { success: true };
    } catch (error) {
      console.log('error', error);
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
      return { success: false };
    }
  };
};

export const signOut = () => ({
  type: SIGN_OUT
});

export const initiateLogout = () => {
  return async (dispatch) => {
    try {
      await post(`${BASE_API_URL}/logout`, true, true);
      localStorage.removeItem('user_token');
      dispatch(resetAccount()); //tells redux to clear the information stored
      return dispatch(signOut());
    } catch (error) {
      error.response && dispatch(getErrors(error.response.data)); //displays errors if any
    }
  };
};
