import '../scss/sign.scss';
import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import ErrMsg from '../containers/ErrMsg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import { white } from 'material-ui/styles/colors';
import { Link } from 'react-router';
import { TOKEN_NAME } from '../../configs/config';

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

class SignInForm extends Component {
  constructor (props) {
    super(props);
  }
  onSubmit = (data) => {
    const { actions, destroy } = this.props;
    actions.handleSignIn(data, destroy);
  }
  componentDidMount () {
    window.localStorage.removeItem(TOKEN_NAME);
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
                <Field type='password' name='password' hint='密码' component={renderInput} />
              </div>
              <RaisedButton className='signBtn' containerElement={
                <Link to='/' />
              } label='主页' />
              <RaisedButton className='signBtn' containerElement={
                <Link to='/signUp' />
              } label='前往注册' />
              <RaisedButton
                className='signBtn'
                type='submit'
                label='登录'
                disabled={submitting||pristine}
              />
            </div>
          </form>
        </div>
        <ErrMsg />
      </div>
    );
  }
};

SignInForm.PropTypes = {
  actions: PropTypes.object
};

export default SignInForm;
