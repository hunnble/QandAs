import { connect } from 'react-redux';
import FetchingProgress from '../components/FetchingProgress.jsx';

function mapStateToProps (state) {
  return {
    fetching: state.page.editorFetching || state.page.searchFetching
  };
}

export default connect(mapStateToProps)(FetchingProgress);
