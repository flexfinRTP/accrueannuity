import { SIGN_IN, SIGN_OUT } from '../utils/constants'; //sign in,out defined in constants

const authReducer = (state = {}, action) => { //updates state based on action of signin/signout
  switch (action.type) { //switch renders route exclusively ignoring next case
    case SIGN_IN: //action signin, updates state with the user that is logged in
      return action.user;
    case SIGN_OUT: //action signout, updates state with the user that is logged out
      return {};
    default:
      return state; //update state for auth
  }
};

export default authReducer;