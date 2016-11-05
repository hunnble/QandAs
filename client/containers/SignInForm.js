import 'babel-polyfill';
import '../scss/sign.scss';
import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { reduxForm, Field } from 'redux-form';
import ErrMsg from './ErrMsg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import { changeErrMsg } from '../actions';
import { TOKEN_NAME } from '../../configs/config';

const validate = (values) => {
  let errors = {};
  if (!values.account) {
    errors.account = '账号不能为空';
  } else if (values.account.length > 16 || values.account.length < 4) {
    errors.account = '请确保输入的是4-16位的英文字母和数字的组合';
  } else if (/[^a-zA-Z0-9]/.test(values.account)) {
    errors.account = '不能含有非英文字母、非数字字符';
  }
  if (!values.password) {
    errors.password = '请输入密码';
  } else if (values.password.length > 16 || values.password.length < 6) {
    errors.password = '密码长度不对';
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

class SignInForm extends Component {
  onSubmit = (data) => {
    const { dispatch } = this.props;
    fetch('/signIn', {
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
      if (resBody.token) {
        window.localStorage.setItem(TOKEN_NAME, resBody.token);
        dispatch(push('/'));
      } else {
        dispatch(changeErrMsg(resBody.errMsg));
      }
    })
    .catch((err) => {
      dispatch(changeErrMsg('登录失败，请重试'));
    });
  }
  componentDidMount () {
    window.localStorage.removeItem(TOKEN_NAME);
  }
  render () {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div className="formWrapper">
        <div className="bgIcon"></div>
        <form className="signForm" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="signWrapper">
            <div>
              <Field type="text" name="account" hint="账号" component={renderInput} />
            </div>
            <div>
              <Field type="password" name="password" hint="密码" component={renderInput} />
            </div>
            <Checkbox name="remember" label="记住我" style={{
              left: '10%',
              width: '80%',
              textAlign: 'left'
            }} />
            <RaisedButton className="signBtn" containerElement={
              <Link to={'/signUp'} />
            } label="去注册" />
            <RaisedButton
              className="signBtn"
              primary={true}
              type="submit"
              label="登录"
              disabled={submitting||pristine}
            />
          </div>
        </form>
        <ErrMsg />
      </div>
    );
  }
};

export default reduxForm({
  form: 'signIn',
  validate
})(SignInForm);
