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
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import CommunicationVpnKey from 'material-ui/svg-icons/communication/vpn-key';
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
    const { actions, isOpen, user, anchorEl, settingsVisible } = this.props;
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
            {
              !isEmpty(user) &&
              <MenuItem leftIcon={<ActionPermIdentity color={white} />} className='menuItem'>
                <Link className="insideLink" to={'/profile'}>{user.account}</Link>
              </MenuItem>
            }
            <MenuItem leftIcon={<ActionHome color={white} />} className='menuItem'>
              <Link className="insideLink" to={'/'}>主页</Link>
            </MenuItem>
            {
              isEmpty(user) &&
              <MenuItem leftIcon={<CommunicationVpnKey color={white} />} className='menuItem'>
                <Link className="insideLink" to={'/signIn'}>登录</Link>
              </MenuItem>
            }
            {
              !isEmpty(user) &&
              <MenuItem leftIcon={<ActionDescription color={white} />} className='menuItem'>
                <Link className="insideLink" to={'/archives'}>问卷</Link>
              </MenuItem>
            }
            <MenuItem
              leftIcon={<ActionSettings color={white} />}
              onTouchTap={openSettings}
              className='menuItem'
            >
              设置
            </MenuItem>
            <MenuItem
              leftIcon={<ActionPowerSettingsNew color={white} />}
              className='menuItem'
            >
              <Link className="insideLink" to={'/signIn'}>注销</Link>
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
            {
              !isEmpty(user) &&
              <MenuItem leftIcon={<ActionPermIdentity />}>
                <Link className="insideLink" to={'/profile'}>{user.account}</Link>
              </MenuItem>
            }
            <MenuItem leftIcon={<ActionHome />}>
              <Link className="insideLink" to={'/'}>主页</Link>
            </MenuItem>
            {
              isEmpty(user) &&
              <MenuItem leftIcon={<CommunicationVpnKey />}>
                <Link className="insideLink" to={'/signIn'}>登录</Link>
              </MenuItem>
            }
            {
              !isEmpty(user) &&
              <MenuItem leftIcon={<ActionDescription />}>
                <Link className="insideLink" to={'/archives'}>问卷</Link>
              </MenuItem>
            }
            <MenuItem
              leftIcon={<ActionSettings />}
              nTouchTap={openSettings}
            >
              设置
            </MenuItem>
            <MenuItem leftIcon={<ActionPowerSettingsNew />}>
              <Link className="insideLink" to={'/signIn'}>注销</Link>
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
  user: PropTypes.object,
  isOpen: PropTypes.boolean,
  anchorEl: PropTypes.object,
  settingsVisible: PropTypes.boolean,
  actions: PropTypes.object
};

function isEmpty (obj) {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

export default MenuBar;
