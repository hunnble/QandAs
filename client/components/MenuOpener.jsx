import React, { Component, PropTypes } from 'react';

class MenuOpener extends Component {
  render () {
    const openClassName = this.props.isOpen ? 'menuOpen menu' : 'menu';
    return (
      <div className={openClassName} onClick={this.props.handleClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  }
}

MenuOpener.PropTypes = {
  isOpen: PropTypes.boolean,
  handleClick: PropTypes.func
};

export default MenuOpener;
