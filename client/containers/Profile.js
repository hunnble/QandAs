import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Profile from '../components/Profile.jsx';
import { updateUserInfo } from '../actions';

let ProfileForm = reduxForm({
  form: 'profile'
})(Profile);

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ updateUserInfo }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
