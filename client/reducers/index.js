import { combineReducers } from 'redux';
import page from './page';
import settings from './settings';
import user from './user';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  page,
  settings,
  user,
  form: formReducer,
  routing: routerReducer
});

export default rootReducer;
