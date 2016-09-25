import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VisibleBox from '../components/VisibleBox.jsx';
import { openSettings, closeSettings } from '../actions';

function mapStateToProps (state) {
  return {
    visible: state.page.settingsVisible
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      openSettings,
      closeSettings
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibleBox);
