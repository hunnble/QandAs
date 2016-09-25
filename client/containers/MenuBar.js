import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MenuBar from '../components/MenuBar.jsx';
import { handleMenuOpen, handleMenuClose, openSettings, closeSettings } from '../actions';

function mapStateToProps (state) {
  return {
    isOpen: state.page.menuIsOpen,
    anchorEl: state.page.anchorEl,
    settingsVisible: state.page.settingsVisible
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      handleMenuOpen,
      handleMenuClose,
      openSettings,
      closeSettings
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
