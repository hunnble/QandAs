import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import {
  grey900,
  blueGrey500,
  grey400,
  blueGrey700,
  grey100,
  grey500
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import fetch from 'isomorphic-fetch';
import injectTapEventPlugin from "react-tap-event-plugin";
import configureStore from './store';
import { getUserInfo, removeUserInfo, initialPageState, changePaper } from './actions';
import App from './components/App.jsx';
import Home from './containers/Home';
import SignInForm from './containers/SignInForm';
import SignUpForm from './containers/SignUpForm';
import Archive from './containers/Archive';
import Profile from './containers/Profile';
import Editor from './containers/Editor';
import Paper from './containers/Paper';
import { TOKEN_NAME } from '../configs/config';

const renderTarget = document.getElementById('App');
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    primary2Color: blueGrey500,
    primary3Color: grey400,
    accent1Color: blueGrey700,
    accent2Color: grey100,
    accent3Color: grey500
  }
});

injectTapEventPlugin();

function handleEnter (replace) {
  const token = window.localStorage.getItem(TOKEN_NAME);
  store.dispatch(initialPageState());
  if (!token) {
    return replace({ pathname: '/signIn' });
  }
  store.dispatch(getUserInfo(token, replace));
}

function handleEnterWithoutReplace () {
  const token = window.localStorage.getItem(TOKEN_NAME);
  if (token) {
    store.dispatch(getUserInfo(token));
    store.dispatch(initialPageState());
  }
}

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} onEnter={(nextState, replace) => {
            handleEnterWithoutReplace();
          }} />
          <Route path='signIn' component={SignInForm} onEnter={(nextState, replace) => {
            store.dispatch(removeUserInfo());
          }} />
          <Route path='signUp' component={SignUpForm} />
          <Route path='archives' component={Archive} onEnter={(nextState, replace) => {
            handleEnter(replace);
          }} />
          <Route path='profile' component={Profile} onEnter={(nextState, replace) => {
            handleEnter(replace);
          }} />
          <Route path='papers'>
            <Route path='create'
              component={Editor}
              onEnter={(nextState, replace) => {
                handleEnter(replace);
              }}
              onLeave={() => {
                store.dispatch(changePaper({}));
              }}
            />
            <Route path='paper'
              component={Paper}
              onLeave={() => {
                store.dispatch(changePaper({}));
              }}
            />
          </Route>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  renderTarget
);
