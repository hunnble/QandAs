import React, { Component, PropTypes } from 'react';
import '../scss/profile.scss';
import Header from './Header.jsx';
import Page from './Page.jsx';
import ErrMsg from '../containers/ErrMsg';
import ProfileUserForm from '../containers/ProfileUserForm';
import ProfilePasswordForm from '../containers/ProfilePasswordForm';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { List, ListItem } from 'material-ui/List';
import SocialPerson from 'material-ui/svg-icons/social/person';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import ActionLock from 'material-ui/svg-icons/action/lock';
import { TOKEN_NAME } from '../../configs/config';
import SwipeableViews from 'react-swipeable-views';
import moment from 'moment';

const labelMap = new Map([
  ['account', '账号'],
  ['nickname', '用户名'],
  ['mail', '邮箱'],
  ['curPassword', '当前密码'],
  ['password', '新密码'],
  ['password2', '重复密码'],
  ['info', '简介']
]);
const paperStateMap = new Map([
  [0, '未发布'],
  [1, '已发布'],
  [2, '已截止']
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
  renderPapers = (papers) => {
    if (!papers) {
      return null;
    }
    const { user, publishedPage, actions } = this.props;
    return (
      <Page
        page={publishedPage}
        perPage={5}
        divider={true}
        items={papers}
        pageItemsClassName='profileListItem'
        pageBarClassName='profilePageBar'
        renderItem={(paper, index) => {
          return (
            <li
              key={index}
              className='profileListItem'
            >
              <div key={-1 * index} className='profileListNestedItem'>
                <span className={'profilePaperState' + paper.state}>
                  {paperStateMap.get(paper.state)}
                </span>
                <IconMenu
                  iconButtonElement={
                    <FloatingActionButton
                      mini={true}
                      zDepth={0}
                      style={{
                        margin: '5px 0'
                      }}
                    >
                      <HardwareKeyboardArrowDown />
                    </FloatingActionButton>
                  }
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                  {
                    paper.state === 0 &&
                    <MenuItem
                      leftIcon={<ContentSend />}
                      primaryText='发布问卷'
                      onTouchTap={this.handlePublishPaper.bind(this, paper)}
                    />
                  }
                  {
                    paper.creator === user.account &&
                    paper.state === 0 &&
                    <Link to='/papers/create'>
                      <MenuItem
                        leftIcon={<ContentCreate />}
                        primaryText='编辑问卷'
                        onTouchTap={
                          this.handleChangePaper.bind(this, paper)
                        }
                      />
                    </Link>
                  }
                  {
                    paper.creator === user.account &&
                    paper.state === 1 &&
                    <Link to='/papers/paper'>
                      <MenuItem
                        leftIcon={<ImageRemoveRedEye />}
                        primaryText='查看统计'
                        onTouchTap={
                          this.handleChangePaper.bind(this, paper)
                        }
                      />
                    </Link>
                  }
                  <MenuItem
                    leftIcon={<ContentDeleteSweep />}
                    primaryText='删除问卷'
                    onTouchTap={
                      this.handleRemovePaper.bind(this, paper)
                    }
                  />
                </IconMenu>
              </div>
              <h3 className='profileListItemTitle'>
                {paper.title}
              </h3>
              <Subheader style={{
                display: 'inline-block',
                width: 'auto'
              }}>
                截止日期:{moment(new Date(paper.closingDate)).format('YYYY-M-D')}
              </Subheader>
              <Divider />
            </li>
          );
        }}
        changePage={actions.changePublishedPage}
      />
    );
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
    const drawerWidth = 56;
    const drawerIconStyle = {
      paddingTop: 16,
      height: 56,
      width: 56
    };
    const drawerSwitcherStyle = {
      position: 'fixed',
      right: 4,
      bottom: 4,
      zIndex: 2000
    };
    const bottomNavigationStyle = {
      position: 'fixed',
      bottom: '0',
      zIndex: 2000
    };
    return (
      <div>
        <Header />
        <div className='profile'>
          <BottomNavigation
            style={bottomNavigationStyle}
            selectedIndex={tabIndex}
          >
            <BottomNavigationItem
              label='问卷管理'
              icon={<AvLibraryBooks />}
              onTouchTap={ () => { this.handleChangeTabIndex(0) }}
            />
            <BottomNavigationItem
              label='个人信息'
              icon={<SocialPerson />}
              onTouchTap={ () => { this.handleChangeTabIndex(1) }}
            />
            <BottomNavigationItem
              label='修改密码'
              icon={<ActionLock />}
              onTouchTap={ () => { this.handleChangeTabIndex(2) }}
            />
          </BottomNavigation>
          <SwipeableViews
            className='profileItem'
            disabled={true}
            index={tabIndex}
            onChange={this.handleChangeTabIndex}
          >
            <Paper className='profileList'>
              <Subheader>
                问卷管理
                <Link to='/papers/create' style={{
                  float: 'right',
                  margin: 5
                }}>
                  <RaisedButton
                    primary={true}
                    label='新建问卷'
                    onTouchTap={
                      this.handleChangePaper.bind(this, {})
                    }
                  />
                </Link>
              </Subheader>
              <Divider />
              <ul>
                {this.renderPapers(user.publishedPapers)}
              </ul>
              <Dialog
                title='确认发布'
                actions={[
                  <FlatButton
                    label='确认'
                    onTouchTap={() => {
                      const token = window.localStorage.getItem(TOKEN_NAME);
                      actions.publishPaper(paper._id, token);
                      actions.changePublishConfirm(false);
                    }}
                  />,
                  <FlatButton
                    label='取消'
                    onTouchTap={() => {
                      actions.changePublishConfirm(false);
                    }}
                  />
                ]}
                modal={true}
                open={publishConfirmOpen}
                onRequestClose={() => {
                  actions.changePublishConfirm(false);
                }}
              >
                问卷发布后不可修改或撤回,确认发布?
              </Dialog>
            </Paper>
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
