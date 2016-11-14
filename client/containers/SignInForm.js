import { reduxForm } from 'redux-form';
import SignInForm from '../components/SignInForm.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleSignIn } from '../actions';

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

function mapStateToProps (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      handleSignIn: handleSignIn
    }, dispatch)
  };
}

let SignInFormComponent = connect(mapStateToProps, mapDispatchToProps)(SignInForm);

export default reduxForm({
  form: 'signIn',
  validate
})(SignInFormComponent);
