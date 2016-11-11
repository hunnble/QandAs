import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Profile from '../components/Profile.jsx';
import {
  updateUserInfo,
  changePaper,
  publishedPage,
  changeProfileTabOpen,
  changeProfileTabIndex,
  changePublishedPage,
  changeIsEditing,
  publishPaper,
  removePaper,
  changePublishConfirm
} from '../actions';

function mapStateToProps (state) {
  return {
    user: state.user,
    paper: state.papers.paper,
    tabOpen: state.page.profileTabOpen,
    tabIndex: state.page.profileTabIndex,
    isEditing: state.page.isEditing,
    publishedPage: state.page.publishedPage,
    publishConfirmOpen: state.page.publishConfirmOpen
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      updateUserInfo,
      changePaper,
      changeProfileTabOpen,
      changeProfileTabIndex,
      changePublishedPage,
      changeIsEditing,
      publishPaper,
      removePaper,
      changePublishConfirm
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
