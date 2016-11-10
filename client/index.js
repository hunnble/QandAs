import 'babel-polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  blueGrey700,
  blueGrey500,
  grey400,
  amber700,
  grey100,
  grey500
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey700,
    primary2Color: blueGrey500,
    primary3Color: grey400,
    accent1Color: amber700,
    accent2Color: grey100,
    accent3Color: grey500
  }
});

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
  <MuiThemeProvider muiTheme={muiTheme}>
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
          <Route path='papers'>
            <Route path='create'
              component={Editor}
              onEnter={(nextState, replace) => {
                handleEnter(replace);
              }}
            />
            <Route path='paper' component={Paper} />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  renderTarget
);
