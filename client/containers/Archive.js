import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Archive from '../components/Archive.jsx';
import {
  updateUserInfo,
  changePaper,
  publishedPage,
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
    publishedPage: state.page.publishedPage,
    publishConfirmOpen: state.page.publishConfirmOpen
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      updateUserInfo,
      changePaper,
      publishedPage,
      changePublishedPage,
      changeIsEditing,
      publishPaper,
      removePaper,
      changePublishConfirm
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
