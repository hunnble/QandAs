import React, { Component, PropTypes } from 'react';
import '../scss/profile.scss';
import Header from './Header.jsx';
import Page from './Page.jsx';
import ErrMsg from '../containers/ErrMsg';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SocialPerson from 'material-ui/svg-icons/social/person';
import AvLibraryBooks from 'material-ui/svg-icons/av/library-books';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionSwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
import { List, ListItem } from 'material-ui/List';
import { TOKEN_NAME } from '../../configs/config';
import SwipeableViews from 'react-swipeable-views';

const labelMap = new Map([
  ['nickname', '昵称'],
  ['mail', '邮箱'],
  ['curPassword', '旧密码'],
  ['password', '新密码'],
  ['password2', '再次输入密码'],
  ['info', '个人简介']
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
  meta: { touched, error }
}) => {
  if (!multiLine) {
    multiLine = false;
  }
  return (
    <div className={long ? 'profileText profileTextLong' : 'profileText'}>
      <label htmlFor={name}>{labelMap.get(name) + ': '}</label>
      <TextField
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
  handleChangeTabIndex = (index) => {
    this.props.actions.changeIsEditing(false);
    index >= 0 && this.props.actions.changeProfileTabIndex(index);
  }
  renderPapers = (papers, i) => {
    const { user, publishedPage, answeredPage, actions } = this.props;
    if (!papers) {
      return null;
    }
    return (
      <Page
        page={i === 0 ?
          publishedPage :
          answeredPage}
        perPage={5}
        divider={true}
        items={papers}
        pageItemsClassName='profileListItem'
        pageBarClassName='profilePageBar fr'
        renderItem={(paper, index) => {
          return (
            <ListItem
              key={index}
              className='profileListItem'
              disabled={true}
              primaryText={paper.title}
              initiallyOpen={true}
              autoGenerateNestedIndicator={false}
              nestedItems={[
                <span key={-1 * index} className='profileListNestedItem'>
                  <span className={'profilePaperState' + paper.state}>
                    {paperStateMap.get(paper.state)}
                  </span>
                  <Link to='/papers/paper'>
                    <FlatButton
                      label={
                        paper.creator === user.account &&
                        paper.state === 0 ? '编辑' : '查看'
                      }
                      onTouchTap={this.handleChangePaper.bind(this, paper)}
                    />
                  </Link>
                  {
                    <Divider />
                  }
                </span>
              ]}
            />
          );
        }}
        changePage={i === 0 ?
          actions.changePublishedPage :
          actions.changeAnsweredPage}
      />
    );
  }
  handleToggleTabOpen = () => {
    this.props.actions.changeProfileTabOpen(!this.props.tabOpen);
  }
  render () {
    const { user, tabOpen, tabIndex, isEditing, actions, handleSubmit, submitting } = this.props;
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
          {/*

            <IconButton
              style={drawerSwitcherStyle}
              onTouchTap={this.handleToggleTabOpen}
            >
              <ActionSwapHoriz />
            </IconButton>
            <Drawer
              openSecondary={true}
              open={tabOpen}
              width={drawerWidth}
            >
              <Menu
                value={tabIndex}
                multiple={false}
                autoWidth={false}
                onChange={(e, v) => { this.handleChangeTabIndex(v) }}
              >
                <MenuItem style={drawerIconStyle} value={0}>
                  <SocialPerson />
                </MenuItem>
                <MenuItem style={drawerIconStyle} value={1}>
                  <AvLibraryBooks />
                </MenuItem>
                <MenuItem style={drawerIconStyle} value={2}>
                  <ActionLock />
                </MenuItem>
              </Menu>
            </Drawer>

          */}
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
              label='问卷管理'
              icon={<AvLibraryBooks />}
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
            <Paper>
              {
                !isEditing &&
                <RaisedButton
                  label='编辑'
                  onTouchTap={() => {
                    actions.changeIsEditing(true);
                  }}
                />
              }
              {
                isEditing &&
                <form className='profileForm' onSubmit={handleSubmit(this.onSubmit)}>
                  <div className='profileWrapper'>
                    <Field
                      type='text'
                      name='nickname'
                      long={false}
                      hint={user.nickname}
                      component={renderInput}
                    />
                    <Field
                      type='email'
                      name='mail'
                      long={false}
                      hint={user.mail}
                      component={renderInput}
                    />
                    <Field
                      type='text'
                      name='info'
                      hint={user.info}
                      long={false}
                      component={renderInput}
                    />
                    <div className='profileBtnWrapper fr'>
                      <RaisedButton type='submit' label='确认修改' disabled={submitting} />
                    </div>
                  </div>
                </form>
              }
            </Paper>
            <Paper>
              <Paper className='profileList'>
                <List>
                  <Subheader>创建问卷列表</Subheader>
                  <Divider />
                  {this.renderPapers(user.publishedPapers, 0)}
                </List>
              </Paper>
              <Paper className='profileList'>
                <List>
                  <Subheader>填写问卷列表</Subheader>
                  <Divider />
                  {this.renderPapers(user.answeredPapers, 1)}
                </List>
              </Paper>
            </Paper>
            <Paper>
              <form className='profileForm' onSubmit={handleSubmit(this.onSubmit)}>
                <div className='profileWrapper'>
                  <Field
                    type='password'
                    name='curPassword'
                    long={false}
                    component={renderInput}
                  />
                  <Field
                    type='password'
                    name='password'
                    long={false}
                    component={renderInput}
                  />
                  <Field
                    type='password'
                    name='password2'
                    long={false}
                    component={renderInput}
                  />
                  <div className='profileBtnWrapper fr'>
                    <RaisedButton type='submit' label='修改' disabled={submitting} />
                  </div>
                </div>
              </form>
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
  publishedPage: PropTypes.number,
  answeredPage: PropTypes.number
};

export default Profile;
