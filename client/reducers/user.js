import { REQUEST_USER_INFO, RECEIVE_USER_INFO } from '../actions';

const initialState = {};

export default function user (state = initialState, action) {
  switch (action.type) {
    // case REQUEST_USER_INFO:
    //   return state;
    case RECEIVE_USER_INFO:
      if (!action.verify) {
        action.replace({ pathname: '/signIn' });
        return state;
      }
      return action.user;
    default:
      return state;
  }
};
