import React, { Component, PropTypes } from 'react';
import Switcher from './Switcher.jsx';

class Settings extends Component {
  render () {
    const { options, isOpens, actions } = this.props;
    return (
      <div>
        {
          options.map((option, index) => {
            return (
              <div key={option}>
                <Switcher
                  option={option}
                  isOpen={isOpens[index]}
                  handleChangeSwitcher={actions.handleChangeSwitcher}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

Settings.PropTypes = {
  options: PropTypes.array,
  isOpens: PropTypes.array,
  actions: PropTypes.object
};

export default Settings;
