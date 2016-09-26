import { HIDE_PASSWORD, TOGGLE_PASSWORD } from '../actions';

const passwordTypes = ['password', 'text'];
const initialState = {
  passwordType: passwordTypes[0]
};

export default function form (state = initialState, action) {
  switch (action.type) {
    case HIDE_PASSWORD:
      return Object.assign({}, state, { passwordType: passwordTypes[0] });
    case TOGGLE_PASSWORD:
      let passwordType =
        state.passwordType === passwordTypes[0] ?
          passwordTypes[1]:
          passwordTypes[0];
      return Object.assign({}, state, { passwordType: passwordType });
    default:
      return state;
  }
}
