import { reduxForm } from 'redux-form';
import ProfileUserForm from '../components/ProfileUserForm.jsx';

export default reduxForm({
  form: 'profileUser'
})(ProfileUserForm);
