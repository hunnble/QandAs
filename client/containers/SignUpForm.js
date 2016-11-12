import 'babel-polyfill';
import '../scss/sign.scss';
import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { reduxForm, Field } from 'redux-form';
import ErrMsg from './ErrMsg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import { changeErrMsg } from '../actions';

const validate = (values) => {
  let errors = {};
  if (!values.account) {
    errors.account = '请输入用户名';
  } else if (values.account.length > 16 || values.account.length < 4) {
    errors.account = '请确保输入的是4-16位的英文字母和数字的组合';
  } else if (/[^a-zA-Z0-9]/.test(values.account)) {
    errors.account = '不能含有非英文字母、非数字字符';
  }
  if (values.nickname && values.nickname.length > 16) {
    errors.nickname = '这名儿也太长了吧,弄短一点吧';
  }
  if (!values.password) {
    errors.password = '请输入密码';
  } else if (values.password.length > 16 || values.password.length < 6) {
    errors.password = '密码长度不对';
  }
  if (!values.password2) {
    errors.password2 = '请输入密码';
  } else if (values.password2.length > 16 || values.password2.length < 6) {
    errors.password2 = '密码长度不对';
  } else if (values.password !== values.password2) {
    errors.password2 = '两次输入的密码不一致';
  }
  return errors;
};

const renderInput = ({ input, name, type, hint, meta: { touched, error } }) => {
  const style = {
    width: '80%'
  };
  return (
    <TextField {...input}
      type={type}
      name={name}
      hintText={hint}
      errorText={touched && error}{...error}
      style={style}
    />
  );
};

class SignUpForm extends Component {
  onSubmit = (data) => {
    const { dispatch } = this.props;
    fetch('/signUp', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => {
      return res.json();
    })
    .then((resBody) => {
      if (resBody.success) {
        dispatch(changeErrMsg('注册成功，登录看看吧'));
        dispatch(push('/signIn'));
      } else {
        dispatch(changeErrMsg(resBody.errMsg));
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  render () {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div className="formWrapper">
        <div>
          <div className="bgIcon"></div>
          <form className="signForm" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="signWrapper">
              <div>
                <Field type="text" name="account" hint="账号" component={renderInput} />
              </div>
              <div>
                <Field type="text" name="nickname" hint="昵称(非必填)" component={renderInput} />
              </div>
              <div>
                <Field type="password" name="password" hint="密码" component={renderInput} />
              </div>
              <div>
                <Field type="password" name="password2" hint="确认密码" component={renderInput} />
              </div>
              <RaisedButton className="signBtn" containerElement={
                <Link to={'/signIn'} />
              } label="去登录" />
              <RaisedButton className="signBtn" primary={true} type="submit" label="确认注册" disabled={submitting||pristine} />
            </div>
          </form>
        </div>
        <ErrMsg />
      </div>
    );
  }
};

export default reduxForm({
  form: 'signUp',
  validate
})(SignUpForm);
