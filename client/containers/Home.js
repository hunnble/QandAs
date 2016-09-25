import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home.jsx';
import {
  changeKeywords,
  searchPaper,
  changeSearchStep,
  changePaperIndex
} from '../actions';

function mapStateToProps (state) {
  let page = state.page;
  return {
    user: state.user,
    keywords: page.keywords,
    stepIndex: page.stepIndex,
    papers: page.papers
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      changeKeywords,
      searchPaper,
      changeSearchStep,
      changePaperIndex
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
