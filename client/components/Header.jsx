import React, { Component } from 'react';
import '../scss/header.scss';
import { Link } from 'react-router';
import MenuBar from '../containers/MenuBar';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <header className="header">
        <MenuBar />
      </header>
    );
  }
}

export default Header;
