import { SIGN_IN, SIGN_OUT } from '../utils/constants'; //sign in,out defined in constants

const authReducer = (state = {}, action) => { //switch renders route exclusively ignoring next case
  switch (action.type) {
    case SIGN_IN:
      return action.user;
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;