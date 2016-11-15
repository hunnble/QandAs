import React, { Component, PropTypes } from 'react';
import '../scss/profile.scss';
import Header from './Header.jsx';
import ErrMsg from '../containers/ErrMsg';
import ProfileUserForm from '../containers/ProfileUserForm';
import ProfilePasswordForm from '../containers/ProfilePasswordForm';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionLock from 'material-ui/svg-icons/action/lock';
import { TOKEN_NAME } from '../../configs/config';
import SwipeableViews from 'react-swipeable-views';

const labelMap = new Map([
  ['account', '账号'],
  ['nickname', '用户名'],
  ['mail', '邮箱'],
  ['curPassword', '当前密码'],
  ['password', '新密码'],
  ['password2', '重复密码'],
  ['info', '简介']
]);

class Profile extends Component {
  constructor (props) {
    super(props);
  }
  handleChangePaper = (paper) => {
    this.props.actions.changePaper(paper);
  }
  handleRemovePaper = (paper) => {
    const { removePaper } = this.props.actions;
    const token = window.localStorage.getItem(TOKEN_NAME);
    removePaper(paper._id, token);
  }
  handleChangeTabIndex = (index) => {
    if (index >= 0) {
      this.props.actions.changeProfileTabIndex(index);
      this.props.actions.changeIsEditing(false);
    }
  }
  handlePublishPaper = (paper) => {
    const { changePaper, changePublishConfirm } = this.props.actions;
    changePaper(paper);
    changePublishConfirm(true);
  }
  handleToggleTabOpen = () => {
    this.props.actions.changeProfileTabOpen(!this.props.tabOpen);
  }
  render () {
    const {
      user,
      paper,
      tabOpen,
      tabIndex,
      isEditing,
      publishConfirmOpen,
      actions
    } = this.props;
    const bottomNavigationStyle = {
      position: 'fixed',
      bottom: '0',
      zIndex: 100
    };
    return (
      <div>
        <Header user={user} />
        <div className='profile'>
          <BottomNavigation
            style={bottomNavigationStyle}
            selectedIndex={tabIndex}
          >
            <BottomNavigationItem
              label='个人信息'
              icon={<SocialPerson />}
              onTouchTap={ () => { this.handleChangeTabIndex(0) }}
            />
            <BottomNavigationItem
              label='修改密码'
              icon={<ActionLock />}
              onTouchTap={ () => { this.handleChangeTabIndex(1) }}
            />
          </BottomNavigation>
          <SwipeableViews
            className='profileList'
            disabled={true}
            index={tabIndex}
            onChange={this.handleChangeTabIndex}
          >
            <Paper>
              <Subheader>
                个人信息
              </Subheader>
              <Divider />
              <ProfileUserForm
                labelMap={labelMap}
                user={user}
                isEditing={isEditing}
                changeIsEditing={actions.changeIsEditing}
                updateUserInfo={actions.updateUserInfo}
              />
            </Paper>
            <Paper>
              <Subheader>
                修改密码
              </Subheader>
              <Divider />
              <ProfilePasswordForm
                labelMap={labelMap}
                user={user}
                updateUserInfo={actions.updateUserInfo}
              />
            </Paper>
          </SwipeableViews>
        </div>
        <ErrMsg />
      </div>
    );
  }
}

Profile.PropTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
  paper: PropTypes.object,
  tabIndex: PropTypes.number,
  tabOpen: PropTypes.boolean,
  isEditing: PropTypes.boolean,
  publishedPage: PropTypes.number,
  publishConfirmOpen: PropTypes.boolean
};

export default Profile;
