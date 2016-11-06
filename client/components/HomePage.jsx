import React, { Component, PropTypes } from 'react';
import '../scss/homePage.scss';
import { Link } from 'react-router';
import Search from './Search.jsx';
import Page from './Page.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentUndo from 'material-ui/svg-icons/content/undo';

class HomePage extends Component {
  handleCloseSearchResults = () => {
    this.props.changeSearchStep(this.props.stepIndex);
  }
  handleClickPaper = (index) => {
    this.props.changePaper(this.props.papers[index]);
  }
  render () {
    const {
      keywords,
      user,
      stepIndex,
      papers,
      searchedPaperPage,
      changeKeywords,
      searchPaper,
      changePage
    } = this.props;
    const paperItems = papers.map((paper, index) => {
      return (
        <Paper className='paper' key={'paper' + index}>
          <h3>{paper.title}</h3>
          <Subheader>发布者: {paper.creator}</Subheader>
          <Link to='/papers/paper'>
            <RaisedButton onTouchTap={() => {
              this.handleClickPaper(index)
            }} label='填写问卷' />
          </Link>
        </Paper>
      );
    });
    return (
      <div>
        <div className='fullPage-1'></div>
        <div className='homePageWrapper'>
          <div className='bgIcon'></div>
          <Link to='/papers/create'>
            <RaisedButton
              className='homePageBtn'
              label='创建问卷'
            />
          </Link>
          <RaisedButton className='homePageBtn' label='查找问卷' />
        </div>

        <div className='fullPage-2 homePageSearch'>
          {
            stepIndex === 0 &&
            <Search
              user={user}
              className='homePageWrapper'
              keywords={keywords}
              changeKeywords={changeKeywords}
              searchPaper={searchPaper}
            />
          }
          {
            stepIndex === 1 &&
            <div>
              <div className='homePageBackBtnWrapper'>
                <FloatingActionButton
                  className='homePageBackBtn fr'
                  onTouchTap={this.handleCloseSearchResults}
                >
                  <ContentUndo />
                </FloatingActionButton>
              </div>
              <div>
                <Page
                  page={searchedPaperPage}
                  perPage={6}
                  items={papers}
                  pageItemsClassName='homePagePapers'
                  pageBarClassName='homePagePageBar'
                  pageClassName='homePagePageNum'
                  renderItem={(item, index) => {
                    return (
                      <Paper className='paper' key={'paper' + index}>
                        <h3>{item.title}</h3>
                        <Subheader>发布者: {item.creator}</Subheader>
                        <Link to='/papers/paper'>
                          <RaisedButton onTouchTap={() => {
                            this.handleClickPaper(index)
                          }} label='填写问卷' />
                        </Link>
                      </Paper>
                    );
                  }}
                  changePage={changePage}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

HomePage.PropTypes = {
  user: PropTypes.object,
  keywords: PropTypes.string,
  stepIndex: PropTypes.number,
  papers: PropTypes.arrayOf(PropTypes.object),
  searchedPaperPage: PropTypes.number,
  changeKeywords: PropTypes.func,
  searchPaper: PropTypes.func,
  changeSearchStep: PropTypes.func,
  changePaper: PropTypes.func,
  changePage: PropTypes.func
};

export default HomePage;
