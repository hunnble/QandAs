import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Profile from '../components/Profile.jsx';
import { updateUserInfo, changePaper } from '../actions';

let ProfileForm = reduxForm({
  form: 'profile'
})(Profile);

function mapStateToProps (state) {
  return {
    user: state.user,
    papers: state.papers
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ updateUserInfo, changePaper }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
