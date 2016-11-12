import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import ErrMsg from '../containers/ErrMsg';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
  render () {
    const {
      user,
      keywords,
      stepIndex,
      searchedPaperPage,
      papers,
      actions
    } = this.props;
    return (
      <div>
        <Header user={user} />
        <HomePage
          user={user}
          keywords={keywords}
          stepIndex={stepIndex}
          papers={papers}
          searchedPaperPage={searchedPaperPage}
          changeKeywords={actions.changeKeywords}
          searchPaper={actions.searchPaper}
          changeSearchStep={actions.changeSearchStep}
          changePaper={actions.changePaper}
          changePage={actions.changePage}
        />
        <ErrMsg />
      </div>
    );
  }
}

Home.PropTypes = {
  user: PropTypes.object,
  keywords: PropTypes.string,
  stepIndex: PropTypes.number,
  papers: PropTypes.arrayOf(PropTypes.object),
  searchedPaperPage: PropTypes.number,
  actions: PropTypes.object
}

export default Home;
