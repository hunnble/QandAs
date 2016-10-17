import {
  REQUEST_USER_INFO,
  RECEIVE_USER_INFO,
  // FINISH_PUBLISH_PAPER
} from '../actions';

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
    // case FINISH_PUBLISH_PAPER:
    //   let publishedPapers = state.publishedPapers;
    //   if (!publishedPapers) {
    //     return state;
    //   } else {
    //     for (let key in publishedPapers) {
    //       if (publishedPapers[key]._id === action._id) {
    //         publishedPapers[key].state = 1;
    //         break;
    //       }
    //     }
    //     return Object.assign({}, state, { publishedPapers: publishedPapers });
    //   }
    default:
      return state;
  }
};
