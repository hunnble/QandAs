import '../scss/sign.scss';
import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import ErrMsg from '../containers/ErrMsg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { white } from 'material-ui/styles/colors';
import { Link } from 'react-router';

const whiteStyle = {
  color: white,
  borderColor: white
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
      inputStyle={whiteStyle}
      hintStyle={whiteStyle}
      floatingLabelStyle={whiteStyle}
      floatingLabelFocusStyle={whiteStyle}
      underlineFocusStyle={whiteStyle}
    />
  );
};

class SignUpForm extends Component {
  constructor (props) {
    super(props);
  }
  onSubmit = (data) => {
    const { actions } = this.props;
    actions.handleSignUp(data);
  }
  render () {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div className='formWrapper'>
        <div>
          <div className='bgIcon'></div>
          <form className='signForm' onSubmit={handleSubmit(this.onSubmit)}>
            <div className='signWrapper'>
              <div>
                <Field type='text' name='account' hint='账号' component={renderInput} />
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
              <RaisedButton className='signBtn' containerElement={
                <Link to='/' />
              } label='主页' />
              <RaisedButton className="signBtn" containerElement={
                <Link to={'/signIn'} />
              } label='前往登录' />
              <RaisedButton
                className='signBtn'
                type='submit'
                label='注册'
                disabled={submitting || pristine}
              />
            </div>
          </form>
        </div>
        <ErrMsg />
      </div>
    );
  }
};

SignUpForm.PropTypes = {
  actions: PropTypes.object
};

export default SignUpForm;
