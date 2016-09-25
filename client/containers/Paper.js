import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitAnswer } from '../actions';
import Paper from '../components/Paper.jsx';

function mapStateToProps (state) {
  let page = state.page;
  let result = { user: state.user };
  if (page.paperIndex < 0) {
    result.paper = null;
  } else {
    result.paper = page.papers[page.paperIndex]
  }
  return result;
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ submitAnswer }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paper);
