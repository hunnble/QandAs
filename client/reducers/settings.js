import { TOGGLE_SWITCHER } from '../actions';

const initialState = {
  options: ['开启声音', '夜间模式'],
  isOpens: [false, true]
};

export default function settings (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCHER:
      let changingOptionIndex = state.options.indexOf(action.option);
      let isOpens = state.isOpens.concat();
      isOpens[changingOptionIndex] = action.isOpen;
      return Object.assign({}, state, { isOpens: isOpens });
    default:
      return state;
  }
};
