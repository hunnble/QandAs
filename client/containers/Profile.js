import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Profile from '../components/Profile.jsx';
import {
  updateUserInfo,
  changePaper,
  publishedPage,
  answeredPage,
  changeProfileTabOpen,
  changeProfileTabIndex,
  changePublishedPage,
  changeAnsweredPage,
  changeIsEditing
} from '../actions';

const validate = (values) => {
  let errors = {};
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
    errors.curPassword = errors.password = errors.password2 = '修改密码必须填写完整';
  }
  return errors;
}

let ProfileForm = reduxForm({
  form: 'profile',
  validate
})(Profile);

function mapStateToProps (state) {
  return {
    user: state.user,
    papers: state.papers,
    tabOpen: state.page.profileTabOpen,
    tabIndex: state.page.profileTabIndex,
    isEditing: state.page.isEditing,
    publishedPage: state.page.publishedPage,
    answeredPage: state.page.answeredPage
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      updateUserInfo,
      changePaper,
      changeProfileTabOpen,
      changeProfileTabIndex,
      changePublishedPage,
      changeAnsweredPage,
      changeIsEditing
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
