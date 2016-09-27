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

const labelMap = new Map([
  ['nickname', '昵称'],
  ['mail', '邮箱'],
  ['curPassword', '旧密码'],
  ['password', '新密码'],
  ['password2', '再次输入密码'],
  ['info', '个人简介']
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
      <TextField {...input}
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
  onSubmit = (data) => {
    data.account = this.props.user.account;
    this.props.actions.updateUserInfo(data);
  }
  handleChangePaper = (paper) => {
    this.props.actions.changePaper(paper);
  }
  renderPublishedPapers = (user) => {
    let publishedPapers = user.publishedPapers;
    if (!publishedPapers) {
      return null;
    }
    return (
      publishedPapers.map((paper, index) => {
        return (
          <ListItem
            key={index}
            disabled={true}
            primaryText={paper.title}
            rightAvatar={
              <Link to='/papers/paper'>
                <FlatButton
                  label='前往'
                  onTouchTap={this.handleChangePaper.bind(this, paper)}
                />
              </Link>
            }
          />
        );
      })
    );
  }
  renderAnsweredPapers = (user) => {
    let answeredPapers = user.answeredPapers;
    if (!answeredPapers) {
      return null
    }
    return (
      answeredPapers.map((paper, index) => {
        return (
          <ListItem
            key={index}
            disabled={true}
            primaryText={paper.title}
            rightAvatar={
              <Link to='/papers/paper'>
                <FlatButton
                  label='前往'
                   onTouchTap={this.handleChangePaper.bind(this, paper)}
                />
              </Link>
            }
          />
        );
      })
    );
  }
  render () {
    const { user, actions, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Header />
        <div className='profile'>
          <Tabs>
            <Tab label='个人资料'>
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
            </Tab>
            <Tab label='我的试卷'>
              <Paper className='profileList'>
                <List>
                  <Subheader>我制作的试卷</Subheader>
                  {this.renderPublishedPapers(user)}
                </List>
              </Paper>
              <Paper className='profileList'>
                <List>
                  <Subheader>我填写的试卷</Subheader>
                  {this.renderAnsweredPapers(user)}
                </List>
              </Paper>
            </Tab>
            <Tab label='安全'>

            </Tab>
          </Tabs>
        </div>
        <ErrMsg />
      </div>
    );
  }
}

Profile.PropTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
  papers: PropTypes.array
};

export default Profile;
