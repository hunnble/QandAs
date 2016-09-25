import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const routerMW = routerMiddleware(browserHistory);

function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      routerMW,
      thunkMiddleware
    )
  );
}

export default configureStore;
