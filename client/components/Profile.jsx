import React, { Component, PropTypes } from 'react';
import '../scss/profile.scss';
import Header from './Header.jsx';
import ErrMsg from '../containers/ErrMsg';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

const labelMap = new Map([
  ['nickname', '昵称'],
  ['mail', '邮箱'],
  ['password', '密码'],
  ['info', '个人简介']
]);

const renderInput = ({ input, name, type, multiLine, long, hint, meta: { touched, error } }) => {
  let width = long ? '80%' : '30%';
  const style = {
    display: 'inline-block',
    margin: '10px 10%',
    width: width
  };
  if (!multiLine) {
    multiLine = false;
  }
  return (
    <span style={style}>
      <label htmlFor={name}>{labelMap.get(name)}</label>
      <TextField {...input}
        type={type}
        name={name}
        hintText={hint}
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
  render () {
    const { user, actions, handleSubmit, submitting } = this.props;
    return (
      <div>
        <Header />
        <div className='profile'>
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
                  type='password'
                  name='password'
                  long={false}
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
                <div className='profileBtnWrapper fr'>
                  <RaisedButton type='submit' label='保存' disabled={submitting} />
                </div>
            </div>
          </form>
        </div>
        <ErrMsg />
      </div>
    );
  }
}

Profile.PropTypes = {
  actions: PropTypes.object,
  user: PropTypes.object
};

export default Profile;
