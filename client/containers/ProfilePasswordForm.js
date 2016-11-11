import { reduxForm } from 'redux-form';
import ProfilePasswordForm from '../components/ProfilePasswordForm.jsx';

const validate = (values) => {
  let errors = {};
  if (values.curPassword || values.password || values.password2) {
    if (values.password !== values.password2) {
      errors.password = errors.password2 = '两次输入的密码不一致';
    }
    if (values.password && (values.password.length > 16 || values.password.length < 6)) {
      errors.password = '密码长度不对';
    }
    if (values.password2 && (values.password2.length > 16 || values.password2.length < 6)) {
      errors.password2 = '密码长度不对';
    }
    if (!(values.curPassword && values.password && values.password2) && !(!values.curPassword && !values.password && !values.password2)) {
      let keywords = ['curPassword', 'password', 'password2'];
      for (let i in keywords) {
        let key = keywords[i];
        if (!values[key]) {
          errors[key] = '请填写表单';
        }
      }
    }
  } else {
    errors.curPassword = errors.password = errors.password2 = '请填写表单';
  }
  return errors;
};

export default reduxForm({
  form: 'profilePassword',
  validate
})(ProfilePasswordForm);
