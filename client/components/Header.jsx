import React, { Component, PropTypes } from 'react';
import '../scss/header.scss';
import { Link } from 'react-router';
import MenuBar from '../containers/MenuBar';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends Component {
  render () {
    return (
      <header className="header">
        <MenuBar />
      </header>
    );
  }
}

export default Header;
