import {
  CHANGE_PAPER,
  CHANGE_PAPERS
} from '../actions';

const initialState = {
  paper: null,
  papers: []
};

export default function papers (state=initialState, action) {
  switch (action.type) {
    case CHANGE_PAPER:
      return Object.assign({}, state, { paper: action.paper });
    case CHANGE_PAPERS:
      return Object.assign({}, state, { papers: action.papers });
    default:
      return state;
  }
}
