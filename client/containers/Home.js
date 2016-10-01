import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home.jsx';
import {
  changeKeywords,
  searchPaper,
  changeSearchStep,
  changePaper,
  changeSearchedPaperPage
} from '../actions';

function mapStateToProps (state) {
  return {
    user: state.user,
    papers: state.papers.papers,
    keywords: state.page.keywords,
    stepIndex: state.page.stepIndex,
    searchedPaperPage: state.page.searchedPaperPage
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      changeKeywords,
      searchPaper,
      changeSearchStep,
      changePaper,
      changePage: changeSearchedPaperPage
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
