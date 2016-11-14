import { reduxForm } from 'redux-form';
import SignUpForm from '../components/SignUpForm.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleSignUp } from '../actions';

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

function mapStateToProps (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      handleSignUp: handleSignUp
    }, dispatch)
  };
}

let SignUpFormComponent = connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

export default reduxForm({
  form: 'signUp',
  validate
})(SignUpFormComponent);
