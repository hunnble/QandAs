import 'babel-polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import fetch from 'isomorphic-fetch';
import injectTapEventPlugin from "react-tap-event-plugin";
import configureStore from './store';
import { getUserInfo, initialPageState } from './actions';
import App from './components/App.jsx';
import Home from './containers/Home';
import SignInForm from './containers/SignInForm';
import SignUpForm from './containers/SignUpForm';
import Profile from './containers/Profile';
import Editor from './containers/Editor';
import Paper from './containers/Paper';
import { TOKEN_NAME } from '../configs/config';

const renderTarget = document.getElementById('App');
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();

function handleEnter (replace) {
  const token = window.localStorage.getItem(TOKEN_NAME);
  if (!token) {
    return replace({ pathname: '/signIn' });
  }
  store.dispatch(getUserInfo(token, replace));
  store.dispatch(initialPageState());
}

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} onEnter={(nextState, replace) => {
            handleEnter(replace);
          }} />
          <Route path='signIn' component={SignInForm} />
          <Route path='signUp' component={SignUpForm} />
          <Route path='profile' component={Profile} onEnter={(nextState, replace) => {
            handleEnter(replace);
          }} />
          <Route path='papers' onEnter={(nextState, replace) => {
            handleEnter(replace);
          }}>
            <Route path='create' component={Editor}  />
            <Route path='paper' component={Paper} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  renderTarget
);
