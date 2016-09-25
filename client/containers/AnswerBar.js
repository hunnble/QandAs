import { reduxForm } from 'redux-form';
import AnswerBar from '../components/AnswerBar.jsx';

let AnswerBarForm = reduxForm({
  form: 'answer'
})(AnswerBar);

export default AnswerBarForm;
