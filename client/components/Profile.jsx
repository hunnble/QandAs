import React, { Component, PropTypes } from 'react';
import '../scss/profile.scss';
import Header from './Header.jsx';
import ErrMsg from '../containers/ErrMsg';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';
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
  long,
  hint,
  meta: { touched, error }
}) => {
  if (!multiLine) {
    multiLine = false;
  }
  return (
    <span className={long ? 'profileText profileTextLong' : 'profileText'}>
      <label htmlFor={name}>{labelMap.get(name)}</label>
      <TextField
        type={type}
        name={name}
        hintText={hint}
        floatingLabelText={hint}
        multiLine={multiLine}
        fullWidth={true}
        errorText={touched && error}{...error}
      />
    </span>
  );
};

class Profile extends Component {
  constructor (props) {
    super(props);
  }
  onSubmit = (data) => {
    data.token = window.localStorage.getItem(TOKEN_NAME);
    this.props.actions.updateUserInfo(data);
  }
  handleChangePaper = (paper) => {
    this.props.actions.changePaper(paper);
  }
  handleChangeTab = (index) => {
    this.props.actions.changeProfileTabIndex(index);
  }
  renderPapers = (papers) => {
    const { user, actions } = this.props;
    if (!papers) {
      return null;
    }
    return (
      papers.map((paper, index) => {
        return (
          <ListItem
            key={index}
            disabled={true}
            primaryText={paper.title}
            rightAvatar={
              <span>
                {
                  paper.creator === user.account &&
                  paper.state === 0 &&
                  <RaisedButton
                    primary={true}
                    label='发布问卷'
                    onTouchTap={() => {
                      actions.publishPaper(paper._id, window.localStorage.getItem(TOKEN_NAME));
                    }}
                  />
                }
                {
                  <span className={'profilePaperState' + paper.state}>
                    {paperStateMap.get(paper.state)}
                  </span>
                }
                <Link to='/papers/paper'>
                  <FlatButton
                    label='前往'
                    onTouchTap={this.handleChangePaper.bind(this, paper)}
                  />
                </Link>
              </span>
            }
          />
        );
      })
    );
  }
  render () {
    const { user, tabIndex, actions, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Header />
        <div className='profile'>
          <Tabs value={tabIndex} onChange={this.handleChangeTab}>
            <Tab label='个人资料' value={0} />
            <Tab label='我的问卷' value={1} />
            <Tab label='安全' value={2} />
          </Tabs>
          <SwipeableViews index={tabIndex} onChange={this.handleChangeTab}>
            <div>
              <form className='profileForm' onSubmit={handleSubmit(this.onSubmit)}>
                <Avatar size={80} src={user.avatar} className='avatar' />
                <h2 className='account'>{user.account}</h2>
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
                    multiLine={true}
                    long={true}
                    component={renderInput}
                  />
                  <Field
                    type='password'
                    name='curPassword'
                    long={true}
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
                    <RaisedButton type='submit' label='确认修改' disabled={submitting} />
                  </div>
                </div>
              </form>
            </div>
            <div>
              <Paper className='profileList'>
                <List>
                  <Subheader>我编写的问卷</Subheader>
                  {this.renderPapers(user.publishedPapers)}
                </List>
              </Paper>
              <Paper className='profileList'>
                <List>
                  <Subheader>我填写的问卷</Subheader>
                  {this.renderPapers(user.answeredPapers)}
                </List>
              </Paper>
            </div>
            <div>
            </div>
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
  tabIndex: PropTypes.number
};

export default Profile;
