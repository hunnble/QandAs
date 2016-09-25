import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ErrMsg from '../components/ErrMsg.jsx';
import { changeMsgVisible } from '../actions';

function mapStateToProps (state) {
  return {
    msgVisible: state.page.msgVisible,
    errMsg: state.page.errMsg
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ changeMsgVisible }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrMsg);
