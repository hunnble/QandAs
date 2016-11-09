import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitAnswer, changeErrMsg } from '../actions';
import Paper from '../components/Paper.jsx';

function mapStateToProps (state) {
  return {
    paper: state.papers.paper
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ submitAnswer, changeErrMsg }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
