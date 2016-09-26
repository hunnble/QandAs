import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitAnswer } from '../actions';
import Paper from '../components/Paper.jsx';

function mapStateToProps (state) {
  return {
    user: state.user,
    paper: state.papers.paper
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ submitAnswer }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
