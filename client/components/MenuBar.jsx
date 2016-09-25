import React, { Component, PropTypes } from 'react';
import '../scss/menu.scss';
import { Link } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuOpener from './MenuOpener.jsx';
import Settings from '../containers/Settings';

class MenuBar extends Component {
  handleClick = (event) => {
    this.props.actions.handleMenuOpen(event.currentTarget);
  }
  changeSettings = () => {
    // fetch settings data to save!by getting settings data from state tree!ahahaha
    this.props.actions.closeSettings();
  }
  render () {
    const { actions, isOpen, anchorEl, settingsVisible } = this.props;
    const { handleMenuClose, openSettings, closeSettings } = actions;
    const dialogActions = [
      <FlatButton
        keyboardFocused={true}
        label="确定"
        onTouchTap={this.changeSettings}
      />,
      <FlatButton
        label="取消"
        onTouchTap={closeSettings}
      />
    ];
    return (
      <div>
        <MenuOpener isOpen={isOpen} handleClick={this.handleClick} />
        <Popover open={isOpen}
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={handleMenuClose}
        >
          <Menu onClick={handleMenuClose}>
            <MenuItem>
              <Link className="insideLink" to={'/'}>主页</Link>
            </MenuItem>
            <MenuItem>
              <Link className="insideLink" to={'/profile'}>用户资料</Link>
            </MenuItem>
            <MenuItem onTouchTap={openSettings}>设置</MenuItem>
            <MenuItem>
              <Link className="insideLink" to={'/signIn'}>退出</Link>
            </MenuItem>
          </Menu>
        </Popover>
        <Dialog
          open={settingsVisible}
          actions={dialogActions}
          onRequestClose={closeSettings}
        >
          <Settings />
        </Dialog>
      </div>
    );
  }
}

MenuBar.PropTypes = {
  isOpen: PropTypes.boolean,
  anchorEl: PropTypes.object,
  settingsVisible: PropTypes.boolean,
  actions: PropTypes.object
};

export default MenuBar;
