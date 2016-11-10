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
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import { List, ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import SocialPerson from 'material-ui/svg-icons/social/person';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import ImageRemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import ActionFace from 'material-ui/svg-icons/action/face';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import ActionLockOutline from 'material-ui/svg-icons/action/lock-outline';
import { Field, SubmissionError } from 'redux-form';
import { blueGrey700 } from 'material-ui/styles/colors';
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

const renderInput = ({
  input,
  name,
  type,
  multiLine,
  fullWidth,
  long,
  hint,
  icon,
  meta: { touched, error }
}) => {
  if (!multiLine) {
    multiLine = false;
  }
  return (
    <div className={long ? 'profileText profileTextLong' : 'profileText'}>
      {icon}
      <Subheader style={{
        display: 'inline-block',
        marginRight: 6,
        width: 'auto',
        minWidth: 72
      }}>
        {labelMap.get(name)}
      </Subheader>
      <TextField
        className='profileTextInput'
        type={type}
        name={name}
        hintText={hint}
        floatingLabelText={hint}
        multiLine={multiLine}
        fullWidth={fullWidth || false}
        errorText={touched && error}{...error}
      />
    </div>
  );
};

class Profile extends Component {
  constructor (props) {
    super(props);
  }
  onSubmit = (data) => {
    data.token = window.localStorage.getItem(TOKEN_NAME);
    this.props.actions.changeIsEditing(false);
    this.props.actions.updateUserInfo(data);
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
    index >= 0 && this.props.actions.changeProfileTabIndex(index);
  }
  handlePublishPaper = (paper) => {
    const { changePaper, publishPaper } = this.props.actions;
    const token = window.localStorage.getItem(TOKEN_NAME);
    changePaper(paper);
    publishPaper(paper._id, token);
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
                        marginTop: 5
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
      tabOpen,
      tabIndex,
      isEditing,
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
    const iconStyle = {
      verticalAlign: 'middle'
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
              label='用户'
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
                问卷列表
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
            </Paper>
            <Paper>
              {
                !isEditing &&
                <div className='profileWrapper'>
                  <h3><span>{labelMap.get('account')}:</span>{user.account}</h3>
                  <h3><span>{labelMap.get('nickname')}:</span>{user.nickname}</h3>
                  <h3><span>{labelMap.get('mail')}:</span>{user.mail}</h3>
                  <h3><span>{labelMap.get('info')}:</span>{user.info}</h3>
                  <div className='profileBtnWrapper fr'>
                    <RaisedButton
                      primary={true}
                      label='编辑'
                      onTouchTap={() => {
                        actions.changeIsEditing(true);
                      }}
                    />
                  </div>
                </div>
              }
              {
                isEditing &&
                <ProfileUserForm
                  onSubmit={this.onSubmit}
                  changeIsEditing={actions.changeIsEditing}
                  renderInput={renderInput}
                  fields={
                    <div>
                      <Field
                        type='text'
                        name='nickname'
                        long={false}
                        hint={user.nickname}
                        icon={<ActionFace color={blueGrey700} style={iconStyle} />}
                        component={renderInput}
                      />
                      <Field
                        type='email'
                        name='mail'
                        long={false}
                        hint={user.mail}
                        icon={<CommunicationEmail color={blueGrey700} style={iconStyle} />}
                        component={renderInput}
                      />
                      <Field
                        type='text'
                        name='info'
                        hint={user.info}
                        long={false}
                        icon={<ActionDescription color={blueGrey700} style={iconStyle} />}
                        component={renderInput}
                      />
                    </div>
                  }
                  cancelButton={
                    <RaisedButton
                      label='取消'
                      onTouchTap={() => {
                        actions.changeIsEditing(false);
                      }}
                    />
                  }
                />
              }
            </Paper>
            <Paper>
              <ProfileUserForm
                onSubmit={this.onSubmit}
                changeIsEditing={actions.changeIsEditing}
                renderInput={renderInput}
                fields={
                  <div>
                    <Field
                      type='password'
                      name='curPassword'
                      long={false}
                      icon={<ActionLock color={blueGrey700} style={iconStyle} />}
                      component={renderInput}
                    />
                    <Field
                      type='password'
                      name='password'
                      long={false}
                      icon={<ActionLockOutline color={blueGrey700} style={iconStyle} />}
                      component={renderInput}
                    />
                    <Field
                      type='password'
                      name='password2'
                      long={false}
                      icon={<ActionLockOpen color={blueGrey700} style={iconStyle} />}
                      component={renderInput}
                    />
                  </div>
                }
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
  papers: PropTypes.array,
  tabIndex: PropTypes.number,
  tabOpen: PropTypes.boolean,
  isEditing: PropTypes.boolean,
  publishedPage: PropTypes.number
};

export default Profile;
