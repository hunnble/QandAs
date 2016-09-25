import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from '../components/Settings.jsx';
import { handleChangeSwitcher } from '../actions';

function mapStateToProps (state) {
  return {
    isOpens: state.settings.isOpens,
    options: state.settings.options
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ handleChangeSwitcher }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
