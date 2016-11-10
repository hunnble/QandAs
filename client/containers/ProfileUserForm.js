import { reduxForm } from 'redux-form';
import ProfileForm from '../components/ProfileForm.jsx';

export default reduxForm({
  form: 'profileUser'
})(ProfileForm);
