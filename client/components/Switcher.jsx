import React, { Component, PropTypes } from 'react';
import '../scss/switcher.scss';
import Toggle from 'material-ui/Toggle';

class Switcher extends Component {
  handleChangeSwitcher = () => {
    this.props.handleChangeSwitcher(this.props.isOpen, this.props.option);
  }
  render () {
    const { isOpen, option } = this.props;
    return (
      <Toggle toggled={isOpen} onToggle={this.handleChangeSwitcher} label={option} />
    );
  }
}

Switcher.PropTypes = {
  isOpen: PropTypes.boolean,
  option: PropTypes.string,
  handleChangeSwitcher: PropTypes.func
};

export default Switcher;
