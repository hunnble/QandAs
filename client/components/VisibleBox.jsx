import React, { Component, PropTypes } from 'react';
import MenuOpener from './MenuOpener.jsx';

class VisibleBox extends Component {
  handleClick = () => {
    this.props.actions.toggleSettingsVisible(this.props.visible);
  }
  render () {
    const display = this.props.visible ? 'block' : 'none';
    const style = {
      display: display
    };
    return (
      <div>
        <span onClick={this.handleClick}>
        </span>
        <div style={style}>
          {this.props.component}
        </div>
      </div>
    );
  }
}

VisibleBox.PropTypes = {
  component: PropTypes.object,
  visible: PropTypes.boolean,
  actions: PropTypes.object
};

export default VisibleBox;
