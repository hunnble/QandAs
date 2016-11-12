import React, { Component, PropTypes } from 'react';
import '../scss/menu.scss';
import { Link } from 'react-router';
import Appbar from 'material-ui/Appbar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import { white } from 'material-ui/styles/colors';
import MenuOpener from './MenuOpener.jsx';
import Settings from '../containers/Settings';

class MenuBar extends Component {
  handleClick = (event) => {
    this.props.actions.handleMenuOpen(event.currentTarget);
  }
  changeSettings = () => {
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
    const bgMenuItemStyle = {
      color: white
    };
    return (
      <div>
        <MenuOpener
          isOpen={isOpen}
          handleClick={this.handleClick}
        />
        <aside className='sidebarBg'>
          <Appbar
            title='QandA'
            zDepth={0}
          />
          <Menu
            onTouchTap={handleMenuClose}
          >
            <MenuItem leftIcon={<ActionHome />} style={bgMenuItemStyle}>
              <Link className="insideLink" to={'/'}>主页</Link>
            </MenuItem>
            <MenuItem leftIcon={<ActionPermIdentity />} style={bgMenuItemStyle}>
              <Link className="insideLink" to={'/profile'}>用户资料</Link>
            </MenuItem>
            <MenuItem
              leftIcon={<ActionSettings />}
              onTouchTap={openSettings}
              style={bgMenuItemStyle}
            >
              设置
            </MenuItem>
            <MenuItem leftIcon={<ActionPowerSettingsNew />} style={bgMenuItemStyle}>
              <Link className="insideLink" to={'/signIn'}>退出</Link>
            </MenuItem>
          </Menu>
        </aside>
        <Drawer
          open={isOpen}
          docked={false}
          zDepth={0}
          containerClassName='sidebarSm'
          onRequestChange={handleMenuClose}
        >
          <Appbar
            title='QandA'
            zDepth={0}
          />
          <Menu onClick={handleMenuClose}>
            <MenuItem leftIcon={<ActionHome />}>
              <Link className="insideLink" to={'/'}>主页</Link>
            </MenuItem>
            <MenuItem leftIcon={<ActionPermIdentity />}>
              <Link className="insideLink" to={'/profile'}>用户资料</Link>
            </MenuItem>
            <MenuItem leftIcon={<ActionSettings />} onTouchTap={openSettings}>
              设置
            </MenuItem>
            <MenuItem leftIcon={<ActionPowerSettingsNew />}>
              <Link className="insideLink" to={'/signIn'}>退出</Link>
            </MenuItem>
          </Menu>
        </Drawer>
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
